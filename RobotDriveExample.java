public class RobotDriveExample {
    private final int leftMotor;
    private final int rightMotor;

    public RobotDriveExample(int leftMotor, int rightMotor) {
        this.leftMotor = leftMotor;
        this.rightMotor = rightMotor;
    }

    public void arcadeDrive(double forward, double turn) {
        int left = (int) Math.round(forward + turn);
        int right = (int) Math.round(forward - turn);

        System.out.println("Left motor: " + left + " | Right motor: " + right);
    }

    public static void main(String[] args) {
        RobotDriveExample robot = new RobotDriveExample(0, 1);
        robot.arcadeDrive(0.75, 0.20);
    }
}
