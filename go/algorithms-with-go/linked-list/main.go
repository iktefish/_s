package main

import "fmt"

/*
   Create structure for a node.
*/
type node struct {
	data int
	next *node
}

/*
   Create structure for a Linked List.
*/
type linkedList struct {
	head   *node
	length int
}

//~> Prepend a new node at Head.
func (l *linkedList) prepend(n *node) {
	second := l.head
	l.head = n
	l.head.next = second
	l.length += 1
}

//~~> Print contents of our Linked List.
func (l linkedList) printListContents() {
	toPrint := l.head
	for l.length != 0 {
		fmt.Printf("%v ", toPrint)
		toPrint = toPrint.next
		l.length -= 1
	}
	println()
}

/*
   Delete a node of our Linked List by providing a value that matched.

   NOTE:
   We can have some special cases that can lead to a runtime exception:

   1.    Attempt to apply the method on an emply list
   2.    Delete a value that doesn't exist
   3.    Delete the Head
*/
func (l *linkedList) deleteNode(value int) {
	//~> Handle edge case 1.
	if l.length == 0 {
		return
	}

	//~> Handle edge case 3.
	if value == l.head.data {
		l.head = l.head.next
		l.length -= 1
		return
	}

	prevToDelete := l.head
	for prevToDelete.next.data != value {
		//~> Handle edge case 2.
		if prevToDelete.next.next == nil {
			return
		}
		prevToDelete = prevToDelete.next
	}
	prevToDelete.next = prevToDelete.next.next
	l.length -= 1
}

func main() {
	myList := linkedList{}

	node_1 := &node{data: 10}
	node_2 := &node{data: 20}
	node_3 := &node{data: 30}
	node_4 := &node{data: 40}
	node_new := &node{data: 1}

	myList.prepend(node_1)
	myList.prepend(node_2)
	myList.prepend(node_3)
	myList.prepend(node_4)
	myList.prepend(node_new)

	fmt.Println("Address of myList: ", myList)
	fmt.Println("Address of node_new: ", *node_new)
	myList.printListContents()
	myList.deleteNode(20)
	myList.printListContents()
}
