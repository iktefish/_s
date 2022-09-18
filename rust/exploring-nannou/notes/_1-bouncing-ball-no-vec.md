# Bouncing Ball (no vector)

## Goal

We want to hold state of the co-ordinates of the ball and its translation
delta. The value of the translation delta will be the speed of the ball
and the sign will represent its direction.

> Nannou uses the Cartesian co-ordinate system.

## Implementation

### Model

Create a structure to hold the state of the app. We want the x and y
co-ordinates, since we need to change them to reposition the ball, and we will
also want to hold the translation delta values (calling them x_vel and y_vel)
too because we will need to alter their signs in-order to change direction. They
represent the velocity of x and y components of the ball.

```rust
struct Model
{
    x: f32,
    y: f32,
    x_vel: f32,
    y_vel: f32,
}
```

Now we generate initial model for the app and create window:

```rust
fn model(app: &App) -> Model
{
    let (x, y, x_vel, y_vel) = (0.0, 0.0, 2.5, 2.0);
    let _window = app.new_window().size(1200, 600).view(view).build().unwrap();
    println!("win_rectangle: {:?}", app.window_rect());

    Model { x, y, x_vel, y_vel }
}
```

### Update

Creating the `update` function. `model.x` and `model.y` will change by the
value of `model.x_vel` and `model.y_vel` respectively. To bounce the ball off
the edges, we want to change the direction we simply invert the sign of the
respective velocity components (depending on the edge where collision occurs).
To check when we reach the edge, we check if the current co-ordinates of the
ball exceed the co-ordinates of the edge.

We can get the co-ordinates of the edges using `app.window_rect()` which
returns the `Rect` struct for the current window:

```rust
let win_rectangle = app.window_rect();
println!("win_rectangle: {}", win_rectangle);

//--[ OUTPUT ]-> win_rectangle: Rect { x: Range { start: -600.0, end: 600.0 }, y: Range { start: -300.0, end: 300.0 } }
```

Putting it all togather:

```rust
fn update(app: &App, model: &mut Model, _update: Update)
{
    model.x = model.x + model.x_vel;
    model.y = model.y + model.y_vel;

    let win_rectangle = app.window_rect();

    if (model.x > win_rectangle.right()) || (model.x < win_rectangle.left()) {
        model.x_vel = model.x_vel * -1.0;
    }
    if (model.y > win_rectangle.top()) || (model.y < win_rectangle.bottom()) {
        model.y_vel = model.y_vel * -1.0;
    }
}
```

### View

Draw the app, then draw the ball and srt its x, y co-ordinates to `model.x` and
`model.y` respectively:

```rust
fn view(app: &App, model: &Model, frame: Frame)
{
    let draw = app.draw();
    draw.background().color(WHITE);

    draw.ellipse()
        .x_y(model.x, model.y)
        .w_h(50.0, 50.0)
        .rgba(0.5, 0.5, 0.5, 1.0)
        .stroke(BLACK);

    draw.to_frame(app, &frame).unwrap();
}
```

## Changes

The ball bounces when its center collides with the edge of the window.
This is because the ball's dimensions are `50.0 x 50.0`. But we are matching
co-ordinates of the center of the ball with that of the edges. We need to
have an offset of `width/2` and `height/2` in-order to have the ball bounce
on collision with its surface:

```rust
fn update(app: &App, model: &mut Model, _update: Update)
{
    model.x = model.x + model.x_vel;
    model.y = model.y + model.y_vel;

    let win_rectangle = app.window_rect();

    if (model.x + 25.0 > win_rectangle.right()) || (model.x - 25.0 < win_rectangle.left()) {
        model.x_vel = model.x_vel * -1.0;
    }
    if (model.y + 25.0 > win_rectangle.top()) || (model.y - 25.0 < win_rectangle.bottom()) {
        model.y_vel = model.y_vel * -1.0;
    }
}
```
