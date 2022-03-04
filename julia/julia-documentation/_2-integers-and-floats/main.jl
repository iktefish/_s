println(5 + π)

println(typeof(π)) # Echo the type of pi
println(typeof(100)) # Echo the type of 100
println(typeof(6.0000)) # Echo the type of 6.0000

println(Sys.WORD_SIZE) # This variable indicated whether the target system is 32-bit arch or 64-bit arch

# %% typeof
hexX = 0x1
println("typeof(hexX) ~~> ", typeof(hexX))

hexX = 0x123
println("typeof(hexX) ~~> ", typeof(hexX))

hexX = 0x123456789
println("typeof(hexX) ~~> ", typeof(hexX))

x = 0b10
println("typeof(x) ~~> ", typeof(x))

y = 0o010
println("typeof(y) ~~> ", typeof(y))

for T in [Int8, Int16, Int32, Int64, Int128, UInt8, UInt16, UInt32, UInt64, UInt128]
    println("* $(lpad(T,7)): [$(typemin(T)),$(typemax(T))]")
end
# %% End

# %% Overflow behavior
x = typemax(Int64)
println("x ~~> ", x)
x = x + 1
println("x ~~> ", x)
# x + 1 == typemax(Int64)
println(x + 1 == typemax(Int64))
# %% End

# %% Overflow resolution
println(10^19)
println(big(10)^19)
# %% End

# %% Float
myFloat = 1.777
println("typeof(myFLoat) ~~> ", typeof(myFloat))
println("typeof(Float32(myFloat)) ~~> ", typeof(Float32(myFloat)))
# %% End

# %% Positive and Negetive zero
println("0.0 == -0.0 ~~> ", 0.0 == -0.0)
println("bitstring(0.0) ~~> ", bitstring(0.0))
println("bitstring(-0.0) ~~> ", bitstring(-0.0))
# %% End

# %% Arbitrary Precision Arithmetic
println("BigInt(typemax(Int64)) + 1 ~~> ", BigInt(typemax(Int64)) + 1)
println((big"123456789012345678901234567890" + 1))
println(typeof(big"123456789012345678901234567890" + 1))
parse(BigInt, "123456789012345678901234567890")
println(string(big"2"^200, base = 16))
# %% End

# %% Numeric Literal Coefficients
x = 3
println("x ~~> ", x)
y = 2(x - 1)^2 - 3(x - 1) + 1
println("y ~~> ", y)
println("√16 ~~> ", √16)
# %% End
