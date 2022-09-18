# Install and setup

Clojure has a wide variety of development tools. For exploratory purposes I
will be using [Lieningen](https://leiningen.org/).

## Creating a new project

Let's say we want to create a project that will hold an application called
`hello-world`. We do this by running the following command:

```sh
lein new app hello-world
```

This tells `Leiningen` to create a directory called `hello-world` holding a
skeleton project. In-order to run this skeleton project simply execute the
following command in the project directory:

```sh
lein run
```

# Exploring the syntax

## Hello World

To start the REPL we must enter the following command:

```sh
lein repl
```

Let's print hello world in Clojure:

```clojure
(print "Hello World!")
```

> Clojure is a LISP dialect, so in order to call a function, we wrap it in
> parenthesis.

## Comments

Comments in Clojure are denoted using `;`. Let's write some comments:

```clojure
(print "Hello World!")   ; Outputs "Hello World!"
```

## Some useful functions

We looked at the `print` function in our "Hello World" example. Clojure has a `str`
function that takes a variable number of arguments, converts then to strings, and
concatenates the whole thing together.

```clojure
(str "Hello" "World")           ; Returns "HelloWorld"
(str "Hello" " " "World")       ; Returns "Hello World"
(str 1 2 3 4 5 "Hello" "World") ; Returns "12345HelloWorld"
```

There is a `count` function that takes in a string and returns its length:

```clojure
(count "This is a string")      ; Returns 16
```

Back to the `print` function, it will print anything we throw at it:

```clojure
(print "First argument" "Second argument" 2 3 4 true false)
                                ; Prints:
                                ; First argument Second argument 2 3 4 true falsenil
```

## Arithmetic

Clojure's approach to doing math is refreshingly simple. Each operator is a
function, and therefore has the same syntax for invocation: we write the
operator/function and provide whatever number of arguments needed and wrap the
entire thing in parenthesis.

Look at the examples below:

```clojure
;~> Addition
(+ 100 200)         ; Returns 300

;~> Subtraction
(- 100 200)         ; Returns -100

;~> Multiplication
(* 100 200)         ; Returns 20000

;~> Division
(/ 100 200)         ; Returns 1/2
```

> **NOTE**: Most programming languages (Ruby, Java) will return a truncated
> integer when result of a division is an irrational number, for example
> `divide(8/3)` will return `2`. Other languages (JavaScript, Python) will
> return a float, for example `2.6666666666666665`. Clojure will return a
> _ratio_, for example calling `(/ 8 3)` returns `8/3`. To get the same
> truncated integer behavior we use the `quot` function, short for _quotient_,
> for example calling `(quot 8 3)` returns `2`.

Since each operator is a function, we can compose them as we would naturally
compose functions:

```clojure
;~> Add then divide
(/ (+ 100 200) 2)   ; Returns 150
```

> Though to anyone unfamiliar with LISPs, arithmetic in Clojure may seem
> disorienting. This is often due to the operator being placed before the
> numbers it's operating on, rather than between. This is a trade-off that
> LISPs make to keep the language syntax uniform. Therefore, regardless of what
> we are doing, the syntax will ALWAYS be: `(verb arg arg arg ...)`

## Variable binding

To bind a value to a variable we use the `def` function. This function takes an
identifier, Clojure calls this a _symbol_, and a value.

```clojure
(def city "Townsville") ; Bind value "Townsville" to symbol `city`.
```

We can name our symbol anything we want, including things like
`ciTy-X+=VilleShire`:

```clojure
(def ciTy-X=VilleShire "Some city") ; This name is horrendous, please don't do this.
```

The ideal naming convention is _kabob case_, meaning we separate each word by
hyphen and all the words are lower-case letters:

```clojure
(def bad-city "Omelas")
```

## Function definition

Let's define a function that prints "Hello World!":

```clojure
;~> Define the `hello-world` function:
(defn hello-world [] (println "Hello World!"))

;~> Call the `hello-world` function:
(hello-world)
```

Let's look at the anatomy of the function definition syntax:

```clojure
;~~> Function name, function parameters, function body respectively -|
;          v------v------v-------------------------------------------|
;      ---------  --   --------------------
(defn hello-world [] (println "Hello World!"))
```

We can define longer functions using multiple lines like so:

```clojure
(defn hello-world []
    (println "Hello World!"))
```

Let's create a function that has parameters for arguments:

```clojure
;~> Function definition
(defn say-my-name [name]
    (println name))

;~> Calling the function
(say-my-name "Kelvin O'Coffemate")
```

Let's define a function that will return the average of two provided arguments:

```clojure
;~> The following function will add `a` and `b`, divide them by 2 and return the
;   output. Notice no explicit return keyword is used. Clojure functions return
;   whatever the last thing they compute. This is why the `print` and `println`
;   function always outputs `nil` along with the argument when invoked in the REPL.
(defn average [a b] (/ (+ a b) 2))
```

## Vectors

A Vector is an ordered collection of items. We define a vector by using square
brackets:

```clojure
(def my-vec [1 "Two" true false [1 2]])
```

We can also create a Vector using the `vector` function followed by the elements
want present in said vector:

```clojure
;~> The following is synonymous to [1 "Two" true false [1 2]]
(vector 1 "Two" true false [1 2])
```

Vectors in Clojure are _Heterogeneous_, meaning we can have multiple type of
values in a single vector.

We can return the number of elements present in a vector using the `count`
function:

```clojure
(count my-vec)  ; Will return 5
```

To get the first element of a vector we use the `first` function:

```clojure
(first my-vec)  ; Will return 1
```

To get all the elements other than the first we use the `rest` function:

```clojure
(rest my-vec)   ; Will return the following sequence:
                ; ("Two" true false [1 2])

;~> Applying `rest` on an empty vector or a vector with a single element
;   will return an empty sequence.
(rest [])   ; Returns ()
(rest [1])  ; Returns ()
```

> **NOTE**: You will notice that the functions, `first` and `rest` doesn't mutate
> the vector. Rather they simply return the first value or the rest of the values
> excluding the first as a _sequence_ respectively. A Sequence is another Clojure
> datatype that we will look into later on.

We can get the nth element of a vector by using the `nth` function. Its parameters
are, the vector and an index n:

```clojure
(nth my-vec 3)  ; Will return false
```

We can also call the vector itself as a function and pass in a number, n, to get
the nth element:

```clojure
(my-vec 3)  ; Synonymous to calling `(nth my-vec 3)`
```

To grow a vector we use the `conj` function, short for _conjunction_. This takes
a vector and a value, and returns a new vector with the value appended to its end:

```clojure
(conj my-vec "New item")    ; Will return:
                            ; [1 "Two" true false [1 2] "New item"]
```

The opposite of the previous operation is done using the `cons` function, short
for _construct_. This, similar to the former, takes a value and a vector, and
returns a new sequence with the value prepended to its head:

```clojure
(cons "Another item" my-vec)    ; Will return:
                                ; ("Another item" 1 "Two" true false [1 2])
```

> **NOTE**: Unlike `conj`, the `cons` function returned a _sequence_ rather
> than a _vector_.

## Lists

The List, similar to the Vector, is also an ordered collection of Heterogeneous
items. Lists are declared using a single quotation followed by round brackets:

```clojure
(def my-list '(1 2 3 4 5 "Hello" "World"))
```

We can also create a List using the `list` function followed by the elements we
want present in said list:

```clojure
;~> The following is synonymous to '(1 2 3 4 5 "Hello" "World")
(list 1 2 3 4 5 "Hello" "World")
```

> You will notice that everything in Clojure are lists. This is the essence of
> LISP's syntactic simplicity. LISP stands for _list processor_, and as such is
> a language specifically designed to model code as if it was data structured
> like a tree. Because of that we place a `'` before the parenthesis to specify
> the difference between `(1 2 3)`, which is data, and `(def x 123)`, which is
> an instruction. And also because of the aforementioned note, since there is
> literally no difference between `'()` and `()`, we do not need to place a `'`
> before an empty list.

Lists are NOT Sequences, which will be discussed later. They are superficially
very similar to Vectors thus `count`, `first`, `rest` and `nth` work the same as they
would when applied to vectors:

```clojure
;~> Define list.
(def my-list '(1 "Two" true false (1 2)))

;~> Using the `count` function
(count my-list)     ; Will return 3

;~> Using the `first` function
(first my-list)     ; Will return 1

;~> Using the `rest` function
(rest my-list)      ; Will return:
                    ; ("Two" true false (1 2))
(rest ())           ; Will return ()
(rest '(1))         ; Will return ()

;~> Using the `nth` function
(nth my-list 3)     ; Will return false
```

## List Vs Vector

The difference between Lists and Vectors is that a Vector is a continuous chunk
of memory and a List is a singly linked list. This means that operations that
require quick access or append to items that exist near the end of the
collection will be slower on lists than on vectors but operations where we need
to prepend to the start of the collection will be faster on lists than on
vectors.

The `conj` function understands this distinction and performs conjunctions
respecting their differences. When applying the `conj` function on a Vector,
the new item is added at the end of the collection; and when applying it
on a List, the new item is added at the start of the collection.

Evaluate the example below to test see for yourself:

```clojure
(def my-vec [1 "Two" true false [1 2]])

;~> Notice after evaluating this expression, the new item
;   is appended to the vector.
(conj my-vec "New item")    ; Will return:
                            ; [1 "Two" true false [1 2] "New item"]

(def my-list '(1 "Two" true false (1 2)))

;~> Notice after evaluating this expression, the new item
;   is prepended to the list.
(conj my-list "New item")   ; Will return:
                            ; ("New item" 1 "Two" true false (1 2))
```

## Hash-maps

Hash-maps, or Maps for short, are unordered key-value pairs. Hash-maps in Clojure
are _Heterogeneous_ and are defined using curly brackets:

```clojure
(def my-hash-map {"title" "Oliver Twist"  "author" "Dickens"  "published" "1838"})
```

The items are: `key value key value key value`. Because commas, `,`, in Clojure
are read as white spaces we can use them to separate each pair from the next:

```clojure
(def my-hash-map {"title" "Oliver Twist", "author" "Dickens", "published" "1838"})
```

We can also create a Hash-map using the `hash-map` function followed by the
key-value pairs we want:

```clojure
;~> The following code is synonymous to {"title" "Oliver Twist",  "author" "Dickens",  "published" "1838"}
(hash-map "title" "Oliver Twist" "author" "Dickens" "published" "1838")
```

There are a multitude of ways we can look up a value in a Hash-map. We can use
the `get` function that takes the hash-map itself and key to the value we want:

```clojure
(get my-hash-map "title")   ; Returns value: "Oliver Twist"
```

Or we can also call the hash-map itself as function and pass the key to the
value we want:

```clojure
(my-hash-map "title")       ; Returns value: "Oliver Twist"
```

We can get all the keys or values present in a hash-map by using the `keys`,
or the `vals` function respectively:

```clojure
;~> The `keys` function returns all the keys present in a map.
(keys hash-map-with-keywords)   ; Returns: ("title" "author" "published")

;~> The `vals` function returns all the values present in a map.
(vals hash-map-with-keywords)   ; Returns: ("Oliver Twist" "Dickens" "1838")
```

> **NOTE**: We can use virtually anything as a key in Clojure. But it's often
> ideal to use _Keywords_ for keys. Keywords are explored in the following
> section.

### Keywords

The Keyword in Clojure is a basic datatype just like String, Integers, Floats,
and Booleans. The Keyword literal starts with a colon, `:`, then follows the
same rules as Symbols.

> Internally Keywords are Strings and are distant cousins that go into
> Enumerated types in other languages.

We can use Keywords as keys in a hash-map:

```clojure
;; --- Hash-maps using Keywords ---

;~> Define hash-map.
(def hash-map-with-keywords
  {:title "Oliver Twist", :author "Dickens", :published "1838"})

;~> Getting value from key
(get hash-map-with-keywords :title)
(hash-map-with-keywords :title)
```

When using Hash-map we can get the value my running the hash-map itself as a
function and passing in the key, we can do the same when using Keywords as keys
as well. We can also use the Keyword as a function and pass the Hash-map to
achieve the same outcome:

```clojure
;~> A Keyword can look itself up in a Hash-map.
(:title hash-map-with-keywords)     ; Returns "Oliver Twist"
```

> This can be read as: _The Keyword looking itself up in the Hash-map_.

### Mutation

We cannot mutate a hash-map, just as we couldn't mutate vectors or lists.
If we want to add a new key-value pair to the hash-map, we use the `assoc`
function, short for associate. `assoc` takes a hash-map and an arbitrary
number of key-value pairs, and returns a new hash-map.

Let's add a new key-value pair to the `hash-map-with-keywords` hash-map we
declared above:

```clojure
;~> The `assoc` function will take a hash-map and any number of
;   key-value pairs and return a new hash-map.
(assoc hash-map-with-keywords :page-count "1000")   ; Will return:
                                                    ; {:title "Oliver Twist",
                                                    ;  :author "Dickens",
                                                    ;  :published "1838",
                                                    ;  :page-count "1000"}
```

The opposite of the `assoc`'s functionality is achieved by using the `dissoc`
function that takes in a hash-map and a key and returns a new hash-map
which doesn't have the key field.

Let's remove the `:page-count` key we just added:

```clojure
;~> The `dissoc` function will take a hash-map and a key and
;   return a new hash-map sans the key field.
(dissoc hash-map-with-keywords :page-count)     ; Will return:
                                                ; {:title "Oliver Twist",
                                                ;  :author "Dickens",
                                                ;  :published "1838"}

;~> Trying to dissociate a key from a hash-map that doesn't
;   exist, the `dissoc` function will quietly leave the
;   hash-map untouched.
(dissoc hash-map-with-keywords :nonexistant-field)
```

## Sets

Clojure has a builtin Set data type. They are used, like their mathematical
namesakes, to note membership: a value _is_ or _is not_ a member of a Set. They
are defined using the following syntax:

```clojure
(def blood-group #{:o+ :o- :a+ :a- :ab+ :ab-})
```

A value can only ever be a member of a Set ONCE. The primary use case for a
Set is to whether a certain value or values are present in that particular
Set. We can achieve this using the `contains?` function, which takes the
Set itself and a value whose presence we want to verify:

```clojure
(contains? blood-group :o+)         ; Returns true
(contains? blood-group :omelas)     ; Returns false
```

We can also achieve the same by using the Set itself as a function and passing
it a value whose presence we want to check, if the value is present then the
value itself is returned, else `nil` is returned:

```clojure
;~> We can use the set itself as a function to get a value that's
;   a member of it.
(blood-group :o+)       ; Returns :o+
(blood-group :omelas)   ; Returns nil
```

To extend a Set we use the `conj` function:

```clojure
;~> Use the `conj` function to create extend a set.
(conj blood-group :vamp)    ; Will return:
                            ; #{:a- :ab+ :vamp :o- :o+ :a+ :ab-}
```

To shorten a Set we use the `disj`, short for disjoin, function:

```clojure
;~> Use the `disj` function to shorten a set.
(disj blood-group :vamp)    ; Will return:
                            ; #{:a- :ab+ :o- :o+ :a+ :ab-}
```

## Immutable

Note that all the data structures in Clojure are _Persistent Data Structures_.
Meaning they are immutable. Though this might seem to be a recipe for
lackluster performance, the structures are stored as chunks organized in a
_Shallow Tree_. Therefore whenever Clojure needs to make an _almost-same-copy_
of a structure, it performs the least amount of copying required by reusing
the chunks that don't change.

In many cases, such as comparison operations, immutability results in a net
gain in performance due to the fact that _shallow comparisons_ require much
less effort than _deep comparisons_. This is one of the reasons why Clojure
(ClojureScript) when used with React performs so good.

## Logic

### If expressions

Clojure includes an `if` expression which is simply just the same as any other
`if` expression from other languages.

> **NOTE**: The `if` block in Clojure always evaluates to a value and as such are
> expressions not statements.

If blocks in Clojure are followed by a condition and then by two expressions
which corresponds to the two branches of the condition.

Look at the example below:

```clojure
;; --- If ---

(def people-i-know #{"Abalon" "Leliana" "Sten" "Cullen"})
(defn knock-knock
  [person]
  (if (contains? people-i-know person)
    "Hello there mate!"                   ;~> If condition is met.
    "Sorry, I don't talk to strangers.")) ;~> Else.

(knock-knock "Abalon")      ; Returns "Hello there mate!"
(knock-knock "Jax")         ; Returns "Sorry, I don't talk to strangers."
```

> Clojure treats all values other than `nil` as `true` when used as a condition
> in an if expression. This means that all values (expect `nil`) are `truthy`
> and `nil` is `falsy`.

### Comparison

Comparison is done using the `=` function:

```clojure
(= 10 11)       ; Returns false
(= 11 11)       ; Returns true
```

We can check if two things are not equal using the `not=` function:

```clojure
(not= 10 11)    ; Returns true
(not= 11 11)    ; Returns false
```

Let's create a not equals operator that is similar to other languages:

```clojure
;~> Creating a != operator.
(defn != [val-1 val-2] (= val-1 val-2))

(!= 10 11)      ; Returns true
(!= 11 11)      ; Returns false
```

To check whether a value is greater or less than another, we use the `>` and
`<` functions respectively:

```clojure
(> 10 20)       ; Return false
(< 10 20)       ; Return true
```

With the above note, `>=` and `<=` work exactly as you would expect. Clojure
has `and` and `or` functions for more complicated Boolean logic.

## Do

In case you have tried write some sort of multi-branched if
expression and have failed, don't worry. Clojure does NOT allow for
more than a single expression for truthy nor for the falsy leg.

Clojure has a `do` construct which can hold a bunch of expressions but
evaluate to a single expression. Using `do` we can flesh out a simple
`if` with multipart true and false legs:

```clojure
;; --- Do ---

(defn do-something
  [arg]
  (if arg
    (do (println "Some arbitrary string ...")
        "Return some arbitrary string ...")
    "Well I just didn't do nothing."))

(do-something true)
(do-something false)
```

## When

Clojure has a variant of `if` called `when` which supports multiple truthy legs
and doesn't require a falsy leg:

```clojure
; --- When ---

(defn do-another-thing
  [arg]
  (when arg
    (println "Argument is true.")
    (println "Just another remainder that argument is true."))
  (when (not arg)
    (println "Argument is false")
    (println "Just another remainder that argument is false.")))

(do-another-thing true)
(do-another-thing false)
```

## Cond

To compose conditions in Clojure, instead of using nested if expressions, we use
the `cond` expression. `cond` allows us to specify multiple conditions in a chain,
if one of the are met, the rest are not evaluated.

Explore the example below:

```clojure
;; --- Cond ---

(def preferred-customers #{"Guts" "Mulan" "Silco"})
(defn calc-discount
  "Calculate discount for preferred customers."
  [customer no-of-orders]
  (if (contains? preferred-customers customer)
    (cond (> no-of-orders 100) 30
          (> no-of-orders 50) 20
          (> no-of-orders 10) 10
          :else 5)
    (str "No discount for " customer)))

(calc-discount "Guts" 3)
(calc-discount "Guts" 15)
(calc-discount "Guts" 70)
(calc-discount "Guts" 110)
(calc-discount "Sasuke" 300)
```

## Case

Clojure also has a `case` expression which, although less powerful compared to `cond`,
if still useful when we want to turn the flow of our code based on a single value.

Explore the example below:

```clojure
;; --- Case ---

(defn greet-member
  "Greet a member based on their membership status."
  [member status]
  (case status
    :gold (str "Welcome, welcome, welcome back " member)
    :silver (str "Welcome, welcome back " member)
    :bronze (str "Welcome back " member)))

(greet-member "Kakashi" :gold)
(greet-member "Zabuza" :silver)
(greet-member "Orochimaru" :bronze)
```

## Check

We can check what primitive a given value belongs to by using the following
functions:

```clojure
;; --- Check ---

;~> Number
(number? 10)                                ; Return true
(number? "10")                              ; Return false

;~> String
(string? "10")                              ; Return true
(string? 10)                                ; Return false

;~> Keyword
(keyword? :boss)                            ; Return true
(keyword? "boss")                           ; Return false

;~> Map
(map? {:name "Sir Octavius Ceaser Sama"})   ; Return true
(map? :bossman)                             ; Return false

;~> Vector
(vector? [1 2 3])                           ; Return true
(vector? '(1 2 3))                          ; Return false

;~> List
(list? '(1 2 3))                            ; Return true
(list? [1 2 3])                             ; Return false
```

## Exception handling

We can perform exception handling in Clojure using the `try` function. The
first argument to `try` is the expression we expect to triggering an exception
and the following arguments we call a sequence of `catch` expressions, each
meant to catch a specific expression.

Let's catch a divide by 0 error:

```clojure
;; --- Exception handling ---

;~> Expression that triggers an exception.
(/ 5 0)         ; Will cause:
                ; (err) Execution error (ArithmeticException) at ...

;~> Try the expression that triggers an exception and
;   catch the exception.
(try (/ 5 0)
     (catch ArithmeticException err "Phew! I just caught an error."))   ; Will return when exception is triggered:
                                                                        ; "Phew! I just caught an error."
```
