package utils

import (
	"context"
	"fmt"
	"os"
	"time"

	"github.com/iktefish/_s/tree/main/go/mongodb-driver/schema"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

// Check for error, handle error and terminate program if present.
func Handle_Error(err error) {

	if err != nil {
		fmt.Fprintf(os.Stderr, "Fatal Error: %s", err.Error())
		os.Exit(1)
	}

}

// Connects to MongoDB on local machine or Atlas.
func Connect_Db() (*mongo.Client, context.Context) {

	client, err := mongo.NewClient(options.Client().ApplyURI("mongodb://172.17.0.2:27017"))
	Handle_Error(err)

	ctx, _ := context.WithTimeout(context.Background(), 10*time.Second)
	err = client.Connect(ctx)
	Handle_Error(err)

	return client, ctx

}

// Return dummy data: LocStats
func Dummy_LocStats() schema.LocStats {

	return schema.LocStats{
		Tot_Revenue:    10000,
		Tot_Investment: 13000,
	}

}

// Return dummy data: Job
func Dummy_Job() schema.Job {

	return schema.Job{
		Title:  "Tire mechanic",
		Salary: 30,
	}

}

// Return dummy data: Employee
func Dummy_Employee() schema.Employee {

	return schema.Employee{
		Name:        "Tea Coffeeborn",
		Role:        Dummy_Job(),
		Date_Hired:  primitive.NewDateTimeFromTime(time.Now()),
		Pt_Ft:       false,
		Payment_Due: 0,
	}

}

// Return dummy data: ComVechicle
func Dummy_ComVehicle() schema.ComVehicle {

	return schema.ComVehicle{
		License_Plate: "FACTS-JS-SUX",
	}

}

// Return dummy data: Location
func Dummy_Location() schema.Location {

	return schema.Location{
		Loc_Stats: Dummy_LocStats(),
		Due:       10,
		Employees: []schema.Employee{Dummy_Employee()},
		Vehicles:  []schema.ComVehicle{Dummy_ComVehicle()},
	}

}
