# Structured Data

To take advantage of Rust's compile time, static, type checking we create
our own structures and types. This is done using `structs` and `enums`.

# Structs

A struct is a custom data type that lets a programmer name and package together
multiple related values that ultimately result in a custom type that is
meaningful to his/her domain.

In order to define a struct we use the `struct` keyword, name the struct and
declare the fields as we would. An example is provided below:

```rust
struct User
{
    username: String,
    email: String,
    sign_in_count: u64,
    active: bool,
}
```

To use a struct after defining it, we have to create an instance of the struct
by specifying the concrete values for each of its fields. This is called
_construction_. Let's construct an instance of our `User` struct:

```rust
fn constructing_struct() -> User
{
    //~> Constructing an instance of a struct and bind it to `user_interface` -|
    //                   v-----------------------------------------------------|
    let user_instance = User {
        email: String::from("coffeeborn@tea.garden"),
        username: String::from("Coffeeborn"),
        sign_in_count: 10,
        active: false,
    };

    user_instance
}
```

When constructing a struct we can use the _field init_ shorthand when fields
have the same name as the variable assigned to them.

```rust
fn field_init_shorthand(email: String, username: String) -> User
{
    /*
        NOTE:
        When we use the `email` and `username` variables, we can skip mentioning
        the respective field names during struct construction. We can do this because
        the variables and the fields that they slot into have the same name.
    */

    let user_instance_another = User {
        email,
        username,
        sign_in_count: 10,
        active: false,
    };

    user_instance_another
}
```

To get the access a field from a struct we use the dot notation as shown below:

```rust
fn using_struct_fields(user_instance: User)
{
    println!("username: {}", user_instance.username);
    println!("email: {}", user_instance.email);
    println!("sign_in_count: {}", user_instance.sign_in_count);
    println!("active: {}", user_instance.active);
}
```

We can create a new instance of a struct from another instance, with same or
different fields from the initial instance by using the _update syntax_, `..`.
Let's create a function that takes an instance of `User` as argument and
returns a new instance with a single field changed:

```rust
fn instance_from_another_instance(user_instance: User) -> User
{
    /*
        We can create a copy of an instance by using the `..` syntax. Below
        we create and return a new instance of `User` struct which will have all the
        fields from the instance taken as argument with only the `active` field being
        changed.
    */

    User {
        active: true,
        ..user_instance //~> We use rest of the fields from the initial instance.
    }

    /*
        NOTE:
        The base struct that we are copying my be placed as the last field. The following
        code will fail to compile.
    */
    // User {
    //     ..user_instance,
    //     active: true,
    // }
}
```

## Mutating Structs

Rust does not allow us to annotate a specific field as mutable. If we want to
mutate any portions of a struct, the entire thing must be annotated as mutable.

## Tuple Structs

Sometimes we want to give our tuple a specific type. We can do this in Rust
using _Tuple structs_. Tuple structs look similar to tuples but have the same
functionality as structs, sans the associated names with their fields.

Look at the example below:

```rust
struct Color(i32, i32, i32);
struct Point(i32, i32, i32);

let _black = Color(0, 0, 0);
let _origin = Point(0, 0, 0);
```

> Remember Rust, in essence doesn't support multiple return values, instead we
> return a tuple that contains multiple items. Sometimes we want these returned
> tuples to be their own type, different from other tuples.

## Unit Structs (fieldless)

We can also define a struct that does not have any fields, these are known as
_Unit structs_. They behave similarly to `()`, also known as the _unit type_ or
_unit tuple_. These are useful when you want to implement a trait on a type
but do not have any data you want to store in the type itself.

> I will look into traits later. For now know this that traits are essentially
> the same as a _Typeclass_ in Haskell.

## Methods

Methods are essentially functions. They have parameters, a return value, and
contain code that can be called from elsewhere. However, unlike functions,
methods are defined within the context of a struct, enum or trait object.
The first parameter to a method if always `self` which accepts the instance of
the structure itself that the method is called on.

Look at the example below to define a method for the `User` struct:

```rust
//~> Methods for User struct.
impl User
{
    //~~> Every method will take an self as an argument. Since we don't want
    //    to deallocate the struct after function returns, we borrow self -|
    //                    v------------------------------------------------|
    fn user_login_method(&self)
    {
        println!("Username: {}", self.username);
        println!("Email: {}", self.email);
    }
}
```

## Associated functions

We are also allowed to define functions in `impl` blocks, not just methods. These
functions will not have `self` parameter. Associated functions are after used for
constructing an instance of a struct.

Let's create a constructor for the `User` struct:

```rust
fn main() {
    let _another_user_instance = User::construct("New User", "new_user@nmail.new", 0, false);
}

impl User
{
    //~> Create an associated function that we can use to create an instance of
    //   User.
    fn construct(username: &str, email: &str, sign_in_count: u64, active: bool) -> User
    {
        User {
            username: String::from(username),
            email: String::from(email),
            sign_in_count,
            active,
        }
    }
}
```

> **NOTE**:
> We can have multiple `impl` blocks for a given structure.

## When to use Structs?

Let's create a program that will calculate the area of a rectangle. We'll start
with variables first, then refactor the program to use structs instead.

