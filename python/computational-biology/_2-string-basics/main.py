# %% String declaration
seq = "ACGT"
seq = "ACGT"
# %%

# %% Get specific index of string
seq[1]
# %%

# %% Length of string
len(seq)
# %%

# %% String concatenation
seq1 = "CCAA"
seq2 = "GGTT"

print(seq1 + seq2)
# %%

# %% Joining a list of strings
seqs = [
    "A",
    "C",
    "G",
    "T",
]
print("".join(seqs))
# %%

# %% Get a random string
import random

# random.seed(7)  # make pseudorandom output deterministic
random.choice(seq)
print(random.choice(seq))
# %%

# %% Generate a random nucleotide
seq = ""
for _ in range(10):
    seq += random.choice("ACGT")
print(seq)
## %% Same as above but in a single line
seq = "".join([random.choice("ACGT") for _ in range(10)])
print(seq)
## %%
# %%

# %% Print slices of string
print(seq[1:3])
print(seq[:3])
print(seq[0:3])
# %%
