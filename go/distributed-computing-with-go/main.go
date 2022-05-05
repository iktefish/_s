package main

import (
	"fmt"
	"os"
)

func main() {
	fmt.Println("Project root directory is: " + os.Getenv("PROJECT_ROOT"))
}
