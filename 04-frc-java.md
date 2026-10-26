# 4) Medium FRC Java

Focus: WPILib robot code, controller input, drivetrain movement

```java
import edu.wpi.first.wpilibj.TimedRobot;
import edu.wpi.first.wpilibj.XboxController;
import edu.wpi.first.wpilibj.drive.DifferentialDrive;
import edu.wpi.first.wpilibj.motorcontrol.PWMSparkMax;

public class Robot extends TimedRobot {
    private final XboxController controller = new XboxController(0);
    private final DifferentialDrive drive =
            new DifferentialDrive(
                    new PWMSparkMax(0),
                    new PWMSparkMax(1)
            );

    @Override
    public void teleopPeriodic() {
        double forward = -controller.getLeftY();
        double turn = controller.getLeftX();

        drive.arcadeDrive(forward, turn);
    }
}
```

What students should notice:
- `extends TimedRobot` creates a robot program
- `teleopPeriodic()` runs during driver control
- `XboxController` reads joystick values
- `arcadeDrive(forward, turn)` is common FRC driving syntax
