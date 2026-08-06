export const cNotes = {
  id: 'c',
  name: 'C',
  accent: '#0e7490',
  status: 'Ready',
  source: {
    label: 'Let Us C PDF outline',
    url: 'https://pdvpmtasgaon.edu.in/uploads/dptcomputer/Let%20us%20c%20-%20yashwantkanetkar.pdf',
  },
  chapters: [
    {
      number: 1,
      title: 'Getting Started',
      hook: 'C begins like a workshop: tiny tools, strict names, and no magic. Once the tools click, every later chapter feels less mysterious.',
      topics: [
        ['What is C', 'Use C when you want speed, close control of memory, and a clear view of how programs talk to hardware.'],
        ['Character set', 'Programs are built from letters, digits, symbols, and whitespace. Syntax is the grammar that turns them into instructions.'],
        ['Constants, variables, keywords', 'Constants keep a value; variables hold changing data; keywords are reserved words you cannot reuse as names.'],
        ['Variable names', 'Choose names that explain purpose. Start with a letter or underscore, then use letters, digits, or underscores.'],
        ['First program', 'A C program usually starts running at `main()`, performs statements in order, and returns an exit status.'],
        ['Compilation and execution', 'The compiler checks and translates source code; the executable is what the machine actually runs.'],
        ['Input and arithmetic', '`scanf()` receives typed values; arithmetic follows precedence, conversion, and associativity rules.'],
      ],
      useIt: [
        'Always initialize variables before using them.',
        'Use `int` for whole numbers, `float` or `double` for decimals, and `char` for one character.',
        'Add parentheses when an expression has mixed operators and you want zero doubt.',
      ],
      trap: 'Integer division drops the decimal part. `5 / 2` becomes `2`; use `5.0 / 2` when you need `2.5`.',
      example: `#include <stdio.h>

int main(void) {
  int marks = 87;
  float percent = marks / 100.0f;
  printf("Score: %.2f\\n", percent);
  return 0;
}`,
      practice: 'Write a program that reads two numbers and prints their sum, difference, product, and decimal division.',
      energy: 'Tiny program, real machine. That is the thrill of C: you type a line, and the computer obeys exactly.',
    },
    {
      number: 2,
      title: 'Decision Control Structure',
      hook: 'Decision-making is where a program stops being a calculator and starts acting like a thinking assistant.',
      topics: [
        ['if', 'Run a block only when a condition is true. This is the basic gate in C.'],
        ['if-else', 'Choose between two paths, such as pass/fail, valid/invalid, or odd/even.'],
        ['Nested decisions', 'Use carefully for multi-step logic, but keep indentation clean or the story becomes tangled.'],
        ['Logical operators', '`&&` means all conditions must pass; `||` means any condition can pass; `!` reverses truth.'],
        ['else-if ladder', 'Best for ranges or categories where only one branch should win.'],
        ['Conditional operator', '`condition ? a : b` is useful for short value choices, not long business logic.'],
      ],
      useIt: [
        'Prefer clear conditions like `age >= 18` over clever expressions.',
        'When ranges are involved, test boundaries: exact minimum, exact maximum, and one value outside each edge.',
        'Put braces around blocks even when there is one statement; future edits become safer.',
      ],
      trap: 'Do not write `if (x = 5)` when you mean `if (x == 5)`. Assignment changes the value; comparison checks it.',
      example: `if (marks >= 90) {
  grade = 'A';
} else if (marks >= 75) {
  grade = 'B';
} else {
  grade = 'C';
}`,
      practice: 'Build a grade calculator that handles invalid marks below 0 or above 100.',
      energy: 'Every `if` is a fork in the road. Good programs make the road signs impossible to misunderstand.',
    },
    {
      number: 3,
      title: 'Loop Control Structure',
      hook: 'Loops are the engine room. One clear instruction becomes ten, a hundred, or a million careful repetitions.',
      topics: [
        ['while loop', 'Use when repetition depends on a condition that may change during the loop.'],
        ['for loop', 'Use when counting is central: start, stop, step.'],
        ['Nested loops', 'Useful for grids, tables, patterns, and matrix work. Each inner loop completes for every outer loop turn.'],
        ['Multiple initialisations', 'A `for` loop can update more than one variable, but clarity matters more than compactness.'],
        ['break', 'Exit the nearest loop immediately when the job is done or a stop condition appears.'],
        ['continue', 'Skip the rest of the current turn and move to the next iteration.'],
        ['do-while', 'Runs once before checking the condition, useful for menus and retry prompts.'],
      ],
      useIt: [
        'Make sure a loop variable moves toward the stopping condition.',
        'Use `for` for known counts and `while` for open-ended waiting or searching.',
        'Keep the loop body small; extract repeated logic into a function when it grows.',
      ],
      trap: 'An accidental infinite loop usually comes from forgetting to update the variable that controls the condition.',
      example: `for (int n = 1; n <= 5; n++) {
  printf("%d squared is %d\\n", n, n * n);
}`,
      practice: 'Print a multiplication table from 1 to 10, then modify it to print only even rows.',
      energy: 'A loop feels like rhythm: check, act, move forward. Once you hear the rhythm, repetition becomes power.',
    },
    {
      number: 4,
      title: 'Case Control Structure',
      hook: 'When choices look like a menu, `switch` gives your code a clean control panel.',
      topics: [
        ['switch', 'Compares one expression against constant cases and jumps to the matching case.'],
        ['case labels', 'Cases must be constant values, commonly integers, chars, or enum values.'],
        ['break in switch', 'Without `break`, execution falls through into the next case. Sometimes useful, often a bug.'],
        ['default', 'Handles everything that did not match, like the final “otherwise” branch.'],
        ['switch vs if-else', 'Use `switch` for exact discrete choices; use `if-else` for ranges and compound conditions.'],
        ['goto', 'Exists in C, but most beginner code is clearer with loops, functions, and returns.'],
      ],
      useIt: [
        'Great for menus: add, edit, delete, quit.',
        'Group cases deliberately when multiple inputs should do the same thing.',
        'Always decide whether fall-through is intentional and make it visually obvious.',
      ],
      trap: 'Forgetting `break` can make one menu option secretly execute several options.',
      example: `switch (choice) {
  case 1: puts("Add"); break;
  case 2: puts("Edit"); break;
  case 0: puts("Exit"); break;
  default: puts("Unknown option");
}`,
      practice: 'Create a calculator menu using `switch` for +, -, *, and /.',
      energy: 'A `switch` reads like a scene list: when this happens, go here; when that happens, go there.',
    },
    {
      number: 5,
      title: 'Functions & Pointers',
      hook: 'Functions organize thought. Pointers reveal where values live. Together they are the doorway into real C.',
      topics: [
        ['Functions', 'Package a task behind a name so the program reads in useful steps.'],
        ['Passing values', 'Arguments copy data into parameters unless you pass an address.'],
        ['Scope', 'A variable lives only where it is declared, unless storage rules say otherwise.'],
        ['Prototypes', 'Declare a function before use so the compiler knows its return type and parameters.'],
        ['Call by value/reference style', 'C is call-by-value, but passing addresses lets a function modify original data.'],
        ['Pointers', 'A pointer stores an address. `&x` gets an address; `*p` uses the value at an address.'],
        ['Recursion', 'A function can call itself; every call needs progress toward a base case.'],
      ],
      useIt: [
        'Use functions to separate input, processing, and output.',
        'Use pointers when a function must change a caller’s variable or work with arrays efficiently.',
        'Draw pointer diagrams. Address bugs become visible when you sketch boxes and arrows.',
      ],
      trap: 'Never dereference an uninitialized pointer. It points nowhere trustworthy.',
      example: `void swap(int *a, int *b) {
  int temp = *a;
  *a = *b;
  *b = temp;
}`,
      practice: 'Write `swap()`, `maxOfTwo()`, and a recursive factorial function. Test each separately.',
      energy: 'Pointers look sharp because they are sharp. Handle them with calm hands and they become your best tool.',
    },
    {
      number: 6,
      title: 'Data Types Revisited',
      hook: 'A data type is a promise: how much space, what kind of value, and what operations make sense.',
      topics: [
        ['short, int, long', 'Choose the size based on the range you need, but remember exact sizes can vary by platform.'],
        ['signed and unsigned', 'Signed stores negative and positive values; unsigned stores only non-negative values with a larger top range.'],
        ['char signedness', '`char` can behave as signed or unsigned depending on implementation, so be explicit when it matters.'],
        ['float and double', '`double` is the normal choice for decimal precision; `float` saves space when needed.'],
        ['auto storage', 'Local variables are automatic by default and disappear when the block ends.'],
        ['register storage', 'A hint for faster access; modern compilers usually make better decisions themselves.'],
        ['static and extern', '`static` preserves local value or limits file visibility; `extern` refers to a global defined elsewhere.'],
      ],
      useIt: [
        'Use `size_t` for sizes and indexes returned by library functions.',
        'Prefer `double` for calculations unless memory pressure is real.',
        'Keep global variables rare; pass data through parameters when possible.',
      ],
      trap: 'Mixing signed and unsigned values can produce surprising comparisons. Be deliberate.',
      example: `static int nextId(void) {
  static int id = 1000;
  return id++;
}`,
      practice: 'Print `sizeof` for `char`, `int`, `long`, `float`, and `double` on your compiler.',
      energy: 'Types are not boring labels; they are the physical shape of your data inside memory.',
    },
    {
      number: 7,
      title: 'The C Preprocessor',
      hook: 'Before compilation, the preprocessor edits the stage: includes files, expands macros, and chooses code paths.',
      topics: [
        ['Macro expansion', 'Text replacement happens before the compiler understands the program.'],
        ['Macros with arguments', 'Look like functions but are expanded as text, so parentheses are essential.'],
        ['Macros vs functions', 'Functions are safer and typed; macros are useful for constants, conditional builds, and tiny generic patterns.'],
        ['File inclusion', '`#include` pulls declarations and definitions into the current file.'],
        ['Conditional compilation', '`#ifdef`, `#ifndef`, `#if`, and `#elif` include code only under selected conditions.'],
        ['#undef and #pragma', 'Use `#undef` to remove a macro; `#pragma` is compiler-specific instruction territory.'],
      ],
      useIt: [
        'Use include guards or `#pragma once` in headers.',
        'Prefer `const` or `enum` over macros for typed constants when possible.',
        'Wrap every macro argument in parentheses.',
      ],
      trap: '`#define SQUARE(x) x * x` breaks for `SQUARE(a + b)`. Use `((x) * (x))` style if you must use a macro.',
      example: `#ifndef MATH_HELPERS_H
#define MATH_HELPERS_H

int add(int a, int b);

#endif`,
      practice: 'Create a header with include guards and one function declaration, then include it from two `.c` files.',
      energy: 'The preprocessor is backstage machinery. Powerful, useful, and best kept tidy.',
    },
    {
      number: 8,
      title: 'Arrays',
      hook: 'Arrays are memory in a row. Learn the row, and strings, tables, buffers, and matrices start making sense.',
      topics: [
        ['One-dimensional arrays', 'Store many values of the same type under one name, accessed by zero-based index.'],
        ['Initialization', 'Initialize arrays at declaration when the starting values are known.'],
        ['Bounds checking', 'C will not stop you from reading outside an array. You must protect the boundary.'],
        ['Passing array elements', 'A single element is passed like a normal value.'],
        ['Pointers and arrays', 'Array names often decay to pointers to the first element.'],
        ['Two-dimensional arrays', 'Model tables and matrices as rows and columns in contiguous memory.'],
        ['Array of pointers', 'Useful for lists of strings or irregular data references.'],
      ],
      useIt: [
        'Keep the array length beside the array, especially when passing to functions.',
        'Loop from `0` to `< length`, not `<= length`.',
        'Use named constants for sizes instead of scattering magic numbers.',
      ],
      trap: 'The last valid index is `length - 1`. Index `length` is already outside the array.',
      example: `int marks[5] = {72, 81, 66, 90, 78};
int total = 0;

for (int i = 0; i < 5; i++) {
  total += marks[i];
}`,
      practice: 'Read 10 integers into an array and print the largest, smallest, and average.',
      energy: 'An array is a shelf. Index carefully, and every item is exactly where you expect.',
    },
    {
      number: 9,
      title: 'Puppetting On Strings',
      hook: 'In C, a string is not a special object. It is a character array with a quiet zero at the end.',
      topics: [
        ['Strings', 'A C string is a sequence of characters ending with `\\0`.'],
        ['Pointers and strings', 'String literals can be referenced by pointers; modifiable strings need arrays.'],
        ['strlen', 'Counts visible characters before the null terminator.'],
        ['strcpy', 'Copies one string into another; destination must have enough space.'],
        ['strcat', 'Appends source text to destination; again, space is your responsibility.'],
        ['strcmp', 'Compares lexicographically and returns zero when strings are equal.'],
        ['2D char arrays vs pointer arrays', '2D arrays reserve fixed slots; pointer arrays can point to differently sized strings.'],
      ],
      useIt: [
        'Reserve one extra character for `\\0`.',
        'Prefer bounded functions or manual length checks in modern C code.',
        'Use `fgets()` for line input because it can limit how much is read.',
      ],
      trap: 'Using `scanf("%s", name)` without a width limit can overflow the destination buffer.',
      example: `char name[20];
fgets(name, sizeof name, stdin);
printf("Hello, %s", name);`,
      practice: 'Read a full name with spaces and count vowels without using library string functions.',
      energy: 'Strings in C are honest: no hidden safety rails, just characters, memory, and your attention.',
    },
    {
      number: 10,
      title: 'Structures',
      hook: 'Structures let separate values travel together as one meaningful thing: a student, a book, an account, a record.',
      topics: [
        ['Why structures', 'Group related data under one type instead of juggling parallel arrays.'],
        ['Declaring structures', '`struct` defines the shape; variables of that struct hold actual data.'],
        ['Accessing elements', 'Use `.` for struct variables and `->` for pointers to structs.'],
        ['Memory layout', 'Fields are stored with possible padding for alignment.'],
        ['Array of structures', 'Store many records cleanly, like a mini table.'],
        ['Nested structures', 'Build richer models by placing one struct inside another.'],
        ['Uses', 'Records, configuration, geometry, inventory, database-like rows, and API-style data packets.'],
      ],
      useIt: [
        'Use structs when values belong to the same real-world entity.',
        'Pass large structs by pointer to avoid copying.',
        'Initialize fields explicitly so records start in a known state.',
      ],
      trap: 'Struct assignment copies field values, but pointer fields still point to the same outside memory.',
      example: `struct Student {
  int rollNo;
  char name[30];
  float marks;
};`,
      practice: 'Create an array of 5 students and print the student with the highest marks.',
      energy: 'A struct is where raw variables become characters in the program’s story.',
    },
    {
      number: 11,
      title: 'Console Input/Output',
      hook: 'Console I/O is the conversation layer: the program asks, the user answers, the result appears.',
      topics: [
        ['Types of I/O', 'Formatted I/O handles typed values; unformatted I/O handles characters and strings more directly.'],
        ['printf', 'Formats output with conversion specifiers like `%d`, `%f`, `%c`, and `%s`.'],
        ['scanf', 'Reads formatted input, usually requiring addresses for variables.'],
        ['sprintf and sscanf', 'Format into strings or parse from strings instead of the console.'],
        ['getchar and putchar', 'Read and write one character at a time.'],
        ['gets/puts awareness', '`gets()` is unsafe and removed from modern C; use `fgets()` instead.'],
      ],
      useIt: [
        'Match each format specifier to the correct variable type.',
        'Check `scanf()` return values to know whether input actually worked.',
        'Use precision in output when decimal display matters.',
      ],
      trap: 'Newline characters left in the input buffer can surprise the next character read.',
      example: `int age;
if (scanf("%d", &age) == 1) {
  printf("Age: %d\\n", age);
}`,
      practice: 'Read a price and quantity, then print a neat bill with two decimal places.',
      energy: 'Good I/O makes a program feel polite: it asks clearly and answers cleanly.',
    },
    {
      number: 12,
      title: 'File Input/Output',
      hook: 'Files give your program memory beyond one run. Data can leave the screen and live on disk.',
      topics: [
        ['File operations', 'Open, read/write, check errors, close. That is the basic file ritual.'],
        ['fopen', 'Returns a file pointer or `NULL` if opening fails.'],
        ['Reading and writing', 'Use character, line, formatted, or record-style functions depending on data shape.'],
        ['File modes', '`r`, `w`, `a`, and their `+`/binary variants control access and creation behavior.'],
        ['Newline handling', 'Line input often includes `\\n`; trim it when it is not wanted.'],
        ['Text vs binary', 'Text is human-readable; binary preserves raw representation but is less portable.'],
        ['Low-level I/O', 'Closer to OS calls; useful to understand, less common for beginner app logic.'],
      ],
      useIt: [
        'Check every file open before reading or writing.',
        'Close files when finished so buffers flush and resources return.',
        'Use text files for simple logs/config; binary files for fixed-size records or compact data.',
      ],
      trap: '`w` mode erases existing file contents. Use it only when overwriting is intended.',
      example: `FILE *fp = fopen("notes.txt", "a");
if (fp != NULL) {
  fputs("Learn files today\\n", fp);
  fclose(fp);
}`,
      practice: 'Write a program that copies one text file to another line by line.',
      energy: 'The first time your program writes a file, it stops being temporary.',
    },
    {
      number: 13,
      title: 'More Issues In Input/Output',
      hook: 'Now I/O grows up: command-line arguments, redirection, and standard streams make programs scriptable.',
      topics: [
        ['argc and argv', 'Receive command-line arguments so users can run `program input.txt output.txt`.'],
        ['Read/write errors', 'Detect failure instead of assuming every disk or input operation succeeded.'],
        ['Standard devices', '`stdin`, `stdout`, and `stderr` are the default input, output, and error streams.'],
        ['Output redirection', 'Send printed output to a file using the shell.'],
        ['Input redirection', 'Feed a file into a program as if it were typed input.'],
        ['Both ways at once', 'Combine input and output redirection for filter-style tools.'],
      ],
      useIt: [
        'Print errors to `stderr`, not normal output.',
        'Validate `argc` before reading `argv` indexes.',
        'Design small programs that read from input and write to output; they become reusable tools.',
      ],
      trap: 'Accessing `argv[1]` when no argument was provided is out-of-bounds behavior.',
      example: `int main(int argc, char *argv[]) {
  if (argc < 2) {
    fprintf(stderr, "Usage: app <name>\\n");
    return 1;
  }
  printf("Hello, %s\\n", argv[1]);
}`,
      practice: 'Make a command-line word counter that accepts a filename argument.',
      energy: 'Arguments and redirection turn a C program into a small tool that can join a bigger workflow.',
    },
    {
      number: 14,
      title: 'Operations On Bits',
      hook: 'Bitwise work is the secret hatch under ordinary numbers: flags, masks, shifts, and compact control.',
      topics: [
        ['Bitwise operators', 'Operate on individual bits rather than whole numeric meaning.'],
        ['One’s complement', '`~` flips every bit. Useful for masks, but signed results need caution.'],
        ['Right shift', 'Moves bits right, often dividing unsigned values by powers of two.'],
        ['Left shift', 'Moves bits left, often multiplying unsigned values by powers of two.'],
        ['AND', 'Use `&` to test or clear specific bits.'],
        ['OR', 'Use `|` to turn bits on.'],
        ['XOR', 'Use `^` to toggle bits or detect differences.'],
      ],
      useIt: [
        'Use unsigned types when doing bit manipulation.',
        'Name masks clearly: `READABLE`, `WRITABLE`, `EXECUTABLE`.',
        'Think in binary columns; each bit is a small switch.',
      ],
      trap: 'Do not confuse logical `&&`/`||` with bitwise `&`/`|`. They answer different questions.',
      example: `unsigned flags = 0;
flags |= 1u << 2;        // turn bit 2 on
if (flags & (1u << 2)) {
  puts("bit 2 is set");
}`,
      practice: 'Store three permissions in one integer: read, write, execute. Toggle each with a menu.',
      energy: 'Bits are tiny switches. Bitwise operators are your fingertips on the switchboard.',
    },
    {
      number: 15,
      title: 'Miscellaneous Features',
      hook: 'This chapter is a toolbox drawer: enums, typedefs, casts, function pointers, varargs, bit fields, and unions.',
      topics: [
        ['enum', 'Give readable names to integer choices, such as states, menu commands, or days.'],
        ['typedef', 'Create clearer type names, especially for structs and function pointer types.'],
        ['Typecasting', 'Convert one type to another deliberately; do not use casts to hide warnings you should fix.'],
        ['Bit fields', 'Pack small integer fields into a struct, often for low-level layouts.'],
        ['Function pointers', 'Store or pass behavior, useful for callbacks and dispatch tables.'],
        ['Functions returning pointers', 'Return addresses only when the pointed data will still be alive.'],
        ['Variable arguments', 'Functions like `printf()` accept a flexible number of arguments via `stdarg.h`.'],
        ['Unions', 'Different fields share the same memory; only one interpretation is valid at a time.'],
      ],
      useIt: [
        'Use `enum` to make states readable.',
        'Use function pointers for pluggable actions after normal functions are comfortable.',
        'Treat unions and bit fields as advanced tools for systems-style work.',
      ],
      trap: 'Never return a pointer to a local automatic variable; it dies when the function returns.',
      example: `enum Status { PENDING, RUNNING, DONE };

typedef int (*Operation)(int, int);`,
      practice: 'Create an enum-driven task status program and print different messages for each status.',
      energy: 'These features are not random extras. They are specialized keys for doors you will meet later.',
    },
    {
      number: 16,
      title: 'C Under Windows',
      hook: 'Here C steps into the operating system world, where programs respond to windows, messages, memory, and devices.',
      topics: [
        ['Windows types and typedef', 'Windows APIs use aliases like `DWORD`, `HANDLE`, and `LPSTR` to describe platform-specific data.'],
        ['Pointers in 32-bit world', 'Pointer size and address space matter when code moves across architectures.'],
        ['Memory management', 'OS APIs allocate and release resources outside ordinary variables.'],
        ['Device access', 'Hardware is accessed through controlled OS interfaces, not casual direct poking.'],
        ['DOS vs Windows model', 'DOS-style sequential control differs from Windows event-driven control.'],
        ['Event-driven model', 'The program waits for messages and reacts through callbacks/window procedures.'],
        ['First Windows program', 'A windowed app has setup, message loop, and message handling pieces.'],
      ],
      useIt: [
        'Learn the message loop concept; it appears in many GUI frameworks, not only old Win32.',
        'Release OS handles/resources when done.',
        'Treat this chapter as systems awareness unless you specifically plan Win32 C programming.',
      ],
      trap: 'Modern Windows development may use newer tooling and APIs, so separate timeless concepts from dated environment details.',
      example: `while (GetMessage(&msg, NULL, 0, 0)) {
  TranslateMessage(&msg);
  DispatchMessage(&msg);
}`,
      practice: 'Sketch the life of a button click: user action, OS message, handler, screen update.',
      energy: 'A Windows app is less like a straight road and more like a control room waiting for signals.',
      legacy: true,
    },
    {
      number: 17,
      title: 'Windows Programming',
      hook: 'The window becomes a living object: created, shown, messaged, repainted, and closed.',
      topics: [
        ['Message box', 'A quick dialog for information, confirmation, or warning.'],
        ['Creating windows', 'Register a class, create a window, and show it.'],
        ['Multiple windows', 'Each window needs identity and message handling.'],
        ['Real-world window', 'A usable GUI coordinates creation, display, interaction, and repainting.'],
        ['Reacting to messages', 'Messages like create, paint, click, key, and destroy drive behavior.'],
        ['Program instances', 'The OS can run separate instances of the same program.'],
      ],
      useIt: [
        'Understand callbacks: your code is called by the system at the right event.',
        'Keep UI state separate from drawing when possible.',
        'Handle cleanup messages so the program exits neatly.',
      ],
      trap: 'Blocking the message loop makes the app feel frozen.',
      example: `case WM_DESTROY:
  PostQuitMessage(0);
  return 0;`,
      practice: 'List five messages a window might receive and what your program should do for each.',
      energy: 'GUI code feels alive because the user is now part of the program’s timing.',
      legacy: true,
    },
    {
      number: 18,
      title: 'Graphics Under Windows',
      hook: 'Drawing code turns data into visible marks: lines, shapes, brushes, bitmaps, animation.',
      topics: [
        ['Device independent drawing', 'Draw through an abstraction so output can target screen, printer, or bitmap-like devices.'],
        ['Device context', 'A handle to drawing settings and target surface.'],
        ['Pens and brushes', 'Pens draw outlines; brushes fill areas.'],
        ['Shapes', 'Rectangles, ellipses, lines, and custom paths build visual structure.'],
        ['Mouse capture', 'Track mouse interaction during drag-style drawing.'],
        ['Bitmaps', 'Display pixel images through resource/loading APIs.'],
        ['Timers and animation', 'A timer triggers repeated updates to create motion.'],
      ],
      useIt: [
        'Keep drawing code repeatable because repaint events can happen anytime.',
        'Store model data, then redraw from it instead of trusting old pixels.',
        'Use timers for simple animation loops.',
      ],
      trap: 'Drawing once outside the paint cycle can disappear when the window repaints.',
      example: `case WM_TIMER:
  // update state, then request repaint
  InvalidateRect(hwnd, NULL, TRUE);
  return 0;`,
      practice: 'Design a tiny paint app plan: mouse down, mouse move, mouse up, repaint.',
      energy: 'Graphics is programming you can see. Every coordinate becomes a mark on the page.',
      legacy: true,
    },
    {
      number: 19,
      title: 'Interaction With Hardware',
      hook: 'This is the borderland where C meets devices, storage, keyboard hooks, and the responsibility that comes with low-level access.',
      topics: [
        ['Hardware interaction', 'Modern operating systems mediate hardware access for safety and stability.'],
        ['DOS perspective', 'Older DOS programs could interact more directly with hardware.'],
        ['Windows perspective', 'Windows uses APIs, drivers, handles, permissions, and events.'],
        ['Storage devices', 'Sector-level ideas explain how disks organize data beneath files.'],
        ['Keyboard communication', 'Keyboard events can be observed through OS-supported mechanisms.'],
        ['Dynamic linking', 'Load code from libraries at runtime when needed.'],
        ['Hooks and keylogging awareness', 'Hooks can monitor events; use ethically for legitimate accessibility, diagnostics, or app behavior only.'],
      ],
      useIt: [
        'Prefer documented OS APIs over direct hardware access.',
        'Understand security boundaries before interacting with devices or input hooks.',
        'Use this chapter as low-level context, not as a beginner project checklist.',
      ],
      trap: 'Keyboard monitoring can easily become invasive or illegal. Build only with user consent and a legitimate purpose.',
      example: `// Concept: app asks the OS for events;
// it should not secretly monitor users.`,
      practice: 'Write a short note explaining why modern OSes restrict direct hardware access.',
      energy: 'Low-level power is exciting because it is close to the machine. It also asks for adult-level care.',
      legacy: true,
    },
    {
      number: 20,
      title: 'C Under Linux',
      hook: 'Linux programming shows C as the language of processes: fork, parent, child, exit, and the operating system as a partner.',
      topics: [
        ['What is Linux', 'An operating system family with a Unix-like programming model and strong C heritage.'],
        ['C under Linux', 'Compile with tools such as `gcc` or `clang`; use headers and man pages as daily references.'],
        ['Hello Linux', 'A normal C program can be compiled and run from the terminal.'],
        ['Processes', 'A running program has its own process ID, memory, and resources.'],
        ['Parent and child', '`fork()` creates a child process that continues from the same point with a different return value.'],
        ['Zombies and orphans', 'A child that has exited but not been waited for becomes a zombie; orphaned children are adopted by init/systemd.'],
      ],
      useIt: [
        'Check system-call return values every time.',
        'Use `wait()` or `waitpid()` so child processes are cleaned up.',
        'Print process IDs while learning; the model becomes visible instantly.',
      ],
      trap: 'After `fork()`, both parent and child keep running. Make each branch explicit.',
      example: `pid_t pid = fork();
if (pid == 0) {
  puts("child");
} else if (pid > 0) {
  puts("parent");
}`,
      practice: 'Create a program that forks once and prints parent/child process IDs.',
      energy: 'With `fork()`, one program becomes two. It feels like a magic trick until the return value explains it.',
    },
    {
      number: 21,
      title: 'More Linux Programming',
      hook: 'Signals are the operating system knocking on your program’s door: stop, continue, alarm, interrupt, respond.',
      topics: [
        ['Signals', 'Asynchronous notifications sent to a process.'],
        ['Multiple signals', 'Programs can register different handlers for different signal types.'],
        ['Common handler', 'One handler can inspect the signal number and decide what to do.'],
        ['Blocking signals', 'Temporarily prevent selected signals from being delivered during sensitive work.'],
        ['Event-driven programming', 'Like GUI messages, the program reacts when outside events arrive.'],
        ['Where next', 'Learn files, processes, sockets, threads, and OS documentation when moving deeper.'],
      ],
      useIt: [
        'Keep signal handlers tiny and careful.',
        'Use signals for interruption, alarms, and process coordination, not everyday function calls.',
        'Study async-signal-safe functions before writing serious handlers.',
      ],
      trap: 'A signal can arrive at an awkward moment. Avoid complex work inside handlers.',
      example: `signal(SIGINT, handleInterrupt);`,
      practice: 'Write a program that catches Ctrl+C and prints a short message before exiting cleanly.',
      energy: 'Signals make the program listen to the world outside its own straight-line plan.',
    },
  ],
};

export const comingSoonLanguages = [
  {
    id: 'java',
    name: 'Java',
    status: 'Send PDF/notes next',
    teaser: 'OOP, JVM, collections, exceptions, streams, files, and interview-ready examples.',
  },
  {
    id: 'python',
    name: 'Python',
    status: 'Planned',
    teaser: 'Readable syntax, data structures, files, modules, automation, and practical scripts.',
  },
  {
    id: 'cpp',
    name: 'C++',
    status: 'Planned',
    teaser: 'Classes, STL, references, memory, templates, and modern C++ habits.',
  },
];
