# Syntax Practice Snippets for Students

These are six short, syntax-focused examples from beginner to intermediate. They are designed to help students notice how different languages structure logic, classes, loops, and control flow.

## 1) Beginner Java
Focus: variables, if, for loop, printing

```java
public class BeginnerJava {
    public static void main(String[] args) {
        int score = 10;

        if (score >= 10) {
            System.out.println("You win!");
        } else {
            System.out.println("Try again!");
        }

        for (int i = 1; i <= 3; i++) {
            System.out.println("Round " + i);
        }
    }
}
```

What students should notice:
- `int` is a variable type
- `if` and `else` control decision-making
- `for` repeats code
- `System.out.println()` prints to the console

## 2) Semi-beginner Java
Focus: class, constructor, methods, arrays

```java
class Student {
    private String name;
    private int grade;

    public Student(String name, int grade) {
        this.name = name;
        this.grade = grade;
    }

    public void printInfo() {
        System.out.println("Student: " + name + " | Grade: " + grade);
    }
}

public class SemiBeginnerJava {
    public static void main(String[] args) {
        Student[] students = {
            new Student("Ava", 92),
            new Student("Leo", 87),
            new Student("Mia", 95)
        };

        for (Student s : students) {
            s.printInfo();
        }
    }
}
```

What students should notice:
- A class has fields and methods
- `this` refers to the current object
- Arrays hold multiple objects
- Enhanced `for` loop (`for (Student s : students)`)

## 3) Advanced-ish Java
Focus: inheritance, interface, generics, stream-like list usage

```java
interface Printable {
    void print();
}

class Animal {
    protected String name;

    public Animal(String name) {
        this.name = name;
    }

    public void speak() {
        System.out.println(name + " makes a sound.");
    }
}

class Dog extends Animal implements Printable {
    public Dog(String name) {
        super(name);
    }

    @Override
    public void print() {
        System.out.println("Dog: " + name);
    }
}

public class AdvancedishJava {
    public static <T> void printList(java.util.List<T> items) {
        for (T item : items) {
            System.out.println(item);
        }
    }

    public static void main(String[] args) {
        java.util.List<String> names = java.util.List.of("Ava", "Ben", "Cara");

        printList(names);

        Dog dog = new Dog("Buddy");
        dog.speak();
        dog.print();
    }
}
```

What students should notice:
- `extends` means inheritance
- `implements` means interface
- `<T>` is a generic type
- `List.of(...)` is a quick way to create a list

## 4) Medium FRC Java
Focus: WPILib robot code, controller input, drivetrain movement

```java
import edu.wpi.first.wpilibj.TimedRobot;
import edu.wpi.first.wpilibj.XboxController;
import edu.wpi.first.wpilibj.drive.DifferentialDrive;
import edu.wpi.first.wpilibj.motorcontrol.PWMSparkMax;

public class Robot extends TimedRobot {
    private final XboxController controller = new XboxController(0);
    private final DifferentialDrive drive =
            new DifferentialDrive(
                    new PWMSparkMax(0),
                    new PWMSparkMax(1)
            );

    @Override
    public void teleopPeriodic() {
        double forward = -controller.getLeftY();
        double turn = controller.getLeftX();

        drive.arcadeDrive(forward, turn);
    }
}
```

What students should notice:
- `extends TimedRobot` creates a robot program
- `teleopPeriodic()` runs during driver control
- `XboxController` reads joystick values
- `arcadeDrive(forward, turn)` is common FRC driving syntax

## 5) Medium Rust
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

## 6) Medium C++
Focus: class, constructor, vector, range-based loop, function use

```cpp
#include <iostream>
#include <vector>
using namespace std;

class Robot {
private:
    int speed;

public:
    Robot(int s) : speed(s) {}

    void drive() {
        cout << "Driving at speed: " << speed << endl;
    }
};

int main() {
    vector<int> speeds = {10, 20, 30};

    for (int s : speeds) {
        Robot bot(s);
        bot.drive();
    }

    return 0;
}
```

What students should notice:
- `class` creates a custom type
- `Robot(int s) : speed(s)` is a constructor initializer
- `vector<int>` stores multiple values
- `for (int s : speeds)` is a range-based loop

## Quick Teaching Tip
Ask students to identify:
- Where the program starts
- What controls the flow of execution
- How values are stored and reused
- What syntax is different across the languages

This makes the examples useful for syntax comparison, not just code copying.
