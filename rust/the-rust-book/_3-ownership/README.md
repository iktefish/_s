# Ownership and Memory Allocation

To create a mutable and growable piece of data we need to allocate an amount of
memory on the Heap to hold its contents. This amount cannot be known during
compile time. During runtime we have to:

1.  Request the memory from the operating system: This is done when we call
    `String::from` or `vec![]`. Its implementation requests the memory it
    needs. This is done universally is most languages.

2.  Return the memory back to the operating system: In language that have a
    Garbage collector (GC), the GC keeps track of unused memory and deallocates
    them.

Deallocating data has always been a historical problem because:

-   If we forget to do so, we'll waste memory.
-   If we do it too early, the data becomes invalid prematurely and are at risk
    of getting a _use after free_ error.
-   If we do it more than once, we get a _double free_ error.

Rust takes a different approach: **The memory is automatically deallocated once
the variable that _owns it_ goes out of scope**. Rust automatically calls a
function called `drop()` at the end of each scope (closing curly-bracket).

Look at the example below:

> NOTE: In C++ this pattern of deallocating resources at the end of an item's
> lifetime is sometimes called the _Resource Acquisition Is Initialization (RAII)_
> pattern.

```rust
fn _scope()
{
    {
        //~> _foo is not valid here, since it hasn't been declared yet.
        let _foo = "bar"; //~> _foo is valid from this point onward.

        /*
            Do some stuff with _foo here ...
        */

        //~> Once the scope is over, _foo will no longer be valid.
    }
}
```

# Ways that Variable and Data Interact

This pattern can profoundly impact on the way Rust code is written. Though it may
seem simple now, in more complicated situations where we want multiple scopes to
access the same data we have allocated on the Heap, behaviour of our code can be
unexpected.

## Move

Multiple variables can interact with the same data in different ways in Rust.

Let's look at the following code:

```rust
fn _simple_values()
{
    //~> Bind the value 5 to the address _x.
    let _x = 5;

    //~> Make a copy of value in _x and bind it to address _y.
    let _y = _x;
}
```

Both the integers are simple values with fixed, hard coded sizes. Let's try doing
the same with a Heap allocated string:

```rust
fn _heap_data_behaviour()
{
    /*
        Though this code looks similar to the once from function
        _simple_value(), they donot share the same behaviour.
    */

    let _str_1 = String::from("Hello");
    let _str_2 = _str_1;
}
```

Though `_heap_data_behaviour()` seems to have the same set of operations as
`_simple_values()`. Under the hood `String::from("Hello")` allocated some
memory in the Heap of length 5 (because of length of "Hello") and capacity 5 .
It then returns a structure containing the aforementioned length and capacity
along with a pointer to its location in the Heap. That return value is bound to
the variable `_str_1`. When we say `let _str_2 = _str_1`, the structure stored
in `_str_1` is copied and bound to `_str_2`. The data in the Heap is untouched
because copying this data could result in runtime performance loss if the data
is large.

---

Difference between capacity and length:

The capacity of a vector is the amount of space allocated for any future
elements that will be added onto the vector. This is not to be confused with
the length of a vector, which specifies the number of actual elements within
the vector. If a vector's length exceeds its capacity, its capacity will
automatically be increased, but its elements will have to be reallocated.

For example, a vector with capacity 10 and length 0 would be an empty vector
with space for 10 more elements. Pushing 10 or fewer elements onto the vector
will not change its capacity or cause reallocation to occur. However, if the
vector's length is increased to 11, it will have to reallocate, which can be
slow. For this reason, it is recommended to use `Vec::with_capacity` whenever
possible to specify how big the vector is expected to get.

---

Rust calls the `drop()` function every time a scope is closed. Therefore since
both `_str_1` and `_str_2` points to the same location in memory, the values
will be cleared twice. This is will cause a Double Free error which corrupts
memory. Memory corruptions can lead to serious security vulnerabilities. To
ensure memory safety, Rust considers `_str_1` invalid once its value has been
"moved" to `_str_2`. Trying to use `_str_1` after it's moved will throw the
following error:

