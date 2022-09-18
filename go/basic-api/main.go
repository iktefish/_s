package main

import (
	"errors"
	"github.com/gin-gonic/gin"
	"net/http"
)

type book struct {
	Id       string `json:"id"`
	Title    string `json:"title"`
	Author   string `json:"author"`
	Quantity int    `json:"quantity"`
}

var books = []book{
	{
		Id:       "1",
		Title:    "Lord of Flies",
		Author:   "William Golding",
		Quantity: 10,
	},
	{
		Id:       "2",
		Title:    "The Ones Who Walk Away From Omelas",
		Author:   "Ursula K. Le Guin",
		Quantity: 7,
	},
	{
		Id:       "3",
		Title:    "Animal Farm",
		Author:   "George Orwell",
		Quantity: 3,
	},
	{
		Id:       "4",
		Title:    "David Copperfield",
		Author:   "Charles Dickens",
		Quantity: 13,
	},
	{
		Id:       "5",
		Title:    "A Christmas Carol",
		Author:   "Charles Dickens",
		Quantity: 8,
	},
}

func getBooks(c *gin.Context) {
	c.IndentedJSON(http.StatusOK, books)
}

func createBook(c *gin.Context) {
	var newBook book
	if err := c.BindJSON(&newBook); err != nil {
		return
	}

	books = append(books, newBook)
	c.IndentedJSON(http.StatusCreated, newBook)
}

func searchBookById(c *gin.Context) {
	id := c.Param("id")
	book, err := getBookById(id)
	if err != nil {
		return
	}

	c.IndentedJSON(http.StatusOK, book)
}

func getBookById(id string) (*book, error) {
	for i, book := range books {
		if book.Id == id {
			return &books[i], nil
		}
	}
	return nil, errors.New("No such book found!")
}

func main() {
	router := gin.Default()
	router.GET("/books", getBooks)
	router.GET("/books/:id", searchBookById)
	router.POST("/books", createBook)
	router.Run("localhost:8080")
}
