# %%
import bisect


class Index(object):
    def __init__(self, t, k):
        self.k = k
        self.index = []
        for i in range(len(t) - k + 1):
            self.index.append((t[i : i + k], i))
        self.index.sort()  # NOTE: We are appending all indexes first, then sorting. This might take a while.

    def query(self, p):
        kmer = p[: self.k]
        i = bisect.bisect_left(self.index, (kmer, -1))
        hits = []
        while i < len(self.index):
            if self.index[i][0] != kmer:
                break
            hits.append(self.index[i][1])
            i += 1
        return hits  # NOTE: hits is a list of all indicies in t where first k bases of P match


# %%

# %% Function for quering index
def queryIndex(p, t, index):
    k = index.k
    offsets = []
    for i in index.query(p):
        if p[k:] == t[i + k : i + len(p)]:
            offsets.append(i)
    return offsets


## %% Invoke
t = "GCTACGATCTAGAATCTA"
p = "TCTA"
index = Index(t, 2)

print(queryIndex(p, t, index))
### %% To verify the output recieved output, echo substring at both offsets
print("t[7:11] ~~> ", t[7:11])
print("t[14:18] ~~> ", t[14:18])
### %%
## %%
# %%
