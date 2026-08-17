import { createChapter, createRevisionChapter, lesson } from './studyTrackHelpers.js';

const chapters = [
  createChapter({
    number: 1,
    title: 'Algorithm Analysis',
    hook: 'DSA begins with a habit: describe how work grows before choosing the code that performs it.',
    lessons: [
      lesson('Time and space complexity', 'Time complexity tracks growing operations; space complexity tracks extra memory as input size n grows.', `for (int i = 0; i < n; i++)
  sum += a[i];
// Time O(n), extra space O(1)`, 'State the time and extra-space complexity of summing an array once.', `The loop visits n elements, so time is O(n). It uses only fixed variables, so extra space is O(1).`),
      lesson('Big O, Omega, and Theta', 'O gives an asymptotic upper bound, Omega a lower bound, and Theta a tight bound.', `3n^2 + 5n + 7 is Theta(n^2)
It is also O(n^2) and Omega(n^2)`, 'Give a tight asymptotic bound for 3n^2 + 5n + 7.', `Theta(n^2), because the quadratic term dominates as n grows.`),
      lesson('Counting loops', 'Sequential loops add costs; nested dependent work often multiplies or forms a series.', `for (i = 0; i < n; i++)
  for (j = 0; j < n; j++)
    work();
// n x n = O(n^2)`, 'Find the time complexity of two nested loops that each run n times.', `The inner work runs n x n times, so the time complexity is Theta(n^2).`),
      lesson('Logarithmic growth', 'Repeatedly halving or doubling a problem produces logarithmic work.', `for (int x = n; x > 1; x /= 2)
  steps++;
// Theta(log n)`, 'Why is repeatedly dividing n by 2 logarithmic?', `After k divisions the value is n/2^k. It reaches 1 when k is about log2(n), so the loop is Theta(log n).`),
      lesson('Best, average, and worst case', 'Input arrangement can change work; report the case and assumptions instead of naming one complexity blindly.', `Linear search:
best: first item -> Theta(1)
worst: last/absent -> Theta(n)`, 'Give best- and worst-case time for linear search.', `Best case is Theta(1) when the first item matches. Worst case is Theta(n) when the item is last or absent.`),
    ],
    trap: 'Big O is not a stopwatch measurement and does not mean exactly; it describes growth after ignoring constants and lower-order terms.',
    practice: 'Analyze five short loops for time and extra space, including one logarithmic and one triangular loop.',
  }),
  createChapter({
    number: 2,
    title: 'Arrays and Dynamic Arrays',
    hook: 'Arrays trade flexibility for direct access: one formula reaches any element, but movement is expensive.',
    lessons: [
      lesson('Contiguous storage', 'An array stores equal-size elements consecutively, enabling address calculation in constant time.', `address(a[i]) = base + i * sizeof(a[0])
// access: O(1)`, 'Why is indexed array access O(1)?', `The address is computed directly from the base address, index, and fixed element size; no traversal is required.`),
      lesson('Traversal and update', 'Scanning is O(n), while replacing an element at a valid known index is O(1).', `for (int i = 0; i < n; i++)
  printf("%d ", a[i]);
// traversal O(n)`, 'Give the complexity of traversing all n array elements.', `Theta(n), because every element is visited once.`),
      lesson('Insertion and deletion', 'Insertion or deletion in the middle shifts later elements, giving O(n) worst-case time.', `// insert x at pos
for (int i = n; i > pos; i--)
  a[i] = a[i - 1];
a[pos] = x;`, 'Why is insertion at the beginning of an array O(n)?', `All existing n elements may need to shift one position to make room, so the work grows linearly.`),
      lesson('Two-dimensional arrays', 'A matrix maps row and column indices to linear memory; C stores ordinary 2D arrays in row-major order.', `int a[2][3] = {{1,2,3},{4,5,6}};
printf("%d", a[1][2]); // 6`, 'What value is stored at a[1][2] in the shown matrix?', `The second row is {4,5,6}; index 2 contains 6.`),
      lesson('Dynamic-array growth', 'A dynamic array allocates a larger block and copies elements when capacity is full, yielding amortized O(1) append.', `if (size == capacity) {
  capacity *= 2;
  data = realloc(data, capacity * sizeof *data);
}
data[size++] = value;`, 'Why can dynamic-array append be amortized O(1) despite occasional O(n) resizing?', `Capacity doubling makes expensive copies increasingly rare; total copying over many appends is proportional to the number of appended elements.`),
    ],
    trap: 'C does not check array bounds. An index outside 0 through n-1 causes undefined behavior, not a guaranteed error message.',
    practice: 'Implement traversal, insertion, deletion, reversal, and matrix addition with explicit bounds checks.',
  }),
  createChapter({
    number: 3,
    title: 'Linked Lists',
    hook: 'A linked list replaces index arithmetic with arrows, making local rearrangement cheap and navigation sequential.',
    lessons: [
      lesson('Node structure', 'A singly linked node stores data and a pointer to the next node; the head points to the first node or NULL.', `typedef struct Node {
  int data;
  struct Node *next;
} Node;`, 'What marks the end of a singly linked list?', `The final node has next == NULL.`),
      lesson('Traversal', 'Traversal follows next pointers from head until NULL and takes O(n) for n nodes.', `for (Node *p = head; p != NULL; p = p->next)
  printf("%d ", p->data);`, 'What is the worst-case time to find a value in an unsorted singly linked list?', `O(n), because every node may need to be examined.`),
      lesson('Insertion at head', 'Head insertion allocates a node, points it at the old head, and updates head in O(1).', `Node *node = malloc(sizeof *node);
node->data = value;
node->next = head;
head = node;`, 'List the pointer updates for inserting a node at the head.', `Set the new node's next pointer to the current head, then assign head to the new node.`),
      lesson('Deletion', 'Deleting a known successor relinks around it before freeing its storage; deleting by value first requires search.', `Node *victim = prev->next;
prev->next = victim->next;
free(victim);`, 'Why must links be updated before freeing a node?', `After free, dereferencing the node is invalid. Its successor address must be preserved in the list before storage is released.`),
      lesson('Doubly and circular lists', 'Doubly linked lists add previous links; circular lists connect the last node back to the first.', `typedef struct DNode {
  int data;
  struct DNode *prev, *next;
} DNode;`, 'What extra operation becomes easier with a doubly linked list?', `Moving backward or deleting a known node without searching for its predecessor becomes easier because each node stores prev.`),
    ],
    trap: 'Changing a local copy of head does not update the caller head in C; return the new head or pass Node **head.',
    practice: 'Build a list with insert-at-head, insert-at-tail, search, delete, display, and complete memory cleanup.',
  }),
  createChapter({
    number: 4,
    title: 'Stacks',
    hook: 'A stack remembers unfinished work in reverse order: the last item placed is the first one recovered.',
    lessons: [
      lesson('LIFO operations', 'Push inserts at the top, pop removes the top, and peek reads it without removal; each is normally O(1).', `push(10); push(20); push(30);
pop(); // returns 30
peek(); // returns 20`, 'After pushing 10, 20, and 30, what do pop and then peek return?', `pop returns 30. The new top is 20, so peek returns 20.`),
      lesson('Array stack', 'An array stack tracks the index of the top item and must detect overflow and underflow.', `int push(Stack *s, int x) {
  if (s->top == CAPACITY - 1) return 0;
  s->data[++s->top] = x;
  return 1;
}`, 'What condition indicates overflow in a fixed array stack?', `Overflow occurs when top == capacity - 1 before a push.`),
      lesson('Linked stack', 'A linked stack pushes and pops at the list head, growing until allocation fails.', `node->next = top; top = node;       // push
victim = top; top = top->next;       // pop`, 'Why are linked-stack push and pop performed at the head?', `Head insertion and deletion require only constant-time pointer changes and no traversal.`),
      lesson('Expression processing', 'Stacks match delimiters, convert infix expressions, and evaluate postfix by storing pending operators or operands.', `Postfix: 2 3 4 * +
3*4 = 12
2+12 = 14`, 'Evaluate postfix expression 2 3 4 * +.', `Push 2, 3, 4; multiply 3 and 4 to get 12; add 2 and 12. Result = 14.`),
      lesson('Call stack', 'Each function call creates a frame for return information, parameters, and locals; recursion adds one frame per active call.', `factorial(3)
-> factorial(2)
-> factorial(1)
<- 1 <- 2 <- 6`, 'What does a call-stack frame normally store?', `It stores information needed for one active call, such as the return address, parameters, saved registers, and local variables.`),
    ],
    trap: 'Always test underflow before pop or peek; reading an empty stack is not a valid operation.',
    practice: 'Implement array and linked stacks, then use one to validate brackets and evaluate postfix expressions.',
  }),
  createChapter({
    number: 5,
    title: 'Queues and Deques',
    hook: 'A queue protects arrival order: first in is first out, whether requests are waiting for a printer, CPU, or graph traversal.',
    lessons: [
      lesson('FIFO operations', 'Enqueue inserts at the rear, dequeue removes at the front, and both should be O(1).', `enqueue(4); enqueue(8); enqueue(12);
dequeue(); // 4
front();   // 8`, 'After enqueueing 4, 8, and 12, what do dequeue and front return?', `dequeue returns 4. The next front value is 8.`),
      lesson('Circular array queue', 'Modulo arithmetic wraps front and rear so freed positions can be reused.', `rear = (rear + 1) % capacity;
data[rear] = value;`, 'Why is a circular queue better than shifting an array after every dequeue?', `It reuses freed positions through wrapped indices, keeping enqueue and dequeue O(1) without moving elements.`),
      lesson('Linked queue', 'A linked queue stores front and rear pointers; enqueue attaches at rear and dequeue removes at front.', `rear->next = node;
rear = node;
// first insertion sets front = rear = node`, 'What special update is needed when enqueueing into an empty linked queue?', `Both front and rear must be set to the new node.`),
      lesson('Deque', 'A double-ended queue supports insertion and deletion at both front and rear.', `push_front(2)
push_back(9)
pop_front()
pop_back()`, 'Which operations distinguish a deque from an ordinary queue?', `A deque permits insertion and deletion at both ends; an ordinary queue normally inserts at rear and removes at front.`),
      lesson('Priority queue', 'A priority queue removes the highest- or lowest-priority item rather than strictly the oldest item; heaps implement it efficiently.', `insert: O(log n)
peek priority: O(1)
remove priority: O(log n)`, 'How does removal order differ between a FIFO queue and a priority queue?', `FIFO removes the earliest arrival. A priority queue removes the item with the most urgent priority according to its ordering rule.`),
    ],
    trap: 'The simple condition front == rear is ambiguous unless the representation separately tracks empty/full state or deliberately sacrifices one slot.',
    practice: 'Implement a circular queue and deque, testing wraparound, overflow, underflow, and the final-element transition.',
  }),
  createChapter({
    number: 6,
    title: 'Recursion and Backtracking',
    hook: 'Recursion trusts a smaller version of the same problem; backtracking also knows how to undo a choice.',
    lessons: [
      lesson('Base and recursive cases', 'A recursive function needs a stopping case and progress toward it on every recursive path.', `long long factorial(int n) {
  if (n <= 1) return 1;
  return n * factorial(n - 1);
}`, 'Calculate factorial(5) using the recurrence.', `factorial(5) = 5 x 4 x 3 x 2 x 1 = 120.`),
      lesson('Recurrence and complexity', 'A recurrence describes recursive work; T(n)=T(n-1)+O(1) gives O(n), while two equal half-problems often give O(n log n).', `T(n) = T(n - 1) + 1 -> O(n)
T(n) = 2T(n/2) + n -> O(n log n)`, 'Solve the asymptotic recurrence T(n)=T(n-1)+1.', `There are n decreasing calls with constant work each, so T(n) is Theta(n).`),
      lesson('Recursive binary search', 'Binary search chooses one sorted half each call, reducing the problem size by two.', `int mid = low + (high - low) / 2;
if (a[mid] == key) return mid;
if (key < a[mid]) return search(a, low, mid - 1, key);
return search(a, mid + 1, high, key);`, 'What base case reports failure in recursive binary search?', `Return failure, commonly -1, when low > high because no search interval remains.`),
      lesson('Backtracking pattern', 'Choose a candidate, test constraints, recurse, then undo the choice so another candidate can be tried.', `choose(candidate);
if (valid()) solve(next);
unchoose(candidate);`, 'Why must a backtracking algorithm undo a choice?', `The shared partial solution must be restored before exploring a different branch; otherwise earlier choices incorrectly remain active.`),
      lesson('Memoization', 'Memoization caches recursive results by state, avoiding repeated solution of overlapping subproblems.', `if (memo[n] != UNKNOWN) return memo[n];
memo[n] = fib(n - 1) + fib(n - 2);
return memo[n];`, 'How does memoization improve naive recursive Fibonacci?', `It computes each Fibonacci state once, reducing exponential repeated work to O(n) time with O(n) stored results.`),
    ],
    trap: 'A base case that exists but cannot be reached still causes infinite recursion and eventual stack overflow.',
    practice: 'Trace recursive factorial and binary search, then implement one subset-generation backtracking problem.',
  }),
  createChapter({
    number: 7,
    title: 'Trees and Traversals',
    hook: 'A tree gives data ancestry and branches; traversal chooses a disciplined route through that shape.',
    lessons: [
      lesson('Tree vocabulary', 'The root has no parent; leaves have no children; depth counts edges from root and height counts the longest path downward.', `        A
      /   \\
     B     C
    /
   D
depth(D)=2, height(A)=2`, 'Find the depth of D and height of A in the shown tree.', `D is two edges below A, so depth(D)=2. The longest root-to-leaf path also has two edges, so height(A)=2.`),
      lesson('Binary-tree nodes', 'A binary-tree node has at most left and right children.', `typedef struct TreeNode {
  int key;
  struct TreeNode *left, *right;
} TreeNode;`, 'What is the maximum number of nodes at level k when the root is level 0?', `At most 2^k nodes can appear at level k.`),
      lesson('Depth-first traversals', 'Preorder visits root-left-right, inorder left-root-right, and postorder left-right-root.', `Tree: root A, left B, right C
Preorder: A B C
Inorder:  B A C
Postorder:B C A`, 'Give preorder, inorder, and postorder for root A with children B and C.', `Preorder A B C; inorder B A C; postorder B C A.`),
      lesson('Recursive inorder', 'Inorder recursively visits the left subtree, processes the node, then visits the right subtree.', `void inorder(TreeNode *root) {
  if (!root) return;
  inorder(root->left);
  printf("%d ", root->key);
  inorder(root->right);
}`, 'What is the time complexity of traversing every node once?', `Theta(n) for n nodes, because each node is processed exactly once.`),
      lesson('Level-order traversal', 'Breadth-first tree traversal uses a queue to process nodes level by level.', `enqueue(root);
while (!empty()) {
  node = dequeue();
  enqueue non-NULL children;
}`, 'Which auxiliary data structure is used for level-order traversal?', `A queue, because nodes must be processed in first-discovered order.`),
    ],
    trap: 'Height may be defined in edges or nodes by different courses. State the convention before calculating.',
    practice: 'Draw three trees, label depth and height, and produce all four traversal orders.',
  }),
  createChapter({
    number: 8,
    title: 'Binary Search Trees',
    hook: 'A BST turns ordering into direction: smaller goes left, larger goes right, and each comparison discards a branch.',
    lessons: [
      lesson('BST invariant', 'For every node, keys in the left subtree are smaller and keys in the right subtree are larger under a chosen duplicate policy.', `Insert: 8, 3, 10, 6
    8
   / \\
  3  10
   \\
    6`, 'Where is key 6 placed after inserting 8, 3, 10, 6?', `6 is less than 8 but greater than 3, so it becomes the right child of 3.`),
      lesson('Search and insertion', 'Search and insertion follow one root-to-leaf path, taking O(h) for tree height h.', `while (root && root->key != key)
  root = key < root->key ? root->left : root->right;`, 'Give average and worst-case search time for an ordinary BST.', `Average time is O(log n) when reasonably balanced; worst-case time is O(n) when the tree becomes a chain.`),
      lesson('Deletion cases', 'Delete a leaf directly, replace a one-child node by its child, and replace a two-child node with its inorder successor or predecessor.', `two children:
successor = minimum(root->right)
copy successor key
delete successor`, 'How is a BST node with two children commonly deleted?', `Copy the inorder successor key (or predecessor key) into the node, then delete that successor from its original subtree.`),
      lesson('Sorted traversal', 'Inorder traversal of a BST visits keys in sorted order.', `BST keys: 8,3,10,1,6
inorder -> 1,3,6,8,10`, 'Which traversal prints BST keys in ascending order?', `Inorder traversal: left subtree, root, then right subtree.`),
      lesson('Balanced search trees', 'AVL and red-black trees restrict imbalance so height remains O(log n), preserving fast operations.', `AVL balance factor = height(left) - height(right)
Allowed values: -1, 0, 1`, 'What balance-factor values are permitted at an AVL node?', `-1, 0, or 1.`),
    ],
    trap: 'The BST property must hold for entire subtrees, not only for each node immediate children.',
    practice: 'Insert and delete keys by hand, verify inorder order, and identify the first node needing an AVL rotation.',
  }),
  createChapter({
    number: 9,
    title: 'Heaps and Priority Queues',
    hook: 'A heap keeps the most urgent value at the root without paying the cost of sorting everything.',
    lessons: [
      lesson('Heap property', 'A max-heap keeps every parent at least as large as its children; a min-heap reverses the comparison.', `Max-heap array: [20, 12, 15, 4, 7]
20 >= 12 and 15`, 'Is [20,12,15,4,7] a valid max-heap?', `Yes. Every parent is at least as large as its children: 20 >= 12,15 and 12 >= 4,7.`),
      lesson('Array representation', 'For zero-based index i, children are 2i+1 and 2i+2, and a non-root parent is (i-1)/2.', `i = 3
left = 7
right = 8
parent = 1`, 'Find the child and parent indices for zero-based heap index 3.', `Left child = 7, right child = 8, and parent = 1 using integer division.`),
      lesson('Insertion', 'Insert at the end and sift upward while the heap property is violated, taking O(log n).', `a[size] = value;
i = size++;
while (i > 0 && a[parent(i)] < a[i]) {
  swap(&a[parent(i)], &a[i]);
  i = parent(i);
}`, 'Why does heap insertion take O(log n) worst-case?', `The new value moves along at most one root-to-leaf path, whose length is the heap height O(log n).`),
      lesson('Remove priority', 'Replace the root with the final element, shrink the heap, and sift downward toward the appropriate child.', `answer = a[0];
a[0] = a[--size];
sift_down(0);`, 'List the steps for removing the maximum from a max-heap.', `Save the root, move the final element to the root, reduce heap size, sift the replacement downward, and return the saved maximum.`),
      lesson('Build heap and heapsort', 'Bottom-up heap construction is O(n); repeated root removal then sorts in O(n log n) time.', `for (int i = n/2 - 1; i >= 0; i--)
  sift_down(a, n, i);
// bottom-up build: O(n)`, 'What is the complexity of bottom-up heap construction?', `Theta(n), even though one individual sift-down can take O(log n).`),
    ],
    trap: 'A heap is only partially ordered; its array is not globally sorted except for the root guarantee.',
    practice: 'Build max- and min-heaps by hand, then implement insertion, peek, removal, and heapsort.',
  }),
  createChapter({
    number: 10,
    title: 'Hashing',
    hook: 'Hashing guesses where a key belongs, then uses collision rules to recover when two guesses meet.',
    lessons: [
      lesson('Hash functions', 'A good hash function is deterministic, fast, and spreads expected keys evenly across table indices.', `index = key % table_size
key 42, size 10 -> index 2`, 'Find the table index for key 42 using h(k)=k mod 10.', `42 mod 10 = 2, so the index is 2.`),
      lesson('Separate chaining', 'Each table slot points to a bucket or linked list of colliding entries.', `size 5: keys 7,12,22
all hash to 2
table[2]: 7 -> 12 -> 22`, 'How does separate chaining store three keys that hash to one index?', `It stores all three in the bucket or linked chain belonging to that index.`),
      lesson('Open addressing', 'Open addressing probes other slots in the table; linear probing checks consecutive positions.', `h(k)=k mod 7
10 -> 3
17 -> 3 collision, try 4`, 'Using linear probing with size 7, where is key 17 placed after key 10 occupies index 3?', `17 initially hashes to 3, then probes index 4, so it is placed at 4 if that slot is empty.`),
      lesson('Load factor', 'Load factor alpha = entries/table size predicts crowding; open-addressed tables must keep an unused slot.', `entries = 7, slots = 10
alpha = 7/10 = 0.7`, 'Calculate the load factor for seven entries in ten slots.', `alpha = 7/10 = 0.7.`),
      lesson('Deletion and rehashing', 'Open addressing needs tombstones so deletion does not break probe chains; resizing rehashes keys because indices depend on table size.', `slot state: EMPTY, OCCUPIED, DELETED
search continues through DELETED`, 'Why can an open-addressing deletion not simply mark a slot empty?', `A later key may have probed past that slot. Marking it empty would stop searches early, so a deleted marker preserves the probe chain.`),
    ],
    trap: 'Hash-table O(1) operations are expected or average behavior, not a worst-case guarantee; collisions can degrade them to O(n).',
    practice: 'Insert and search the same keys using chaining, linear probing, quadratic probing, and double hashing.',
  }),
  createChapter({
    number: 11,
    title: 'Graphs',
    hook: 'Graphs model relationships without forcing a hierarchy: roads, dependencies, friendships, and networks become vertices and edges.',
    lessons: [
      lesson('Graph vocabulary', 'Graphs may be directed or undirected, weighted or unweighted; degree counts incident edges and paths connect vertices.', `Undirected edges: A-B, A-C, B-C
degree(A)=2`, 'Find degree(A) for edges A-B, A-C, and B-C.', `A touches edges A-B and A-C, so degree(A)=2.`),
      lesson('Graph representations', 'An adjacency matrix uses O(V^2) space; adjacency lists use O(V+E) and suit sparse graphs.', `A: B, C
B: A, C
C: A, B`, 'Which representation is normally more space-efficient for a sparse graph?', `An adjacency list, because it stores vertices and existing edges in O(V+E) space rather than every possible pair.`),
      lesson('Breadth-first search', 'BFS uses a queue and discovers vertices by increasing unweighted distance from the source.', `mark source; enqueue(source);
while queue not empty:
  v = dequeue();
  enqueue each unvisited neighbor`, 'Which traversal finds shortest edge-count paths in an unweighted graph?', `Breadth-first search, because it explores vertices level by level from the source.`),
      lesson('Depth-first search', 'DFS uses recursion or an explicit stack and follows one branch deeply before backtracking.', `void dfs(int v) {
  visited[v] = 1;
  for each neighbor u
    if (!visited[u]) dfs(u);
}`, 'Which data structure does iterative DFS use?', `A stack. Recursive DFS uses the program call stack implicitly.`),
      lesson('Shortest paths and spanning trees', 'Dijkstra handles nonnegative edge weights; a minimum spanning tree connects all vertices with minimum total edge weight.', `Dijkstra: shortest routes from a source
Prim/Kruskal: minimum spanning tree`, 'Can ordinary Dijkstra algorithm safely handle negative edge weights?', `No. Its greedy finalization assumes remaining paths cannot reduce a settled distance, which negative edges can violate.`),
    ],
    trap: 'A minimum spanning tree minimizes total tree weight; it does not necessarily provide the shortest path between every pair of vertices.',
    practice: 'Represent one graph in both forms and trace BFS, DFS, Dijkstra, and one minimum-spanning-tree algorithm.',
  }),
  createChapter({
    number: 12,
    title: 'Sorting Algorithms',
    hook: 'Sorting is controlled disorder removal; the right method depends on input size, memory, stability, and existing order.',
    lessons: [
      lesson('Elementary sorts', 'Bubble and selection sort are O(n^2); insertion sort is also quadratic worst-case but efficient for small or nearly sorted data.', `Insertion sort inner step:
key = a[i];
shift larger prefix values right;
insert key in gap;`, 'Which elementary sort is usually a good choice for a small nearly sorted array?', `Insertion sort, because it performs close to linear time when few elements need shifting and has low overhead.`),
      lesson('Merge sort', 'Merge sort recursively sorts halves and merges them in O(n log n) time using O(n) auxiliary array space.', `split -> sort left -> sort right -> merge
T(n)=2T(n/2)+O(n)=O(n log n)`, 'State merge sort time and auxiliary-space complexity for arrays.', `Time is Theta(n log n) in best, average, and worst cases; auxiliary array space is O(n).`),
      lesson('Quicksort', 'Quicksort partitions around a pivot; it averages O(n log n) but can reach O(n^2) with repeatedly unbalanced partitions.', `partition: values <= pivot | pivot | values > pivot
recurse on both sides`, 'When does quicksort reach its O(n^2) worst case?', `When pivot choices repeatedly produce highly unbalanced partitions, such as sizes 0 and n-1.`),
      lesson('Stability and in-place sorting', 'A stable sort preserves equal-key input order; an in-place sort uses only small extra storage.', `Input: (2,A), (1,X), (2,B)
Stable result: (1,X), (2,A), (2,B)`, 'What does sorting stability preserve?', `It preserves the original relative order of records whose sort keys are equal.`),
      lesson('Choosing a sort', 'Use constraints: merge sort for stable guaranteed time, heapsort for O(1) extra array space and worst-case bound, quicksort for strong average locality.', `Need stable + O(n log n) worst case -> merge sort
Need O(1) extra + bound -> heapsort`, 'Choose an array sort requiring O(n log n) worst-case time and O(1) auxiliary space.', `Heapsort meets both requirements, though it is not stable in its standard form.`),
    ],
    trap: 'An algorithm described as in-place may still use recursion stack space; state whether auxiliary stack memory is being counted.',
    practice: 'Trace bubble, insertion, merge, quick, and heap sort on the same eight values and compare operations.',
  }),
  createChapter({
    number: 13,
    title: 'Searching and Selection',
    hook: 'Searching gets faster when structure provides evidence about where an answer cannot be.',
    lessons: [
      lesson('Linear search', 'Linear search works on any sequence and checks items until a match or the end.', `int linear(const int a[], int n, int key) {
  for (int i = 0; i < n; i++)
    if (a[i] == key) return i;
  return -1;
}`, 'What is linear search worst-case comparison count for n items?', `n comparisons when the key is last or absent, giving Theta(n) worst-case time.`),
      lesson('Binary search', 'Binary search requires sorted data and halves the remaining interval after every comparison.', `while (low <= high) {
  int mid = low + (high - low) / 2;
  if (a[mid] == key) return mid;
  if (a[mid] < key) low = mid + 1;
  else high = mid - 1;
}`, 'What prerequisite must hold before ordinary binary search is used?', `The searched sequence must be sorted according to the same ordering used by the comparisons.`),
      lesson('Safe midpoint', 'Computing low + (high-low)/2 avoids the overflow possible in (low+high)/2.', `int mid = low + (high - low) / 2;`, 'Why is low + (high-low)/2 preferred for a binary-search midpoint?', `It avoids adding two potentially large positive indices before division, preventing integer overflow.`),
      lesson('Lower and upper bounds', 'A lower bound finds the first position not less than a key; an upper bound finds the first position greater than it.', `a = [1,2,2,2,5], key=2
lower bound index=1
upper bound index=4`, 'Find lower and upper bound indices for key 2 in [1,2,2,2,5].', `Lower bound is index 1 and upper bound is index 4.`),
      lesson('Quickselect', 'Quickselect partitions like quicksort but recurses only into the side containing the desired rank; average time is O(n).', `partition around pivot at p
if k == p return a[p]
continue only in side containing k`, 'Why does quickselect recurse into only one partition?', `Only one partition can contain the requested rank, so processing the other partition is unnecessary.`),
    ],
    trap: 'Binary search bugs usually hide in interval conventions. Decide whether high is inclusive or exclusive and maintain that rule everywhere.',
    practice: 'Implement linear search, two binary-search interval styles, lower bound, and quickselect with duplicate values.',
  }),
  createChapter({
    number: 14,
    title: 'Greedy and Dynamic Programming',
    hook: 'Algorithm design asks not only how to store data, but how to exploit a problem decisions, overlap, and structure.',
    lessons: [
      lesson('Greedy choice', 'A greedy algorithm commits to the best-looking local choice and needs a proof that this can lead to a global optimum.', `Activity selection:
sort by finish time
repeatedly choose next compatible activity`, 'What two properties are needed to justify a greedy solution?', `A greedy-choice property showing a safe local choice exists, and optimal substructure showing the remaining problem contains an optimal subproblem solution.`),
      lesson('Dynamic-programming structure', 'DP applies when subproblems overlap and optimal solutions can be built from optimal subproblem solutions.', `fib[0]=0; fib[1]=1;
for (int i=2; i<=n; i++)
  fib[i]=fib[i-1]+fib[i-2];`, 'Name the two central properties that suggest dynamic programming.', `Overlapping subproblems and optimal substructure.`),
      lesson('Memoization and tabulation', 'Memoization solves requested states top-down; tabulation orders states bottom-up, often with lower call overhead.', `Memoization: recurse + cache
Tabulation: fill base cases toward answer`, 'Distinguish memoization from tabulation.', `Memoization is top-down recursion with cached results. Tabulation iteratively computes a planned order of states from base cases upward.`),
      lesson('0/1 knapsack recurrence', 'For each item and capacity, either exclude the item or include it once if it fits, taking the better value.', `dp[i][w] = dp[i-1][w]
if weight[i] <= w:
  max(dp[i][w], value[i] + dp[i-1][w-weight[i]])`, 'Why does 0/1 knapsack use row i-1 when including item i?', `Using the previous row prevents the same item from being selected again, enforcing the zero-or-one constraint.`),
      lesson('Choosing the strategy', 'Greedy is simpler when a safe-choice proof exists; DP stores alternative states when local choices may conflict.', `Coin values 1,3,4; amount 6
greedy: 4+1+1 (3 coins)
optimal: 3+3 (2 coins)`, 'Use coins 1,3,4 and amount 6 to show greedy largest-first can fail.', `Largest-first chooses 4+1+1, using three coins. The optimum is 3+3, using two, so the greedy choice is not always safe.`),
    ],
    trap: 'Do not label an algorithm greedy merely because it uses a loop; the defining feature is an irreversible locally optimal choice backed by reasoning.',
    practice: 'Solve activity selection greedily, then write states and transitions for Fibonacci, knapsack, and coin-change DP.',
  }),
];

