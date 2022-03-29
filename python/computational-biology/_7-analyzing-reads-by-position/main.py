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
seqs, quals = readFastq("sra_data.fastq")
print("seqs ~~>", seqs[:10])
print("quals ~~>", quals[:10])
print("Length of read ~~>", len(seqs))
## %%
# %%

# %% Turn Q into Phred+33 ASCII-encoded quality
def QtoPhred33(Q):
    return chr(Q + 33)


## %% Invoke
print("QtoPhred33() ~~>", QtoPhred33(144))
## %%
# %%

# %% Turn Phred+33 ASCII-encoded quality to Q
def phred33ToQ(qual):
    return ord(qual) - 33


## %% Invoke
print("phred33ToQ() ~~>", phred33ToQ("#"))
## %%
# %%

# %% Create histogram of the quallity scores
def createHist(qualities):
    hist = [0] * 50
    for qual in qualities:
        for phred in qual:
            q = phred33ToQ(phred)
            hist[q] += 1
    return hist


## %% Invoke
h = createHist(quals)
print(h)
### %% Plot the histogram using Matplotlib
import matplotlib.pyplot as plt

plt.bar(range(len(h)), h)
plt.show()
### %%
## %%
# %%

# %% Analyze G-C content of genome
def findGCByPos(reads):
    gc = [0] * 388
    totalBases = [0] * 388

    for read in reads:
        for i in range(len(read)):
            if read[i] == "C" or read[i] == "G":
                gc[i] += 1
            totalBases[i] += 1

    for i in range(len(gc)):
        if totalBases[i] > 0:
            gc[i] = gc[i] / float(totalBases[i])

    return gc


## %% Invoke
gc = findGCByPos(seqs)
plt.plot(range(len(gc)), gc)
plt.show()
## %%
# %%
