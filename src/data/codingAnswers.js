export const codingAnswersByChapter = {
  1: [
    `#include <stdio.h>

int main(void) {
  int a, b;
  scanf("%d %d", &a, &b);
  printf("Sum = %d\\n", a + b);
  printf("Difference = %d\\n", a - b);
  printf("Product = %d\\n", a * b);
  printf("Quotient = %.2f\\n", (float)a / b);
  printf("Remainder = %d\\n", a % b);
  return 0;
}`,
    `#include <stdio.h>

int main(void) {
  float celsius, fahrenheit;
  scanf("%f", &celsius);
  fahrenheit = (celsius * 9 / 5) + 32;
  printf("Fahrenheit = %.2f\\n", fahrenheit);
  return 0;
}`,
    `#include <stdio.h>

int main(void) {
  float principal, rate, time, interest;
  scanf("%f %f %f", &principal, &rate, &time);
  interest = (principal * rate * time) / 100;
  printf("Simple interest = %.2f\\n", interest);
  return 0;
}`,
    `#include <stdio.h>

int main(void) {
  int a, b, temp;
  scanf("%d %d", &a, &b);
  printf("Before: a=%d b=%d\\n", a, b);
  temp = a;
  a = b;
  b = temp;
  printf("After: a=%d b=%d\\n", a, b);
  return 0;
}`,
    `#include <stdio.h>

int main(void) {
  float m1, m2, m3, total, percent;
  scanf("%f %f %f", &m1, &m2, &m3);
  total = m1 + m2 + m3;
  percent = total / 3;
  printf("Total = %.2f\\nPercentage = %.2f\\n", total, percent);
  return 0;
}`,
  ],
  2: [
    `#include <stdio.h>

int main(void) {
  int n;
  scanf("%d", &n);
  if (n > 0)
    printf("Positive\\n");
  else if (n < 0)
    printf("Negative\\n");
  else
    printf("Zero\\n");
  return 0;
}`,
    `#include <stdio.h>

int main(void) {
  int a, b, c;
  scanf("%d %d %d", &a, &b, &c);
  if (a >= b) {
    if (a >= c) printf("%d is greatest\\n", a);
    else printf("%d is greatest\\n", c);
  } else {
    if (b >= c) printf("%d is greatest\\n", b);
    else printf("%d is greatest\\n", c);
  }
  return 0;
}`,
    `#include <stdio.h>

int main(void) {
  int marks;
  scanf("%d", &marks);
  if (marks >= 90) printf("Grade A\\n");
  else if (marks >= 75) printf("Grade B\\n");
  else if (marks >= 50) printf("Grade C\\n");
  else printf("Fail\\n");
  return 0;
}`,
    `#include <stdio.h>

int main(void) {
  int year;
  scanf("%d", &year);
  if ((year % 400 == 0) || (year % 4 == 0 && year % 100 != 0))
    printf("Leap year\\n");
  else
    printf("Not a leap year\\n");
  return 0;
}`,
    `#include <stdio.h>

int main(void) {
  int n;
  scanf("%d", &n);
  printf("%s\\n", n % 2 == 0 ? "Even" : "Odd");
  return 0;
}`,
  ],
  3: [
    `#include <stdio.h>

int main(void) {
  int n;
  scanf("%d", &n);
  for (int i = 1; i <= 10; i++)
    printf("%d x %d = %d\\n", n, i, n * i);
  return 0;
}`,
    `#include <stdio.h>

int main(void) {
  int n, sum = 0;
  scanf("%d", &n);
  while (n != 0) {
    sum += n % 10;
    n /= 10;
  }
  printf("Sum of digits = %d\\n", sum);
  return 0;
}`,
    `#include <stdio.h>

int main(void) {
  int n, rev = 0;
  scanf("%d", &n);
  while (n != 0) {
    rev = rev * 10 + n % 10;
    n /= 10;
  }
  printf("Reverse = %d\\n", rev);
  return 0;
}`,
    `#include <stdio.h>

int main(void) {
  int choice;
  do {
    printf("1.Say Hello 2.Say Bye 0.Exit\\n");
    scanf("%d", &choice);
    if (choice == 1) printf("Hello\\n");
    else if (choice == 2) printf("Bye\\n");
  } while (choice != 0);
  return 0;
}`,
    `#include <stdio.h>

int main(void) {
  for (int n = 2; n <= 100; n++) {
    int prime = 1;
    for (int i = 2; i * i <= n; i++) {
      if (n % i == 0) {
        prime = 0;
        break;
      }
    }
    if (prime) printf("%d ", n);
  }
  return 0;
}`,
  ],
  4: [
    `#include <stdio.h>

int main(void) {
  int a, b, choice;
  scanf("%d %d %d", &a, &b, &choice);
  switch (choice) {
    case 1: printf("%d\\n", a + b); break;
    case 2: printf("%d\\n", a - b); break;
    case 3: printf("%d\\n", a * b); break;
    case 4: printf("%.2f\\n", (float)a / b); break;
    default: printf("Invalid choice\\n");
  }
  return 0;
}`,
    `#include <stdio.h>

int main(void) {
  int day;
  scanf("%d", &day);
  switch (day) {
    case 1: printf("Monday\\n"); break;
    case 2: printf("Tuesday\\n"); break;
    case 3: printf("Wednesday\\n"); break;
    case 4: printf("Thursday\\n"); break;
    case 5: printf("Friday\\n"); break;
    case 6: printf("Saturday\\n"); break;
    case 7: printf("Sunday\\n"); break;
    default: printf("Invalid day\\n");
  }
  return 0;
}`,
    `#include <stdio.h>
#define PI 3.14159

int main(void) {
  int choice;
  float r, l, b, h;
  scanf("%d", &choice);
  switch (choice) {
    case 1: scanf("%f", &r); printf("%.2f\\n", PI * r * r); break;
    case 2: scanf("%f %f", &l, &b); printf("%.2f\\n", l * b); break;
    case 3: scanf("%f %f", &b, &h); printf("%.2f\\n", 0.5f * b * h); break;
    default: printf("Invalid choice\\n");
  }
  return 0;
}`,
    `#include <stdio.h>

int main(void) {
  char ch;
  scanf(" %c", &ch);
  switch (ch) {
    case 'a': case 'e': case 'i': case 'o': case 'u':
    case 'A': case 'E': case 'I': case 'O': case 'U':
      printf("Vowel\\n");
      break;
    default:
      printf("Consonant\\n");
  }
  return 0;
}`,
    `#include <stdio.h>

int main(void) {
  char choice;
  scanf(" %c", &choice);
  switch (choice) {
    case 'y':
    case 'Y':
      printf("Yes selected\\n");
      break;
    case 'n':
    case 'N':
      printf("No selected\\n");
      break;
    default:
      printf("Invalid choice\\n");
  }
  return 0;
}`,
  ],
  5: [
    `int maxOfThree(int a, int b, int c) {
  int max = a;
  if (b > max) max = b;
  if (c > max) max = c;
  return max;
}`,
    `void swap(int *a, int *b) {
  int temp = *a;
  *a = *b;
  *b = temp;
}`,
    `int factorial(int n) {
  if (n == 0 || n == 1) return 1;
  return n * factorial(n - 1);
}`,
    `void sumAndProduct(int a, int b, int *sum, int *product) {
  *sum = a + b;
  *product = a * b;
}`,
    `#include <stdio.h>

void input(float *a, float *b, float *c) {
  scanf("%f %f %f", a, b, c);
}

float percentage(float a, float b, float c) {
  return (a + b + c) / 3;
}

void output(float percent) {
  printf("Percentage = %.2f\\n", percent);
}`,
  ],
  6: [
    `printf("char = %zu\\n", sizeof(char));
printf("int = %zu\\n", sizeof(int));
printf("long = %zu\\n", sizeof(long));
printf("float = %zu\\n", sizeof(float));
printf("double = %zu\\n", sizeof(double));`,
    `#include <stdio.h>

int main(void) {
  signed int a = -1;
  unsigned int b = 1;
  printf("signed = %d\\n", a);
  printf("unsigned = %u\\n", b);
  return 0;
}`,
    `int counter(void) {
  static int count = 0;
  count++;
  return count;
}`,
    `/* file1.c */
int score = 50;

/* file2.c */
extern int score;
printf("%d\\n", score);`,
    `#include <stdio.h>

int main(void) {
  float f = 1.0f / 3.0f;
  double d = 1.0 / 3.0;
  printf("float = %.10f\\n", f);
  printf("double = %.15lf\\n", d);
  return 0;
}`,
  ],
  7: [
    `#define SQUARE(x) ((x) * (x))

int a = 2, b = 3;
printf("%d\\n", SQUARE(5));
printf("%d\\n", SQUARE(a + b));`,
    `#define PI 3.14159

float area(float r) {
  return PI * r * r;
}`,
    `/* math_helpers.h */
#ifndef MATH_HELPERS_H
#define MATH_HELPERS_H
int add(int a, int b);
#endif`,
    `#ifdef _WIN32
  printf("Windows build\\n");
#elif defined(__linux__)
  printf("Linux build\\n");
#else
  printf("Other platform\\n");
#endif`,
    `#define MAX(a, b) ((a) > (b) ? (a) : (b))

int maxFn(int a, int b) {
  return a > b ? a : b;
}`,
  ],
  8: [
    `int a[10], min, max;
for (int i = 0; i < 10; i++) scanf("%d", &a[i]);
min = max = a[0];
for (int i = 1; i < 10; i++) {
  if (a[i] < min) min = a[i];
  if (a[i] > max) max = a[i];
}
printf("Min=%d Max=%d\\n", min, max);`,
    `int marks[5], total = 0;
for (int i = 0; i < 5; i++) {
  scanf("%d", &marks[i]);
  total += marks[i];
}
printf("Average = %.2f\\n", total / 5.0);`,
    `int sumArray(int a[], int n) {
  int sum = 0;
  for (int i = 0; i < n; i++) sum += a[i];
  return sum;
}`,
    `int a[3][3], b[3][3], c[3][3];
for (int i = 0; i < 3; i++)
  for (int j = 0; j < 3; j++)
    c[i][j] = a[i][j] + b[i][j];`,
    `char *names[] = {"Asha", "Ravi", "Meena"};
for (int i = 0; i < 3; i++)
  printf("%s\\n", names[i]);`,
  ],
  9: [
    `int vowels = 0, consonants = 0, digits = 0, spaces = 0;
for (int i = 0; str[i] != '\\0'; i++) {
  char ch = str[i];
  if (ch >= '0' && ch <= '9') digits++;
  else if (ch == ' ') spaces++;
  else if (ch == 'a' || ch == 'e' || ch == 'i' || ch == 'o' || ch == 'u') vowels++;
  else consonants++;
}`,
    `int mystrlen(char s[]) {
  int i = 0;
  while (s[i] != '\\0') i++;
  return i;
}`,
    `void mystrcpy(char dest[], char src[]) {
  int i = 0;
  while (src[i] != '\\0') {
    dest[i] = src[i];
    i++;
  }
  dest[i] = '\\0';
}`,
    `int equal(char a[], char b[]) {
  int i = 0;
  while (a[i] != '\\0' && b[i] != '\\0') {
    if (a[i] != b[i]) return 0;
    i++;
  }
  return a[i] == b[i];
}`,
    `char names[5][30], temp[30];
for (int i = 0; i < 4; i++)
  for (int j = i + 1; j < 5; j++)
    if (strcmp(names[i], names[j]) > 0) {
      strcpy(temp, names[i]);
      strcpy(names[i], names[j]);
      strcpy(names[j], temp);
    }`,
  ],
  10: [
    `struct Student {
  int rollNo;
  char name[30];
  float marks;
};

struct Student s = {1, "Asha", 87.5f};
printf("%d %s %.2f\\n", s.rollNo, s.name, s.marks);`,
    `struct Student s[5];
for (int i = 0; i < 5; i++)
  scanf("%d %s %f", &s[i].rollNo, s[i].name, &s[i].marks);`,
    `int topper = 0;
for (int i = 1; i < 5; i++)
  if (s[i].marks > s[topper].marks)
    topper = i;
printf("Topper: %s\\n", s[topper].name);`,
    `struct Address {
  char city[30];
  int pin;
};

struct Employee {
  int id;
  char name[30];
  struct Address address;
};`,
    `void updateMarks(struct Student *s, float marks) {
  s->marks = marks;
}`,
  ],
  11: [
    `int age;
float height;
char grade;
char name[30];
scanf("%d %f %c %s", &age, &height, &grade, name);`,
    `char item[30];
int qty;
float price;
scanf("%s %d %f", item, &qty, &price);
printf("%-15s %3d %8.2f %8.2f\\n", item, qty, price, qty * price);`,
    `char message[80];
int marks = 87;
sprintf(message, "Marks scored: %d", marks);
printf("%s\\n", message);`,
    `char data[] = "101 Asha 87.5";
int roll;
char name[30];
float marks;
sscanf(data, "%d %s %f", &roll, name, &marks);`,
    `int count = 0;
char ch;
while ((ch = getchar()) != '\\n')
  count++;
printf("Characters = %d\\n", count);`,
  ],
  12: [
    `FILE *fp = fopen("notes.txt", "w");
for (int i = 1; i <= 5; i++)
  fprintf(fp, "Line %d\\n", i);
fclose(fp);`,
    `char line[100];
FILE *fp = fopen("notes.txt", "r");
while (fgets(line, sizeof line, fp) != NULL)
  printf("%s", line);
fclose(fp);`,
    `int ch;
FILE *src = fopen("a.txt", "r");
FILE *dest = fopen("b.txt", "w");
while ((ch = fgetc(src)) != EOF)
  fputc(ch, dest);
fclose(src);
fclose(dest);`,
    `int ch, chars = 0, spaces = 0, tabs = 0, lines = 0;
while ((ch = fgetc(fp)) != EOF) {
  chars++;
  if (ch == ' ') spaces++;
  else if (ch == '\\t') tabs++;
  else if (ch == '\\n') lines++;
}`,
    `struct Employee e = {101, "Asha", 45000};
FILE *fp = fopen("emp.dat", "wb");
fwrite(&e, sizeof e, 1, fp);
fclose(fp);`,
  ],
  13: [
    `int main(int argc, char *argv[]) {
  char line[100];
  if (argc != 2) return 1;
  FILE *fp = fopen(argv[1], "r");
  while (fgets(line, sizeof line, fp)) printf("%s", line);
  fclose(fp);
  return 0;
}`,
    `if (argc != 3) {
  fprintf(stderr, "Usage: app <input> <output>\\n");
  return 1;
}`,
    `printf("Normal result\\n");
fprintf(stderr, "Error: invalid input\\n");`,
    `int ch, inWord = 0, words = 0;
while ((ch = getchar()) != EOF) {
  if (ch == ' ' || ch == '\\n' || ch == '\\t') inWord = 0;
  else if (!inWord) {
    inWord = 1;
    words++;
  }
}
printf("%d\\n", words);`,
    `FILE *in = fopen(argv[1], "r");
FILE *out = fopen(argv[2], "w");
int ch;
while ((ch = fgetc(in)) != EOF) fputc(ch, out);
fclose(in);
fclose(out);`,
  ],
  14: [
    `void showbits(unsigned int n) {
  for (int i = 31; i >= 0; i--)
    printf("%d", (n >> i) & 1);
}`,
    `unsigned int n = 10;
int pos = 1;
if (n & (1u << pos)) printf("Set\\n");
else printf("Not set\\n");`,
    `n |= (1u << pos);   // turn on
n &= ~(1u << pos);  // turn off
n ^= (1u << pos);   // toggle`,
    `unsigned int permissions = 0;
permissions |= 1u << 0;  // read
permissions |= 1u << 1;  // write
permissions |= 1u << 2;  // execute`,
    `int a = 5, b = 9;
a = a ^ b;
b = a ^ b;
a = a ^ b;
printf("%d %d\\n", a, b);`,
  ],
  15: [
    `enum Status { PENDING, RUNNING, DONE };
enum Status task = RUNNING;
if (task == RUNNING) printf("Task is running\\n");`,
    `typedef struct {
  int id;
  char name[30];
} Student;

Student s = {1, "Asha"};`,
    `int add(int a, int b) { return a + b; }
int subtract(int a, int b) { return a - b; }

int (*operation)(int, int) = add;
printf("%d\\n", operation(5, 3));`,
    `union Data {
  int i;
  float f;
  char ch;
};

union Data d;
d.i = 25;`,
    `#include <stdarg.h>

int sum(int count, ...) {
  va_list args;
  int total = 0;
  va_start(args, count);
  for (int i = 0; i < count; i++)
    total += va_arg(args, int);
  va_end(args);
  return total;
}`,
  ],
  16: [
    `int main(void) {
  setupWindow();
  while (getMessage()) {
    translateMessage();
    dispatchMessage();
  }
  cleanupWindow();
  return 0;
}`,
    `typedef unsigned int UINT;
typedef unsigned long DWORD;

UINT count = 10;
DWORD flags = 0;`,
    `#include <stdio.h>

int main(void) {
  printf("Pointer size = %zu bytes\\n", sizeof(void *));
  return 0;
}`,
    `int useResource(void) {
  int handle = openResource();
  if (handle < 0) return 1;
  workWithResource(handle);
  closeResource(handle);
  return 0;
}`,
    `while (running) {
  scanf("%d", &event);
  switch (event) {
    case 1: printf("Create\\n"); break;
    case 2: printf("Paint\\n"); break;
    case 0: running = 0; break;
  }
}`,
  ],
  17: [
    `switch (message) {
  case 1: printf("Create window\\n"); break;
  case 2: printf("Paint window\\n"); break;
  case 3: printf("Close window\\n"); break;
}`,
    `void handleEvent(int event) {
  switch (event) {
    case 1: printf("create\\n"); break;
    case 2: printf("paint\\n"); break;
    case 3: printf("click\\n"); break;
    case 4: printf("close\\n"); break;
  }
}`,
    `switch (buttonId) {
  case 101: printf("Save\\n"); break;
  case 102: printf("Open\\n"); break;
  case 103: printf("Reset\\n"); break;
  case 104: printf("Exit\\n"); break;
}`,
    `int windowsCreated = 0;
for (int i = 0; i < 5; i++) {
  windowsCreated++;
  printf("Windows = %d\\n", windowsCreated);
}`,
    `switch (operationMessage) {
  case 1: result = a + b; break;
  case 2: result = a - b; break;
  case 3: result = a * b; break;
  case 4: result = (float)a / b; break;
}`,
  ],
  18: [
    `int x[] = {10, 20, 40};
int y[] = {5, 15, 25};
for (int i = 0; i < 2; i++)
  printf("Line: (%d,%d) to (%d,%d)\\n", x[i], y[i], x[i + 1], y[i + 1]);`,
    `struct Shape {
  int type;
  int x, y;
  int width, height;
  int color;
};`,
    `struct Shape s = {1, 10, 20, 80, 40, 3};
printf("Shape type=%d x=%d y=%d w=%d h=%d\\n", s.type, s.x, s.y, s.width, s.height);`,
    `int x = 0, y = 0;
for (int frame = 0; frame < 10; frame++) {
  x += 5;
  y += 2;
  printf("Frame %d: %d,%d\\n", frame, x, y);
}`,
    `int x[100], y[100], count = 0;
while (count < 100 && scanf("%d %d", &x[count], &y[count]) == 2)
  count++;
for (int i = 0; i < count; i++)
  printf("Point %d: %d,%d\\n", i + 1, x[i], y[i]);`,
  ],
  19: [
    `printf("1. Request permission\\n");
printf("2. Open device safely\\n");
printf("3. Use documented API\\n");
printf("4. Close device\\n");`,
    `struct Sector {
  unsigned int number;
  unsigned int byteCount;
};`,
    `int sector;
scanf("%d", &sector);
if (sector >= 0 && sector <= 1023)
  printf("Sector accepted\\n");
else
  printf("Invalid sector\\n");`,
    `char choice;
printf("This menu records your choices. Continue? y/n\\n");
scanf(" %c", &choice);
if (choice == 'y') printf("Logging menu choices only\\n");`,
    `switch (choice) {
  case 1: printf("Load library\\n"); break;
  case 2: printf("Call function\\n"); break;
  case 3: printf("Unload library\\n"); break;
}`,
  ],
  20: [
    `#include <stdio.h>
#include <unistd.h>

int main(void) {
  printf("PID = %d\\n", getpid());
  return 0;
}`,
    `#include <stdio.h>
#include <unistd.h>

int main(void) {
  pid_t pid = fork();
  if (pid == 0) printf("Child process\\n");
  else if (pid > 0) printf("Parent process\\n");
  return 0;
}`,
    `#include <sys/wait.h>
#include <unistd.h>

pid_t pid = fork();
if (pid == 0) _exit(0);
else waitpid(pid, NULL, 0);`,
    `for (int i = 0; i < 2; i++) {
  pid_t pid = fork();
  if (pid == 0) {
    printf("Child PID = %d\\n", getpid());
    _exit(0);
  }
}
while (wait(NULL) > 0) { }`,
    `pid_t pid = fork();
if (pid == 0) {
  _exit(0);
} else {
  waitpid(pid, NULL, 0);
  printf("Child cleaned, zombie avoided\\n");
}`,
  ],
  21: [
    `#include <signal.h>
#include <stdio.h>
#include <stdlib.h>

void handle(int sig) {
  printf("Caught SIGINT\\n");
  exit(0);
}

int main(void) {
  signal(SIGINT, handle);
  while (1) { }
}`,
    `void handle(int sig) {
  printf("Signal number: %d\\n", sig);
}

signal(SIGINT, handle);
signal(SIGTERM, handle);`,
    `#include <signal.h>
#include <unistd.h>

void alarmHandler(int sig) {
  write(1, "Alarm arrived\\n", 14);
}

signal(SIGALRM, alarmHandler);
alarm(3);
pause();`,
    `sigset_t set;
sigemptyset(&set);
sigaddset(&set, SIGINT);
sigprocmask(SIG_BLOCK, &set, NULL);
/* critical section */
sigprocmask(SIG_UNBLOCK, &set, NULL);`,
    `void handler(int sig) {
  if (sig == SIGINT) printf("Interrupt event\\n");
  else if (sig == SIGTERM) printf("Terminate event\\n");
}

signal(SIGINT, handler);
signal(SIGTERM, handler);
while (1) pause();`,
  ],
};
