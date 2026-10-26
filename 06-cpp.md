# 6) Medium C++

Focus: class, constructor, vector, range-based loop, function use

```cpp
#include <iostream>
#include <vector>
using namespace std;

class Robot {
private:
    int speed;

public:
    Robot(int s) : speed(s) {}

    void drive() {
        cout << "Driving at speed: " << speed << endl;
    }
};

int main() {
    vector<int> speeds = {10, 20, 30};

    for (int s : speeds) {
        Robot bot(s);
        bot.drive();
    }

    return 0;
}
```

What students should notice:
- `class` creates a custom type
- `Robot(int s) : speed(s)` is a constructor initializer
- `vector<int>` stores multiple values
- `for (int s : speeds)` is a range-based loop

## Quick Teaching Tip

Ask students to identify:
- Where the program starts
- What controls the flow of execution
- How values are stored and reused
- What syntax is different across the languages

This makes the examples useful for syntax comparison, not just code copying.
