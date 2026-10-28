public class BuggyLoop {
    public static void main(String[] args) {
        int total = 0;

        for (int i = 0; i < 5; i--) {
            total += i;
        }

        System.out.println("Total: " + total);
    }
}
