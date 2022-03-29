package main

import (
	"fmt"
	"time"
)

func main() {
	for i := 0; i < 10; i++ {
		go work(i + 1)
	}

	// time.Sleep(time.Second)
	time.Sleep(100 * time.Millisecond)
	fmt.Println("Execution of main is done!")
}

func work(id int) {
	time.Sleep(100 * time.Millisecond)
	fmt.Println("Task", id, "is done!")
}
