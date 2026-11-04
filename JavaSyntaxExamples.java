import java.util.ArrayList;

/**
 * A small, runnable tour of common Java syntax and object-oriented concepts.
 * Compile with: javac JavaSyntaxExamples.java
 * Run with:     java JavaSyntaxExamples
 */
public class JavaSyntaxExamples {
    // Constants and fields belong to the class, rather than to one object.
    private static final String COURSE = "Java Basics";

    public static void main(String[] args) {
        // Variables, primitive types, strings, and simple operators.
        String studentName = "Alex";
        int startingScore = 82;
        double bonus = 4.5;
        boolean hasSubmitted = true;
        int score = startingScore + (int) bonus;

        // Create objects by calling a constructor.
        Student student = new Student(studentName, score, hasSubmitted);
        Student guest = new Student("Sam"); // Uses the other constructor.

        System.out.println("Course: " + COURSE);
        System.out.println(student.describe());
        System.out.println(guest.describe());

        // if / else and comparisons.
        if (student.getScore() >= 90) {
            System.out.println(student.getName() + " earned an A.");
        } else if (student.getScore() >= 70) {
            System.out.println(student.getName() + " passed.");
        } else {
            System.out.println(student.getName() + " should keep practicing.");
        }

        // Arrays have a fixed size; use indexes from 0 to length - 1.
        int[] quizScores = {78, 91, 85};
        int total = 0;
        for (int i = 0; i < quizScores.length; i++) {
            total += quizScores[i];
        }
        double average = (double) total / quizScores.length;
        System.out.println("Quiz average: " + average);

        // Enhanced for loops are convenient when an index is not needed.
        for (int quizScore : quizScores) {
            System.out.println("Quiz score: " + quizScore);
        }

        // ArrayList can grow or shrink as items are added and removed.
        ArrayList<Student> classList = new ArrayList<>();
        classList.add(student);
        classList.add(guest);
        for (Student member : classList) {
            System.out.println(member.getName() + " is in the class.");
        }

        // Inheritance: HonorsStudent reuses Student behavior and overrides describe().
        Student honorsStudent = new HonorsStudent("Jordan", 96, true, "Robotics");
        System.out.println(honorsStudent.describe());

        // A static method can be called using the class name.
        System.out.println("Is 96 a passing score? " + Student.isPassing(96));

        // try / catch handles an exception without stopping the whole program.
        try {
            System.out.println("Score as a percentage: " + percentage(96, 100) + "%");
        } catch (IllegalArgumentException exception) {
            System.out.println("Could not calculate percentage: " + exception.getMessage());
        }
    }

    // A method with parameters, a return type, and input validation.
    private static int percentage(int points, int possiblePoints) {
        if (possiblePoints <= 0) {
            throw new IllegalArgumentException("possible points must be greater than zero");
        }
        return points * 100 / possiblePoints;
    }
}

// An interface describes behavior that implementing classes provide.
interface Describable {
    String describe();
}

// A class combines state (fields) and behavior (methods).
class Student implements Describable {
    private final String name;
    private int score;
    private boolean submitted;

    // Constructor: same name as the class, with no return type.
    public Student(String name, int score, boolean submitted) {
        this.name = name;
        this.score = score;
        this.submitted = submitted;
    }

    // Constructor overloading: a second way to create a Student.
    public Student(String name) {
        this(name, 0, false); // Calls the other constructor.
    }

    // Getters and setters control access to private fields (encapsulation).
    public String getName() {
        return name;
    }

    public int getScore() {
        return score;
    }

    public void setScore(int score) {
        if (score < 0 || score > 100) {
            throw new IllegalArgumentException("score must be from 0 to 100");
        }
        this.score = score;
    }

    public boolean hasSubmitted() {
        return submitted;
    }

    public void setSubmitted(boolean submitted) {
        this.submitted = submitted;
    }

    // static methods belong to the class; they do not need a Student object.
    public static boolean isPassing(int score) {
        return score >= 70;
    }

    @Override
    public String describe() {
        return name + " scored " + score + ". Submitted: " + submitted;
    }
}

// extends demonstrates inheritance; super(...) invokes the parent constructor.
class HonorsStudent extends Student {
    private final String project;

    public HonorsStudent(String name, int score, boolean submitted, String project) {
        super(name, score, submitted);
        this.project = project;
    }

    @Override
    public String describe() {
        return super.describe() + " Honors project: " + project + ".";
    }
}
