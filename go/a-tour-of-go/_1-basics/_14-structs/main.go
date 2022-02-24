package main

import "fmt"

type Vertex struct {
	x int
	y int
}

var (
	v1 = Vertex{1, 2}  // has type Vertex
	v2 = Vertex{x: 1}  // y: 0 is implicit
	v3 = Vertex{}      // x: 0 and y: 0 is implicit
	pt = &Vertex{1, 2} // has type *Vertex
)

func main() {
	fmt.Println(Vertex{1, 3})
	fmt.Println("Vertex{1, 3}.x\t~~> ", Vertex{1, 3}.x)

	v := Vertex{13, 31}
	fmt.Println("v ~~> ", v)
	fmt.Println("v.x ~~> ", v.x)
	fmt.Println("v.y ~~> ", v.y)

	p := &v
	q := &p
	fmt.Printf("&p ~~> %p\n", &p)
	fmt.Printf("&v ~~> %p\n", &v)
	fmt.Printf("&q ~~> %p\n", &q)

	fmt.Println("Value of v read through p ~~> ", *p)
	p.x = 1000
	p.y = 5555
	fmt.Println("Value of v read through p ~~> ", *p)

	fmt.Println(v1, v2, v3, pt, *pt)
}
