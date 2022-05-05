package main

import (
	"fmt"
	"sort"
)

func main() {
	a := []string{"A", "C", "C"}
	x := "C"

	i := sort.Search(len(a), func(i int) bool { return x <= a[i] })
	if i < len(a) && a[i] == x {
		fmt.Printf("Found %s at index %d in %v.\n", x, i, a)
	} else {
		fmt.Printf("Did not find %s in %v.\n", x, a)
	}
}
