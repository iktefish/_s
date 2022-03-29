package main

import (
	"fmt"
	"time"
)

func main() {
	now := time.Now()
	done := make(chan struct{})

	go func() { // fork point
		work()
		done <- struct{}{}
	}()

	// NOTE we created a fork point in the above line ...
	// so we have to create a join point before main() ends

	// time.Sleep(100 * time.Millisecond) // not necessary anymore because of <-done
	<-done // join point

	fmt.Println("Time elapsed: ", time.Since(now))
	fmt.Println("Done waiting, main() exists")
}

func work() {
	time.Sleep(500 * time.Millisecond)
	fmt.Println("Somebody find me pls!!!")
}
