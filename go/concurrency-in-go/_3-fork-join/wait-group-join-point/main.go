package main

import (
	"fmt"
	"sync"
	"time"
)

func main() {
    now := time.Now()

	var WaitGroup sync.WaitGroup
	WaitGroup.Add(1)

	go func() { // fork point
        defer WaitGroup.Done()
		work()
	}()

	// NOTE we created a fork point in the above line ...
	// so we have to create a join point before main() ends

	// time.Sleep(100 * time.Millisecond) // not necessary anymore because of WaitGroup.Wait()
	WaitGroup.Wait() // join point

    fmt.Println("Time elapsed: ", time.Since(now))
	fmt.Println("Done waiting, main() exists")
}

func work() {
	time.Sleep(500 * time.Millisecond)
	fmt.Println("Somebody find me pls!!!")
}
