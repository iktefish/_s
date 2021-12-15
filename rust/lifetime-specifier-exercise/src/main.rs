fn demo4() {
    let s = "Elijah Wood";
    let sep = " ";
    // let firstname = str_split(&s, &String::from(" "));
    let firstname = str_split(&s, &sep);
    println!("First name of actor: {}", firstname);
}
// can handle both &str and &String
fn str_split<'a>(s: &'a str, sep: &'a str) -> &'a str {
    let bytes = s.as_bytes();
    let b_sep = sep.as_bytes();
    for (i, &item) in bytes.iter().enumerate() {
        if &[item] == b_sep {
            return &s[0..i];
        }
    }
    &s[..]
}

fn main() {
    demo4();
}
