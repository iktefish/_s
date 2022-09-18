use nannou::prelude::*;

fn main()
{
    nannou::app(model).update(update).run();
}

struct Model
{
    x: f32,
    y: f32,
    x_vel: f32,
    y_vel: f32,
}

fn model(app: &App) -> Model
{
    let (x, y, x_vel, y_vel) = (0.0, 0.0, 2.5, 2.0);
    let _window = app.new_window().size(1200, 600).view(view).build().unwrap();
    println!("win_rectangle: {:?}", app.window_rect());

    Model { x, y, x_vel, y_vel }
}

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
