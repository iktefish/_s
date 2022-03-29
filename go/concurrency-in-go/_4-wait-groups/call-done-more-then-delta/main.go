package main

import "sync"

func main() {
	var WaitGroup sync.WaitGroup
    // NOTE: No delta has been set in WaitGroup.Add()

	WaitGroup.Done() // this will result in WaitGroup counter to be negetive
}
