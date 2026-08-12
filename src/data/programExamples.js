export const programExamplesByChapter = {
  1: [
    {
      title: 'Basic Input and Output',
      idea: 'Read values, store them in variables, and print a result.',
      code: `#include <stdio.h>

int main(void) {
  int age;
  printf("Enter age: ");
  scanf("%d", &age);
  printf("Age entered = %d\\n", age);
  return 0;
}`,
    },
    {
      title: 'Arithmetic Expression',
      idea: 'Use variables and operators to calculate a final value.',
      code: `#include <stdio.h>

int main(void) {
  int length = 12, breadth = 8;
  int area = length * breadth;
  printf("Area = %d\\n", area);
  return 0;
}`,
    },
  ],
  2: [
    {
      title: 'Eligibility Check',
      idea: 'Use a condition to decide whether a user is eligible.',
      code: `int age = 18;

if (age >= 18) {
  printf("Eligible\\n");
} else {
  printf("Not eligible\\n");
}`,
    },
    {
      title: 'Grade Decision',
      idea: 'Use an else-if ladder when marks fall into different ranges.',
      code: `int marks = 68;

if (marks >= 75) {
  printf("Distinction\\n");
} else if (marks >= 50) {
  printf("Pass\\n");
} else {
  printf("Fail\\n");
}`,
    },
  ],
  3: [
    {
      title: 'while Loop',
      idea: 'Use `while` when repetition depends on a condition that may change during the loop.',
      code: `int n = 1;

while (n <= 5) {
  printf("%d\\n", n);
  n++;
}`,
    },
    {
      title: 'for Loop',
      idea: 'Use `for` when the number of repetitions is known.',
      code: `for (int i = 1; i <= 5; i++) {
  printf("%d\\n", i);
}`,
    },
    {
      title: 'Nested Loops',
      idea: 'Use nested loops when one repeated task must happen inside another, like rows and columns.',
      code: `for (int row = 1; row <= 3; row++) {
  for (int col = 1; col <= 4; col++) {
    printf("* ");
  }
  printf("\\n");
}`,
    },
    {
      title: 'Multiple Initialisation in for',
      idea: 'A `for` loop can start and update more than one variable when both move together.',
      code: `for (int i = 1, j = 5; i <= 5; i++, j--) {
  printf("i=%d j=%d\\n", i, j);
}`,
    },
    {
      title: 'break Statement',
      idea: '`break` exits the nearest loop immediately when the target is found or a stop condition appears.',
      code: `int numbers[] = {4, 8, 15, 16, 23};
int target = 15;

for (int i = 0; i < 5; i++) {
  if (numbers[i] == target) {
    printf("Found at index %d\\n", i);
    break;
  }
}`,
    },
    {
      title: 'continue Statement',
      idea: '`continue` skips the remaining statements in the current turn and moves to the next loop cycle.',
      code: `for (int n = 1; n <= 10; n++) {
  if (n % 2 != 0) {
    continue;
  }
  printf("%d\\n", n);
}`,
    },
    {
      title: 'do-while Loop',
      idea: 'Use `do-while` when the loop body must run at least once, such as a menu.',
      code: `int choice;

do {
  printf("1. Add  2. View  0. Exit\\n");
  scanf("%d", &choice);
  printf("Choice = %d\\n", choice);
} while (choice != 0);`,
    },
    {
      title: 'Input Until Stop',
      idea: 'A sentinel value, like `0`, can tell a loop when to stop.',
      code: `int n;
scanf("%d", &n);

while (n != 0) {
  printf("You typed %d\\n", n);
  scanf("%d", &n);
}`,
    },
  ],
  4: [
    {
      title: 'Menu With switch',
      idea: 'Use `switch` for exact menu choices.',
      code: `int choice = 1;

switch (choice) {
  case 1: printf("New file\\n"); break;
  case 2: printf("Open file\\n"); break;
  default: printf("Unknown choice\\n");
}`,
    },
    {
      title: 'Grouped Cases',
      idea: 'Group multiple cases when different inputs mean the same action.',
      code: `char answer = 'Y';

switch (answer) {
  case 'y':
  case 'Y':
    printf("Confirmed\\n");
    break;
  default:
    printf("Cancelled\\n");
}`,
    },
  ],
  5: [
    {
      title: 'Function Returning Value',
      idea: 'Functions make repeated work reusable and readable.',
      code: `int square(int n) {
  return n * n;
}

printf("%d\\n", square(6));`,
    },
    {
      title: 'Pointer Update',
      idea: 'Pass an address when a function must change the original variable.',
      code: `void addBonus(int *marks) {
  *marks = *marks + 5;
}`,
    },
  ],
  6: [
    {
      title: 'Type Size Check',
      idea: 'Use `sizeof` to understand how much memory a type uses.',
      code: `printf("int size = %zu\\n", sizeof(int));
printf("double size = %zu\\n", sizeof(double));`,
    },
    {
      title: 'Static Counter',
      idea: '`static` keeps a local variable alive between function calls.',
      code: `int nextNumber(void) {
  static int n = 1;
  return n++;
}`,
    },
  ],
  7: [
    {
      title: 'Constant Macro',
      idea: 'Use macros for simple compile-time constants.',
      code: `#define LIMIT 100

if (score > LIMIT) {
  printf("Invalid score\\n");
}`,
    },
    {
      title: 'Include Guard',
      idea: 'Prevent a header file from being included more than once.',
      code: `#ifndef STUDENT_H
#define STUDENT_H

struct Student { int rollNo; };

#endif`,
    },
  ],
  8: [
    {
      title: 'Array Total',
      idea: 'Loop through array indexes from `0` to `length - 1`.',
      code: `int a[] = {10, 20, 30};
int sum = 0;

for (int i = 0; i < 3; i++) {
  sum += a[i];
}`,
    },
    {
      title: 'Matrix Print',
      idea: 'Use nested loops for two-dimensional arrays.',
      code: `int m[2][2] = {{1, 2}, {3, 4}};

for (int i = 0; i < 2; i++)
  for (int j = 0; j < 2; j++)
    printf("%d ", m[i][j]);`,
    },
  ],
  9: [
    {
      title: 'String Length Loop',
      idea: 'A string ends when the null character `\\0` appears.',
      code: `int i = 0;
char name[] = "C Notes";

while (name[i] != '\\0') {
  i++;
}
printf("Length = %d\\n", i);`,
    },
    {
      title: 'Safe Line Input',
      idea: '`fgets` can read spaces and limit input size.',
      code: `char city[30];

fgets(city, sizeof city, stdin);
printf("City: %s", city);`,
    },
  ],
  10: [
    {
      title: 'Structure Variable',
      idea: 'A structure groups related values into one record.',
      code: `struct Book {
  int id;
  char title[40];
  float price;
};

struct Book b = {1, "C Guide", 250.0f};`,
    },
    {
      title: 'Pointer To Structure',
      idea: 'Use `->` when accessing fields through a structure pointer.',
      code: `struct Book *ptr = &b;
printf("%s %.2f\\n", ptr->title, ptr->price);`,
    },
  ],
  11: [
    {
      title: 'Formatted Output',
      idea: 'Format specifiers control how values appear on screen.',
      code: `int qty = 3;
float price = 45.5f;

printf("%-10s %3d %8.2f\\n", "Pen", qty, price);`,
    },
    {
      title: 'Character Input',
      idea: '`getchar` reads one character at a time.',
      code: `char ch;

ch = getchar();
putchar(ch);`,
    },
  ],
  12: [
    {
      title: 'Write To File',
      idea: 'Open a file, write data, then close it.',
      code: `FILE *fp = fopen("log.txt", "w");

if (fp != NULL) {
  fprintf(fp, "Started\\n");
  fclose(fp);
}`,
    },
    {
      title: 'Read Characters',
      idea: 'Read until `EOF` to process the whole file.',
      code: `int ch;
FILE *fp = fopen("log.txt", "r");

while ((ch = fgetc(fp)) != EOF) {
  putchar(ch);
}`,
    },
  ],
  13: [
    {
      title: 'Command-Line Name',
      idea: '`argc` counts arguments and `argv` stores them as strings.',
      code: `int main(int argc, char *argv[]) {
  if (argc > 1)
    printf("Hello %s\\n", argv[1]);
  return 0;
}`,
    },
    {
      title: 'Error Stream',
      idea: 'Use `stderr` for error messages.',
      code: `if (argc < 2) {
  fprintf(stderr, "Filename required\\n");
  return 1;
}`,
    },
  ],
  14: [
    {
      title: 'Set A Bit',
      idea: 'Use OR with a mask to turn a bit on.',
      code: `unsigned int flags = 0;
flags = flags | (1u << 3);`,
    },
    {
      title: 'Test A Bit',
      idea: 'Use AND with a mask to check whether a bit is on.',
      code: `if (flags & (1u << 3)) {
  printf("Bit is on\\n");
}`,
    },
  ],
  15: [
    {
      title: 'Enum State',
      idea: 'Enums make integer states easier to read.',
      code: `enum Mode { READ, WRITE, APPEND };
enum Mode current = WRITE;`,
    },
    {
      title: 'Union Storage',
      idea: 'A union stores different fields in the same memory space.',
      code: `union Value {
  int i;
  float f;
};

union Value v;
v.f = 12.5f;`,
    },
  ],
  16: [
    {
      title: 'Message Loop Idea',
      idea: 'Window programs usually wait for messages and dispatch them.',
      code: `while (GetMessage(&msg, NULL, 0, 0)) {
  TranslateMessage(&msg);
  DispatchMessage(&msg);
}`,
    },
    {
      title: 'Type Alias',
      idea: 'Windows-style C often uses `typedef` names for platform types.',
      code: `typedef unsigned long DWORD;
DWORD fileSize = 2048;`,
    },
  ],
  17: [
    {
      title: 'Fake Window Message',
      idea: 'Use a handler function to react to different event codes.',
      code: `void handleMessage(int msg) {
  if (msg == 1) printf("Paint\\n");
  else if (msg == 2) printf("Click\\n");
}`,
    },
    {
      title: 'Close Event',
      idea: 'A close message should end the event loop cleanly.',
      code: `if (message == CLOSE_EVENT) {
  running = 0;
}`,
    },
  ],
  18: [
    {
      title: 'Shape Record',
      idea: 'Graphics programs often store shapes as data before drawing.',
      code: `struct Rect {
  int x, y, width, height;
};

struct Rect r = {10, 20, 80, 40};`,
    },
    {
      title: 'Animation Update',
      idea: 'Animation changes state repeatedly, then redraws.',
      code: `int x = 0;

for (int frame = 0; frame < 5; frame++) {
  x += 10;
  printf("Draw at x=%d\\n", x);
}`,
    },
  ],
  19: [
    {
      title: 'Safe Device Steps',
      idea: 'Low-level access should always be explicit and permission-aware.',
      code: `printf("Ask permission\\n");
printf("Open device\\n");
printf("Use documented API\\n");
printf("Close device\\n");`,
    },
    {
      title: 'Validate Device Number',
      idea: 'Never trust raw device-like input without checking range.',
      code: `int sector;
scanf("%d", &sector);

if (sector >= 0 && sector < 1024)
  printf("Valid sector\\n");`,
    },
  ],
  20: [
    {
      title: 'Print Process ID',
      idea: 'Linux gives every process a process ID.',
      code: `#include <unistd.h>

printf("PID = %d\\n", getpid());`,
    },
    {
      title: 'Parent And Child',
      idea: '`fork` creates a child process and returns different values.',
      code: `pid_t pid = fork();

if (pid == 0)
  printf("Child\\n");
else
  printf("Parent\\n");`,
    },
  ],
  21: [
    {
      title: 'Signal Handler',
      idea: 'Register a function to react when a signal arrives.',
      code: `void handle(int sig) {
  printf("Signal %d\\n", sig);
}

signal(SIGINT, handle);`,
    },
    {
      title: 'Wait For Signal',
      idea: '`pause` stops the process until a signal is received.',
      code: `signal(SIGINT, handle);

while (1) {
  pause();
}`,
    },
  ],
};
