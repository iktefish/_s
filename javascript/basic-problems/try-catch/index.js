const myFunc = () => {
    let nowDate = new Date()
    try {
        throw "This must be an Error!"
        nonExistentFunction()
    } catch (err) {
        console.log("Here's an error!")
        console.log(err)
        console.error(err)
    }
}

myFunc()

console.log("Life goes on!")
