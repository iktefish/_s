;!zprint {:style :justified}
;!zprint {:style :indent-only}

(ns clojure-basics.core
  (:gen-class))

;; --- Hello World ---

(defn say-hello-world [] (println "Hello, World!"))
(say-hello-world)

;; --- Exploring Vectors ---

(def my-vec [1 "Two" true false [1 2]])
my-vec
(count my-vec)
(first my-vec)
(rest my-vec)
(rest ())
(rest [1])
(nth my-vec 3)

;~> Notice after evaluating this expression, the new item
;   is appended to the vector.
(conj my-vec "New item")

;; --- Exploring Lists ---

(def my-list '(1 "Two" true false (1 2)))
my-list
(count my-list)
(first my-list)
(rest my-list)
(rest ())
(rest '(1))
(nth my-list 3)

;~> Notice after evaluating this expression, the new item
;   is prepended to the list.
(conj my-list "New item")

;; --- Exploring Hash-maps ---

(def my-hash-map
  {"title" "Oliver Twist", "author" "Dickens", "published" "1838"})
my-hash-map
(get my-hash-map "title")
(my-hash-map "title")

;; --- Hash-maps using Keywords ---

(def hash-map-with-keywords
  {:title "Oliver Twist", :author "Dickens", :published "1838"})
(get hash-map-with-keywords :title)
(hash-map-with-keywords :title)

;~> A Keyword can look itself up in a Hash-map.
(:title hash-map-with-keywords)

;~> The `assoc` function will take a hash-map and any number of
;   key-value pairs and return a new hash-map.
(assoc hash-map-with-keywords :page-count "1000")

;~> The `dissoc` function will take a hash-map and a key and
;   return a new hash-map sans the key field.
(dissoc hash-map-with-keywords :page-count)

;~> Trying to dissociate a key from a hash-map that doesn't
;   exist, the `dissoc` function will quietly leave the
;   hash-map untouched.
(dissoc hash-map-with-keywords :nonexistant-field)

;~> The `keys` function returns all the keys present in a map.
(keys hash-map-with-keywords)

;~> The `vals` function returns all the values present in a map.
(vals hash-map-with-keywords)

;; --- Sets ---

(def blood-group #{:o+ :o- :a+ :a- :ab+ :ab-})
blood-group

;~> Check if the set `blood-group` has the value `:o+`.
(contains? blood-group :o+)
(contains? blood-group :omelas)

;~> We can use the set itself as a function to get a value that's
;   a member of it.
(blood-group :o+)
(blood-group :omelas)

;~> Use the `conj` function to extend a set.
(conj blood-group :vamp)

;~> Use the `disj` function to shorten a set.
(disj blood-group :vamp)

;; --- Comparison ---

(= 10 11)
(= 11 11)

(not= 10 11)
(not= 11 11)

;~> Creating a != operator.
(defn != [val-1 val-2] (= val-1 val-2))

(!= 10 11)
(!= 11 11)

(> 10 20)
(< 10 20)

(>= 10 20)
(<= 10 20)

;; --- If ---

(def people-i-know #{"Abalon" "Leliana" "Sten" "Cullen"})
(defn knock-knock
  [person]
  (if (contains? people-i-know person)
    "Hello there mate!" ;~> If condition is met.
    "Sorry, I don't talk to strangers.")) ;~> Else.

(knock-knock "Abalon")
(knock-knock "Jax")

;; --- Do ---

(defn do-something
  [arg]
  (if arg
    (do (println "Some arbitrary string ...")
        "Return some arbitrary string ...")
    "Well I just didn't do nothing."))

(do-something true)
(do-something false)

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

;; --- Check ---

;~> Number
(number? 10)
(number? "10")

;~> String
(string? "10")
(string? 10)

;~> Keyword
(keyword? :boss)
(keyword? "boss")

;~> Map
(map? {:name "Sir Octavius Ceaser Sama"})
(map? :bossman)

;~> Vector
(vector? [1 2 3])
(vector? '(1 2 3))

;~> List
(list? '(1 2 3))
(list? [1 2 3])

;; --- Exception handling ---

(/ 5 0)
(try (/ 5 0) (catch ArithmeticException err "Phew! I just caught an error."))

;; --- Main ---

(defn -main
  "I don't do a whole lot ... yet."
  [& args]
  (println "Hello, World!"))
