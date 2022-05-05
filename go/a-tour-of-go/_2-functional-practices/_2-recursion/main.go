package main

import "fmt"

// %% Imperative Factorial function
func ImperativeFactorial(fac int) int {
	result := 1
	for ; fac > 0; fac-- {
		fmt.Println("fac ~~> ", fac)
		result *= fac
	}
	return result
}
// %%

// %% Recursive Factorial function
func RecursiveFactorial(fac int) int {
	if fac == 0 {
		return 1
	}
	fmt.Println("fac ~~> ", fac)
	return fac * RecursiveFactorial(fac-1)
}

func main() {
	fmt.Println("Calling ImperativeFactorial()")
	ImperativeFactorial(10000)

	fmt.Println("Calling FunctionalFactorial()")
	RecursiveFactorial(10000)
}
// %%
