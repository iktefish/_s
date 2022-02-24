package main

import (
	"fmt"
	"math"
)

func main() {
	var base, height int = 3, 5
	var hypo float64 = math.Sqrt((float64(base * base)) + (float64(height * height)))
    var uhypo uint = uint(hypo)

    fmt.Println(base, height, hypo, uhypo)
}
