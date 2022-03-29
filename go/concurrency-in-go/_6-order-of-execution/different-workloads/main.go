package main

import (
	"fmt"
	"log"
	"net/http"
	"sync"
	"time"
)

func main() {
	var wg sync.WaitGroup
	wg.Add(5)

	go task_1(&wg)
	go task_2(&wg)
	go task_3(&wg)
	go task_4(&wg)
	go task_5(&wg)

	wg.Wait()
}

func task_1(wg *sync.WaitGroup) {
	defer wg.Done()
	/* Assume this task is an http request */
	_, err := http.Get("http://localhost:8081")
	if err != nil {
		log.Fatalf("Http request failed with error: %v", err)
	}

	fmt.Println("DONE: task_1()")
}

func task_2(wg *sync.WaitGroup) {
	defer wg.Done()
	/* Assume this task does some IO intensive calculation */
	var count int
	for i := 0; i < 1_000_000_000; i++ {
		count += i
		// %% Print i and count
        /* NOTE: Output to stdout is a very expensive instruction */
		fmt.Println("i ~~> ", i)
		fmt.Println("count ~~> ", count)
		// %% End

	}
	fmt.Println("DONE: task_2()")
}

func task_3(wg *sync.WaitGroup) {
	defer wg.Done()
	fmt.Println("DONE: task_3()")
}

func task_4(wg *sync.WaitGroup) {
	defer wg.Done()
	time.Sleep(500 * time.Millisecond)
	fmt.Println("DONE: task_4()")
}

func task_5(wg *sync.WaitGroup) {
	defer wg.Done()
	fmt.Println("DONE: task_5()")
}
