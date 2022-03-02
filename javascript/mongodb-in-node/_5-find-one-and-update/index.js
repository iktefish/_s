const mongo = require("./mongo")
const userSchema = require("./schemas/user-schema")
const regionSchema = require("./schemas/region-schema")

const connectToMongoDB = async () => {
    await mongo().then(async (mongoose) => {
        try {
            console.log("Connected to MongoDB!")
            const resultFindReplace = await regionSchema.findOneAndUpdate(
                {
                    name: "Demacia",
                },
                {
                    name: "Demacia",
                    age: 1000,
                    isHospitable: false,
                },
                {
                    upsert: true,
                }
            )
            console.log("resultFindReplace ~~> ", resultFindReplace)
            const resultRegion = await regionSchema.find({})
            console.log("resultRegion ~~> ", resultRegion)
        } finally {
            mongoose.connection.close()
        }
    })
}

connectToMongoDB()
