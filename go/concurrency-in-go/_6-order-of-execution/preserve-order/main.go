package main

import (
	"fmt"
	"sync"
	"time"
)

func main() {
	var wg sync.WaitGroup
	wg.Add(1)
	go task_1(&wg)
	wg.Wait()

	wg.Add(2)
	go task_2(&wg)
	go task_3(&wg)
	wg.Wait()

	wg.Add(1)
	go task_4(&wg)
	wg.Wait()

	wg.Add(1)
	go task_5(&wg)
	wg.Wait()

}

func task_1(wg *sync.WaitGroup) {
	defer wg.Done()
	time.Sleep(100 * time.Millisecond)
	fmt.Println("Finish execution of task_1()")
}

func task_2(wg *sync.WaitGroup) {
	defer wg.Done()
	time.Sleep(100 * time.Millisecond)
	fmt.Println("Finish execution of task_2()")
}

func task_3(wg *sync.WaitGroup) {
	defer wg.Done()
	time.Sleep(100 * time.Millisecond)
	fmt.Println("Finish execution of task_3()")
}

func task_4(wg *sync.WaitGroup) {
	defer wg.Done()
	time.Sleep(100 * time.Millisecond)
	fmt.Println("Finish execution of task_4()")
}

func task_5(wg *sync.WaitGroup) {
	defer wg.Done()
	time.Sleep(100 * time.Millisecond)
	fmt.Println("Finish execution of task_5()")
}