```text
 |
 |     let _str_1 = String::from("Hello");
 |         ------ move occurs because `_str_1` has type `String`, which does not implement the `Copy` trait
 |     let _str_2 = _str_1;
 |                  ------ value moved here
 |
 |     println!("{_str_1}");
 |                ^^^^^^ value borrowed here after move
 |
```

> **TERMINOLOGY**:
> Copying a pointer, length, capacity to a different variable such that now
> both the new variables have access to the location of data in the Heap is
> called a **Shallow copy**. Making such a copy, along with making a copy of
> the data in the Heap is known as a **Deep copy**.

> **NOTE**:
> Since after copying the value from `_str_1` has been copied to `_str_2`, the
> former has been promptly been invalidated, we call this a "Move". The
> automaton responsible for checking our code and ensuring we abide by the
> rules noted in this section is known as the _Borrow Checker_.

Now since the value allocated in the Heap can only be free-ed once `_str_2` moves
out of scope, we are no longer prone to double free errors.

## Clone

Cloning will perform a Deep copy, meaning it will copy the information on the
Stack (such as pointer, length, capacity) as well as the information on the
Heap (the text "Hello").

We can do this using the `clone()` method like shown below:

```rust
fn clone_heap_data()
{
    let _str_1 = String::from("Hello");

    //~~> A copy of Heap data will be made along with Stack data -|
    //                     v--------------------------------------|
    let _str_2 = _str_1.clone();

    println!("_str_1: {}", _str_1);
    println!("_str_2: {}", _str_2);
}
```

> **NOTE**:
> This method can be expensive depending of the amount of data being cloned.

## Stack-Only Copy

In case of values with a fixed size at compile time, they can be stored entirely
on the Stack and thus actual copies of the values can be stored in the Stack.

```rust
fn _simple_values()
{
    //~> Bind the value 5 to the address _x.
    let _x = 5;

    //~> Make a copy of value in _x and bind it to address _y.
    let _y = _x;
}
```

> Rust has a special annotation called the `Copy` trait that we can place on
> types that are stored on the Stack. As a general rule any group of _Scalar_
> values can be `Copy`. Rust will not allow us to place the `Copy` trait on
> types that has the `Drop` trait implemented on them.

# Ownership and Functions

Semantics for passing a value to a function are the same as passing a value to
a variable. Passing a value to a function will move or copy just as assignment
does.

The following example will explore this phenomena:

```rust
fn explore_fn_ownership()
{
    let some_string = String::from("Hello"); //~> `some_string` comes to scope.

    //~~> `some_string` moves into the function, from this point on `some_string`
    //    is invalid in the current scope -|
    //                  v------------------|
    takes_ownership(some_string);

    /*
        If we try to use `some_string` in the current scope, the code will fail to
        compile because it's no longer valid in this scope ...
    */
    // println!("{some_string}");

    let some_int = 10; //~> `some_int` comes to scope.

    //~~> `some_int` moves to function but i32 implements the Copy trait,
    //    this means that a copy of `some_int` is made in the Stack memory -|
    //             v--------------------------------------------------------|
    makes_copy(some_int);

    /*
        When function returns, both `some_string` and `some_int` will go out
        of scope. But remember `some_string` already went out of scope when we
        moved it into the `takes_ownership()` function.
    */
}

fn takes_ownership(some_string: String)
{
    println!("{}", some_string);

    /*
        When this function returns, `some_string` goes out of scope and `drop()`
        is called. `drop()` frees up the memory, on the Heap, occupied by
        `some_string` and then pointer, capacity, length information present
        in the Stack is free-ed as well.
    */
}

fn makes_copy(some_int: i32)
{
    println!("{}", some_int);

    /*
        When function returns, `some_int` goes out of scope and the space it
        allocated on the Stack is free-ed.
    */
}
```

# Return Values and Scope

Similar to functions being able to take ownership of Heap allocated data, we
can also return ownership of Heap allocated data.

This is demonstrated in the following example:

