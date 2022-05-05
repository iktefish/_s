package main

import "testing"

func TestSimpleVariadicToSlice(t *testing.T) {
	// Test for no arguments
	if val := simpleVariadicToSlice(); val != nil {
		t.Error("Value should not be nil", nil)
	} else {
		t.Log("simpleVariadicToSlice() ~~> nil")
	}

	// Test for random set of values
	vals := simpleVariadicToSlice(1, 2, 3)
	expected := []int{1, 2, 3}
	isErr := false
	for i := 0; i < 3; i++ {
		if vals[i] != expected[i] {
			isErr = true
			break
		}
	}
	if isErr {
		t.Error("Value should be []int{1, 2, 3}", vals)
	} else {
		t.Log("vals ~~> ", vals)
		t.Log("expected ~~> ", expected)
	}
}

func TestMixedVariadicToSlice(t *testing.T) {
	// Test for simple argument and no variadic arguments
	name, numbers := mixedVariadicToSlice("Bob")
	if name == "Bob" && numbers == nil {
		t.Log("Recieved as expected : Bob, <nil slice>")
	} else {
		t.Errorf("Recieved unexpected values: %s", name)
		t.Error("Recieved unexpected values: ", numbers)
	}
}
