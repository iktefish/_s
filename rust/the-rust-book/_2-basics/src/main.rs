fn main()
{
    shadowing();
    println!("{}", data_types());
    repititon()
}

fn shadowing()
{
    let x = 5; //~> Immutable variable declared.
    println!("The value of x is: {}", x);

    //~~> Original value of x is being shadowed by new x due to use of the `let` keyword -|
    //  v---------------------------------------------------------------------------------|
    let x = 9;
    println!("The value of x is: {}", x);

    // x = 10; //~> This will not compile since x can't be mutated.
}

fn data_types() -> u32
{
    //~~> We need to annotate the type of this variable, since it could be i32 or u32 ... -|
    //          v--------------------------------------------------------------------------|
    let guess: u32 = "100".parse().expect("Not a number");
    return guess;
}

/* --- SCALAR TYPES --- */

/*
     NOTE:

    A Scalar Type represents a single value. Rust has the following 4 scalar types:

    - Integers
    - Floating point numbers
    - Booleans
    - Characters
*/

/*
    INTEGER TYPES:

    There are 2 categories of integers - Signed and Unsigned.

    Signed integers can store numbers from -2^(n-1) to 2^(n-1)-1, where n is the number
    of bits used in the variant.

    Unsigned integers can store numberf from 0 to 2^n-1.
*/
fn _integer_types()
{
    let _i_8: i8 = 10;
    let _i_16: i16 = 10;
    let _i_32: i32 = 10;
    let _i_64: i64 = 10;
    let _i_128: i128 = 10;

    let _u_8: u8 = 10;
    let _u_16: u16 = 10;
    let _u_32: u32 = 10;
    let _u_64: u64 = 10;
    let _u_128: u128 = 10;
}

/*
    FOLATING POINT TYPES:

    There are 2 primitive types for Floats.
    Floating point numbers are represented according to IEEE-754 standards.
*/
fn _float_types()
{
    let _f_32: f32 = 10.0;
    let _f_64: f64 = 10.0;
}

/*
    CHAR TYPE:

    The character type if Rust is 4 bytes in size.
*/
fn _char_type()
{
    let _a: char = 'a';

    let _upper_gamma: char = 'Γ';
    let _lower_gamma: char = 'γ';
}

/* --- COMPOUND TYPES --- */

/*
    COMPOUND TYPES:

    These types can hold multiple values into a single type. Rust has 2 primitive Compound types:

    - Tuple
    - Array
*/

/*
    A Tuple can hold multiple (heterogeneous) types.
*/
fn _tuple_type()
{
    let tup: (u16, i32, f64) = (100, 100, 100.0);

    //~~> We can destructure a tuple and bind each value to corresponding variables -|
    //      v------------------------------------------------------------------------|
    //  ---------
    let (_a, _b, _c) = tup;
}

/*
    Arrays are useful when we want Stack allocated data rather than Heap allocated data or when
    we want to ensure a fixed number of elements.
*/
fn _array_type()
{
    let _months = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
    ];

    //~~> Declare an array with total of 5 elements -|
    //           v-----------------------------------|
    //       ---------
    let _arr: [i32; 5] = [1, 2, 3, 4, 5];

    //~~> The following array will have 5 elements and all values will be 3 -|
    //           v-----------------------------------------------------------|
    //       ---------
    let _arr = [3; 5];
}

/* --- REPITITION --- */

fn repititon()
{
    let mut x = 0;

    //~~> This is an infinite loop -|
    // v----------------------------|
    loop {
        x += 1;
        println!("Current value of x: {}", x);
        if x == 10 {
            break;
        }
    }

    //~~> Bind output of value returned from loop to variable -|
    //    v----------------------------------------------------|
    let output = loop {
        x += 10;
        if x == 100 {
            break x; //~> Return a value from the loop.
        }
    };

    println!("Value of output: {}", output);

    //~~> We can create a conditional loop with the `while` keyword -|
    //      v--------------------------------------------------------|
    // ------------
    while x < 100 {
        x += 10;
    }

    println!("Value of x: {}", x);

    let my_array = [10, 20, 30, 40, 50];
    //~~> For loop to iterate over elements of an array -|
    //      v--------------------------------------------|
    for element in my_array.iter() {
        println!("{}", element);
    }

    //~~> We can express a range to specify number of time the loop will run -|
    //             v----------------------------------------------------------|
    //            ----
    for number in 1..5 {
        //        ----
        //         ^----------------------------------------------|
        //~> NOTE: This means from 1, inclusive, to 5, exclusive -|
        println!("{}", number);
    }
}
