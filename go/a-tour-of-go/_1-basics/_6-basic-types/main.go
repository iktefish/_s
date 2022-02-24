package main

import (
	"fmt"
	"math/cmplx"
)

var (
	ToBe   bool       = false
	MaxInt uint64     = 1<<64 - 1
	z      complex128 = cmplx.Sqrt(-10 + 11i)
)

func main()  {
    fmt.Printf("ToBe: %T ~~> %v\n", ToBe, ToBe)
    fmt.Printf("MaxInt: %T ~~> %v\n", MaxInt, MaxInt)
    fmt.Printf("z: %T ~~> %v\n", z, z)
}
