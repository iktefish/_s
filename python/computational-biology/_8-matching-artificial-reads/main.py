# %% Function to read a genome from a Fasta file
def readGenome(filename):
    genome = ""
    with open(filename, "r") as f:
        for line in f:
            if line[0] != ">":
                genome += line.rstrip()
        return genome


## %% Invoke
genome = readGenome("phix.fa")
print(genome[:100])
print("Length of genome ~~> ", len(genome))
## %%
# %%

# %% Naive Exact Matching algorithm
def naive(p, t):
    occurrences = []
    for i in range(len(t) - len(p) + 1):
        match = True
        for j in range(len(p)):
            if t[i + j] != p[j]:
                match = False
                break
        if match == True:
            occurrences.append(i)
    return occurrences


## %% Invoke
t = "AGCTTAGATAGC"
p = "AG"
print(naive(p, t))
## %%
# %%

# %% Generate artificial reads from a genome by taking subsequences from random positions in the given genome
import random

def generateRandomReads(genome, numReads, readLen):
    reads = []
    for _ in range(numReads):
        start = random.randint(0, len(genome) - readLen) - 1
        reads.append(genome[start : start + readLen])
    return reads


## %% Invoke
reads = generateRandomReads(genome, 100, 100)
numMatched = 0
for r in reads:
    matches = naive(r, genome)
    if len(matches) > 0:
        numMatched += 1

print("%d / %d reads matched exactly!" % (numMatched, len(reads)))
## %%
# %%
