package main

import "sync"

func main() {
    var WaitGroup sync.WaitGroup
    WaitGroup.Add(1)
    WaitGroup.Wait() // NOTE: We are waiting for 1 operation, which never calls WaitGroup.Done()

    /* This results in a deadlock */
}
