package main

import (
	"fmt"
	"sort"
)

func BisectLeft(a []int, v int) int {
	return bisectLeftRange(a, v, 0, len(a))
}

func bisectLeftRange(a []int, v int, lo, hi int) int {
	s := a[lo:hi]
	return sort.Search(len(s), func(i int) bool {
		return s[i] >= v
	})
}

func BisectRight(a []int, v int) int {
	return bisectRightRange(a, v, 0, len(a))
}

func bisectRightRange(a []int, v int, lo, hi int) int {
	s := a[lo:hi]
	return sort.Search(len(s), func(i int) bool {
		return s[i] > v
	})
}

func BinarySearch(a []int, v int) int {
	pos := BisectLeft(a, v)
	if pos == len(a) {
		/* NOTE:
		   The value sought is higher than the
		   max value in the slice.
		*/
		return -1

	} else if a[pos] != v {
		/* NOTE:
		   The value sought is not found,
		   this is becuase the BisectLeft would return
		   the insertion position for the value,
		   irrespective of whether this value was found in the
		   slice or not.
		*/
		return -1

	} else {
		return pos
	}
}

func main() {
	arr := []int{11, 22, 33, 44, 55, 66}
	output := BinarySearch(arr, 22)

	fmt.Println(output)
}
