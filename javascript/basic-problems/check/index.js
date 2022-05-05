check3 = new Proxy(
    {},
    {
        set: function (target, property, value) {
            // do something
            console.log(
                "check3 value changed from " + target[property] + " to " + value
            )
            console.log("Hello World")
            target[property] = value
        },
    }
)

check3.watch = 1
check3.watch = 3
