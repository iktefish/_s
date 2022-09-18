/// Tutorial on how to format can be found in the
/// [README.md](https://github.com/shiena/ansicolor/blob/master/README.md)
/// for ansicolor
fn main() {
    let output = "Hello World";
    println!("\x1b[93mSTRING\x1b[0m");
    println!("\x1b[93m{}\x1b[0m", output);
    println!("\x1b[47;30m{}\x1b[0m", output);
}
