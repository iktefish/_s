# %% Turn Q into Phred+33 ASCII-encoded quality
def QtoPhred33(Q):
    return chr(Q + 33)


## %% Invoke
print(QtoPhred33(144))
## %%
# %%

# %% Turn Phred+33 ASCII-encoded quality to Q
def phred33ToQ(qual):
    return ord(qual) - 33


## %% Invoke
print(phred33ToQ("m"))
## %%
# %%
