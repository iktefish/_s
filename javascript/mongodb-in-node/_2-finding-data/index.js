const mongo = require("./mongo")
const userSchema = require("./schemas/user-schema")
const regionSchema = require("./schemas/region-schema")

const connectToMongoDB = async () => {
    await mongo().then(async (mongoose) => {
        try {
            console.log("Connected to MongoDB!")
            const resultUsers = await userSchema.find({})
            console.log("resultUsers ~~> ", resultUsers)
            const resultRegions = await regionSchema.find({
                age: 1000,
            })
            console.log("resultRegions ~~> ", resultRegions)
        } finally {
            mongoose.connection.close()
        }
    })
}

connectToMongoDB()
