package main

import "fmt"

type intTuple struct {
	a string
	b int
}

func zip(a []string, b []int) ([]intTuple, error) {

	if len(a) != len(b) {
		return nil, fmt.Errorf("zip: arguments must be of same length")
	}

	r := make([]intTuple, len(a), len(a))

	for i, e := range a {
		r[i] = intTuple{e, b[i]}
	}

	return r, nil
}

func main() {
	a := []string{"Hello", "There", "Whats", "Up", "5", "6", "7", "8", "9", "0"}
	b := []int{0, 9, 8, 7, 6, 5, 4, 3, 2, 1}
	fmt.Println(zip(a, b))

	z, err := zip(a, b)
	if err != nil {
		fmt.Println(err)
	}
	fmt.Println(z[0])
    fmt.Println(z[0].a[1:2])
}
