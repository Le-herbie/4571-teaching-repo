public class BuggyReturn {
    public static int add(int a, int b) {
        System.out.println(a + b);
    }

    public static void main(String[] args) {
        int total = add(3, 4);
        System.out.println(total);
    }
}
