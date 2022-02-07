const mongo = require("./mongo")
const userSchema = require("./schemas/user-schema")

const connectToMongoDB = async () => {
    await mongo().then(async (mongoose) => {
        try {
            console.log("Connected to MongoDB!")
            const user = {
                email: "test@gmail.com",
                username: "Robert Beratheon",
                password: "Killed by pig!",
            }
            await new userSchema(user).save()
        } finally {
            mongoose.connection.close()
        }
    })
}

connectToMongoDB()
