package main

import (
	"fmt"

	"github.com/iktefish/_s/tree/main/go/mongodb-driver/from_db"
	"github.com/iktefish/_s/tree/main/go/mongodb-driver/to_db"
	"github.com/iktefish/_s/tree/main/go/mongodb-driver/utils"
)

func main() {

	client, ctx := utils.Connect_Db() // Connect to database
	defer client.Disconnect(ctx)      // Make sure to detach database connection

	// # Delete all documents
	fmt.Println("Deleted count: ", from_db.Delete_All(client, ctx))

	// # Fetch all
	fmt.Println("\nFetch all episodes:")
	for _, episode := range from_db.Fetch_All(client, ctx) {
		fmt.Println("\tepisode: ", episode)
		fmt.Println("\tepisode['ep_num']: ", episode["ep_num"])
	}

	// # Insert one doc
	fmt.Println("\nInsert_One_Doc() ~~> ", to_db.Insert_One_Doc(client, ctx))

	// # Insert many docs
	fmt.Println("\nInsert_Many_Docs() ~~> ", to_db.Insert_Many_Docs(client, ctx))

	// # Fetch all and sort
	fmt.Println("\nFetch all episodes and sort:")
	for _, episode := range from_db.Fetch_All_And_Sort(client, ctx) {
		fmt.Println("\tepisode: ", episode)
		fmt.Println("\tepisode['ep_num']: ", episode["ep_num"])
	}

	// # Update one doc
	fmt.Println("\nUpdated document: ", to_db.Update_Doc(client, ctx, "62bc86825e403311de401c84"))

	// # Update multiple documents where rating is > 4.0, and add "good_quality" tag.
	fmt.Printf("\nUpdate %v documents\n", to_db.Update_Many_Docs(client, ctx))

	// # Insert from native Go data structure
	fmt.Println("\nInsert_From_Go_Struct() ~~> ", to_db.Insert_From_Go_Struct(client, ctx))

}
