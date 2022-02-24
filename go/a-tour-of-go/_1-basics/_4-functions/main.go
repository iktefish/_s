package main

import "fmt"

func add(x int, y int) int { // function that takes two ints and returns an int
	return x + y
}

func addAndSum(x, y int) (int, int, int) { // function that takes two ints and returns 3 ints
	var z = x + y
	return x, y, z
}

func split(sum int) (x, y int) {
	x = sum * 4 / 16
	y = sum - 32
	return
}

func main() {
	fmt.Println(add(10, 50))
	fmt.Println(addAndSum(10, 50))
	fmt.Println(split(8))
}
