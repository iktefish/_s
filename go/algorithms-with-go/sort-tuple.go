package main

import "fmt"

type intTuple_n struct {
	a string
	b int
}

func main() {
	s := []string{"M", "A", "B", "C", "E", "Z"}
	fmt.Println(s)
	alphasort_n(s, 1)
	fmt.Println(s)

	a := []string{"Hello", "There", "Whats", "Up", "5", "Aridenus", "Ialik", "8", "9", "0"}
	b := []int{0, 9, 8, 7, 6, 5, 4, 3, 2, 1}
	fmt.Println(zip_n(a, b))

	z, err := zip_n(a, b)
	if err != nil {
		fmt.Println(err)
	}
	fmt.Println(z[0])
    fmt.Println(z[0].a[1:2])

	tupleSort(z, 1)
    fmt.Println(z)
}

func alphasort_n(str []string, depth int) {
	for x := range str {
		y := x + 1
		for y = range str {
			if str[x] < str[y] {
				str[x], str[y] = str[y], str[x]
			}
		}
	}
}

func tupleSort(tup []intTuple_n, depth int) {
	for x := range tup {
		y := x + 1
		for y = range tup {
			if tup[x].a < tup[y].a {
				tup[x], tup[y] = tup[y], tup[x]
			}
		}
	}
}

func zip_n(a []string, b []int) ([]intTuple_n, error) {

	if len(a) != len(b) {
		return nil, fmt.Errorf("zip: arguments must be of same length")
	}

	r := make([]intTuple_n, len(a), len(a))

	for i, e := range a {
		r[i] = intTuple_n{e, b[i]}
	}

	return r, nil
}