```rust
fn calc_area()
{
    //~> Creating 2 variables to count as dimensions of a rectangle.
    let width = 30;
    let height = 50;

    println!(
        "The are of the rectangle is {:?} square pixels.",
        area_with_vars(width, height)
    );
}

//~~> Computing area with variables -|
//                  v-----------v----|
fn area_with_vars(width: u32, height: u32) -> u32
{
    width * height
}
```

The function `area_with_vars` is meant to calculate the area of one
_rectangle_, but takes 2 arguments. The arguments are related because they,
together form a rectangle. However, this is not represented anywhere in the
program. It would be more readable if we group the width and height together.
We can do it using a tuple:

```rust
//~> Entry point to our calculate-rectangle program.
fn calc_area()
{
    //~> Creating a tuple to hold dimensions of a rectangle.
    let rect = (30, 50);

    println!(
        "The are of the rectangle is {:?} square pixels.",
        area_with_tuple(rect)
    );
}

//~~> Computing area by sending variables as a tuple -|
//                                  v-----------------|
fn area_with_tuple(dimensions: (u32, u32)) -> u32
{
    dimensions.0 * dimensions.1
}
```

The above way of computing the area is better since it gives out code a bit
more structure. However, this fashion seems to turn out to be even less clear.
This is mostly because we don't name elements of tuples and have to use index.
Because we just want to compute the area, the order of the arguments don't
matter, but if we were to do something like draw a rectangle on the scree - the
order of the arguments would be very important then. To add more meaning to our
code we use structs:

```rust
//~> Declaring a Rectangle type by creating a data structure containing
//   both width and height.
struct Rectangle
{
    width: u32,
    height: u32,
}

fn calc_area()
{
    //~> Creating an instance of the Rectangle type, which holds both
    //   dimensions.
    let rectangle = Rectangle {
        width: 30,
        height: 50,
    };

    println!(
        "The are of the rectangle is {:?} square pixels.",
        area_with_struct(&rectangle)
    );
}

//~~> Computing area by sending an immutable borrow of a structure -|
//                      v-------------------------------------------|
fn area_with_struct(r: &Rectangle) -> u32
{
    r.width * r.height
}
```

Now the intent of our area function is clear, takes a `&Rectangle` type meaning
an immutable borrow of a `Rectangle` type. The `Rectangle` type contains fields
to denote each dimensions, which are used to calculate the area. Since the
value if borrowed, not moved, the `calc_area` function retains ownership of the
value. The function signature is explicitly clear about what the function does.

We can also implement a method to calculate the area of a rectangle:

```rust
impl Rectangle
{
    //~~> Computing area by using method -|
    //   v--------------------------------|
    fn area(&self) -> u32
    {
        self.width * self.height
    }
}

fn calc_area()
{
    //~> Creating an instance of the Rectangle type, which holds both
    //   dimensions.
    let rectangle = Rectangle {
        width: 30,
        height: 50,
    };

    println!(
        "The are of the rectangle is {:?} square pixels.",
        rectangle.area()
    );
}
```

> Since we are passing a reference to the structure to the method, we should
> have had to dereference the argument before using it. In C or C++
> `self.width * self.height` should have been `(*self).width * (*self.height)`,
> but Rust has automatic referencing and dereferencing.

Let's try to print the instance of `Rectangle` that we just created:

```rust
fn try_to_print_struct()
{
    let rectangle = Rectangle {
        width: 30,
        height: 50,
    };

    //~> Let's try to print our structure for debug purposes.
    println!("rectangle: {}", rectangle);
}
```

We will be met with the following error message:

```text
error[E0277]: `Rectangle` doesn't implement `std::fmt::Display`
   --> src/main.rs:...:...
    |
    |     println!("rectangle: {}", rectangle);
    |                               ^^^^^^^^^ `Rectangle` cannot be formatted with the default formatter
    |
```

Even if we use the _debug formatter_ `{:?}`, we will get the following error:

```text
error[E0277]: `Rectangle` doesn't implement `Debug`
   --> src/main.rs:...:...
    |
    |     println!("rectangle: {:?}", rectangle);
    |                                 ^^^^^^^^^ `Rectangle` cannot be formatted using `{:?}`
    |
```

In order to print our structure we have to have the structure derive the `Debug`
trait:

```rust
//~~> Deriving the `Debug` trait -|
//         v----------------------|
#[derive(Debug)]
struct Rectangle
{
    width: u32,
    height: u32,
}
```

Now we can print using the _debug formatter_. We use `{:?}` to print directly or
use `{:#?}` to pretty print:

```rust
fn try_to_print_struct()
{
    let rectangle = Rectangle {
        width: 30,
        height: 50,
    };

    println!("rectangle: {:?}", rectangle); //~> Print using {:?}, the debug formatter.
    println!("rectangle: {:#?}", rectangle); //~> The {:#?} formatter pretty prints the structure.

    /*
        NOTE:
        The following code will not run despite deriving the debug trait on Rectangle
        because it uses the default formatter.
    */
    // println!("rectangle: {}", rectangle);
}
```

Just as the above example, we can add useful behavior to our custom types using
the `derive` annotation. We will cover other useful traits and also look into
creating out own custom traits later on.