```rust
fn explore_return_ownership()
{
    //~~> Return value of `gives_ownership()` is moved to `some_string` -|
    //           v-------------------------------------------------------|
    let mut some_string = gives_ownership();

    //~~> Value of `some_string` is moved to `take_and_give_ownership()` which
    //    ultimately returns ownership back -|
    //    v------------------------------------v
    //  -----                              ---------
    some_string = take_and_give_ownership(some_string);

    /*
        We can use `some_string` since it's valid in the current scope since
        ownership has been returned back after being moved.
    */
    println!("{}", some_string);
}

fn gives_ownership() -> String
{
    let some_string = String::from("Howdy whats upp?");
    some_string //~> Value of `some_string` is moved, on return, to invoker.
}

fn take_and_give_ownership(some_string: String) -> String
{
    some_string //~> Value of `some_string` is moved, on return, to invoker.
}
```

# References and Borrowing

If we want to apply a function `unergonomic_compute_len()` to a variable `some_string` and
then use `some_string` for some other operations. We'd have to have
`unergonomic_compute_len()` return the value given to it along with whatever that function
itself wants to return. We'd also have to bind the returned values to separate
variables.

This will make such patterns very unergonomic, like the example below:

```rust
fn unergonomic_func()
{
    let some_string = String::from("Hello World");

    //~~> Pass `some_string` to `unergonomic_compute_len()` and it returns a tuple containing
    //    length and the value of `some_string` that we initially passed it.
    let (len, some_string) = unergonomic_compute_len(some_string);

    //~~> We want to use `some_string` in this scope again -|
    //                                  v-------------------|
    println!("'{}' has length {}", some_string, len);
}

fn unergonomic_compute_len(some_string: String) -> (usize, String)
{
    /*
        NOTE:
        We cannot run the following code since this means ownership of `some_string`
        has been moved to invoker before we compute its length.
    */
    // return (some_string, some_string.len());

    return (some_string.len(), some_string);
}
```

The way we handle this problem in Rust is by a process called _Borrowing_. To
let a function borrow a value from our current scope we send a reference to our
value as an argument.

Let's revisit the structure of our Heap allocated data:

```text
Rust code:
let some_string: String = String::from("Hello");

Memory:

                         |--------
    STACK (some_string)  |    HEAP (some_string)
    pointer ------------>|    0 -> 'H'
    capacity -> 5        |    1 -> 'e'
    length   -> 5        |    2 -> 'l'
                         |    3 -> 'l'
                         |    4 -> 'o'
                         |--------
```

The data bound to `some_string` is just the pointer to some data located in the
Heap. Now when we bind a reference to `some_string` to a variable, we are
essentially creating a variable that contains a pointer to `some_string`:

```text
Rust code:
let some_string: String = String::from("Hello");
let ref_var: &String = &some_string;

Memory:

                     |--------                |--------
 STACK (ref_var)     |   STACK (some_string)  |    HEAP (some_string)
 pointer ----------->|   pointer ------------>|    0 -> 'H'
                     |   capacity -> 5        |    1 -> 'e'
                     |   length   -> 5        |    2 -> 'l'
                     |                        |    3 -> 'l'
                     |                        |    4 -> 'o'
                     |--------                |--------
```

When we pass a variable's reference to a different scope, we are letting that
scope borrow the value of our variable. This means they can "refer" to the
value and use it without taking ownership of it. So when the scope in question
ends, the value still exists since the owner of the value never existed in said
scope.

> **NOTE**:
> The opposite of _referencing_ by using the `&` operator is called _dereferencing_
> and can be accomplished using the dereferencing operation, `*`.

Now that we're armed with the new referencing operator, we will be trying to
create a new `ergonomic_fun()` function to compute the length of a `String`:

```rust
fn ergonomic_func()
{
    let some_string = String::from("Hello World");

    //~~> We let `ergonomic_compute_len()` borrow the value owned by `some_string`
    //    by passing a reference to `some_string` useing the `&` referencing
    //    operator |
    //             |----------------v
    let len = ergonomic_compute_len(&some_string);

    //~~> As we can see we can reuse the value from `some_string` while in this
    //    scope without it being returned by the `ergonomic_compute_len()`
    //    function -|
    //              |-------------------v
    println!("'{}' has length {}", some_string, len);
}

fn ergonomic_compute_len(ref_var: &String) -> usize
{
    /*
        We can use the value taken in as we see fit. As long as the owner of the
        value doesn't get dropped.
    */

    ref_var.len()
}
    /*
        When this function returns, `ref_var` will go out of scope but since the
        value in the Heap is not owned by `ref_var` nothing will happen.
    */
```

