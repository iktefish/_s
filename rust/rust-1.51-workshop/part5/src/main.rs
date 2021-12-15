fn main() {
    let numbers = vec![2, 4, 6, 8, 10, 12, 14, 16, 18, 20, 22, 24];

    let sum_of_nums = sum(numbers);
    // 👉 TODO call product() and put answer here
    // 👉 TODO call average() and put answer here
    let product_of_nums = product(sum_of_nums.1); // DONE
    let average_of_nums = average(product_of_nums.1); // DONE

    // 💡 TIP: You'll get a compile error. Here are two ways you can fix it:
    //
    // Option 1: Pass numbers.clone() some of the time.
    //           (Experiment to see when it's needed!)
    //
    // Option 2: Change some of the functions to return a tuple
    //           of (i64, Vec<i64>), using the `numbers` argument
    //           as the Vec<i64> to return. With this approach,
    //           you won't need to call .clone() at all!
    //
    // Give both options a try!

    println!("Sum of these numbers: {}", sum_of_nums.0);
    println!("Product of these numbers: {}", product_of_nums.0);
    println!("Average of these numbers: {}", average_of_nums);
}

fn sum(numbers: Vec<i64>) -> (i64, Vec<i64>) {
    let mut total = 0;

    for num in numbers.iter() {
        total += num;
    }

    return (total, numbers);
}

fn product(numbers: Vec<i64>) -> (i64, Vec<i64>) {
    let mut total = 1;

    for num in numbers.iter() {
        total *= num;
    }

    return (total, numbers);
}

fn average(numbers: Vec<i64>) -> i64 {
    let length = numbers.len() as i64;

    return length;

    // sum(numbers) / length
}
