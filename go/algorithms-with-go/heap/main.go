package main

import "fmt"

/*
   Max Heap structure has a slice that holds an array.
*/
type MaxHeap struct {
	slice []int
}

/*
   Insert adds an element to the heap.
*/
func (h *MaxHeap) Insert(key int) {
	h.slice = append(h.slice, key)
	h.maxHeapifyUp(len(h.slice) - 1)
}

//~> Heapify from bottom up.
func (h *MaxHeap) maxHeapifyUp(index int) {
	for h.slice[parent(index)] < h.slice[index] {
		h.swap(parent(index), index)
		index = parent(index)
	}
}

//~> Get index of parent node.
func parent(i int) int {
	return (i - 1) / 2
}

//~> Get left child.
func left(i int) int {
	return (i * 2) + 1
}

//~> Get right child.
func right(i int) int {
	return (i * 2) + 2
}

//~> Swap values of the provided indices.
func (h *MaxHeap) swap(i_1, i_2 int) {
	h.slice[i_1], h.slice[i_2] = h.slice[i_2], h.slice[i_1]
}

/*
   Extract returns the largest key from the heap.
*/
func (h *MaxHeap) Extract() int {
	root := h.slice[0]
	lastIdx := len(h.slice) - 1

	//~> To prevent panick when slice is empty.
	if len(h.slice) == 0 {
		fmt.Println("Slice is empty, extraction failed!")
		return -1
	}

	//~> Take last index and put it in root.
	h.slice[0] = h.slice[lastIdx]
	h.slice = h.slice[:lastIdx]

	h.maxHeapifyDown(0)

	return root
}

//~> Heapify from top to bottom.
func (h *MaxHeap) maxHeapifyDown(i int) {
	lastIdx := len(h.slice) - 1
	l, r := left(i), right(i)
	childToCompare := 0

	for l <= lastIdx {
		if l == lastIdx {
			childToCompare = l
		} else if h.slice[l] > h.slice[r] {
			childToCompare = l
		} else {
			childToCompare = r
		}

		if h.slice[i] < h.slice[childToCompare] {
			h.swap(childToCompare, i)
			i = childToCompare
			l, r = left(i), right(i)
		} else {
			return
		}
	}
}

func main() {
	m := &MaxHeap{}
	fmt.Println(m)

	buildHeap := []int{10, 20, 30, 40, 50, 60, 70, 80, 9}
	for _, v := range buildHeap {
		m.Insert(v)
		fmt.Println(m)
	}

	for i := 0; i < 5; i++ {
		m.Extract()
		fmt.Println(m)
	}
}