## Mutable References

However, we cannot mutate a borrowed value. In order to mutate a borrowed
value, we need to pass a _mutable reference_. Look at the example below:

```rust
fn send_mutable_ref()
{
    let mut some_string = String::from("Hello World"); //~> Lets create a mutable variable.

    //~~> Let `use_mutable_red()` borrow a mutable reference to `some_string` -|
    //                               v-----------------------------------------|
    let new_string = use_mutable_ref(&mut some_string);
    println!("{}", new_string);
}

//~~> Please the type of the mutable reference -|
//                               v--------------|
//                          -----------
fn use_mutable_ref(ref_var: &mut String) -> &mut String
{
    ref_var.push('!');
    ref_var
}
```

Mutable references have two restriction:

1.  You can only have 1 mutable reference to a particular piece of data in a
    particular scope. This limitation has been put in place to identify _data
    races_ at compile time.

2.  You cannot borrow a value as mutable if it has already been borrowed as
    immutable, and vice-versa.

We can, however, use curly braces to create new scopes which will allow for
multiple mutable references (just not simultaneous ones):

```rust
fn multiple_mutable_ref()
{
    let mut some_string = String::from("Hello");

    {
        let ref_1 = &mut some_string;
        ref_1.push_str(" World");
        println!("{}", ref_1);

        /*
            When this scope ends, `ref_1` is dropped. We can create a new mutable
            reference to `some_string` after `ref_1` is dropped.
        */
    }

    let ref_2 = &mut some_string; //~> We can create and use a new mutable reference.
    ref_2.push_str("!");
    println!("{}", ref_2);
}
```

## Dangling References

A _dangling pointer_ is a pointer that references a location in memory that has
been given to someone else. These are often created when we free memory but
preserve the pointer to aforementioned free-ed memory. This is a common cause
of a lot of errors. In Rust, the compiler ensures that data does not go out of
scope before any reference to the data does.

Let's look at the example below where we try to create a dangling reference:

```rust
/*
    The following function will fail to compile since it returns a reference to a
    value it owns. This means that when the function goes out of scope and deallocated
    its owned values, the reference would still dangle since it is being returned.

    Well the compiler will refuse to compile this code.
*/
fn dangling_ref() -> &String
{
    let some_string = String::from("Hello World");
    &some_string
}
```

If the above function is invoked, then the invoker will have access to the
reference to a value that, by then, has already gone out of scope and thus
deallocated. This would result in a dangling reference as explained earlier.
The Rust compiler will not compile this code.

The solution to this problem is to simply move the value by returning it. This
will pass ownership of the Heap allocated data:

```rust
fn no_dangling_ref() -> String
{
    let some_string = String::from("Hello World");
    some_string
}
```

## Slices

Rust provides us with tools to allow us to borrow a portion of a string or
collection. We can do this by creating a reference to its range and passing it
as required. This reference to a portion of a collection is known as a _Slice_.
The previously stated rules of the Borrow Checker must be satisfied.

The example below explores the syntax for slices:

```rust
fn slices()
{
    let some_string = String::from("Hello World");

    /*
        We can create a reference to a portion of a collection by using Rust's range
        syntax.
    */

    //~~> Here `slice_1` contains a reference to the 0th position of `some_string`,
    //    inclusive, to the 5th position, exclusive -|
    //                          v--------------------|
    let slice_1 = &some_string[0..5];

    //~~> Here `slice_1` contains a reference to the 6th position of `some_string`,
    //    inclusive, to the 11th position, exclusive -|
    //                          v---------------------|
    let slice_2 = &some_string[6..11];

    /*
        The notation, `&some_string[6..11]` is synonymous to:

            &some_string[6..some_string.len()]

        To denote the 0th and final position we can also use the following notation:

            let slice_1 = &some_string[..5];
            let slice_2 = &some_string[6..];
    */

    println!("slice_1: {}", slice_1);
    println!("slice_2: {}", slice_2);
}
```

> If you check the type of a slice of a Heap allocated `String` and the type of
> a regular string literal such as `let str_lit = "Hello"`, you'll find that
> both the slice and the string literal have type `&str`. This means that string
> literals are slices.
