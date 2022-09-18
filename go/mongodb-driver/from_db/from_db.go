package from_db

import (
	"context"

	"github.com/iktefish/_s/tree/main/go/mongodb-driver/utils"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

// Delete all documents in "episodes" collection.
func Delete_All(client *mongo.Client, ctx context.Context) int64 {

	DummyDb := client.Database("DummyDb")
	episodesCol := DummyDb.Collection("episodes")

	deletedEpisodes, err := episodesCol.DeleteMany(ctx, bson.M{})
	utils.Handle_Error(err)

	return deletedEpisodes.DeletedCount

}

// Fetch all documents from "episodes" collection.
func Fetch_All(client *mongo.Client, ctx context.Context) []primitive.M {

	DummyDb := client.Database("DummyDb")
	episodesCol := DummyDb.Collection("episodes")

	cur, err := episodesCol.Find(ctx, bson.M{})
	utils.Handle_Error(err)

	// It isn't wise to load an entire collection, possibly gigabytes in size, into memory
	/* var episodes []bson.M
	if err = cur.All(ctx, &episodes); err != nil {
		utils.Handle_Error(err)
	} */

	episodes := []primitive.M{}

	defer cur.Close(ctx)
	for cur.Next(ctx) {
		var episode bson.M
		err = cur.Decode(&episode)
		utils.Handle_Error(err)
		episodes = append(episodes, episode)
	}

	return episodes

}

// Fetch and sort all documents from "episodes" collection.
func Fetch_All_And_Sort(client *mongo.Client, ctx context.Context) []primitive.M {

	DummyDb := client.Database("DummyDb")
	episodesCol := DummyDb.Collection("episodes")

	opts := options.Find()
	opts.SetSort(bson.D{{"rating", -1}}) // -1 is for descending order, 1 is ascending order

	cur, err := episodesCol.Find(ctx, bson.D{
		{"rating", bson.D{
			{"$gt", 4.0},
		}},
	}, opts)
	utils.Handle_Error(err)

	var episodesSorted []bson.M
	err = cur.All(ctx, &episodesSorted)
	utils.Handle_Error(err)

	return episodesSorted

}
