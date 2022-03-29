package main

import (
	"fmt"
	"time"
)

func main() {
	now := time.Now()
	done := make(chan struct{})

	go func() {
		task_1()
		done <- struct{}{}
	}()

	go func() {
		task_2()
		done <- struct{}{}
	}()

	go func() {
		task_3()
		done <- struct{}{}
	}()

	go func() {
		task_4()
		done <- struct{}{}
	}()

	<-done
	<-done
	<-done
	<-done

	fmt.Println("Time elapsed: ", time.Since(now))
}

func task_1() {
	time.Sleep(100 * time.Millisecond)
	fmt.Println("task_1")
}

func task_2() {
	time.Sleep(200 * time.Millisecond)
	fmt.Println("task_2")
}

func task_3() {
	fmt.Println("task_3")
}

func task_4() {
	time.Sleep(250 * time.Millisecond)
	fmt.Println("task_4")
}
