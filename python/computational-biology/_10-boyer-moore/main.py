import rules

# %% PROBLEM:
# We want to match inside a text block, T, using pattern, P
# T = GCTAGCTC
# P = TCAA

p = "TCAA"
p_bm = rules.BoyerMoore(p)

## %% Invoke bad_character_rule()
print(p_bm.bad_character_rule(2, "T"))
## %%
# %%

# %% PROBLEM:
# We want to match inside a text block, T, using pattern, P
# T = GCTAGCTC
# P = ACTA

p = "ACTA"
p_bm = rules.BoyerMoore(p)

## %% Invoke bad_character_rule()
print(p_bm.bad_character_rule(0, "T"))
## %%
# %%

# %% PROBLEM:
# We want to match inside a text block, T, using pattern, P
# T = ACACGCTC
# P = ACAC

p = "ACAC"
p_bm = rules.BoyerMoore(p)

## %% Invoke match_skip()
print(p_bm.match_skip())
## %%
# %%

# %% Boyer Moore function
def boyer_moore(p, p_bm, t):
    i = 0
    occurences = []
    while i < len(t) - len(p) + 1:
        shift = 1
        mismatched = False
        for j in range(len(p) - 1, -1, -1):
            if p[j] != t[i + j]:
                skip_bc = p_bm.bad_character_rule(j, t[i + j])
                skip_gs = p_bm.good_suffix_rule(j)
                shift = max(shift, skip_bc, skip_gs)
                mismatched = True
                break
        if mismatched == False:
            occurences.append(i)
            skip_gs = p_bm.match_skip()
            shift = max(shift, skip_gs)
        i += shift
    return occurences


## %% Invoke
t = "GCTACGATCTAGAATCTA"
p = "TCTA"
p_bm = rules.BoyerMoore(p)

print(boyer_moore(p, p_bm, t))
### %% To verify the output recieved output, echo substring at both offsets
print("t[7:11] ~~> ", t[7:11])
print("t[14:18] ~~> ", t[14:18])
### %%
## %%
# %%
