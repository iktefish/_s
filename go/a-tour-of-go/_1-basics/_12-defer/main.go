package main

import "fmt"

func main() {
	// defer fmt.Println("World!")
	// fmt.Println("Hello")

	fmt.Println("Counting")
	for i := 0; i < 10; i++ {
        // fmt.Println(i)
		defer fmt.Println(i)
	}
	fmt.Println("DONE!")
}
