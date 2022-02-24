package main

import (
	"fmt"
	"math"
)

func sqrt(x float64) string {
	if x < 0 {
		return sqrt(-x) + "i"
	}
	return fmt.Sprint(math.Sqrt(x))
}

func power(x, n, lim float64) float64 {
	// if v := math.Pow(x, n); v < lim {
	// 	return v
	// }

	// Lets call variable v from else block
	if v := math.Pow(x, n); v < lim {
		return v
	} else {
		fmt.Printf("%g >= %g\n", v, lim) // v does exist in this scope
	}

	// return v // v doesn't exist in this scope
	return lim
}

func main() {
	fmt.Println("sqrt(2) ~~> ", sqrt(2))
	fmt.Println("sqrt(-4) ~~> ", sqrt(-4))

	fmt.Println("power(2, 8, 4) ~~> ", power(2, 8, 4))
	fmt.Println("power(2, 8, 8192) ~~> ", power(2, 8, 8192))
}
