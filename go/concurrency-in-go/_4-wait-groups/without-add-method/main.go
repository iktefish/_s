package main

import (
	"fmt"
	"sync"
	"time"
)

func main() {
	var WaitGroup sync.WaitGroup
	// NOTE: Not calling WaitGroup.Add() will cause this function to finish immediately ...
    // without waiting for the goroutine to finish

	go func() {
		defer WaitGroup.Done()
		time.Sleep(300 * time.Millisecond)
		fmt.Println("Execution of goroutine completed!")
	}()

	WaitGroup.Wait()
	fmt.Println("Execution of main completed!")
}
