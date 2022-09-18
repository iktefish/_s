# Notes

Nannou uses the _builder_ pattern and it's architecture is similar to Elm's
`model -> view -> update -> view` architecture.

## Running

We have to import the `nannou` crate and initialize the application. Note the
following:

-   Use `nannou::app()` to start building the application. This will take a
    function that should return the initial state of the application.
-   Pass an update function to `.update()` that will be responsible for update
    the application state.
-   Use the `.run()` function to initiate the event loop.

```rust
use nannou::prelude::*;

fn main()
{
    //~~> Begin building the `app`, the argument is a function that should return
    //    the initial state of the application -┐
    //          v-------------------------------┘
    //      ---------
    nannou::app(model).update(update).run();
    //                  ------------    ^---------------------------------------------┐
    //                        ^----------------------------------------------------┐  |
    //~~> `update` takes a function responsible for updating the application state |  |
    //    in each iteration of the event loop -------------------------------------┘  |
    //~~> `run` Initiates the event loop ---------------------------------------------┘
}

struct Model
{
    /*
        Structure declaring shape of Model ...
    */
}

//~> `model` will borrow an instance of App and return a new Model.
fn model(app: &App) -> Model
{
    /*
        Initiate the Model instance here and return it ...
    */
}

//~> `update` will borrow an instance of App, take a mutable borrow
//   of an instance of Model, and an instance of Update.
fn update(app: &App, model: &mut Model, _update: Update)
{
    /*
        Model transformation code here ...
    */
}

//~> `view` will borrow an instance of App, an instance of Model and
//   an instance of Frame.
fn view(app: &App, model: &Model, frame: Frame)
{
    /*
        Code for configuring the rendering window ...
    */
}
```
