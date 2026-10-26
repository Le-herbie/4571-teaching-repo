# 2) Semi-beginner Java

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
