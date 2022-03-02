const mongo = require("./mongo")
const userSchema = require("./schemas/user-schema")
const regionSchema = require("./schemas/region-schema")

const connectToMongoDB = async () => {
    await mongo().then(async (mongoose) => {
        try {
            console.log("Connected to MongoDB!")
            await regionSchema.updateOne(
                {
                    name: "Demacia",
                },
                {
                    name: "Kirkwall",
                    age: 1100,
                }
            )
            const resultRegion = await regionSchema.find({})
            console.log("resultRegion ~~> ", resultRegion)
        } finally {
            mongoose.connection.close()
        }
    })
}

connectToMongoDB()
