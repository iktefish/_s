# %% Function to find longest common prefix between 2 strings
def longestCommonPrefix(s1, s2):
    i = 0
    while i < len(s1) and i < len(s2) and s1[i] == s2[i]:
        i += 1
    return s1[:i]


## %% Invoke
output = longestCommonPrefix("ACCATGT", "ACCAGAC")
print(output)
## %%
# %%

# %% Function to see if 2 string match exactly
def match(s1, s2):
    if len(s1) != len(s2):
        return False

    for i in range(len(s1)):
        if not s1[i] == s2[i]:
            return False

    return True


## %% Invoke
output = match("ACCATGT", "ACCATGT")
print(output)
## %%
# %%

# %% Just check string match using Python
def matchUsingPython(s1, s2):
    return s1 == s2


## %% Invoke
output = matchUsingPython("ACCATGT", "ACCATGT")
print(output)
## %%
# %%

# %% Complement of DNA strand
complement = {"A": "T", "C": "G", "G": "C", "T": "A"}


## %% Print
print(complement["C"])
print(complement["A"])
## %%
# %%

# %% Reverse complement
# NOTE: If we had a double stranded DNA and knew the sequence of one of those strands
# from top to bottom, this would give us the sequence of the other strand from bottom
# to top
def reverseComplement(s):
    complement = {"A": "T", "C": "G", "G": "C", "T": "A"}
    t = ""
    for base in s:
        t = complement[base] + t
    return t


## %% Invoke
# output = reverseComplement("ACCATGGT")  # FUNNY: The arg is its own reverse complement. LMAO!
output = reverseComplement("ACCGTCG")
print(output)
## %%
# %%
