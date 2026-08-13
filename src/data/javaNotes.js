const topic = (title, point, example, challenge) => ({ title, point, example, challenge });

const chapter = ({ number, title, hook, topics, trap, legacy = false }) => ({
  number,
  title,
  hook,
  legacy,
  topics: topics.map((item) => [item.title, item.point, item.example]),
  useIt: [
    `Explain ${topics[0].title.toLowerCase()} in your own words before memorising syntax.`,
    `Run the small examples, then change one value or condition and predict the result.`,
    legacy
      ? 'Learn this API for older code and exams, but choose its modern replacement for new projects.'
      : 'Prefer clear names, small methods, and compiler feedback over clever shortcuts.',
  ],
  trap,
  example: topics[0].example,
  practice: `Build one tiny program that connects ${topics[0].title.toLowerCase()} with ${topics[1].title.toLowerCase()}.`,
  energy: `This chapter becomes memorable when each idea turns into a running experiment.`,
  questions: topics.map((item) => item.challenge),
  answers: topics.map((item) => item.example),
  programExamples: [
    {
      title: `${title} Mini Lab`,
      idea: `This compact example demonstrates ${topics[0].title.toLowerCase()}. Read it once, predict the output, and then run it.`,
      code: topics[0].example,
    },
  ],
});

export const javaNotes = {
  id: 'java',
  name: 'Java',
  accent: '#c74634',
  status: 'Ready',
  source: {
    label: 'Java: The Complete Reference, 7th Edition outline',
    url: 'https://books.google.com/books?id=C_l2R8ZSPMoC',
  },
  prompts: [
    'Explain inheritance',
    'Collections revision',
    'Exception examples',
    'Thread safety',
    'String practice',
    'Chapter 1 recap',
  ],
  chapters: [
    chapter({
      number: 1,
      title: 'The History and Evolution of Java',
      hook: 'Java was designed for changing machines and connected software. Its lasting trick is simple: compile once to bytecode, then let a JVM run it.',
      topics: [
        topic('From C and C++ to Java', 'Java kept familiar braces and expressions while removing manual pointer arithmetic and adding automatic memory management.', `class Roots {
  public static void main(String[] args) {
    System.out.println("Familiar syntax, safer runtime");
  }
}`, 'Write a Java class that prints one similarity and one difference between C++ and Java.'),
        topic('Bytecode and the JVM', '`javac` compiles source into platform-neutral bytecode; the JVM verifies and executes that bytecode.', `// javac Hello.java  -> Hello.class
// java Hello       -> JVM runs bytecode
System.out.println(System.getProperty("java.vm.name"));`, 'Print the name of the JVM running your program.'),
        topic('Portability', 'Java libraries and bytecode hide many operating-system differences behind the same API.', `System.out.println(System.getProperty("os.name"));
System.out.println(System.getProperty("java.version"));`, 'Print the operating system and Java version without using OS-specific code.'),
        topic('Security and robustness', 'Bytecode verification, type checks, exceptions, and managed memory remove many common low-level failures.', `Object value = "safe";
if (value instanceof String) {
  System.out.println(((String) value).length());
}`, 'Use `instanceof` before safely casting an object to `String`.'),
        topic('Java SE evolution', 'The seventh edition targets Java SE 6. Modern Java adds features, but these core language ideas still matter.', `System.out.println("Runtime: " + Runtime.version());
// Runtime.version() requires Java 9+`, 'Print modern runtime-version information and note why it differs from Java SE 6.'),
      ],
      trap: 'Do not confuse Java source, bytecode, and machine code. They are three different stages of execution.',
    }),
    chapter({
      number: 2,
      title: 'An Overview of Java',
      hook: 'This is the first flight: class, `main`, output, decisions, and loops working together in one small program.',
      topics: [
        topic('Class and main method', 'A Java application starts in `public static void main(String[] args)` inside a class.', `class Hello {
  public static void main(String[] args) {
    System.out.println("Hello, Java");
  }
}`, 'Write and run a class named `Welcome` that prints a greeting.'),
        topic('Encapsulation', 'Keep data and the methods that protect it together inside a class.', `class Account {
  private double balance;
  void deposit(double amount) { if (amount > 0) balance += amount; }
}`, 'Create an `Account` class with private balance and a safe deposit method.'),
        topic('Inheritance', 'A child class can reuse and specialize accessible behavior from a parent class.', `class Animal { void speak() { System.out.println("sound"); } }
class Dog extends Animal { void speak() { System.out.println("bark"); } }`, 'Create a parent class and override one method in a child class.'),
        topic('Polymorphism', 'A parent reference can point to a child object; the overridden method is selected at runtime.', `Animal pet = new Dog();
pet.speak(); // bark`, 'Store a child object in a parent reference and call an overridden method.'),
        topic('Blocks, if, and for', 'Braces group statements; control statements decide which blocks run and how often.', `for (int n = 1; n <= 5; n++) {
  if (n % 2 == 0) System.out.println(n);
}`, 'Print the even numbers from 1 through 20 using `for` and `if`.'),
      ],
      trap: 'Java is case-sensitive: `main`, `Main`, and `MAIN` are different names.',
    }),
    chapter({
      number: 3,
      title: 'Data Types, Variables, and Arrays',
      hook: 'Types are promises about what a value means. Arrays turn one promise into an indexed row of values.',
      topics: [
        topic('Primitive types', 'Java has eight primitives: byte, short, int, long, float, double, char, and boolean.', `int count = 42;
double price = 19.95;
char grade = 'A';
boolean ready = true;`, 'Declare and print one value of every primitive type.'),
        topic('Literals and conversions', 'Suffixes such as `L` and `F` select literal types; narrowing conversions require an explicit cast.', `long distance = 9_000_000_000L;
float rate = 2.5F;
int whole = (int) 9.8; // 9`, 'Convert a `double` to `int` and explain the lost fractional part.'),
        topic('Scope and lifetime', 'A local variable exists only inside its block and must be initialized before use.', `int score = 10;
if (score > 0) {
  int bonus = 5;
  System.out.println(score + bonus);
}`, 'Demonstrate a block-local variable and show where it cannot be used.'),
        topic('One-dimensional arrays', 'Arrays have fixed length, start at index zero, and check every index at runtime.', `int[] marks = {72, 88, 91};
for (int mark : marks) System.out.println(mark);`, 'Read five marks into an array and print their average.'),
        topic('Multidimensional arrays', 'A Java two-dimensional array is an array of arrays, so rows may have different lengths.', `int[][] grid = {{1, 2}, {3, 4, 5}};
System.out.println(grid[1][2]); // 5`, 'Create a jagged array with rows of lengths 1, 2, and 3.'),
      ],
      trap: 'The final valid array index is `length - 1`; using `length` throws `ArrayIndexOutOfBoundsException`.',
    }),
    chapter({
      number: 4,
      title: 'Operators',
      hook: 'Operators are tiny machines. The important skill is knowing the value, type, and side effect each machine produces.',
      topics: [
        topic('Arithmetic operators', '`+ - * / %` calculate values; integer division removes the fractional part.', `int whole = 7 / 2;
double exact = 7.0 / 2;
System.out.println(whole + " " + exact);`, 'Print quotient and remainder for two integers, then show decimal division.'),
        topic('Relational and logical operators', 'Comparisons produce booleans; `&&` and `||` short-circuit when the result is already known.', `int age = 20;
boolean allowed = age >= 18 && age <= 60;
System.out.println(allowed);`, 'Check whether a number lies inside an inclusive range.'),
        topic('Bitwise operators', '`& | ^ ~` work on individual bits and are useful for flags and masks.', `int READ = 1;
int WRITE = 2;
int permissions = READ | WRITE;
System.out.println((permissions & READ) != 0);`, 'Store three permissions in one integer and test each flag.'),
        topic('Shift operators', '`<<`, `>>`, and `>>>` move bits; unsigned right shift fills the left side with zeroes.', `int value = -8;
System.out.println(value >> 1);
System.out.println(value >>> 1);`, 'Compare signed and unsigned right shift for a negative integer.'),
        topic('Conditional operator and precedence', '`condition ? a : b` selects a value. Parentheses make mixed expressions easier to verify.', `int a = 7, b = 11;
int max = a > b ? a : b;
System.out.println(max);`, 'Find the smallest of three values using conditional operators.'),
      ],
      trap: 'Do not use `==` to compare String contents; use `equals()`.',
    }),
    chapter({
      number: 5,
      title: 'Control Statements',
      hook: 'Control flow turns values into behaviour: choose a road, repeat useful work, and leave at exactly the right moment.',
      topics: [
        topic('if and else-if', 'Use an `if` ladder for ranges and conditions where only one branch should win.', `int marks = 76;
if (marks >= 75) System.out.println("Distinction");
else if (marks >= 50) System.out.println("Pass");
else System.out.println("Retry");`, 'Create a grade calculator with invalid-input handling.'),
        topic('switch', 'Use `switch` for exact integral, character, enum, or String choices; `break` prevents accidental fall-through.', `int choice = 2;
switch (choice) {
  case 1: System.out.println("Add"); break;
  case 2: System.out.println("View"); break;
  default: System.out.println("Invalid");
}`, 'Build a four-operation calculator menu with `switch`.'),
        topic('for and enhanced for', 'Use `for` for index control and enhanced `for` when you only need each element.', `int[] values = {2, 4, 6};
int sum = 0;
for (int value : values) sum += value;
System.out.println(sum);`, 'Find the largest array value using an enhanced `for` loop.'),
        topic('while and do-while', '`while` may run zero times; `do-while` always runs its body once before testing.', `int n = 3;
do {
  System.out.println(n--);
} while (n > 0);`, 'Create a menu that repeats until the user chooses zero.'),
        topic('break and continue', '`break` exits a loop; `continue` skips only the current iteration. Labels can target an outer loop.', `for (int n = 1; n <= 10; n++) {
  if (n == 7) break;
  if (n % 2 != 0) continue;
  System.out.println(n);
}`, 'Print even values until 20 but stop when the value reaches 14.'),
      ],
      trap: 'A missing loop update can create an infinite loop; trace the condition and changing variable together.',
    }),
    chapter({
      number: 6,
      title: 'Introducing Classes',
      hook: 'A class is a blueprint with memory and behaviour. An object is one living copy of that blueprint.',
      topics: [
        topic('Fields and methods', 'Fields hold object state; methods define operations that use or protect that state.', `class Box {
  double width, height, depth;
  double volume() { return width * height * depth; }
}`, 'Create a `Rectangle` class with fields and an `area()` method.'),
        topic('Creating objects', '`new` allocates an object and returns a reference to it.', `Box parcel = new Box();
parcel.width = 2;
parcel.height = 3;
parcel.depth = 4;
System.out.println(parcel.volume());`, 'Create two objects with different field values and print both results.'),
        topic('Constructors', 'A constructor has the class name, no return type, and establishes a valid starting state.', `class Box {
  double width;
  Box(double width) { this.width = width; }
}`, 'Add default and parameterized constructors to a `Student` class.'),
        topic('The this keyword', '`this` refers to the current object and resolves names or forwards to another constructor.', `class User {
  String name;
  User(String name) { this.name = name; }
}`, 'Use `this` to distinguish a field from a constructor parameter.'),
        topic('References and garbage collection', 'Variables hold references, not objects themselves. Unreachable objects become eligible for automatic collection.', `Box first = new Box(5);
Box second = first;
first = null;
System.out.println(second.width);`, 'Show two references sharing one object, then remove one reference safely.'),
      ],
      trap: 'Assigning one object reference to another does not copy the object; both references point to the same state.',
    }),
    chapter({
      number: 7,
      title: 'A Closer Look at Methods and Classes',
      hook: 'Methods become a design language here: overload them, hide details, recurse carefully, and share only what truly belongs to the class.',
      topics: [
        topic('Method overloading', 'Methods may share a name when their parameter lists differ; return type alone is not enough.', `int add(int a, int b) { return a + b; }
double add(double a, double b) { return a + b; }`, 'Overload `area()` for a square, rectangle, and circle.'),
        topic('Argument passing', 'Java passes every argument by value; for objects, the copied value is the reference.', `void rename(StringBuilder text) {
  text.append("!");
}
StringBuilder name = new StringBuilder("Java");
rename(name);`, 'Pass an array to a method, modify one element, and explain why the caller sees it.'),
        topic('Recursion', 'A recursive method needs a base case and a smaller next call.', `static int factorial(int n) {
  if (n <= 1) return 1;
  return n * factorial(n - 1);
}`, 'Write a recursive method that sums integers from 1 to `n`.'),
        topic('Access control and static', '`private` protects implementation; `static` belongs to the class rather than each object.', `class Counter {
  private static int total;
  Counter() { total++; }
  static int getTotal() { return total; }
}`, 'Count how many objects of a class have been created.'),
        topic('Nested classes and varargs', 'Nested classes group helpers; varargs receive zero or more values as an array.', `static int sum(int... values) {
  int total = 0;
  for (int value : values) total += value;
  return total;
}`, 'Write a varargs method that returns the largest supplied integer.'),
      ],
      trap: 'Overloading is selected from declared parameter types at compile time; overriding is selected at runtime.',
    }),
    chapter({
      number: 8,
      title: 'Inheritance',
      hook: 'Inheritance is useful when the child truly is a specialized parent. The real prize is substitutable behaviour, not fewer typed lines.',
      topics: [
        topic('extends and member access', 'A subclass inherits accessible members but not private implementation details.', `class Vehicle { int speed; }
class Car extends Vehicle { int seats; }
Car car = new Car();
car.speed = 60;`, 'Create an `Employee` parent and `Manager` child with one extra field.'),
        topic('super and constructors', '`super(...)` initializes the parent part and must be the first constructor statement.', `class Car extends Vehicle {
  Car(int speed) {
    super();
    this.speed = speed;
  }
}`, 'Call a parameterized parent constructor from a child constructor.'),
        topic('Method overriding', 'A subclass replaces inherited behaviour using the same signature; `@Override` asks the compiler to verify it.', `class Shape { double area() { return 0; } }
class Circle extends Shape {
  double r = 2;
  @Override double area() { return Math.PI * r * r; }
}`, 'Override a `describe()` method in two child classes.'),
        topic('Dynamic method dispatch', 'Calling an overridden method through a parent reference runs the actual object version.', `Shape shape = new Circle();
System.out.println(shape.area());`, 'Store several child objects in a parent array and call one overridden method.'),
        topic('abstract and final', 'Abstract classes define incomplete contracts; `final` stops overriding or inheritance where change would be unsafe.', `abstract class Payment { abstract void pay(); }
final class Cash extends Payment {
  void pay() { System.out.println("Paid cash"); }
}`, 'Create an abstract `Appliance` with two concrete subclasses.'),
      ],
      trap: 'Use inheritance for an “is-a” relationship. For a “has-a” relationship, composition is usually clearer.',
    }),
    chapter({
      number: 9,
      title: 'Packages and Interfaces',
      hook: 'Packages organize names; interfaces organize promises. Together they let large systems grow without every class knowing every detail.',
      topics: [
        topic('Declaring packages', 'The package statement names a class namespace and should match its source-folder structure.', `package notes.model;

public class Topic { }`, 'Create a `school.model` package containing a public `Student` class.'),
        topic('Import and access', '`import` shortens qualified names; access modifiers control visibility across classes and packages.', `import java.util.ArrayList;

ArrayList<String> names = new ArrayList<String>();`, 'Import `Scanner` and read one line from standard input.'),
        topic('Interface contracts', 'An interface specifies operations a type promises to provide.', `interface Printable {
  void print();
}`, 'Define a `Payable` interface with a method that returns an amount.'),
        topic('Implementing interfaces', 'A class uses `implements` and supplies every required abstract method.', `class Report implements Printable {
  public void print() { System.out.println("Report"); }
}`, 'Implement your `Payable` interface in an `Invoice` class.'),
        topic('Multiple interfaces', 'A class can implement several interfaces, gaining multiple roles without multiple class inheritance.', `interface Savable { void save(); }
class Document implements Printable, Savable {
  public void print() { }
  public void save() { }
}`, 'Create a class that implements `Runnable` and one custom interface.'),
      ],
      trap: 'An implementing method must be `public`; reducing interface method visibility causes a compile error.',
    }),
    chapter({
      number: 10,
      title: 'Exception Handling',
      hook: 'Exceptions separate the happy path from recovery. Good handling adds context, cleans up, and never pretends failure did not happen.',
      topics: [
        topic('try and catch', 'Place risky work in `try` and catch only exceptions you can meaningfully handle.', `try {
  int value = Integer.parseInt("42");
  System.out.println(value);
} catch (NumberFormatException ex) {
  System.out.println("Enter a whole number");
}`, 'Parse user text as an integer and show a friendly error for invalid input.'),
        topic('Exception hierarchy', 'Checked exceptions must be handled or declared; runtime exceptions usually signal programming mistakes or invalid state.', `try {
  java.nio.file.Files.readAllBytes(java.nio.file.Paths.get("notes.txt"));
} catch (java.io.IOException ex) {
  System.out.println(ex.getMessage());
}`, 'Read a file and catch its checked `IOException`.'),
        topic('throw and throws', '`throw` creates a failure now; `throws` announces that a method may pass a checked failure to its caller.', `static void setAge(int age) {
  if (age < 0) throw new IllegalArgumentException("age");
}`, 'Reject a negative bank withdrawal by throwing an exception.'),
        topic('finally and cleanup', '`finally` runs after `try`/`catch` and was traditionally used for cleanup; modern resources prefer try-with-resources.', `java.util.Scanner input = new java.util.Scanner("7");
try {
  System.out.println(input.nextInt());
} finally {
  input.close();
}`, 'Use `finally` to guarantee that a resource is closed.'),
        topic('Custom and chained exceptions', 'A domain exception gives failure a useful name; chaining preserves the original cause.', `class InvalidScoreException extends Exception {
  InvalidScoreException(String message) { super(message); }
}
// throw new InvalidScoreException("Score must be 0..100");`, 'Create and throw a checked exception for invalid marks.'),
      ],
      trap: 'Never use an empty catch block. It hides the evidence you need to understand and repair a failure.',
    }),
    chapter({
      number: 11,
      title: 'Multithreaded Programming',
      hook: 'Threads let work overlap, but shared state turns timing into part of correctness. Coordinate the smallest possible critical section.',
      topics: [
        topic('Thread and Runnable', '`Runnable` separates the task from the thread that runs it and is usually the more flexible design.', `Runnable task = () -> System.out.println("Worker");
Thread worker = new Thread(task);
worker.start();`, 'Create two threads from two `Runnable` tasks.'),
        topic('start, sleep, and join', '`start()` creates concurrent execution; `join()` waits for completion; `sleep()` pauses the current thread.', `Thread worker = new Thread(() -> System.out.println("done"));
worker.start();
worker.join();
System.out.println("joined");`, 'Start a worker, wait with `join()`, then print a final message.'),
        topic('Synchronization', '`synchronized` gives one thread at a time access to a protected monitor and establishes memory visibility.', `synchronized void increment() {
  count++;
}`, 'Protect a shared counter updated by two threads.'),
        topic('wait and notifyAll', 'A thread can wait for a condition while releasing a monitor; another thread updates state and signals waiters.', `synchronized void awaitReady() throws InterruptedException {
  while (!ready) wait();
}
synchronized void markReady() { ready = true; notifyAll(); }`, 'Build a one-item producer/consumer handoff using `wait()` and `notifyAll()`.'),
        topic('Deadlock and cancellation', 'Consistent lock order prevents deadlock; interruption is the cooperative way to request thread cancellation.', `while (!Thread.currentThread().isInterrupted()) {
  // perform one small unit of work
}`, 'Write a worker loop that stops cleanly when interrupted.'),
      ],
      trap: 'Calling `run()` directly does not start a new thread; call `start()`.',
    }),
    chapter({
      number: 12,
      title: 'Enumerations, Autoboxing, and Annotations',
      hook: 'Enums give states names, wrappers let primitives join object APIs, and annotations attach machine-readable meaning to code.',
      topics: [
        topic('Enumeration basics', 'An enum defines a fixed, type-safe set of named values.', `enum Status { PLANNED, RUNNING, DONE }
Status state = Status.RUNNING;
System.out.println(state);`, 'Create an enum for four traffic-light states and print one value.'),
        topic('Enum fields and methods', 'Enum constants are objects, so an enum can have constructors, fields, and methods.', `enum Size {
  SMALL(1), LARGE(3);
  final int code;
  Size(int code) { this.code = code; }
}`, 'Give each day enum value a boolean that tells whether it is a weekend.'),
        topic('values and valueOf', '`values()` returns all constants; `valueOf()` converts an exact name into its enum constant.', `for (Status value : Status.values()) {
  System.out.println(value.ordinal() + ": " + value);
}`, 'Loop through every enum constant and print its name.'),
        topic('Autoboxing and unboxing', 'Java automatically converts between primitives and wrappers when an object API requires it.', `java.util.List<Integer> scores = new java.util.ArrayList<Integer>();
scores.add(90);       // boxes int
int score = scores.get(0); // unboxes Integer`, 'Store five primitive-looking integers in an `ArrayList<Integer>` and total them.'),
        topic('Annotations', 'Annotations attach metadata for compilers, tools, frameworks, or runtime reflection.', `class Parent { void run() { } }
class Child extends Parent {
  @Override void run() { System.out.println("running"); }
}`, 'Create and apply a custom runtime annotation to one class.'),
      ],
      trap: 'Unboxing a null wrapper throws `NullPointerException`; a wrapper reference is not guaranteed to contain a primitive value.',
    }),
    chapter({
      number: 13,
      title: 'I/O, Applets, and Other Topics',
      hook: 'This chapter connects language basics to the outside world: keyboard input, formatted output, command-line values, and older browser-hosted code.',
      topics: [
        topic('Console input', 'Wrap `System.in` with a reader or scanner and validate text before converting it.', `java.io.BufferedReader reader =
    new java.io.BufferedReader(new java.io.InputStreamReader(System.in));
String name = reader.readLine();
System.out.println("Hello " + name);`, 'Read a full name with `BufferedReader` and print a greeting.'),
        topic('PrintWriter output', '`PrintWriter` offers convenient text formatting and can auto-flush output.', `java.io.PrintWriter out = new java.io.PrintWriter(System.out, true);
out.printf("Score: %d%n", 91);`, 'Print a two-column marks table using `printf` formatting.'),
        topic('Command-line arguments', 'Values after the class name arrive as strings in the `args` array.', `public static void main(String[] args) {
  for (String arg : args) System.out.println(arg);
}`, 'Accept two command-line numbers and print their sum.'),
        topic('Applet lifecycle', 'Legacy applets used `init`, `start`, `stop`, and `destroy`; browsers no longer support this deployment model.', `// Legacy study example only
class LifeCycle {
  void init() { System.out.println("initialize"); }
  void start() { System.out.println("start"); }
}`, 'Model the applet lifecycle with ordinary methods and print their call order.'),
        topic('instanceof and assert', '`instanceof` checks a reference type; `assert` documents an internal condition that should always hold.', `Object item = "Java";
if (item instanceof String) {
  String text = (String) item;
  assert !text.isEmpty();
}`, 'Check a reference before casting and assert one internal invariant.'),
      ],
      trap: 'Assertions may be disabled at runtime, so never use them to validate user input or enforce required business rules.',
      legacy: true,
    }),
    chapter({
      number: 14,
      title: 'Generics',
      hook: 'Generics move type mistakes from runtime to compile time and make reusable containers honest about what they contain.',
      topics: [
        topic('Generic classes', 'A type parameter lets one class safely work with many reference types.', `class Box<T> {
  private T value;
  void set(T value) { this.value = value; }
  T get() { return value; }
}`, 'Create a generic `Pair<A, B>` class with getters.'),
        topic('Generic methods', 'A method can declare its own type parameter before its return type.', `static <T> void printArray(T[] values) {
  for (T value : values) System.out.println(value);
}`, 'Write a generic method that returns the first element of an array.'),
        topic('Bounded type parameters', '`extends` restricts a type parameter to a useful family and exposes that bound’s methods.', `static <T extends Number> double twice(T value) {
  return value.doubleValue() * 2;
}`, 'Write a bounded generic method that averages an array of numbers.'),
        topic('Wildcards', '`? extends T` is useful for reading producers; `? super T` is useful for writing consumers.', `static double total(java.util.List<? extends Number> values) {
  double sum = 0;
  for (Number value : values) sum += value.doubleValue();
  return sum;
}`, 'Copy integers into a `List<? super Integer>`.'),
        topic('Erasure and restrictions', 'Generic type information is mostly erased at runtime; primitives and direct `new T()` are not allowed.', `java.util.List<String> names = new java.util.ArrayList<String>();
System.out.println(names.getClass() == new java.util.ArrayList<Integer>().getClass());`, 'Demonstrate that two differently parameterized lists share the same runtime class.'),
      ],
      trap: 'Do not use raw types such as plain `List`; they discard generic type checks and invite delayed cast failures.',
    }),
    chapter({
      number: 15,
      title: 'String Handling',
      hook: 'Strings look simple because Java does the hard work. Immutability makes them dependable; builders make repeated editing efficient.',
      topics: [
        topic('String immutability', 'A String never changes after creation; operations return a new String.', `String name = "java";
String upper = name.toUpperCase();
System.out.println(name + " -> " + upper);`, 'Trim and uppercase a string while proving the original is unchanged.'),
        topic('Equality and comparison', '`equals()` compares contents; `compareTo()` provides lexical ordering; `==` compares references.', `String a = new String("code");
String b = "code";
System.out.println(a.equals(b));
System.out.println(a == b);`, 'Compare two user-entered strings ignoring letter case.'),
        topic('Search and extraction', '`indexOf`, `contains`, `substring`, `charAt`, and `split` reveal parts of text.', `String email = "student@example.com";
int at = email.indexOf('@');
System.out.println(email.substring(0, at));`, 'Extract a filename extension using `lastIndexOf` and `substring`.'),
        topic('StringBuffer', '`StringBuffer` is mutable and synchronized, useful when one buffer is shared across threads.', `StringBuffer buffer = new StringBuffer("Java");
buffer.append(" Notes").reverse();
System.out.println(buffer);`, 'Use `StringBuffer` to insert, delete, and reverse text.'),
        topic('StringBuilder', '`StringBuilder` is mutable without synchronization overhead and is preferred for local repeated concatenation.', `StringBuilder csv = new StringBuilder();
for (int n = 1; n <= 3; n++) csv.append(n).append(',');
System.out.println(csv);`, 'Build a comma-separated line from an integer array.'),
      ],
      trap: 'Repeated `+` inside a large loop creates many temporary strings; use `StringBuilder`.',
    }),
    chapter({
      number: 16,
      title: 'Exploring java.lang',
      hook: '`java.lang` is the toolbox Java quietly imports for every program: objects, numbers, math, runtime state, processes, and reflection.',
      topics: [
        topic('Object methods', 'Every class inherits `toString`, `equals`, and `hashCode`; override equality and hashing together.', `class Point {
  int x, y;
  Point(int x, int y) { this.x = x; this.y = y; }
  public String toString() { return "(" + x + "," + y + ")"; }
}`, 'Override `toString()` for a `Student` object.'),
        topic('Wrapper classes', 'Wrappers convert, compare, and expose limits for primitive values.', `int count = Integer.parseInt("125");
System.out.println(Integer.MAX_VALUE);
System.out.println(Integer.toBinaryString(count));`, 'Parse a decimal string and print the number in binary and hexadecimal.'),
        topic('Math and StrictMath', '`Math` supplies static numeric functions and constants such as `sqrt`, `pow`, `round`, and `PI`.', `double radius = 3;
double area = Math.PI * Math.pow(radius, 2);
System.out.println(Math.round(area));`, 'Calculate distance between two coordinate points using `Math.sqrt`.'),
        topic('System and Runtime', '`System` exposes properties, time, streams, and array copy; `Runtime` describes the current JVM environment.', `System.out.println(System.currentTimeMillis());
System.out.println(Runtime.getRuntime().availableProcessors());`, 'Print free memory and available processor count.'),
        topic('Process and reflection', 'Processes launch external commands; reflection inspects types dynamically and should be used deliberately.', `Class<?> type = String.class;
System.out.println(type.getName());
for (java.lang.reflect.Method method : type.getDeclaredMethods()) {
  if (method.getName().equals("substring")) System.out.println(method);
}`, 'Use reflection to list the declared fields of a small custom class.'),
      ],
      trap: 'An `equals()` override without a matching `hashCode()` override breaks hash-based collections.',
    }),
    chapter({
      number: 17,
      title: 'java.util Part 1: Collections Framework',
      hook: 'Collections let you choose the shape of a problem: ordered list, unique set, keyed map, or priority queue.',
      topics: [
        topic('Collection interfaces', '`List`, `Set`, `Queue`, and `Map` express different contracts; program to the interface when practical.', `java.util.List<String> names = new java.util.ArrayList<String>();
names.add("Asha");
names.add("Ravi");`, 'Store five names through the `List` interface and print them.'),
        topic('ArrayList and LinkedList', '`ArrayList` excels at indexed access; `LinkedList` supports cheap end insertions but slower random access.', `java.util.List<Integer> values = new java.util.ArrayList<Integer>();
values.add(10);
values.add(0, 5);
System.out.println(values);`, 'Insert, update, remove, and search values in an `ArrayList`.'),
        topic('HashSet and TreeSet', 'Sets remove duplicates; hash sets favor speed, tree sets maintain sorted order.', `java.util.Set<String> tags = new java.util.TreeSet<String>();
tags.add("java");
tags.add("arrays");
tags.add("java");
System.out.println(tags);`, 'Remove duplicate words and print the unique words alphabetically.'),
        topic('HashMap and TreeMap', 'Maps connect unique keys to values; choose hashing for fast lookup or trees for sorted keys.', `java.util.Map<String, Integer> marks = new java.util.HashMap<String, Integer>();
marks.put("Mira", 91);
System.out.println(marks.get("Mira"));`, 'Build a word-frequency map from a sentence.'),
        topic('Iterators and comparators', 'Iterators traverse safely; comparators define order without changing the element class.', `java.util.List<String> words = java.util.Arrays.asList("pear", "fig", "banana");
java.util.Collections.sort(words, (a, b) -> a.length() - b.length());
System.out.println(words);`, 'Sort student objects by marks, then by name.'),
      ],
      trap: 'Do not structurally modify most collections inside enhanced `for`; use the iterator’s `remove()` when supported.',
    }),
    chapter({
      number: 18,
      title: 'java.util Part 2: More Utility Classes',
      hook: 'The utility shelf handles everyday friction: input, random values, formatting, dates, properties, and compact bit flags.',
      topics: [
        topic('Scanner', '`Scanner` tokenizes text and converts primitive values, but you must handle the newline after numeric input.', `java.util.Scanner input = new java.util.Scanner("42 Java");
int number = input.nextInt();
String word = input.next();
System.out.println(number + " " + word);`, 'Read an integer and a full-line name without accidentally consuming an empty line.'),
        topic('Random', '`Random` generates pseudo-random values; provide a seed when tests need repeatable results.', `java.util.Random random = new java.util.Random(7);
int die = random.nextInt(6) + 1;
System.out.println(die);`, 'Simulate rolling two dice 1,000 times and count each total.'),
        topic('Formatter', '`Formatter` and `printf` align values, control precision, and create readable reports.', `System.out.printf("%-10s %7.2f%n", "Notebook", 49.5);`, 'Print a receipt with aligned item, quantity, price, and total columns.'),
        topic('Date and Calendar', 'The edition uses `Date` and `Calendar`; modern projects normally prefer the `java.time` API.', `java.util.Calendar now = java.util.Calendar.getInstance();
System.out.println(now.get(java.util.Calendar.YEAR));`, 'Print the current date and add seven days using `Calendar`.'),
        topic('Properties and BitSet', '`Properties` stores string configuration pairs; `BitSet` stores expandable boolean flags compactly.', `java.util.Properties config = new java.util.Properties();
config.setProperty("theme", "light");
System.out.println(config.getProperty("theme"));`, 'Store three settings in `Properties` and read one with a default value.'),
      ],
      trap: 'Mixing `nextInt()` and `nextLine()` without consuming the pending newline produces a surprising empty string.',
    }),
    chapter({
      number: 19,
      title: 'Input/Output: Exploring java.io',
      hook: 'Java I/O is a pipeline: choose bytes or characters, wrap the stream with useful behaviour, and always close ownership cleanly.',
      topics: [
        topic('Stream model', 'Input streams read and output streams write; wrappers add buffering, types, or object support.', `byte[] data = {65, 66, 67};
java.io.InputStream in = new java.io.ByteArrayInputStream(data);
System.out.println(in.read());`, 'Read every byte from a byte-array stream until `-1`.'),
        topic('Byte streams', '`FileInputStream` and `FileOutputStream` handle raw bytes such as images or binary records.', `try (java.io.InputStream in = new java.io.FileInputStream("in.bin");
     java.io.OutputStream out = new java.io.FileOutputStream("out.bin")) {
  byte[] buffer = new byte[4096];
  for (int n; (n = in.read(buffer)) != -1;) out.write(buffer, 0, n);
}`, 'Copy one binary file to another with a buffer.'),
        topic('Character streams', 'Readers and writers decode and encode text; buffering reduces expensive device operations.', `try (java.io.BufferedReader reader = new java.io.BufferedReader(new java.io.FileReader("notes.txt"))) {
  for (String line; (line = reader.readLine()) != null;) System.out.println(line);
}`, 'Count lines and words in a text file.'),
        topic('File metadata', 'The legacy `File` class represents paths and exposes existence, type, size, and directory listing.', `java.io.File file = new java.io.File("notes.txt");
System.out.println(file.exists());
System.out.println(file.length());`, 'List the names of all files in a directory.'),
        topic('Object serialization', '`ObjectOutputStream` writes serializable object graphs; use it carefully with trusted, version-compatible data.', `class Note implements java.io.Serializable {
  private static final long serialVersionUID = 1L;
  String text = "revise";
}`, 'Serialize and restore a simple `Student` object.'),
      ],
      trap: 'Text depends on character encoding. Never assume the platform default when files cross machines.',
    }),
    chapter({
      number: 20,
      title: 'Networking',
      hook: 'Networking is streams with distance added. Addresses locate machines, sockets carry bytes, and protocols give those bytes meaning.',
      topics: [
        topic('InetAddress', '`InetAddress` resolves host names and represents IPv4 or IPv6 addresses.', `java.net.InetAddress host = java.net.InetAddress.getByName("localhost");
System.out.println(host.getHostAddress());`, 'Resolve a host supplied on the command line and print all addresses.'),
        topic('URL and URI', '`URI` identifies a resource structurally; `URL` can open a connection to a supported protocol.', `java.net.URI uri = new java.net.URI("https://example.com/docs?q=java");
System.out.println(uri.getHost());
System.out.println(uri.getQuery());`, 'Parse a URI and print its scheme, host, path, and query.'),
        topic('URLConnection', 'A URL connection exposes headers and streams; always use timeouts for real network work.', `java.net.URLConnection connection = new java.net.URL("https://example.com").openConnection();
connection.setConnectTimeout(3000);
System.out.println(connection.getContentType());`, 'Open an HTTP connection with connect and read timeouts.'),
        topic('TCP sockets', '`Socket` connects a client; `ServerSocket` listens and accepts reliable ordered byte streams.', `try (java.net.ServerSocket server = new java.net.ServerSocket(5050);
     java.net.Socket client = server.accept()) {
  System.out.println(client.getRemoteSocketAddress());
}`, 'Write a tiny TCP echo server and client.'),
        topic('UDP datagrams', '`DatagramSocket` sends independent packets without connection or delivery guarantees.', `byte[] data = "ping".getBytes("UTF-8");
java.net.DatagramPacket packet = new java.net.DatagramPacket(
    data, data.length, java.net.InetAddress.getByName("localhost"), 5051);`, 'Create and send one UDP datagram to localhost.'),
      ],
      trap: 'Network calls can block or fail. Set timeouts, close sockets, validate input, and never assume one read returns a complete message.',
    }),
    chapter({
      number: 21,
      title: 'The Applet Class',
      hook: 'Applets explain an important chapter of Java’s history, but browsers removed their plug-in model. Study the lifecycle; build new interfaces elsewhere.',
      topics: [
        topic('Applet lifecycle', 'The host called `init`, `start`, `stop`, and `destroy` as an applet entered and left active states.', `// Legacy lifecycle model
void init() { System.out.println("prepare"); }
void start() { System.out.println("active"); }
void stop() { System.out.println("paused"); }`, 'Simulate the applet lifecycle in a console class.'),
        topic('Painting', 'An applet drew itself through `paint(Graphics)` and requested later drawing with `repaint()`.', `// Legacy signature for study
public void paint(java.awt.Graphics graphics) {
  graphics.drawString("Hello", 20, 30);
}`, 'Write a legacy paint method that draws a string and rectangle.'),
        topic('Parameters', 'Applet parameters came from an embedding HTML tag and were read with `getParameter`.', `// Legacy idea
String colorName = "blue"; // formerly getParameter("color")
System.out.println(colorName);`, 'Model two applet parameters with a map and provide defaults.'),
        topic('Document and code bases', '`getDocumentBase()` and `getCodeBase()` identified the host page and class-resource locations.', `java.net.URL base = new java.net.URL("https://example.com/app/");
java.net.URL image = new java.net.URL(base, "logo.png");
System.out.println(image);`, 'Resolve a relative resource URL against a base URL.'),
        topic('Modern replacement', 'Use web applications for browser delivery and Swing, JavaFX, or native Android UI for installed clients.', `System.out.println("Applet concept -> lifecycle + events + painting");
System.out.println("Modern app -> supported UI platform");`, 'Print a migration checklist for a legacy applet.'),
      ],
      trap: 'Do not begin a new project with applets. They are obsolete and unsupported by modern browsers.',
      legacy: true,
    }),
    chapter({
      number: 22,
      title: 'Event Handling',
      hook: 'Event-driven code waits politely, then reacts. The source announces what happened; a listener owns the response.',
      topics: [
        topic('Delegation event model', 'An event source creates an event object and calls registered listener methods.', `javax.swing.JButton button = new javax.swing.JButton("Save");
button.addActionListener(event -> System.out.println("saved"));`, 'Attach an action listener to a button and print its command.'),
        topic('Action and item events', 'Action events represent commands; item events represent selection-state changes.', `javax.swing.JCheckBox box = new javax.swing.JCheckBox("Ready");
box.addItemListener(event -> System.out.println(box.isSelected()));`, 'Listen for a checkbox change and display its selected state.'),
        topic('Mouse events', 'Mouse listeners receive clicks, presses, releases, entries, and exits with coordinates and button data.', `java.awt.event.MouseAdapter listener = new java.awt.event.MouseAdapter() {
  public void mouseClicked(java.awt.event.MouseEvent e) {
    System.out.println(e.getX() + "," + e.getY());
  }
};`, 'Create a mouse adapter that prints click coordinates.'),
        topic('Keyboard events', 'Key listeners expose pressed, released, and typed events; text components often offer higher-level alternatives.', `java.awt.event.KeyAdapter keys = new java.awt.event.KeyAdapter() {
  public void keyTyped(java.awt.event.KeyEvent e) {
    System.out.println(e.getKeyChar());
  }
};`, 'Count typed characters with a key listener.'),
        topic('Adapter classes', 'Adapter classes provide empty listener methods so you override only the events you need.', `java.awt.event.WindowAdapter closeHandler = new java.awt.event.WindowAdapter() {
  public void windowClosing(java.awt.event.WindowEvent e) {
    System.out.println("closing");
  }
};`, 'Use a window adapter to handle only the closing event.'),
      ],
      trap: 'Long work inside a UI listener freezes the interface; move blocking work off the event thread.',
    }),
    chapter({
      number: 23,
      title: 'Introducing the AWT: Windows, Graphics, and Text',
      hook: 'AWT is Java’s original windowing foundation. Even where Swing sits on top, coordinates, colors, fonts, and painting still tell the visual story.',
      topics: [
        topic('Frames and components', 'A `Frame` is a top-level AWT window; components live inside containers.', `java.awt.Frame frame = new java.awt.Frame("AWT Notes");
frame.setSize(420, 240);
frame.setVisible(true);`, 'Create an AWT frame with a title and fixed starting size.'),
        topic('Graphics coordinates', 'The origin is at the top-left; x grows right and y grows downward.', `public void paint(java.awt.Graphics g) {
  g.drawLine(20, 20, 180, 20);
  g.drawRect(20, 40, 160, 80);
}`, 'Draw a line, rectangle, and oval at different coordinates.'),
        topic('Color', '`Color` controls drawing and component foreground/background values.', `java.awt.Color accent = new java.awt.Color(14, 116, 144);
g.setColor(accent);
g.fillRect(10, 10, 120, 50);`, 'Draw three filled shapes using three different colors.'),
        topic('Fonts and metrics', '`Font` selects a family, style, and size; `FontMetrics` measures rendered text.', `java.awt.Font font = new java.awt.Font("SansSerif", java.awt.Font.BOLD, 18);
g.setFont(font);
g.drawString("Java", 20, 40);`, 'Center a text label using `FontMetrics.stringWidth()`.'),
        topic('Repainting', 'State changes should call `repaint()`; the toolkit later invokes `paint()` with a valid graphics context.', `int x = 20;
void moveRight() {
  x += 10;
  repaint();
}`, 'Move a drawn square when state changes and request repainting.'),
      ],
      trap: 'Do not keep and reuse a `Graphics` object from `paint()`; treat it as valid only during that paint call.',
      legacy: true,
    }),
    chapter({
      number: 24,
      title: 'AWT Controls, Layout Managers, and Menus',
      hook: 'Controls collect intent, layouts negotiate space, and menus organize commands. The best interface keeps those responsibilities separate.',
      topics: [
        topic('Buttons and selection controls', 'Buttons trigger commands; checkboxes represent independent choices; checkbox groups create one-of-many choices.', `java.awt.Button save = new java.awt.Button("Save");
java.awt.Checkbox ready = new java.awt.Checkbox("Ready");`, 'Create a button, checkbox, and two-option checkbox group.'),
        topic('Text and list controls', '`TextField`, `TextArea`, `Choice`, and `List` collect short text, long text, or selections.', `java.awt.TextField name = new java.awt.TextField(20);
java.awt.Choice language = new java.awt.Choice();
language.add("Java");
language.add("C");`, 'Build a small form with name input and language choice.'),
        topic('Flow, Border, and Grid layouts', 'Layout managers calculate component positions so windows can resize more safely.', `java.awt.Panel panel = new java.awt.Panel(new java.awt.GridLayout(2, 2, 8, 8));
panel.add(new java.awt.Button("One"));
panel.add(new java.awt.Button("Two"));`, 'Arrange six calculator buttons in a grid.'),
        topic('GridBagLayout', '`GridBagLayout` is flexible for form-like grids but needs explicit constraints.', `java.awt.GridBagConstraints c = new java.awt.GridBagConstraints();
c.gridx = 0;
c.gridy = 0;
c.fill = java.awt.GridBagConstraints.HORIZONTAL;`, 'Place a label and expanding text field with `GridBagLayout`.'),
        topic('Menus and dialogs', 'Menu bars expose commands; dialogs handle focused short interactions and modal decisions.', `java.awt.Menu file = new java.awt.Menu("File");
file.add(new java.awt.MenuItem("Open"));
file.add(new java.awt.MenuItem("Exit"));`, 'Create File and Help menus with action listeners.'),
      ],
      trap: 'Absolute positioning breaks when fonts, text length, screen density, or window size changes. Use layout managers.',
      legacy: true,
    }),
    chapter({
      number: 25,
      title: 'Images',
      hook: 'Image work is a pipeline too: load pixels, wait for readiness, draw at the right size, and avoid doing expensive work every frame.',
      topics: [
        topic('Loading images', '`ImageIO.read` is the practical modern way to decode common image files into a buffered image.', `java.awt.image.BufferedImage image =
    javax.imageio.ImageIO.read(new java.io.File("photo.png"));
System.out.println(image.getWidth());`, 'Load an image and print its dimensions.'),
        topic('Displaying and scaling', '`drawImage` paints an image at its original or requested dimensions.', `public void paint(java.awt.Graphics g) {
  g.drawImage(image, 10, 10, 200, 120, this);
}`, 'Display an image scaled to fit a fixed rectangle.'),
        topic('ImageObserver', 'ImageObserver receives progress for asynchronously produced images; components already implement it.', `boolean complete = g.drawImage(image, 0, 0, this);
System.out.println("Draw complete: " + complete);`, 'Pass a component as image observer and inspect the draw result.'),
        topic('Double buffering', 'Draw a full frame off-screen, then copy it once to reduce visible flicker.', `java.awt.image.BufferedImage buffer =
    new java.awt.image.BufferedImage(320, 200, java.awt.image.BufferedImage.TYPE_INT_ARGB);
java.awt.Graphics2D g2 = buffer.createGraphics();
g2.fillOval(20, 20, 50, 50);
g2.dispose();`, 'Draw a moving circle into an off-screen buffer.'),
        topic('Pixels and filters', '`getRGB` and `setRGB` expose pixels; filters transform color while preserving image bounds.', `int rgb = image.getRGB(0, 0);
java.awt.Color color = new java.awt.Color(rgb, true);
int gray = (color.getRed() + color.getGreen() + color.getBlue()) / 3;`, 'Convert every pixel in a small image to grayscale.'),
      ],
      trap: 'Loading or filtering large images on the UI thread makes the window unresponsive.',
    }),
    chapter({
      number: 26,
      title: 'The Concurrency Utilities',
      hook: 'The concurrency library raises the level of thought: submit tasks, await results, coordinate phases, and use battle-tested containers.',
      topics: [
        topic('ExecutorService', 'An executor owns worker threads and accepts tasks, separating job submission from thread management.', `java.util.concurrent.ExecutorService pool =
    java.util.concurrent.Executors.newFixedThreadPool(2);
pool.submit(() -> System.out.println("task"));
pool.shutdown();`, 'Submit five tasks to a fixed thread pool and shut it down.'),
        topic('Callable and Future', '`Callable` returns a value or throws; `Future` represents the later result.', `java.util.concurrent.ExecutorService pool = java.util.concurrent.Executors.newSingleThreadExecutor();
java.util.concurrent.Future<Integer> answer = pool.submit(() -> 6 * 7);
System.out.println(answer.get());
pool.shutdown();`, 'Calculate a sum in a `Callable` and retrieve it through `Future`.'),
        topic('Locks', '`ReentrantLock` offers explicit locking, timed attempts, and conditions; unlock in `finally`.', `java.util.concurrent.locks.Lock lock = new java.util.concurrent.locks.ReentrantLock();
lock.lock();
try { count++; } finally { lock.unlock(); }`, 'Protect a balance update with `ReentrantLock`.'),
        topic('Semaphores and latches', 'A semaphore limits simultaneous access; a countdown latch waits for a fixed set of events.', `java.util.concurrent.CountDownLatch ready = new java.util.concurrent.CountDownLatch(2);
new Thread(() -> ready.countDown()).start();
new Thread(() -> ready.countDown()).start();
ready.await();`, 'Wait for three worker tasks using `CountDownLatch`.'),
        topic('Atomics and concurrent collections', 'Atomic values perform thread-safe single-variable operations; concurrent collections support safe shared access.', `java.util.concurrent.atomic.AtomicInteger total = new java.util.concurrent.atomic.AtomicInteger();
total.incrementAndGet();
java.util.concurrent.ConcurrentMap<String, Integer> map =
    new java.util.concurrent.ConcurrentHashMap<String, Integer>();`, 'Count events from several threads with `AtomicInteger`.'),
      ],
      trap: 'Always shut down executors you own; their non-daemon threads can keep an application alive.',
    }),
    chapter({
      number: 27,
      title: 'NIO, Regular Expressions, and Other Packages',
      hook: 'This mixed toolkit handles high-volume buffers, pattern matching, runtime inspection, remote calls, and formatted dates.',
      topics: [
        topic('Buffers and channels', 'NIO channels transfer data through buffers; `flip()` changes a filled buffer into reading mode.', `java.nio.ByteBuffer buffer = java.nio.ByteBuffer.allocate(16);
buffer.putInt(42);
buffer.flip();
System.out.println(buffer.getInt());`, 'Store and retrieve two integers from a `ByteBuffer`.'),
        topic('FileChannel', 'A file channel supports positioned I/O and bulk transfer with explicit buffer state.', `try (java.nio.channels.FileChannel channel = new java.io.FileInputStream("data.bin").getChannel()) {
  java.nio.ByteBuffer buffer = java.nio.ByteBuffer.allocate(1024);
  while (channel.read(buffer) != -1) buffer.clear();
}`, 'Read a file through `FileChannel` and count its bytes.'),
        topic('Regular expressions', '`Pattern` compiles a regex; `Matcher` searches input and exposes matched groups.', `java.util.regex.Matcher matcher =
    java.util.regex.Pattern.compile("\\b\\d{4}\\b").matcher("PIN 4163");
if (matcher.find()) System.out.println(matcher.group());`, 'Find all email-like addresses in a line of text.'),
        topic('Reflection and RMI', 'Reflection discovers types at runtime; RMI historically exposed remote Java objects through typed interfaces.', `Class<?> type = java.util.ArrayList.class;
System.out.println(type.getConstructors().length);
// RMI requires a Remote interface and registry.`, 'Inspect a class name, superclass, interfaces, and constructors with reflection.'),
        topic('Text and date formatting', '`DateFormat` and `SimpleDateFormat` format legacy dates; use `java.time` for modern code.', `java.text.DateFormat format = new java.text.SimpleDateFormat("dd MMM yyyy");
System.out.println(format.format(new java.util.Date()));`, 'Parse and format a date with a declared pattern.'),
      ],
      trap: 'A buffer’s position and limit control what can be read. Forgetting `flip()` is a classic NIO bug.',
    }),
    chapter({
      number: 28,
      title: 'JavaBeans',
      hook: 'A JavaBean turns a class into a tool-friendly component by following predictable property, event, and construction conventions.',
      topics: [
        topic('Bean conventions', 'A basic bean has a public no-argument constructor and properties exposed through getter/setter naming.', `public class StudentBean implements java.io.Serializable {
  private String name;
  public StudentBean() { }
  public String getName() { return name; }
  public void setName(String name) { this.name = name; }
}`, 'Create a serializable bean with name and marks properties.'),
        topic('Introspection', 'Tools inspect method patterns to discover properties, events, and callable operations.', `java.beans.BeanInfo info = java.beans.Introspector.getBeanInfo(StudentBean.class);
for (java.beans.PropertyDescriptor property : info.getPropertyDescriptors()) {
  System.out.println(property.getName());
}`, 'Use introspection to print all properties of your bean.'),
        topic('Bound properties', 'A bound property notifies registered listeners after its value changes.', `java.beans.PropertyChangeSupport changes = new java.beans.PropertyChangeSupport(this);
void setName(String value) {
  String old = name;
  name = value;
  changes.firePropertyChange("name", old, value);
}`, 'Add property-change support to a score property.'),
        topic('Constrained properties', 'A constrained property asks veto listeners before accepting a change.', `java.beans.VetoableChangeSupport vetoes = new java.beans.VetoableChangeSupport(this);
void setAge(int value) throws java.beans.PropertyVetoException {
  vetoes.fireVetoableChange("age", age, value);
  age = value;
}`, 'Create a constrained age property that rejects negative values.'),
        topic('Persistence and BeanInfo', 'Serialization can persist bean state; custom BeanInfo can control what design tools expose.', `try (java.beans.XMLEncoder out =
    new java.beans.XMLEncoder(new java.io.BufferedOutputStream(new java.io.FileOutputStream("bean.xml")))) {
  out.writeObject(new StudentBean());
}`, 'Persist a simple bean with `XMLEncoder`.'),
      ],
      trap: 'A class with fields is not automatically a well-behaved bean; predictable constructors and accessor names are part of the contract.',
      legacy: true,
    }),
    chapter({
      number: 29,
      title: 'Introducing Swing',
      hook: 'Swing builds a richer component system over AWT. Its golden rule is simple: construct and update the interface on the event dispatch thread.',
      topics: [
        topic('Event dispatch thread', 'Swing component creation and updates belong on the EDT to prevent timing bugs.', `javax.swing.SwingUtilities.invokeLater(() -> {
  javax.swing.JFrame frame = new javax.swing.JFrame("Notes");
  frame.setSize(400, 240);
  frame.setVisible(true);
});`, 'Create and show a frame using `SwingUtilities.invokeLater`.'),
        topic('JFrame and containers', 'A frame is a top-level window; panels group content inside its content pane.', `javax.swing.JFrame frame = new javax.swing.JFrame("Study");
javax.swing.JPanel panel = new javax.swing.JPanel();
panel.add(new javax.swing.JLabel("Ready"));
frame.add(panel);`, 'Build a frame containing a panel, label, and button.'),
        topic('Lightweight components', 'Most Swing controls are painted by Java and provide consistent behavior across platforms.', `javax.swing.JButton button = new javax.swing.JButton("Run");
button.setToolTipText("Run example");`, 'Create three lightweight Swing components with useful labels.'),
        topic('Model-view separation', 'Many Swing components delegate stored data to models, allowing the view to change independently.', `javax.swing.DefaultListModel<String> model = new javax.swing.DefaultListModel<String>();
model.addElement("Arrays");
javax.swing.JList<String> list = new javax.swing.JList<String>(model);`, 'Add and remove list items through a `DefaultListModel`.'),
        topic('Custom painting', 'Override `paintComponent`, call `super`, and paint only the component’s current visual state.', `class Canvas extends javax.swing.JPanel {
  protected void paintComponent(java.awt.Graphics g) {
    super.paintComponent(g);
    g.fillOval(20, 20, 60, 60);
  }
}`, 'Create a panel that paints a colored progress bar.'),
      ],
      trap: 'Never perform file, network, or long calculations on the EDT; the interface will freeze.',
      legacy: true,
    }),
    chapter({
      number: 30,
      title: 'Exploring Swing',
      hook: 'Swing’s component catalog is broad, but the pattern repeats: choose a model, present a view, listen for intent, and update state.',
      topics: [
        topic('Labels, fields, and buttons', 'Labels explain, text fields collect short input, and buttons trigger clear commands.', `javax.swing.JTextField input = new javax.swing.JTextField(12);
javax.swing.JButton greet = new javax.swing.JButton("Greet");
greet.addActionListener(e -> System.out.println("Hello " + input.getText()));`, 'Create a name field and button that updates a greeting label.'),
        topic('Toggle, check, and radio buttons', 'Toggle controls hold state; button groups make radio buttons mutually exclusive.', `javax.swing.JRadioButton easy = new javax.swing.JRadioButton("Easy");
javax.swing.JRadioButton hard = new javax.swing.JRadioButton("Hard");
javax.swing.ButtonGroup group = new javax.swing.ButtonGroup();
group.add(easy); group.add(hard);`, 'Create a settings panel with a checkbox and grouped radio buttons.'),
        topic('Lists and combo boxes', '`JList` shows many choices; `JComboBox` conserves space for one selected choice.', `String[] languages = {"C", "Java", "Python"};
javax.swing.JComboBox<String> box = new javax.swing.JComboBox<String>(languages);
box.addActionListener(e -> System.out.println(box.getSelectedItem()));`, 'Display languages in a combo box and react to selection.'),
        topic('Tabs and scroll panes', 'Tabbed panes separate views; scroll panes provide a viewport for content larger than its area.', `javax.swing.JTabbedPane tabs = new javax.swing.JTabbedPane();
tabs.addTab("Notes", new javax.swing.JScrollPane(new javax.swing.JTextArea(10, 30)));
tabs.addTab("Practice", new javax.swing.JPanel());`, 'Build two tabs and place a long text area inside a scroll pane.'),
        topic('Trees and tables', 'Trees represent hierarchy; tables use row/column models for structured records.', `Object[][] rows = {{"Mira", 91}, {"Dev", 84}};
Object[] columns = {"Name", "Marks"};
javax.swing.JTable table = new javax.swing.JTable(rows, columns);`, 'Build a table with three students and sortable marks.'),
      ],
      trap: 'Do not use `null` layout to force coordinates. Layout managers keep controls usable when the window or font changes.',
      legacy: true,
    }),
    chapter({
      number: 31,
      title: 'Servlets',
      hook: 'A servlet lives on a server, receives an HTTP request, and builds a response. Keep request handling short and shared state thread-safe.',
      topics: [
        topic('Servlet lifecycle', 'The container creates a servlet, calls `init` once, `service` per request, and `destroy` before removal.', `// Lifecycle-shaped study example
void init() { System.out.println("once"); }
void service() { System.out.println("per request"); }
void destroy() { System.out.println("cleanup"); }`, 'Simulate servlet lifecycle calls in an ordinary Java class.'),
        topic('GET requests', '`doGet` reads request data and writes a response for safe, repeatable retrieval operations.', `// Modern servers use jakarta.servlet; the book uses javax.servlet.
protected void doGet(HttpServletRequest req, HttpServletResponse resp)
    throws IOException {
  resp.getWriter().println("Hello");
}`, 'Write a `doGet` method that returns a query parameter as text.'),
        topic('POST requests', '`doPost` handles submitted data or state-changing operations and must still validate every field.', `protected void doPost(HttpServletRequest req, HttpServletResponse resp)
    throws IOException {
  String name = req.getParameter("name");
  resp.getWriter().println("Saved " + name);
}`, 'Read two form fields in `doPost` and return a confirmation.'),
        topic('Responses and content types', 'Set status, content type, encoding, and headers before writing the body.', `resp.setContentType("application/json");
resp.setCharacterEncoding("UTF-8");
resp.getWriter().print("{\"ready\":true}");`, 'Return a small JSON response with the correct content type.'),
        topic('Cookies and sessions', 'Cookies live in the client; server sessions associate per-user state with a session identifier.', `HttpSession session = req.getSession();
Integer visits = (Integer) session.getAttribute("visits");
session.setAttribute("visits", visits == null ? 1 : visits + 1);`, 'Count visits for one user with `HttpSession`.'),
      ],
      trap: 'One servlet instance can serve concurrent requests. Do not store request-specific data in instance fields.',
      legacy: true,
    }),
    chapter({
      number: 32,
      title: 'Financial Applets and Servlets',
      hook: 'A useful application joins formulas to careful input, reusable calculation methods, and a presentation layer that can change without rewriting the math.',
      topics: [
        topic('Loan payment formula', 'Regular payment calculations combine principal, periodic rate, and number of periods.', `static double payment(double principal, double annualRate, int months) {
  double r = annualRate / 1200.0;
  return principal * r / (1 - Math.pow(1 + r, -months));
}`, 'Write a method that calculates a monthly loan payment.'),
        topic('Future value', 'Compound growth repeatedly applies a periodic rate to present value.', `static double futureValue(double principal, double annualRate, int years) {
  return principal * Math.pow(1 + annualRate / 100.0, years);
}`, 'Calculate compound future value from user input.'),
        topic('Input validation', 'Financial inputs need range checks and clear error messages before calculations begin.', `static void validate(double principal, double rate, int months) {
  if (principal <= 0 || rate < 0 || months <= 0)
    throw new IllegalArgumentException("Use positive principal/months and nonnegative rate");
}`, 'Reject invalid principal, rate, and duration values.'),
        topic('Separate model from UI', 'Keep formulas in ordinary methods so console, Swing, or web interfaces can reuse and test them.', `class LoanCalculator {
  double monthlyPayment(double amount, double rate, int months) {
    double r = rate / 1200.0;
    return amount * r / (1 - Math.pow(1 + r, -months));
  }
}`, 'Move a financial formula out of an event handler into a reusable class.'),
        topic('Precision and presentation', '`double` is useful for teaching formulas; real money systems generally require defined rounding with `BigDecimal`.', `java.math.BigDecimal amount = new java.math.BigDecimal("123.456");
amount = amount.setScale(2, java.math.RoundingMode.HALF_UP);
System.out.println(amount);`, 'Round a monetary result to two decimal places with `BigDecimal`.'),
      ],
      trap: 'Never use binary floating-point as the final authority for real financial transactions; define decimal scale and rounding explicitly.',
      legacy: true,
    }),
    chapter({
      number: 33,
      title: 'Creating a Download Manager in Java',
      hook: 'This project combines networking, files, threads, models, progress, and cancellation into one realistic state machine.',
      topics: [
        topic('URL validation and connection', 'Validate protocol and destination, then set timeouts before opening a remote stream.', `java.net.URL url = new java.net.URL("https://example.com/file.zip");
if (!url.getProtocol().equals("https")) throw new IllegalArgumentException("HTTPS required");
java.net.URLConnection connection = url.openConnection();
connection.setConnectTimeout(5000);`, 'Validate an HTTPS URL and configure connection timeouts.'),
        topic('Buffered download', 'Read bounded chunks and write only the bytes actually received.', `try (java.io.InputStream in = connection.getInputStream();
     java.io.OutputStream out = new java.io.FileOutputStream("file.zip")) {
  byte[] buffer = new byte[8192];
  for (int n; (n = in.read(buffer)) != -1;) out.write(buffer, 0, n);
}`, 'Download a resource to a file using an 8 KB buffer.'),
        topic('Progress calculation', 'Track downloaded bytes and compare them with known content length; handle unknown lengths separately.', `long downloaded = 512;
long total = 2048;
int percent = total > 0 ? (int) (downloaded * 100 / total) : -1;
System.out.println(percent);`, 'Calculate and display download percentage without dividing by zero.'),
        topic('State model and observers', 'Represent states explicitly and notify the UI when progress or status changes.', `enum DownloadState { QUEUED, RUNNING, PAUSED, COMPLETE, ERROR, CANCELLED }
class DownloadModel {
  private DownloadState state = DownloadState.QUEUED;
}`, 'Create legal transition checks for a download state enum.'),
        topic('Pause, cancel, and cleanup', 'Workers should observe cancellation, preserve interruption, close resources, and update final state exactly once.', `while (!Thread.currentThread().isInterrupted()) {
  int count = in.read(buffer);
  if (count == -1) break;
  out.write(buffer, 0, count);
}`, 'Make a download loop stop cleanly when its thread is interrupted.'),
      ],
      trap: 'Never update Swing components directly from the download worker; publish progress back to the event dispatch thread.',
    }),
    {
      number: 34,
      title: 'Final Java Revision Map',
      hook: 'The whole language is easier to remember as six connected routes: runtime, language, objects, reliability, libraries, and applications.',
      revisionOnly: true,
      topics: [
        ['1. Runtime route', 'Source becomes bytecode; the JVM verifies and runs it. Remember `javac`, `java`, classpath, and platform independence.', `// Source -> javac -> bytecode -> JVM
System.out.println(System.getProperty("java.version"));`],
        ['2. Language route', 'Types create values, operators transform them, and control statements choose or repeat work.', `int total = 0;
for (int n = 1; n <= 5; n++) total += n;`],
        ['3. Object route', 'Classes encapsulate state; inheritance specializes; interfaces define roles; polymorphism selects behavior.', `java.util.List<String> notes = new java.util.ArrayList<String>();
notes.add("polymorphism");`],
        ['4. Reliability route', 'Exceptions report failure, generics protect types, and synchronization protects shared state.', `try { Integer.parseInt("42"); }
catch (NumberFormatException ex) { System.out.println("invalid"); }`],
        ['5. Library route', 'Strings, collections, I/O, networking, regex, and concurrency solve recurring problems with tested APIs.', `java.util.Map<String, Integer> counts = new java.util.HashMap<String, Integer>();
counts.put("java", 1);`],
        ['6. Application route', 'Events connect users to AWT/Swing, servlets connect HTTP to server code, and projects join multiple chapters.', `javax.swing.SwingUtilities.invokeLater(() ->
    System.out.println("UI work on EDT"));`],
      ],
      useIt: [
        'Recall each concept with four boxes: purpose, syntax, tiny example, common mistake.',
        'Trace first, predict output second, run third, and explain the result last.',
        'Mix chapters during practice: collections with generics, files with exceptions, and UI with threads.',
      ],
      trap: 'Reading creates familiarity, not recall. Close the notes and rebuild one tiny example from memory.',
      example: `// The 5-step Java revision loop
// 1. Name the problem
// 2. Choose the Java tool
// 3. Write the smallest example
// 4. Predict and run
// 5. Explain one mistake`,
      practice: 'Choose one route, rebuild two examples without looking, then connect them in one mini-program.',
      energy: 'You do not need all 33 chapters in your head at once. You need a reliable path back to each idea.',
      revisionPlan: [
        {
          title: 'Seven-Day Route',
          points: [
            'Day 1: JVM, syntax, types, operators, and control flow.',
            'Day 2: Classes, methods, inheritance, packages, and interfaces.',
            'Day 3: Exceptions, threads, enums, annotations, and generics.',
            'Day 4: Strings, java.lang, collections, utilities, and I/O.',
            'Day 5: Networking, events, AWT, images, and Swing.',
            'Day 6: Concurrency utilities, NIO, regex, beans, and servlets.',
            'Day 7: Build one mixed project and review every error you fixed.',
          ],
        },
        {
          title: 'Fast Recall Questions',
          points: [
            'What problem does this class or keyword solve?',
            'What is the smallest correct syntax?',
            'What state changes, and who owns it?',
            'What exception, boundary, or threading mistake can occur?',
          ],
        },
        {
          title: 'Modern Java Lens',
          points: [
            'Keep applets, old AWT patterns, JavaBeans, and javax servlet APIs as legacy knowledge.',
            'Prefer java.time, try-with-resources, executors, and supported UI/web platforms in new projects.',
            'The edition is Java SE 6-era; verify modern API behavior when building production software.',
          ],
        },
      ],
    },
  ],
};
