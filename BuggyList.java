import java.util.ArrayList;
import java.util.List;

public class BuggyList {
    public static void main(String[] args) {
        List<int> numbers = new ArrayList<>();
        numbers.add(3);
        numbers.add(5);
        System.out.println(numbers.size());
    }
}
