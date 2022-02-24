package main

import "fmt"

func sliceLiteral() {
	q := []int{2, 3, 5, 7, 11, 13}
	fmt.Println("q ~~> ", q)

	r := []bool{true, false, true, true, false, true}
	fmt.Println("r ~~> ", r)

	s := []struct {
		i int
		b bool
	}{
		{2, true},
		{3, false},
		{5, true},
		{7, true},
		{11, false},
		{13, true},
	}
	fmt.Println("s ~~> ", s)
}

func printNilSlice() {
	var s []int
	fmt.Println(s, len(s), cap(s))
	if s == nil {
		fmt.Println("nil")
	}
}

func printSlice(s []int) {
	fmt.Printf("len = %d cap = %d %v\n", len(s), cap(s), s)
}

func main() {
	primes := [66]int{2, 3, 5, 7, 11, 13}

	var s []int = primes[1:4]
	fmt.Println(s)

	names := [4]string{
		"Jon",
		"Drogon",
		"Gren",
		"Rayder",
	}
	fmt.Println("names ~~> ", names)

	a := names[0:2]
	b := names[1:3]
	fmt.Println("a, b ~~> ", a, b)

	b[0] = "!!!"
	fmt.Println("a, b ~~> ", a, b)
	fmt.Println("names ~~> ", names)

	sliceLiteral()

	S := []int{2, 3, 5, 7, 11, 13}
	fmt.Println("S ~~> ", S)
	printSlice(S)

	// Slice the slice to give it zero length
	S = S[:0]
	fmt.Println("S ~~> ", S)
	printSlice(S)

	// Extend its length
	S = S[:4]
	fmt.Println("S ~~> ", S)
	printSlice(S)

	// Drop its first two values
	S = S[2:]
	fmt.Println("S ~~> ", S)
	printSlice(S)

	printNilSlice()
}
