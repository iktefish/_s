package main

import "fmt"

func main() {
	sum := 10
	for i := 0; i < 30; i++ {
		sum += i
	}

	// for sum < 400 { // The init and post statements are optional
	// 	sum += sum * 2
	// }

	fmt.Println("sum ~~> ", sum)
}
