/*
package main

import (
	"sync"
	"time"
)

func main() {
    var wg sync.WaitGroup
    wg.Add(1)

    go func() {
        time.Sleep(time.Second)
        wg.Done() // once wg.Done() is called wg.Wait() still has to do some processing
        wg.Add(1) // since wg.Wait() still hasn't returned yet, we can't call wg.Add() here
    }()

    wg.Wait()
}
*/

package main

import (
	// "fmt"
	"sync"
)

func main() {
	var wg sync.WaitGroup
	for i := 0; i < 100; i++ {
		go func() {
			wg.Add(3)
			go func() {
				wg.Done()
			}()
			go func() {
				wg.Done()
			}()
			go func() {
				wg.Done()
			}()
			wg.Wait() // the next iteration will execute another goroutine and call wg.Add() before wg.Wait() returns
		}()
	}
}
