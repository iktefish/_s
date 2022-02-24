package main

import "fmt"

func printSlice(s []int) {
	fmt.Printf("len=%d cap=%d %v\n", len(s), cap(s), s)
}

func main() {
	var s []int
	printSlice(s)

	// Append on nil slice above
	s = append(s, 0)
	printSlice(s)

	// Allocation of larger array
	s = append(s, 10)
	printSlice(s)

	// Adding multiple arrays at a time
	s = append(s, 2, 35, 7, 11, 13)
    printSlice(s)
}

