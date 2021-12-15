// Dynamically create a 2d vector
fn main() {
    let inner_vec: Vec<char> = vec!['*'; 50];
    let count = inner_vec.len();
    let outer_vec: Vec<Vec<char>> = vec![inner_vec; count];

    println!("{:?}", outer_vec);
    println!("Length ~~> {:?}", outer_vec.len());

    for i in outer_vec.iter() {
        for ii in i.iter() {
            print!("{:?}", ii);
        }
        println!();
    }
}
