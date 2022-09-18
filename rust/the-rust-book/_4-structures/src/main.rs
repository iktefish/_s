/*
    STRUCTURED DATA:

    To take advantage of Rust's compile time, static, type checking we create
    our own structures and types. This is done using `structs` and `enums`.
*/

fn main()
{
    let user_instance = constructing_struct();

    user_instance.user_login_method();

    using_struct_fields(user_instance);

    let email = String::from("coffeeborn@tea.garden");
    let username = String::from("Coffeeborn");
    let user_instance_another = field_init_shorthand(email, username);
    using_struct_fields(user_instance_another);

    let user_instance = constructing_struct();
    let new_user_instance = instance_from_another_instance(user_instance);
    using_struct_fields(new_user_instance);

    let _another_user_instance = User::construct("New User", "new_user@nmail.new", 0, false);

    calc_area();
}

//~> Struct definition.
struct User
{
    username: String,
    email: String,
    sign_in_count: u64,
    active: bool,
}

//~> Methods for User struct.
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

    //~~> Every method will take an self as an argument. Since we don't want
    //    to deallocate the struct after function returns, we borrow self -|
    //                    v------------------------------------------------|
    fn user_login_method(&self)
    {
        println!("Username: {}", self.username);
        println!("Email: {}", self.email);
    }
}

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

fn field_init_shorthand(email: String, username: String) -> User
{
    /*
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

fn using_struct_fields(user_instance: User)
{
    println!("username: {}", user_instance.username);
    println!("email: {}", user_instance.email);
    println!("sign_in_count: {}", user_instance.sign_in_count);
    println!("active: {}", user_instance.active);
}

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

fn _tuple_structs()
{
    struct Color(i32, i32, i32);
    struct Point(i32, i32, i32);

    let _black = Color(0, 0, 0);
    let _origin = Point(0, 0, 0);
}

/* --- Example from book --- */

//~~> Declaring a Rectangle type by creating a data structure containing
//    both width and height. Deriving the `Debug` trait -|
//         v---------------------------------------------|
#[derive(Debug)]
struct Rectangle
{
    width: u32,
    height: u32,
}

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
    //~> Creating 2 variables to count as dimensions of a rectangle.
    let width = 30;
    let height = 50;

    //~> Creating a tuple to hold dimensions of a rectangle.
    let rect = (30, 50);

    //~> Creating an instance of the Rectangle type, which holds both
    //   dimensions.
    let rectangle = Rectangle {
        width: 30,
        height: 50,
    };

    println!(
        "The are of the rectangle is {:?} square pixels.",
        area_with_vars(width, height)
    );

    println!(
        "The are of the rectangle is {:?} square pixels.",
        area_with_tuple(rect)
    );

    println!(
        "The are of the rectangle is {:?} square pixels.",
        area_with_struct(&rectangle)
    );

    println!(
        "The are of the rectangle is {:?} square pixels.",
        rectangle.area()
    );

    try_to_print_struct();
}

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

//~~> Computing area with variables -|
//                  v-----------v----|
fn area_with_vars(width: u32, height: u32) -> u32
{
    width * height
}

//~~> Computing area by sending variables as a tuple -|
//                                  v-----------------|
fn area_with_tuple(dimensions: (u32, u32)) -> u32
{
    dimensions.0 * dimensions.1
}

//~~> Computing area by sending an immutable borrow of a structure -|
//                      v-------------------------------------------|
fn area_with_struct(r: &Rectangle) -> u32
{
    r.width * r.height
}
