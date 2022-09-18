# The Heap Data Structure

The Heap data structure was originally introduced as a part of an algorithm
called **Heap Sort** by William J in 1964. But the data structure that was
introduced was also useful for a variety of other applications such as:

-   Priority Queues (just like a queue, but we take out the on that's highest
    priority first)
-   Selection Algorithm
-   Graph Algorithm

A Heap is a data structure that can be expressed as a Complete Tree. This means
a structure where all the levels of the tree, except for the lowest, are full.
In the lowest level, some nodes can be empty but have all its nodes to the
left.

### Max Heap

In a Max Heap, every parent will have a higher key than its children. This
means that the largest key in the tree is always the root.

As we can judge from the above note, getting the largest key from a Max Heap would
be very fast, regardless of the size of the Heap, due to it being always placed
at the root.

### Min Heap

A Min Heap is similar to a Max Heap but here each parent node will have the
smaller key in relation to its children.

## Visualizing the Heap

The Heap can be visualized as a tree but in practice they are stored as an
array, where each node of the tree corresponds to an index of that array.
Therefore, a Heap is just simply an array that operated like a tree.

This is made possible because we can easily calculate the indices of the
children:

```
ChildIndex_Left  = ParentIndex * 2 + 1
ChildIndex_Right = ParentIndex * 2 + 2
```

## Insertion

> ASSUMPTION: We are inserting into a Max Heap. A Min Heap would have the
> same characteristics reversed.

To insert a node to the Heap, we mindlessly insert the new node after the
last index (bottom right of the tree).

Now, in order to maintain the Heap property, we have to rearrange the nodes. To
do that we compare the newly inserted node to its parent and swap if the new
node is higher. We repeat this process until the new node gets to its place.

This process of rearrangement is known as _Heapify_.

The Heapify process is also performed after we take out an item from the tree.

## Extraction

Lets say we extract the root node of the tree. Like Insertion, we have to
rearrange the nodes to maintain the Heap property. To do this we fill the empty
root with the last node of the tree. Then we start the swapping process
starting from the top-down. We compare the 3 nodes at the top (root and its 2
children) and move the largest to the root. We repeat this downwards until
the node moved gets to its place.

## Time Complexity

Simply adding and removing a node is not the tricky part, but rather the
rearrangement, Heapification, is where most of the algorithmic complexity lies.

The time complexity of both insertion and extraction depends on the Heapifying
process. The number of operation required depends on the height of the tree.

Therefore the time complexity would be `O(h)` where `h` is the height of the
tree. Expressing this with `n`: `O(log n)`. This is because `n` has a
logarithmic relation to `h`.

# Coding

We will be doing the following to implement a Max Heap:

-   Create a structure to represent the Max Heap
-   Create an insert method
-   Create an extract method

Implementation in `./main.go`.
