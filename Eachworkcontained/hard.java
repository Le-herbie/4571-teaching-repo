import java.util.Scanner;
public class hard {
    Scanner scanner = new Scanner(System.in);
	private String value;
    boolean useDefault;
    boolean useDefault = scanner.nextBoolean();
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
}
