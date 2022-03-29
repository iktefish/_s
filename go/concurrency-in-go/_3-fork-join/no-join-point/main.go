package main

import (
	"fmt"
	"time"
)

func main() {
	go work() // fork point

	// NOTE we created a fork point in the above line ...
	// so we have to create a join point before main() ends

	time.Sleep(100 * time.Millisecond)
	// join point should be here

	fmt.Println("Done waiting, main() exists")
}

func work() {
	time.Sleep(500 * time.Millisecond)
	fmt.Println("Somebody find me pls!!!")
}
