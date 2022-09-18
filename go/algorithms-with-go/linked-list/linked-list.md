# The Linked List

This is one of the most basic data structures. Data in a Linked List are stored
in a sequence of nodes. Though it is often compared to an Array but, unlike the
Array where the data are indexed and are placed physically next to one another,
the data in a Linked List are structured as a sequence of nodes. Each node
contains a link, pointer to be specific, to the next node in the list. The
**first** element of the list is known as the **Head** and the last element is
known as the **Tail**.

```
A LINKED LIST:

|-------| pointer  |-------| pointer  |-------| pointer  |-------|
| ele_1 | -------> | ele_2 | -------> | ele_3 | -------> | ele_4 |
|-------|          |-------|          |-------|          |-------|
```

# The Doubly Linked List

A regular Linked List can also be called a Singly Linked List. A Doubly Linked
List is a Linked List where each element contains the pointer to its previous
element along with a pointer to its next element.

```
A DOUBLY LINKED LIST:

|-------| pointer  |-------| pointer  |-------| pointer  |-------|
| ele_1 | -------> | ele_2 | -------> | ele_3 | -------> | ele_4 |
|-------| <------- |-------| <------- |-------| <------- |-------|
```

# Disadvantage

The fashion in which the Linked List data structure is structured makes it
inferior to Arrays when it comes to accessing data from a specific position in
the structure. In an Array we can just get the 4th element by looking into the
3rd index directly, however in the case of a Linked List we would have to go
through 1st, 2nd, 3rd before we can get access to the 4th element. This
operation has a complexity of `O(n)`.

# Advantage

Operations that are focussed on adding or removing the Head, Tail as well in
the case of a Doubly Linked List, will have a complexity of constant time,
`O(1)` in a Linked List. This is not the case for an Array. Because elements of
an Array are physically placed next to one another, the entire Array (i.e.
every single elements) would have to shift to the right if we were to prepend
another element in index 0.
