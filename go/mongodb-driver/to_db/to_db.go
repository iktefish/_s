package to_db

import (
	"context"

	"github.com/iktefish/_s/tree/main/go/mongodb-driver/utils"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"
)

// Insert one document in "episodes" collection.
func Insert_One_Doc(client *mongo.Client, ctx context.Context) interface{} {

	DummyDb := client.Database("DummyDb")
	episodesCol := DummyDb.Collection("episodes")

	getEpisode, err := episodesCol.InsertOne(ctx, bson.D{
		{Key: "name", Value: "Lord of Flies"},
		{Key: "ep_num", Value: 25},
		{"rating", 5}, // This is shorthand for { Key: "rating", Value: 5 }
		{"tags", bson.A{"thriller", "psychological", "gore"}},
	})
	utils.Handle_Error(err)

	return getEpisode.InsertedID

}

// Insert many documents in "episodes" collection.
func Insert_Many_Docs(client *mongo.Client, ctx context.Context) interface{} {

	DummyDb := client.Database("DummyDb")
	episodesCol := DummyDb.Collection("episodes")

	getEpisode, err := episodesCol.InsertMany(ctx, []interface{}{ // We will be providing more than 1 `bson.D`, hence the slice.
		bson.D{
			{"name", "Escape from Paradise"},
			{"ep_num", 8},
			{"rating", 4.3},
		},
		bson.D{
			{"name", "Unspeakable Tongue"},
			{"ep_num", 9},
			{"rating", 4.6},
		},
		bson.D{
			{"name", "Cruel Compassion"},
			{"ep_num", 10},
			{"rating", 4.9},
		},
	})
	utils.Handle_Error(err)

	return getEpisode.InsertedIDs

}

// Insert in database from Go data structure.
func Insert_From_Go_Struct(client *mongo.Client, ctx context.Context) interface{} {

	DummyDb := client.Database("DummyDb")
	locationCol := DummyDb.Collection("locations")

	result, err := locationCol.InsertOne(ctx, utils.Dummy_Location())
	utils.Handle_Error(err)

	return result.InsertedID

}

// Update document with provided "_id" in "episodes" collection.
func Update_Doc(client *mongo.Client, ctx context.Context, id_string string) interface{} {

	DummyDb := client.Database("DummyDb")
	episodesCol := DummyDb.Collection("episodes")

	id, _ := primitive.ObjectIDFromHex(id_string)
	result, err := episodesCol.UpdateOne(
		ctx,
		bson.M{"_id": id},
		bson.D{
			{"$set", bson.D{{"rating", 4.95}}},
		},
	)
	utils.Handle_Error(err)

	return result.UpsertedID

}

// Update "name" of documents, where "rating" is > 4.5, to "Money maker".
// WARNING: Doesn't seem to work!
func Update_Many_Docs(client *mongo.Client, ctx context.Context) int64 {

	DummyDb := client.Database("DummyDb")
	episodesCol := DummyDb.Collection("episodes")

	result, err := episodesCol.UpdateMany(
		ctx,
		bson.D{{"rating", bson.D{{"$gt", 4.5}}}},
		bson.D{
			{"$set", bson.D{{"name", "Money maker"}}},
		},
	)
	utils.Handle_Error(err)

	return result.ModifiedCount

}
