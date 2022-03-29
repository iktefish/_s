package main

import (
	"fmt"
	"time"
)

func main() {
    now := time.Now()
    task_1()
    task_2()
    task_3()
    task_4()
    fmt.Println("Time elapsed: ", time.Since(now))
}

func task_1()  {
    time.Sleep(100*time.Millisecond)
    fmt.Println("task_1")
}

func task_2()  {
    time.Sleep(200*time.Millisecond)
    fmt.Println("task_2")
}

func task_3()  {
    fmt.Println("task_3")
}

func task_4()  {
    time.Sleep(250*time.Millisecond)
    fmt.Println("task_4")
}

