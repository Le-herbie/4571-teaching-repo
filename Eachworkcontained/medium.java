import java.util.Scanner;
public class medium{
    public static void main(String[] args){
        Scanner scanner = new Scanner(System.in);
        System.out.println("Enter in your team number: ");
        int a = scanner.nextInt();
        System.out.println("Enter in your teams most recent scoring average");
        double b = scanner.nextDouble();
        System.out.println("Finally enter in your teams name");
        scanner.nextLine();
        String c = scanner.nextLine();
        System.out.print("Loading.......");
        System.out.println(": Hello admin user of " + c + ": " + a + " your teams score average was " + b);

    }
}