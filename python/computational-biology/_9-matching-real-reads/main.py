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

# %% Read from .fastq format
def readFastq(filename):
    sequences = []
    qualities = []
    with open(filename) as fh:
        while True:
            fh.readline()
            seq = fh.readline().rstrip()
            fh.readline()
            qual = fh.readline().rstrip()
            if len(seq) == 0:
                break
            sequences.append(seq)
            qualities.append(qual)
        return sequences, qualities


## %% Invoke
phix_reads, quals = readFastq("ERR266411_1.first1000.fastq")
print("phix_reads ~~>", phix_reads[:10])
print("quals ~~>", quals[:10])

numMatched = 0
n = 0
for r in phix_reads:

    ### %% NOTE:
    # Taking just the 30 base prefix of r will yield greater match results.
    # Despite these sequencing reads being actually from this genome, only 7/1000 reads
    # matched the genome. This is because a sequence obtained with a DNA Sequencer might
    # not match the genome exactly.
    # 1. This can be due to sequencing errors; some of the bases were read incorrectly by
    # the sequencer
    # 2. There might be differences between the individual (specimen) sequenced and the
    # reference genome

    r = r[:30]
    ### %%

    matches = naive(r, genome)
    n += 1
    if len(matches) > 0:
        numMatched += 1
print("%d / %d reads matched exactly!" % (numMatched, n))

### %% NOTE:
# A genome is double stranded, and the reads can come from one strand or the other.
# But the exact matching algorithm we've setup will only look at only 1 of the 2 strands.

#### %% SOLUTION: To fix this issue, we will also try to match the Reverse Compliment of the genome.
def reverseComplement(s):
    complement = {"A": "T", "C": "G", "G": "C", "T": "A", "N": "N"}
    t = ""
    for base in s:
        t = complement[base] + t
    return t


##### %% Invoke
numMatched = 0
n = 0
for r in phix_reads:
    r = r[:30]
    matches = naive(r, genome)
    matches.extend(naive(reverseComplement(r), genome))
    n += 1
    if len(matches) > 0:
        numMatched += 1
print("%d / %d reads matched exactly!" % (numMatched, n))

output = reverseComplement("ACCGTCG")
print(output)
##### %%
#### %%
### %%
## %%
# %%
