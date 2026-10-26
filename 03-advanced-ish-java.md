# 3) Advanced-ish Java

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