chapters.push(createRevisionChapter({
  number: 15,
  title: 'DSA Revision Map',
  hook: 'Remember DSA as a sequence of decisions: measure, store, access, traverse, order, search, and optimize.',
  topics: [
    ['1. Analysis route', 'Big O, Theta, cases, recurrences, and amortized reasoning explain how work and memory grow.', `count dominant operations -> simplify -> state case`],
    ['2. Linear structures route', 'Arrays, lists, stacks, queues, and deques trade direct access against flexible updates and ordering rules.', `array: indexed
list: linked
stack: LIFO
queue: FIFO`],
    ['3. Tree route', 'Traversals, BST ordering, balanced trees, heaps, and priority queues organize hierarchical decisions.', `tree height controls path cost`],
    ['4. Hash and graph route', 'Hashing targets expected O(1) lookup; BFS, DFS, shortest paths, and spanning trees explore relationships.', `hash -> bucket/probe
graph -> queue/stack/priority queue`],
    ['5. Ordering route', 'Elementary, merge, quick, and heap sorting differ in time, space, stability, and input sensitivity.', `choose by constraints, not habit`],
    ['6. Design route', 'Binary search discards ranges, greedy commits safely, DP stores overlapping states, and backtracking undoes choices.', `define state -> transition -> base -> order -> complexity`],
  ],
  trap: 'Memorising code without its invariant makes small variations difficult. State what must remain true before tracing each operation.',
  plan: [
    { title: 'Seven-Day Recall Plan', points: ['Day 1: complexity, arrays, and lists.', 'Day 2: stacks, queues, recursion, and backtracking.', 'Day 3: trees, BSTs, and heaps.', 'Day 4: hashing, BFS, and DFS.', 'Day 5: sorting and searching.', 'Day 6: greedy and dynamic programming.', 'Day 7: one mixed implementation test plus mistake review.'] },
    { title: 'Problem-Solving Checklist', points: ['Write constraints and required operations.', 'Choose the representation before the algorithm.', 'State the invariant and edge cases.', 'Explain correctness.', 'Calculate time and extra space.'] },
  ],
}));

export const dsaNotes = {
  id: 'dsa',
  name: 'DSA',
  accent: '#b4465a',
  status: 'Ready',
  source: { label: 'Original curriculum-based notes with C examples' },
  prompts: ['Explain Big O', 'Linked-list example', 'Tree traversals', 'BFS vs DFS', 'Sorting comparison', 'Chapter 1 recap'],
  chapters,
};
