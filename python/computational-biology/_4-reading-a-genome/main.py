# %% Function to read a genome from a Fasta file
def readGenome(filename):
    genome = ""
    with open(filename, "r") as f:
        for line in f:
            if line[0] != ">":
                genome += line.rstrip()
        return genome


## %% Invoke
genome = readGenome("escherichia-phage.fa")
print(genome[:100])
print("Length of genome ~~> ", len(genome))
## %%
# %%

# %% Lets run some analysis on out genome
counts = {"A": 0, "C": 0, "G": 0, "T": 0}  # Key : Value => Base : Frequency
for base in genome:
    counts[base] += 1


## %% Print
print(counts)
## %%

## %% Doing the same as above but using a Python module
import collections
print(collections.Counter(genome))
## %%
# %%
