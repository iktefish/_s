package main

import "fmt"

func main() {
	s := []string{"M", "A", "B", "C", "E", "Z"}
	fmt.Println(s)
	alphasort(s, 1)
	fmt.Println(s)
}

func alphasort(str []string, depth int) {
	for x := range str {
		y := x + 1
		for y = range str {
			if str[x] < str[y] {
				str[x], str[y] = str[y], str[x]
			}
		}
	}
}
