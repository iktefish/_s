package main

import (
	"fmt"
	"runtime"
	"time"
)

func greet()  {
    t := time.Now()
    switch  {
    case t.Hour() < 12:
        fmt.Println("Guten Morgen!")
    case t.Hour() < 17:
        fmt.Println("Guten Tag!")
    default:
        fmt.Println("Guten Abend!")
    }
}

func whenTuesday()  {
    fmt.Println("When is Tuesday?")
    today := time.Now().Weekday()

    // fmt.Println("today ~~> ",today)

    switch time.Tuesday {
    case today + 0:
        fmt.Println("Today!")
    case today + 1:
        fmt.Println("Tomorrow")
    case today + 2:
        fmt.Println("The day after tomorrow!")
    default:
        fmt.Println("Not today, thats for sure!")
    }
}

func main() {
	fmt.Println("Running on")
	switch os := runtime.GOOS; os {
	case "linux":
		fmt.Println("\tGNU/Linux!")
	case "darwin":
		fmt.Println("\tMac OS X - Darwin")
	default:
		fmt.Println("\t", os)
	}

    whenTuesday()
    greet()
}
