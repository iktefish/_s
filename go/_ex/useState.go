package main

import "fmt"

func useState(seed string) (func() string, func(new string)) {
	s := seed

	get := func() string {
		return s
	}
	set := func(new string) {
		s = new
	}

	return get, set
}

func main() {
	str_1_Getter, str_1_Setter := useState("Hello World")
	fmt.Println("Initial value of str_1: ", str_1_Getter())

	str_1_Setter("You there, you are finally awake ...")
	fmt.Println("Changed value of str_1: ", str_1_Getter())
}
