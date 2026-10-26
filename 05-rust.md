# 5) Medium Rust

Focus: struct, impl, enum, match, ownership basics

```rust
struct Robot {
    speed: f32,
}

impl Robot {
    fn new(speed: f32) -> Self {
        Self { speed }
    }

    fn drive(&self, distance: f32) -> f32 {
        self.speed * distance
    }
}

enum Mode {
    Auto,
    TeleOp,
}

fn main() {
    let bot = Robot::new(3.5);
    let mode = Mode::TeleOp;

    match mode {
        Mode::Auto => println!("Robot is driving autonomous."),
        Mode::TeleOp => println!("Distance driven: {}", bot.drive(2.0)),
    }
}
```

What students should notice:
- `struct` creates a custom data type
- `impl` adds methods
- `match` is Rust’s pattern-matching control flow
- `&self` means borrowing the object instead of taking ownership
