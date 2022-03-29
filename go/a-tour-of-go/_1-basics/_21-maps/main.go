package main

import "fmt"

type Vertex struct {
	Lat, Long float64
}

var m map[string]Vertex

func main() {
	m = make(map[string]Vertex)
	m["CERN"] = Vertex{
		60.2238, -100.1107,
	}
	fmt.Println("m ~~>", m["CERN"])

	// var z = map[string]Vertex{
	// 	"CREN": Vertex{
	// 		60.2238, -100.1107,
	// 	},
	// 	"Google": Vertex{
	// 		37.42202, -122.08408,
	// 	},
	// }
	var z = map[string]Vertex{
		"CREN": {
			60.2238, -100.1107,
		},
		"Google": {
			37.42202, -122.08408,
		},
	}
	fmt.Println("z ~~>", z)

	myMap := make(map[string]int)

	myMap["Answers"] = 44
	fmt.Println("The value: ", m["Answer"])

	myMap["Answers"] = 50
	fmt.Println("The value: ", m["Answer"])

	delete(m, "Answer")
	fmt.Println("The value: ", m["Answer"])

	v, ok := myMap["Answer"]
	fmt.Println("The value: ", v, "Present?", ok)
}
