import java.util.Scanner;
public class hard {
	private String value;
	public hard(boolean useDefault) {
		if (useDefault) {
			value = "default";
		} else {
			value = "custom";
		}
	}
    public hard() {
        this(true);
    }

	public String getValue() {
		return value;
	}
    public static void main(String[] args) {
        hard obj1 = new hard();
        System.out.println("Value from default constructor: " + obj1.getValue());
        Scanner scanner = new Scanner(System.in);
        System.out.println("Enter true for default or false for custom: ");
        boolean useDefault = scanner.nextBoolean();

        hard obj2 = new hard(useDefault);
        System.out.println("Value from parameterized constructor: " + obj2.getValue());
    }
}
