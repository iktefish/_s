/*
    OWNERSHIP:

    Note the following rules:
    -   Each value in Rust has a variable that's called its owner.
    -   There can only be one owner at a time.
    -   When owner goes out of scope, the value will be dropped.
*/

fn main()
{
    println!("{}", explore_ownership_rules());
    clone_heap_data();
    explore_fn_ownership();
    explore_return_ownership();
    unergonomic_func();
    ergonomic_func();
    send_mutable_ref();
    multiple_mutable_ref();
    no_dangling_ref();
    slices();
}

fn _scope()
{
    {
        /*
            ... _foo is not valid here, since it hasn't been declared yet.
        */

        let _foo = "bar"; //~> _foo is valid from this point onward.

        /*
            Do some stuff with _foo here ...
        */

        //~> Once the scope is over, _foo will no longer be valid.
    }
}

fn explore_ownership_rules() -> String
{
    //~~> String literals are stored in Stack memory and  as such must be known in compile
    //    time. The `String` type is Heap allocated and can be expanded and contracted
    //    at runtime. -|
    //                 |
    //         v-----------------------v
    //       Type                   Literal
    let mut s: String = String::from("Hello");

    /*
        NOTE:
        String literals `str` cannot be mutated, but `String` can.
    */

    //~> `push_str` appends to the end of the string -|
    //     v------------------------------------------|
    s.push_str(", World");
    s
}

fn _simple_values()
{
    //~> Bind the value 5 to the address _x.
    let _x = 5;

    //~> Make a copy of value in _x and bind it to address _y.
    let _y = _x;
}

fn _heap_data_behaviour()
{
    /*
        Though this code looks similar to the once from function
        _simple_value(), they donot share the same behaviour.
    */

    let _str_1 = String::from("Hello");
    let _str_2 = _str_1;

    /*
        The following code will fail compilation because we are
        trying to use value after it has been moved.
    */
    // println!("{}", _str_1);
}

fn clone_heap_data()
{
    let _str_1 = String::from("Hello");

    //~~> A copy of Heap data will be made along with Stack data -|
    //                     v--------------------------------------|
    let _str_2 = _str_1.clone();

    println!("_str_1: {}", _str_1);
    println!("_str_2: {}", _str_2);
}

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
    // println!("{}", some_string);

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

    /*
        When this function returns, `ref_var` will go out of scope but since the
        value in the Heap is not owned by `ref_var` nothing will happen.
    */
}

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

/*
    The following function will fail to compile since it returns a reference to a
    value it owns. This means that when the function goes out of scope and deallocated
    its owned values, the reference would still dangle since it is being returned.

    Well the compiler will refuse to compile this code.
*/
// fn dangling_ref() -> &String
// {
//     let some_string = String::from("Hello World");
//     &some_string
// }

fn no_dangling_ref() -> String
{
    let some_string = String::from("Hello World");
    some_string
}

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
