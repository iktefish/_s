package schema

import (
	"go.mongodb.org/mongo-driver/bson/primitive"
)

type LocStats struct {
	Tot_Revenue    int `bson:"tot_revenue,omitempty"`
	Tot_Investment int `bson:"tot_investment,omitempty"`
}

type Location struct {
	Loc_Stats LocStats     `bson:"loc_stats,omitempty"`
	Due       int          `bson:"due,omitempty"`
	Employees []Employee   `bson:"employees,omitempty"`
	Vehicles  []ComVehicle `bson:"vehicles,omitempty"`
}

type Employee struct {
	Name         string             `bson:"name,omitempty"`
	Role         Job                `bson:"job,omitempty"`
	Date_Hired   primitive.DateTime `bson:"date_hired,omitempty"`
	Pt_Ft        bool               `bson:"pt_ft,omitempty"`
	Payment_Due  int                `bson:"payment_due,omitempty"`
	Assigned_Loc int                `bson:"assigned_loc,omitempty"`
}

type ComVehicle struct {
	License_Plate string `bson:"license_plate,omitempty"`
	Assigned_To   int    `bson:"assigned_to,omitempty"`
}

type DailyStats struct {
	Day            primitive.DateTime `bson:"day,omitempty"`
	Revenue        int                `bson:"revenue,omitempty"`
	Invested       int                `bson:"invested,omitempty"`
	Customer_Count int                `bson:"customer_count,omitempty"`
}

type Gear struct {
	Label    string `bson:"label,omitempty"`
	Quantity int    `bson:"quantity,omitempty"`
}

type Services struct {
	Name      string `bson:"name,omitempty"`
	Price     int    `bson:"price,omitempty"`
	Frequency int    `bson:"frequency,omitempty"`
}

type CustomerInfo struct {
	First_Name string `bson:"first_name,omitempty"`
	Last_Name  string `bson:"last_name,omitempty"`
	Car_Make   string `bson:"car_make,omitempty"`
	Car_Color  string `bson:"car_color,omitempty"`
}

type Customer struct {
	Info          CustomerInfo       `bson:"infor,omitempty"`
	From_Location primitive.ObjectID `bson:"from_location,omitempty"`
}

type Job struct {
	Title  string `bson:"title,omitempty"`
	Salary int    `bson:"salary,omitempty"`
}
