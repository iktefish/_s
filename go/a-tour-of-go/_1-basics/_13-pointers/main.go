package main

import "fmt"

func main() {
	i, j := 45, 13
    fmt.Printf("Initial: i ~~> %v | j ~~> %v\n", i, j) // echo initial value of i and j

	p := &i // point to i
	fmt.Printf("&i ~~> %p\n", &i) // memory address of i
	fmt.Println(*p) // read i through pointer
	*p = 999 // alter i through pointer
    fmt.Println("Changed: i ~~> ", i) // echo value of i

	p = &j // point to j
	fmt.Printf("&j ~~> %p\n", &j) // memory address of j
	*p = *p - 3 // alter j through pointer
    fmt.Println("Changed: j ~~> ", j) // echo value of j
}
