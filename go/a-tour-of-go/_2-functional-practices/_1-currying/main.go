package main

import "fmt"

func add(x int) func(y int) int {
	return func(y int) int {
		fmt.Println("x ~~>", x)
		fmt.Println("y ~~>", y)
		return x + y
	}
}

func main() {
	add10 := add(10)
	add20 := add(20)

	fmt.Println(add10(1))
	fmt.Println(add20(5))
}
