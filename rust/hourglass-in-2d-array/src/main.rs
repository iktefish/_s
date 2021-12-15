//           1 1 1 0 0 0
//
//           1 1 1 0 0 0
//           0 1 0 0 0 0
//           1 1 1 0 0 0
//           0 0 0 0 0 0
//           0 0 0 0 0 0
//           0 0 0 0 0 0
//
//           a b c
//             d
//           e f g
//
// PSEUDOCODE
// movPt is such that position [movPt][0] is start of sPt
// sPt is an index which denotes current start of hourglass
// sPt + 2 => end of hourglass first row
// To get middle point:::check arr[movPt+1][sPt+1]
// To get to last row:::check arr[movPt+2][sPt]
// mutate sPt to sPt+1
// repeat until sPt == 3
// reset sPt to 0
// mutate movPt to movPt+1
// repeat until movPt == 3
//
// CODE
fn main() {
    let vec_in: Vec<Vec<i32>> = vec![
        vec![-9, -9, -9, 1, 1, 1],
        vec![0, -9, 0, 4, 3, 2],
        vec![-9, -9, -9, 1, 2, 3],
        vec![0, 0, 8, 6, 6, 0],
        vec![0, 0, 0, -2, 0, 0],
        vec![0, 0, 1, 2, 4, 0],
    ];
    let mut mov_pt: usize = 0;
    let mut s_pt: usize = 0;
    let mut hg_sum_vec: Vec<i32> = vec![];
    let something = loop {
        // let mut hg_sum_vec: Vec<i32> = vec![1,2];
        let hourglass_sum = take_hourglass(&vec_in, mov_pt, s_pt);
        hg_sum_vec.push(hourglass_sum);
        println!("hg_sum_vec ~~> {:?}", hg_sum_vec);
        if s_pt == 3 {
            mov_pt = mov_pt + 1;
            s_pt = 0;
        } else if mov_pt == 3 {
            break hg_sum_vec;
        }
        s_pt = s_pt + 1;
    };
    println!("something ~~> {:?}", something);
}

fn take_hourglass(vecIn: &Vec<Vec<i32>>, movPt: usize, sPt: usize) -> (i32) {
    let mut hourglass_sum: i32 = 0;
    hourglass_sum = hourglass_sum + vecIn[movPt][sPt];
    hourglass_sum = hourglass_sum + vecIn[movPt][sPt + 1];
    hourglass_sum = hourglass_sum + vecIn[movPt][sPt + 2];
    hourglass_sum = hourglass_sum + vecIn[movPt + 1][sPt + 1];
    hourglass_sum = hourglass_sum + vecIn[movPt + 2][sPt];
    hourglass_sum = hourglass_sum + vecIn[movPt + 2][sPt + 1];
    hourglass_sum = hourglass_sum + vecIn[movPt + 2][sPt + 2];
    println!("hourglass_sum ~~> {}", hourglass_sum);
    return hourglass_sum;
}
