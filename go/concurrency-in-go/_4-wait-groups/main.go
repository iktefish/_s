package main

import (
	"fmt"
	"sync"
	"time"
)

func main() {
	now := time.Now()
	var WaitGroup sync.WaitGroup
	WaitGroup.Add(10)

	for i := 0; i < 10; i++ {
        go work(&WaitGroup, i+1) // NOTE: WaitGroup passed as a pointer
	}

	WaitGroup.Wait()
	fmt.Println("Time elapsed: ", time.Since(now))
	fmt.Println("Execution of main is done!")
}

func work(WaitGroup *sync.WaitGroup, id int) { // NOTE: WaitGroup passed as a pointer
	defer WaitGroup.Done()

	time.Sleep(100 * time.Millisecond)
	fmt.Println("Task", id, "is done!")
}
