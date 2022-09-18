# Creating a basic API in Go

Creating an API in Go using the **Gin** lightweight library.

## Environment Setup

Create a `go.mod` using:
```sh
go mod init example/basic-api
```

Add `gin` library:
```sh
go get github.com/gin-gonic/gin
```

## Code

Create a structure `book` with the following fields:

- ID : string
- Title : string
- Author : string
- Quantity : int

```go
type book struct {
	Id       string
	Title    string
	Author   string
	Quantity int
}
```

We want the structure to be *serialized* so that our API can return the structure directly
or it can take in a `JSON` version of the structure and convert if to the `book` structure
in Go.

> **NOTE**  
This is done because we want to use `JSON` in our API because it's the industry standard.

The way we achieve this is by doing the following:

```go
type book struct {
	Id       string `json:"id`
	Title    string `json:"title`
	Author   string `json:"author`
	Quantity int    `json:"quantity`
}
```

Now create a dummy data-structure for books:

```go
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
		Author:   "Charls Dickens",
		Quantity: 13,
	},
	{
		Id:       "5",
		Title:    "A Christmas Carol",
		Author:   "Charls Dickens",
		Quantity: 8,
	},
}
```

> **NOTE**  
In a real world application we would use a database for this situation.

### API

#### GET

The plan here is that we want to create a *router* (in short words, Routing
determines which handler receives a specific request) to handle the following
root: `/books`. This means, whenever we go to `localhost:8080/books`, the API
will call a specific handler which will take in a *context* (a context contains
information, such as query parameters and data payloads, about the request
being handled and it allows us to make a response) and will respond `OK` status
and return data from our `books` structure.

```go
func getBooks(c *gin.Context) {
	c.IndentedJSON(http.StatusOK, books)
}

func main() {
	router := gin.Default()
	router.GET("/books", getBooks)
	router.Run("localhost:8080")
}
```

Now running `main.go` will serve our API at `localhost:8080/books`. When we go to the aforementioned
URL, we will be provided with a `JSON` object.

#### POST

To **POST** data to our collection, we create another function `createBook` that takes context as
argument. A variable of type `book` will be defined, we will use a reference to this variable
to bind to `JSON` and append `newBook` to the `books` slice.

```go
func createBook(c *gin.Context) {
	var newBook book
	if err := c.BindJSON(&newBook); err != nil {
		return
	}

	books = append(books, newBook)
	c.IndentedJSON(http.StatusCreated, newBook)
}

func main() {
	router := gin.Default()
	router.GET("/books", getBooks)
	router.POST("/books", createBook) // ~> [+]
	router.Run("localhost:8080")
}
```
