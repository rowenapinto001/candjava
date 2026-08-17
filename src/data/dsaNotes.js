import { createChapter, createRevisionChapter, lesson } from './studyTrackHelpers.js';

const chapters = [
  createChapter({
    number: 1,
    title: 'Learn the Basics',
    hook: 'Strong DSA starts before the first data structure: read constraints, estimate work, and choose tools deliberately.',
    lessons: [
      lesson('Time and space complexity', 'Complexity describes how running work and extra memory grow with input size. Drop constants, keep the dominant term, and state the case being analysed.', `for (int x : a) sum += x;
// n visits: O(n) time
// fixed variables: O(1) extra space`, 'What are the time and extra-space complexities of summing an array once?', `The loop visits all n elements, so time is O(n). It uses only fixed variables, so extra space is O(1).`),
      lesson('Constraints guide the approach', 'Use the largest possible input to reject slow ideas before coding. Around 10^5 items usually rules out an O(n^2) pair check.', `n <= 20     -> subsets may work
n <= 10^3   -> O(n^2) may work
n <= 10^5   -> prefer O(n log n) or O(n)`, 'Why should constraints be read before choosing an algorithm?', `They reveal the approximate operation budget and help eliminate approaches that cannot finish in time or memory.`),
      lesson('Useful C++ containers', 'Vector gives indexed storage, stack and queue enforce access order, set/map stay ordered, and unordered containers give expected constant-time lookup.', `vector<int> a = {4, 1, 4};
unordered_map<int, int> freq;
for (int x : a) freq[x]++;
// freq[4] == 2`, 'When would unordered_map be preferred over map for frequency counting?', `Use unordered_map when key order is unnecessary and expected O(1) insertion and lookup are suitable; map keeps keys ordered in O(log n).`),
      lesson('Basic maths for DSA', 'Euclid computes gcd quickly; divisibility, primes, modular arithmetic, and digit extraction appear repeatedly in array and number problems.', `int gcd(int a, int b) {
  while (b) {
    int r = a % b;
    a = b; b = r;
  }
  return a;
}`, 'Trace gcd(48, 18) using Euclid algorithm.', `The pairs are (48,18), (18,12), (12,6), and (6,0). The gcd is 6.`),
      lesson('Problem-solving workflow', 'Write the brute force idea first, identify repeated work, choose a pattern, prove the invariant, then calculate time and space before submitting.', `Brute force -> observe repetition
-> choose structure/pattern
-> test edge cases
-> analyse complexity`, 'What should be checked after an algorithm seems correct?', `Check edge cases, justify why its invariant produces the answer, and calculate time and extra-space complexity against the constraints.`),
    ],
    trap: 'Do not memorise complexity from code shape alone. A loop containing a pointer that only moves forward overall can still be O(n).',
    practice: 'For five small problems, write constraints, brute force, improved idea, invariant, and final complexity before writing code.',
  }),
  createChapter({
    number: 2,
    title: 'Important Sorting Techniques',
    hook: 'Sorting is controlled movement: each algorithm decides what is already settled and how the unsorted part should shrink.',
    lessons: [
      lesson('Selection sort', 'Place the smallest remaining element at the current position. It is simple and in-place but always performs O(n^2) comparisons.', `for (int i = 0; i < n - 1; i++) {
  int best = i;
  for (int j = i + 1; j < n; j++)
    if (a[j] < a[best]) best = j;
  swap(a[i], a[best]);
}`, 'What invariant does selection sort maintain after index i is processed?', `Positions 0 through i contain the smallest i+1 values in sorted order.`),
      lesson('Bubble sort', 'Swap adjacent inversions so the largest unsettled value moves to the end. Stop early when a pass performs no swaps.', `for (int end = n - 1; end > 0; end--) {
  bool changed = false;
  for (int j = 0; j < end; j++)
    if (a[j] > a[j + 1]) swap(a[j], a[j + 1]), changed = true;
  if (!changed) break;
}`, 'When does optimized bubble sort finish in O(n) time?', `When the input is already sorted, the first pass makes no swaps and the algorithm stops.`),
      lesson('Insertion sort', 'Grow a sorted prefix by shifting larger values right and inserting the next value into its place. It performs well on small or nearly sorted input.', `for (int i = 1; i < n; i++) {
  int x = a[i], j = i - 1;
  while (j >= 0 && a[j] > x) a[j + 1] = a[j--];
  a[j + 1] = x;
}`, 'Why is insertion sort useful for nearly sorted arrays?', `Only a few values need shifting, so the work can approach O(n) instead of its O(n^2) worst case.`),
      lesson('Merge sort', 'Recursively sort two halves and merge them. It guarantees O(n log n) time and is stable, but ordinary array merging needs O(n) extra space.', `mergeSort(a, l, m);
mergeSort(a, m + 1, r);
merge sorted ranges [l..m] and [m+1..r];`, 'Why is merge sort O(n log n)?', `There are O(log n) split levels, and merging across each level processes all n elements once.`),
      lesson('Quick sort', 'Partition values around a pivot, then sort the two sides. It is fast on average and in-place apart from recursion, but poor pivots can cause O(n^2).', `int p = partition(a, low, high);
quickSort(a, low, p - 1);
quickSort(a, p + 1, high);`, 'What causes quicksort worst-case O(n^2) behaviour?', `Repeatedly choosing a pivot that creates partitions of sizes 0 and n-1 produces a recursion chain instead of balanced levels.`),
    ],
    trap: 'Sorting stability matters for records with equal keys. Standard selection, quick, and heap sort are not stable without extra design.',
    practice: 'Trace all five sorts on the same array and record comparisons, movements, stability, and extra space.',
  }),
  createChapter({
    number: 3,
    title: 'Arrays: Easy to Hard',
    hook: 'Most array problems become manageable when you replace repeated scanning with stored history or a maintained range.',
    lessons: [
      lesson('Contiguous storage', 'Arrays provide O(1) indexed access. Traversal is O(n), while middle insertion or deletion may shift O(n) values.', `vector<int> a = {7, 2, 9};
int x = a[2];       // O(1), x = 9
reverse(a.begin(), a.end());`, 'Why is array indexing O(1) but searching an unsorted array O(n)?', `An index directly determines an address, while an unknown value may require checking every element.`),
      lesson('Hashing for Two Sum', 'Store previously seen values so each element can ask whether its required partner has already appeared.', `unordered_map<int, int> pos;
for (int i = 0; i < n; i++) {
  int need = target - a[i];
  if (pos.count(need)) return {pos[need], i};
  pos[a[i]] = i;
}`, 'Why should the current value be inserted after checking for its partner?', `Checking first prevents one array position from pairing with itself when target equals twice the current value.`),
      lesson('Prefix sums', 'A prefix array stores cumulative totals so any static range sum can be answered in O(1) after O(n) preprocessing.', `prefix[0] = 0;
for (int i = 0; i < n; i++) prefix[i + 1] = prefix[i] + a[i];
sum(l, r) = prefix[r + 1] - prefix[l];`, 'Using prefix sums, how is the inclusive range l through r calculated?', `Subtract the sum before l from the sum through r: prefix[r+1] - prefix[l].`),
      lesson('Kadane algorithm', 'Track the best subarray ending here and the best seen anywhere. A negative running sum is discarded because it cannot help a future start.', `long long ending = a[0], best = a[0];
for (int i = 1; i < n; i++) {
  ending = max((long long)a[i], ending + a[i]);
  best = max(best, ending);
}`, 'Why must Kadane be initialized from the array rather than zero?', `Initializing from a[0] correctly handles arrays containing only negative values; zero would incorrectly allow an empty subarray.`),
      lesson('Longest consecutive sequence', 'Put values in a hash set and start counting only from numbers whose predecessor is absent. Every sequence is then walked once.', `for (int x : values)
  if (!seen.count(x - 1)) {
    int y = x;
    while (seen.count(y)) y++;
    best = max(best, y - x);
  }`, 'Why do we expand only when x-1 is absent?', `Such an x is the first value of its sequence, preventing the same run from being recounted from every member.`),
    ],
    trap: 'A two-pointer or sliding-window solution usually needs a property such as sorted order or nonnegative values. State that property explicitly.',
    practice: 'Solve Two Sum, maximum subarray, range-sum queries, longest consecutive sequence, and one array rotation problem.',
  }),
  createChapter({
    number: 4,
    title: 'Binary Search',
    hook: 'Binary search is not merely finding a value; it finds the boundary where a monotonic statement changes truth value.',
    lessons: [
      lesson('Binary search', 'Maintain a search interval containing every possible answer and discard half after each comparison. Use an overflow-safe midpoint.', `int low = 0, high = n - 1;
while (low <= high) {
  int mid = low + (high - low) / 2;
  if (a[mid] == key) return mid;
  if (a[mid] < key) low = mid + 1; else high = mid - 1;
}`, 'What prerequisite does ordinary array binary search require?', `The array must be sorted according to the same ordering used by the comparisons.`),
      lesson('Lower and upper bounds', 'Lower bound is the first position with value at least x; upper bound is the first position with value greater than x.', `a = [1, 2, 2, 2, 5], x = 2
lower_bound -> index 1
upper_bound -> index 4
count = 4 - 1 = 3`, 'How can lower and upper bounds count occurrences of x?', `Subtract the lower-bound index from the upper-bound index.`),
      lesson('Search in a rotated array', 'At least one half around mid is sorted. Determine that half, test whether the key lies inside it, and discard the other half.', `if (a[low] <= a[mid]) { // left sorted
  if (a[low] <= key && key < a[mid]) high = mid - 1;
  else low = mid + 1;
}`, 'What observation makes binary search possible in a rotated sorted array?', `For distinct values, at least one side of the midpoint is normally sorted, which reveals where the key can lie.`),
      lesson('Binary search on answers', 'When feasibility is monotonic, search the answer range instead of array indices. Typical goals are the minimum feasible or maximum feasible value.', `while (low <= high) {
  int mid = low + (high - low) / 2;
  if (canFinish(mid)) answer = mid, high = mid - 1;
  else low = mid + 1;
}`, 'What property must canFinish(mid) have for answer-space binary search?', `Its truth values must be monotonic, such as false up to a boundary and true afterward.`),
      lesson('Binary search in matrices', 'A row-wise flattened sorted matrix can be searched by mapping index k to row k/cols and column k%cols.', `int value = matrix[mid / cols][mid % cols];
// search mid from 0 through rows*cols - 1`, 'How is a flattened index converted into matrix coordinates?', `Row is index / columnCount and column is index % columnCount.`),
    ],
    trap: 'Choose inclusive or half-open boundaries once and preserve them. Mixing conventions causes skipped answers and infinite loops.',
    practice: 'Implement exact search, first/last occurrence, rotated search, integer square root, and one minimum-feasible answer problem.',
  }),
  createChapter({
    number: 5,
    title: 'Strings: Basic and Medium',
    hook: 'A string is an array with meaning; frequency, order, and matching patterns turn text questions into structured state.',
    lessons: [
      lesson('Character frequency', 'A fixed array handles a known alphabet efficiently; a map is useful when the character set is wider or sparse.', `array<int, 26> freq{};
for (char c : s)
  if ('a' <= c && c <= 'z') freq[c - 'a']++;`, 'Why is an array of size 26 sufficient for lowercase English letters?', `Each lowercase letter maps to one index from 0 through 25 using c-'a'.`),
      lesson('Palindrome with two pointers', 'Compare characters from both ends and move inward. Normalization may skip punctuation and ignore case.', `int l = 0, r = s.size() - 1;
while (l < r) {
  if (s[l] != s[r]) return false;
  l++; r--;
}
return true;`, 'What is the time and extra-space complexity of this palindrome check?', `It uses O(n) time and O(1) extra space.`),
      lesson('Anagrams', 'Two strings are anagrams when their character counts match exactly after accounting for case and allowed symbols.', `array<int, 26> count{};
for (char c : a) count[c - 'a']++;
for (char c : b) count[c - 'a']--;
answer = all entries are zero;`, 'Why is equal length checked before comparing anagram frequencies?', `Anagrams contain the same number of characters, so unequal lengths can be rejected immediately.`),
      lesson('Longest common prefix', 'Use one word as the current prefix and shorten it until every other word starts with it.', `string prefix = words[0];
for (string word : words)
  while (word.rfind(prefix, 0) != 0) prefix.pop_back();`, 'What happens when the common prefix becomes empty?', `No nonempty prefix is shared by every word, so the answer is the empty string.`),
      lesson('String parsing', 'Tokenize deliberately and define how repeated spaces, signs, overflow, and invalid characters should be handled.', `stringstream input("learn DSA daily");
string word;
while (input >> word) cout << word << '\n';`, 'What advantage does stringstream provide for whitespace-separated words?', `Extraction skips runs of whitespace and returns one token at a time without manual index bookkeeping.`),
    ],
    trap: 'Do not assume every character is lowercase ASCII. State the allowed alphabet before choosing a frequency array or index calculation.',
    practice: 'Implement palindrome normalization, anagram checking, word reversal, common prefix, and frequency sorting.',
  }),
  createChapter({
    number: 6,
    title: 'Linked Lists',
    hook: 'Linked-list problems become pointer choreography: preserve the next address before changing any link.',
    lessons: [
      lesson('Node structure', 'A singly linked node stores a value and the next node address. Access is sequential because nodes need not be contiguous.', `struct Node {
  int data;
  Node *next;
  Node(int x) : data(x), next(nullptr) {}
};`, 'What marks the end of a non-circular singly linked list?', `The final node has next == nullptr.`),
      lesson('Reverse a linked list', 'Carry previous, current, and next pointers. Save the next node before reversing the current link.', `Node *prev = nullptr, *cur = head;
while (cur) {
  Node *next = cur->next;
  cur->next = prev;
  prev = cur; cur = next;
}
head = prev;`, 'Why must cur->next be saved before assigning cur->next = prev?', `After the link is reversed, the original next node would otherwise be lost and the remaining list unreachable.`),
      lesson('Fast and slow pointers', 'Moving one pointer twice as fast finds the middle and supports cycle detection without extra storage.', `Node *slow = head, *fast = head;
while (fast && fast->next) {
  slow = slow->next;
  fast = fast->next->next;
}
// slow is at the middle`, 'Where does slow finish when fast moves two nodes per step?', `Slow reaches the middle when fast reaches the end.`),
      lesson('Cycle detection', 'Floyd algorithm detects a cycle when slow and fast meet. Reset one pointer to head and move both once to find the cycle entry.', `if (slow == fast) {
  slow = head;
  while (slow != fast) slow = slow->next, fast = fast->next;
  return slow; // cycle entry
}`, 'Why does a meeting between slow and fast prove a cycle exists?', `Without a cycle, fast reaches nullptr. Meeting is possible only when both pointers keep circulating through repeated nodes.`),
      lesson('Merge sorted lists', 'Use a dummy head and repeatedly attach the smaller front node. Append the unfinished list after one side ends.', `Node dummy(0), *tail = &dummy;
while (a && b) {
  Node *pick;
  if (a->data <= b->data) pick = a, a = a->next;
  else pick = b, b = b->next;
  tail = tail->next = pick;
}
tail->next = a ? a : b;`, 'What does the dummy node simplify?', `It removes the special case for creating the result head; every chosen node is attached after an existing tail.`),
    ],
    trap: 'Before deleting or rewiring a node, preserve every address still needed. One overwritten pointer can disconnect an entire suffix.',
    practice: 'Build, reverse, find the middle, detect a cycle, and merge two sorted singly linked lists.',
  }),
  createChapter({
    number: 7,
    title: 'Recursion and Backtracking',
    hook: 'Recursion explores a decision tree; backtracking keeps that tree honest by undoing each temporary choice.',
    lessons: [
      lesson('Base and recursive cases', 'Every recursive path needs a reachable stopping condition and must move toward a smaller state.', `long long factorial(int n) {
  if (n <= 1) return 1;
  return n * factorial(n - 1);
}`, 'What two ingredients make a recursive function terminate correctly?', `A reachable base case and progress toward that case on every recursive path.`),
      lesson('Generate subsequences', 'At each index, either take the value or skip it. This creates 2^n leaves for n independent choices.', `solve(i + 1, chosen);       // skip
chosen.push_back(a[i]);
solve(i + 1, chosen);       // take
chosen.pop_back();`, 'How many subsequences does an n-element array have?', `There are 2^n subsequences because each element has two independent choices: included or excluded.`),
      lesson('Combination sum', 'Choose candidates while tracking the remaining target. Sort and prune choices that already exceed the remainder.', `for (int j = start; j < n; j++) {
  if (a[j] > remain) break;
  pick(a[j]); solve(j, remain - a[j]); unpick(a[j]);
}`, 'Why can the loop stop when a[j] exceeds the remaining target?', `With sorted positive candidates, every later value is at least as large and also cannot fit.`),
      lesson('Permutations', 'Build one position at a time, marking used values or swapping a candidate into the current position.', `for (int j = i; j < n; j++) {
  swap(a[i], a[j]);
  permute(i + 1);
  swap(a[i], a[j]);
}`, 'Why is the second swap required?', `It restores the array before the next branch so each candidate begins from the same state.`),
      lesson('N-Queens backtracking', 'Place one queen per row and track occupied columns and diagonals. Recurse only after a safe placement.', `if (!col[c] && !diag1[r-c+n] && !diag2[r+c]) {
  place(r, c); solve(r + 1); remove(r, c);
}`, 'Why is one queen placed per recursive row?', `It automatically prevents row conflicts, leaving only column and diagonal constraints to test.`),
    ],
    trap: 'Passing shared state without undoing mutations contaminates sibling branches. Pair every choose operation with an unchoose operation.',
    practice: 'Trace subsequences, then solve subset sum, unique permutations, combination sum, and N-Queens.',
  }),
  createChapter({
    number: 8,
    title: 'Bit Manipulation',
    hook: 'Bits compress yes-or-no state into integers and expose arithmetic shortcuts that loops often hide.',
    lessons: [
      lesson('Test, set, clear, and toggle', 'A shifted mask selects one bit. OR sets it, AND with an inverted mask clears it, and XOR toggles it.', `bool on = n & (1 << k);
n |=  (1 << k);      // set
n &= ~(1 << k);      // clear
n ^=  (1 << k);      // toggle`, 'Which expression checks whether bit k is set?', `n & (1 << k) is nonzero exactly when bit k is set.`),
      lesson('Power-of-two test', 'A positive power of two contains one set bit, so removing its lowest set bit produces zero.', `bool isPowerOfTwo(int n) {
  return n > 0 && (n & (n - 1)) == 0;
}`, 'Why must n > 0 be checked?', `Zero also satisfies (0 & -1) == 0 but is not a power of two.`),
      lesson('Count set bits', 'The operation n & (n-1) clears the lowest set bit. Repeat it once per set bit.', `int count = 0;
while (n) {
  n &= n - 1;
  count++;
}`, 'What is the loop complexity in terms of set bits?', `It runs O(k) times where k is the number of set bits, at most the integer word width.`),
      lesson('XOR cancellation', 'XOR is associative and x XOR x is zero, so paired values cancel and leave the unique value.', `int unique = 0;
for (int x : a) unique ^= x;
// [4,1,2,1,2] leaves 4`, 'Why does XOR find the single unpaired value?', `Every repeated pair cancels to zero, and zero XOR the unique value leaves that value.`),
      lesson('Subsets with bitmasks', 'An n-bit mask represents a subset: bit i tells whether item i is included.', `for (int mask = 0; mask < (1 << n); mask++)
  for (int i = 0; i < n; i++)
    if (mask & (1 << i)) choose(a[i]);`, 'How many masks represent all subsets of n items?', `There are 2^n masks, one for every include-or-exclude combination.`),
    ],
    trap: 'Shifting into or past a type width is unsafe. Use an unsigned or wider literal such as 1LL when k may be large.',
    practice: 'Implement bit operations, power-of-two testing, set-bit counting, single-number XOR, and subset generation.',
  }),
  createChapter({
    number: 9,
    title: 'Stacks and Queues',
    hook: 'Stacks remember unfinished work in reverse; queues protect discovery order. Many hard problems are one of these stories in disguise.',
    lessons: [
      lesson('LIFO operations', 'A stack supports push, pop, and top at one end in O(1). It models nested work, undo, and nearest-unresolved-element problems.', `stack<int> st;
st.push(10); st.push(20);
st.pop();
cout << st.top(); // 10`, 'What value is exposed after pushing 10, pushing 20, and popping once?', `The stack exposes 10 because the last value pushed, 20, is removed first.`),
      lesson('FIFO operations', 'A queue inserts at the rear and removes from the front in O(1), preserving arrival order.', `queue<int> q;
q.push(4); q.push(8);
q.pop();
cout << q.front(); // 8`, 'Why is a queue used for breadth-first traversal?', `It processes nodes in first-discovered order, which preserves increasing distance or level.`),
      lesson('Balanced brackets', 'Push opening brackets; for each closing bracket, require a matching stack top. The stack must be empty at the end.', `for (char c : s) {
  if (isOpen(c)) st.push(c);
  else if (st.empty() || !matches(st.top(), c)) return false;
  else st.pop();
}
return st.empty();`, 'Why is a final empty-stack check necessary?', `Unmatched opening brackets can remain even when no mismatch occurred while scanning.`),
      lesson('Monotonic stack', 'Maintain values in increasing or decreasing order so each item can discover its nearest greater or smaller neighbour in O(n) total time.', `for (int i = n - 1; i >= 0; i--) {
  while (!st.empty() && st.top() <= a[i]) st.pop();
  nextGreater[i] = st.empty() ? -1 : st.top();
  st.push(a[i]);
}`, 'Why is next-greater processing O(n), despite the inner while loop?', `Each value is pushed once and popped at most once, so total stack operations are linear.`),
      lesson('Largest rectangle in a histogram', 'A monotonic increasing stack finds the first smaller bar on both sides; a popped height spans between those boundaries.', `while (!st.empty() && height[st.top()] > current) {
  int h = height[st.top()]; st.pop();
  int left = st.empty() ? -1 : st.top();
  best = max(best, h * (i - left - 1));
}`, 'When is a histogram bar area finalized?', `When a smaller current bar proves the popped height cannot extend farther right.`),
    ],
    trap: 'A stack often stores indices, not values, because distance and boundary calculations need positions.',
    practice: 'Implement array stack/queue, bracket validation, next greater element, stock span, and largest histogram rectangle.',
  }),
  createChapter({
    number: 10,
    title: 'Sliding Window and Two Pointers',
    hook: 'Instead of rebuilding every range, move its borders and update only what enters or leaves.',
    lessons: [
      lesson('Opposite-direction pointers', 'On sorted data, compare the pair sum and move the side that can correct it; this replaces O(n^2) pair enumeration with O(n).', `int l = 0, r = n - 1;
while (l < r) {
  int sum = a[l] + a[r];
  if (sum == target) return true;
  if (sum < target) l++; else r--;
}`, 'Why can the left pointer move when the sum is too small?', `Because the array is sorted; decreasing r would not increase the sum, while increasing l may do so.`),
      lesson('Fixed-size window', 'Build the first window once, then subtract the departing value and add the arriving value in O(1) per shift.', `long long sum = accumulate(a.begin(), a.begin() + k, 0LL);
for (int r = k; r < n; r++) {
  sum += a[r] - a[r - k];
  best = max(best, sum);
}`, 'What is the time complexity for all fixed-size window sums?', `O(n), because each element enters and leaves the maintained sum once.`),
      lesson('Variable-size window', 'Expand right, then shrink left while the invariant is violated. This is linear when both pointers only move forward.', `for (int r = 0; r < n; r++) {
  add(a[r]);
  while (!valid()) remove(a[l++]);
  best = max(best, r - l + 1);
}`, 'Why is a forward-only variable window usually O(n)?', `Each pointer advances at most n positions, so total border movements are O(n).`),
      lesson('Longest substring without repeats', 'Store the latest position of each character and jump left beyond a repeated character that lies inside the current window.', `for (int r = 0; r < s.size(); r++) {
  if (last.count(s[r])) left = max(left, last[s[r]] + 1);
  last[s[r]] = r;
  best = max(best, r - left + 1);
}`, 'Why is left updated with max(left, last[c]+1)?', `An older occurrence outside the current window must never move left backward.`),
      lesson('Exactly K via at-most K', 'Many counting problems become easier by subtracting two monotonic counts: exactly K equals atMost(K) minus atMost(K-1).', `long long exactlyK = atMost(k) - atMost(k - 1);
// useful for distinct values or binary-array goals`, 'Why is exactly K equal to atMost(K)-atMost(K-1)?', `The subtraction removes every range with fewer than K occurrences, leaving only ranges with exactly K.`),
    ],
    trap: 'A sum-based shrinking window is not valid with arbitrary negative values because removing the left value may not move the sum predictably.',
    practice: 'Solve sorted Two Sum, maximum k-window sum, longest unique substring, minimum covering window, and exactly-k distinct subarrays.',
  }),
  createChapter({
    number: 11,
    title: 'Heaps and Priority Queues',
    hook: 'A heap keeps the next most important item ready without paying to sort everything.',
    lessons: [
      lesson('Array representation', 'A binary heap is a complete tree stored compactly. At zero-based index i, children are 2i+1 and 2i+2.', `int left = 2 * i + 1;
int right = 2 * i + 2;
int parent = (i - 1) / 2;`, 'What are the children of zero-based heap index 3?', `They are indices 7 and 8.`),
      lesson('Priority queue operations', 'The root is the minimum or maximum; insertion and removal restore the heap property along one height-O(log n) path.', `priority_queue<int> maxHeap;
priority_queue<int, vector<int>, greater<int>> minHeap;
maxHeap.push(7);
maxHeap.pop();`, 'What are the complexities of heap push, top, and pop?', `Push is O(log n), top is O(1), and pop is O(log n).`),
      lesson('Kth largest element', 'Maintain a min-heap of size k. Values larger than its root enter, and the root becomes the kth largest seen.', `priority_queue<int, vector<int>, greater<int>> pq;
for (int x : a) {
  pq.push(x);
  if (pq.size() > k) pq.pop();
}
answer = pq.top();`, 'Why is the root the kth largest after processing all values?', `The heap retains exactly the k largest values, and its minimum is the kth largest overall.`),
      lesson('Merge K sorted lists', 'Put each list current front in a min-heap. Remove the smallest, append it, and insert its successor.', `push each nonempty list head;
while (!pq.empty()) {
  Node *x = pq.top(); pq.pop();
  append(x);
  if (x->next) pq.push(x->next);
}`, 'What is the complexity for N total nodes across k lists?', `O(N log k), because each node enters and leaves a heap containing at most k candidates.`),
      lesson('Running median', 'Use a max-heap for the lower half and min-heap for the upper half; rebalance so their sizes differ by at most one.', `lower: max-heap
upper: min-heap
median = equal sizes ? (lower.top()+upper.top())/2
                     : largerHeap.top();`, 'What ordering invariant must the two heaps preserve?', `Every value in the lower max-heap must be no greater than every value in the upper min-heap.`),
    ],
    trap: 'Choose heap direction from what must be removed. Keeping the k largest values requires a min-heap so the weakest retained value is easy to discard.',
    practice: 'Implement heap operations, kth largest, top-k frequencies, k-way merge, and a running median stream.',
  }),
  createChapter({
    number: 12,
    title: 'Greedy Algorithms',
    hook: 'Greedy works only when a locally attractive choice can be proved safe for the unfinished problem.',
    lessons: [
      lesson('Activity selection', 'Sort activities by finishing time and repeatedly choose the next compatible activity. Finishing early leaves maximum room.', `sort by finish time;
for (activity : activities)
  if (activity.start > lastFinish) choose(activity);`, 'Why is earliest finish time the safe greedy choice?', `It leaves at least as much remaining time as any other compatible first choice, so an optimal schedule can include it.`),
      lesson('Fractional knapsack', 'When fractions are allowed, take items by decreasing value-to-weight ratio until capacity is full.', `sort(items, by ratio descending);
take min(item.weight, capacityLeft);
value += taken * item.value / item.weight;`, 'Why does ratio-greedy fail for 0/1 knapsack?', `An indivisible high-ratio item can block a better combination, so local ratio choices are not always globally optimal.`),
      lesson('Job sequencing', 'Sort jobs by profit and place each job in the latest free slot not beyond its deadline.', `sort jobs by profit descending;
for (job : jobs)
  schedule in latest free slot <= job.deadline;`, 'Why place a chosen job as late as possible?', `It preserves earlier slots for profitable jobs with tighter deadlines.`),
      lesson('Minimum platforms', 'Sort arrival and departure times separately. Move the earlier event pointer and track the maximum simultaneous trains.', `if (arrival[i] <= departure[j]) platforms++, i++;
else platforms--, j++;
answer = max(answer, platforms);`, 'What does the running platform count represent?', `It is the number of trains currently present at the station.`),
      lesson('Jump Game greedy range', 'Track the farthest index reachable so far. If the current index exceeds it, the path is impossible.', `int farthest = 0;
for (int i = 0; i < n; i++) {
  if (i > farthest) return false;
  farthest = max(farthest, i + a[i]);
}`, 'What invariant does farthest maintain?', `It is the greatest index reachable using jumps from positions processed so far.`),
    ],
    trap: 'A greedy-looking loop is not enough. Identify the exchange argument or invariant that proves the local choice cannot damage an optimum.',
    practice: 'Solve activity selection, fractional knapsack, job sequencing, minimum platforms, and both Jump Game variants.',
  }),
  createChapter({
    number: 13,
    title: 'Binary Trees',
    hook: 'Tree problems become routes: decide what each recursive call returns or what order a queue must preserve.',
    lessons: [
      lesson('Tree vocabulary', 'Depth counts edges from root to a node; height counts the longest downward path. A leaf has no children.', `        1
      /   \
     2     3
    /
   4
depth(4) = 2, height(root) = 2`, 'Using edge count, what are the depth of node 4 and height of the root?', `Both are 2.`),
      lesson('Depth-first traversals', 'Preorder is root-left-right, inorder is left-root-right, and postorder is left-right-root.', `Tree: root 1, children 2 and 3
preorder:  1 2 3
inorder:   2 1 3
postorder: 2 3 1`, 'Which traversal processes a node after both subtrees?', `Postorder traversal.`),
      lesson('Level-order traversal', 'Breadth-first traversal uses a queue. Processing one recorded queue size at a time separates levels.', `queue.push(root);
while (!queue.empty()) {
  int levelSize = queue.size();
  while (levelSize--) process(queue.front()), pushChildren();
}`, 'Why is queue size captured before processing a level?', `New children are added during the loop; the saved size limits this pass to nodes already in the current level.`),
      lesson('Height and diameter', 'Return subtree height while updating the best path through each node as leftHeight + rightHeight.', `int height(Node *node) {
  if (!node) return 0;
  int l = height(node->left), r = height(node->right);
  diameter = max(diameter, l + r);
  return 1 + max(l, r);
}`, 'Why can diameter be calculated during a height traversal?', `The longest path through a node is determined by the heights of its left and right subtrees, which the traversal already computes.`),
      lesson('Lowest common ancestor', 'Return the node when it is null or matches a target. If both subtrees return non-null, the current node is the split point.', `if (!root || root == p || root == q) return root;
Node *l = lca(root->left, p, q);
Node *r = lca(root->right, p, q);
return l && r ? root : (l ? l : r);`, 'When is the current node the lowest common ancestor?', `When one target is found in each subtree, making the current node their lowest split point.`),
    ],
    trap: 'Do not recompute subtree height inside every diameter check; that turns a linear solution into O(n^2) on skewed trees.',
    practice: 'Implement recursive and iterative traversals, level order, height/diameter, balance checking, views, and LCA.',
  }),
  createChapter({
    number: 14,
    title: 'Binary Search Trees',
    hook: 'A BST converts ordering into direction, but every operation is only as fast as the tree height permits.',
    lessons: [
      lesson('BST invariant', 'Every key in a node left subtree is smaller and every key in the right subtree is larger under a stated duplicate policy.', `Insert 8, 3, 10, 6:
    8
   / \
  3  10
   \
    6`, 'Where is 6 inserted in the shown sequence?', `It is less than 8 and greater than 3, so it becomes the right child of 3.`),
      lesson('Search and insertion', 'Follow one branch after each comparison. Both operations take O(h), where h is tree height.', `while (root && root->key != key)
  root = key < root->key ? root->left : root->right;`, 'What are balanced and worst-case BST search times?', `O(log n) when height is logarithmic and O(n) when the tree degenerates into a chain.`),
      lesson('Validate a BST', 'Carry an allowed open range down the tree. Local parent-child checks alone cannot detect a deep value violating an ancestor.', `bool valid(Node *n, long long low, long long high) {
  if (!n) return true;
  if (!(low < n->key && n->key < high)) return false;
  return valid(n->left, low, n->key) && valid(n->right, n->key, high);
}`, 'Why are min/max bounds stronger than checking only immediate children?', `Bounds include restrictions imposed by every ancestor, so deep violations are detected.`),
      lesson('Kth smallest', 'Inorder traversal visits BST keys in sorted order. Stop at the kth visited node or use stored subtree sizes for rank queries.', `inorder(left);
if (--k == 0) answer = root->key;
inorder(right);`, 'Why does inorder traversal find BST values in ascending order?', `The BST invariant places every smaller key left of a node and every larger key right of it.`),
      lesson('BST deletion', 'Delete a leaf, replace a one-child node by its child, or copy the inorder successor into a two-child node and delete that successor.', `Node *successor = minimum(root->right);
root->key = successor->key;
root->right = erase(root->right, successor->key);`, 'Why is the right-subtree minimum a valid replacement?', `It is greater than every key in the left subtree and no greater than the remaining right-subtree keys.`),
    ],
    trap: 'The BST rule applies to complete subtrees, not merely to a node immediate children.',
    practice: 'Implement search, insertion, validation, kth smallest, successor/predecessor, LCA, and deletion.',
  }),
  createChapter({
    number: 15,
    title: 'Graphs',
    hook: 'Graph algorithms differ mainly in the information they carry while exploring vertices, edges, and components.',
    lessons: [
      lesson('Graph representations', 'Adjacency lists use O(V+E) space and suit sparse graphs; matrices use O(V^2) space and give O(1) edge checks.', `vector<vector<pair<int,int>>> adj(n);
adj[u].push_back({v, weight});
adj[v].push_back({u, weight}); // omit for directed graph`, 'When is an adjacency list normally preferred?', `For sparse graphs, because it stores only existing edges and supports efficient neighbour iteration.`),
      lesson('BFS and DFS', 'BFS uses a queue and finds unweighted shortest edge counts; DFS uses recursion or a stack and explores one branch deeply.', `BFS: mark -> enqueue -> pop -> visit neighbours
DFS: mark -> recursively visit each unvisited neighbour`, 'Which traversal finds shortest paths in an unweighted graph?', `BFS, because vertices are discovered in increasing number of edges from the source.`),
      lesson('Cycles and topological order', 'Directed cycle detection tracks the active DFS path; Kahn algorithm produces a topological order by repeatedly removing indegree-zero vertices.', `push every vertex with indegree 0;
while queue not empty:
  take u; append u;
  decrement indegree of outgoing neighbours;`, 'How does Kahn algorithm reveal a directed cycle?', `If fewer than V vertices are processed, the remaining vertices depend cyclically and never reach indegree zero.`),
      lesson('Shortest paths', 'Use BFS for unit weights, Dijkstra for nonnegative weights, Bellman-Ford when negative edges may occur, and Floyd-Warshall for all pairs on modest V.', `priority_queue of {distance, node};
if (dist[u] + weight < dist[v]) {
  dist[v] = dist[u] + weight;
  push updated pair;
}`, 'Why must ordinary Dijkstra not be used with negative edges?', `A later negative edge can improve a vertex already treated as final, breaking Dijkstra greedy finalization.`),
      lesson('MST, DSU, and connectivity', 'Kruskal joins cheapest edges whose endpoints lie in different DSU components. DFS low-link values also expose bridges and articulation points.', `sort edges by weight;
for (edge u-v : edges)
  if (find(u) != find(v)) unite(u, v), take(edge);`, 'Why does Kruskal reject an edge whose endpoints already share a DSU root?', `Those endpoints are already connected, so adding the edge would create a cycle.`),
    ],
    trap: 'Mark a vertex visited when it is scheduled, not after repeated removal, or the same vertex may enter the queue or stack many times.',
    practice: 'Implement BFS/DFS, cycle checks, topological sort, Dijkstra, Bellman-Ford, DSU/Kruskal, and one bridge problem.',
  }),
  createChapter({
    number: 16,
    title: 'Dynamic Programming',
    hook: 'DP is organised memory: define a state that remembers exactly enough to avoid solving the same future twice.',
    lessons: [
      lesson('Memoization and tabulation', 'Memoization caches states top-down; tabulation fills them bottom-up. Both require a state, transition, base cases, and evaluation order.', `long long fib(int n) {
  if (n <= 1) return n;
  if (memo[n] != -1) return memo[n];
  return memo[n] = fib(n - 1) + fib(n - 2);
}`, 'What two properties strongly suggest dynamic programming?', `Overlapping subproblems and optimal substructure.`),
      lesson('One-dimensional DP', 'For House Robber, state i chooses between skipping house i or taking it after the best result through i-2.', `dp[i] = max(dp[i - 1], value[i] + dp[i - 2]);
// keep two previous values for O(1) extra space`, 'Why can adjacent houses not both appear in the take transition?', `Taking house i forbids i-1, so its value is combined with the best solution ending no later than i-2.`),
      lesson('Grid DP', 'A cell state often combines paths from allowed predecessor cells. Initialize boundaries carefully because they have fewer predecessors.', `dp[0][0] = grid[0][0];
dp[r][c] = grid[r][c] + min(dp[r - 1][c], dp[r][c - 1]);`, 'What does dp[r][c] represent in minimum path sum?', `The minimum sum needed to reach cell (r,c) from the start using the allowed moves.`),
      lesson('Knapsack and subsequence DP', 'A 0/1 choice uses the previous item layer; an unbounded choice may reuse the current layer. Capacity is part of the state.', `dp[i][cap] = dp[i - 1][cap];
if (weight[i] <= cap)
  dp[i][cap] = max(dp[i][cap], value[i] + dp[i - 1][cap - weight[i]]);`, 'Why does 0/1 knapsack take from the previous item row?', `It prevents item i from being selected again in the same solution.`),
      lesson('String and LIS patterns', 'LCS compares two prefixes; LIS tracks an increasing subsequence and can be optimized with a tails array and lower_bound.', `for (int x : a) {
  auto it = lower_bound(tails.begin(), tails.end(), x);
  if (it == tails.end()) tails.push_back(x);
  else *it = x;
}
answer = tails.size();`, 'Does the tails array necessarily store an actual LIS?', `No. It stores the smallest possible tail for each length, which is enough to determine the LIS length.`),
    ],
    trap: 'Do not start with a table. First say in words what one state means; unclear state meaning creates incorrect transitions.',
    practice: 'Solve climbing stairs, House Robber, grid paths, 0/1 knapsack, coin change, LCS, LIS, and one partition DP problem.',
  }),
  createChapter({
    number: 17,
    title: 'Tries',
    hook: 'A trie shares prefixes, turning repeated character-by-character searches into one reusable tree of decisions.',
    lessons: [
      lesson('Trie node structure', 'Each node represents a prefix and stores child links plus end-of-word information. Cost depends on word length, not the number of stored words.', `struct TrieNode {
  TrieNode *next[26]{};
  bool terminal = false;
};`, 'What does a path from the root represent?', `The characters along the path form a stored prefix; a terminal marker says the prefix is also a complete word.`),
      lesson('Insert, search, and prefix', 'Insertion creates missing links; exact search also requires terminal=true, while prefix search only requires the path to exist.', `for (char c : word) {
  int i = c - 'a';
  if (!node->next[i]) node->next[i] = new TrieNode();
  node = node->next[i];
}
node->terminal = true;`, 'How does startsWith differ from exact search?', `startsWith succeeds when the path exists; exact search additionally requires the final node to mark a complete word.`),
      lesson('Count and erase words', 'Store prefix and terminal counts when duplicates or deletion are needed. Erasing decrements counts only after confirming the word exists.', `prefixCount along each visited node++;
terminalCount at final node++;
// erase performs matching decrements`, 'Why is a boolean terminal flag insufficient for duplicate words?', `It cannot distinguish one insertion from several; a terminal count preserves multiplicity.`),
      lesson('Maximum XOR trie', 'Store integer bits from most significant to least. For each query bit, prefer the opposite branch to set the answer bit.', `for (int bit = 31; bit >= 0; bit--) {
  int b = (x >> bit) & 1;
  if (node->next[1 - b]) answer |= (1 << bit), node = node->next[1 - b];
  else node = node->next[b];
}`, 'Why is the opposite bit preferred during a maximum-XOR query?', `Different bits produce XOR bit 1, and choosing that at the highest possible position maximizes the number.`),
      lesson('Offline XOR queries', 'Sort values and queries by their allowed maximum. Insert eligible values into the bit trie before answering each query.', `sort values;
sort queries by limit;
for (query : queries) {
  while (value <= query.limit) trie.insert(value++);
  answer[query.index] = trie.empty() ? -1 : trie.maxXor(query.x);
}`, 'What makes the constrained XOR method offline?', `Queries are reordered by limit for efficient processing, then answers are restored to their original indices.`),
    ],
    trap: 'A trie can consume substantial memory. Choose sparse maps or compressed links when the alphabet is large and prefixes are sparse.',
    practice: 'Implement insert/search/prefix, duplicate counts, erase, maximum pair XOR, and constrained offline XOR queries.',
  }),
  createChapter({
    number: 18,
    title: 'Advanced String Algorithms',
    hook: 'Advanced string matching avoids restarting from zero by preserving knowledge about prefixes that have already matched.',
    lessons: [
      lesson('KMP prefix function', 'The LPS array stores the longest proper prefix that is also a suffix. On mismatch, KMP jumps to the next viable matched length.', `while (j > 0 && pattern[i] != pattern[j]) j = lps[j - 1];
if (pattern[i] == pattern[j]) j++;
lps[i] = j;`, 'What does lps[i] represent?', `The length of the longest proper prefix of pattern[0..i] that is also its suffix.`),
      lesson('KMP search', 'Scan text and pattern without moving the text index backward. A full match occurs when the matched prefix length reaches pattern size.', `for (char c : text) {
  while (j > 0 && c != pattern[j]) j = lps[j - 1];
  if (c == pattern[j]) j++;
  if (j == pattern.size()) reportMatch(), j = lps[j - 1];
}`, 'What is KMP search complexity for text length n and pattern length m?', `O(n+m): O(m) builds LPS and O(n) scans the text.`),
      lesson('Z algorithm', 'Z[i] is the longest prefix matching the substring beginning at i. A maintained [left,right] box reuses known matches.', `combined = pattern + "$" + text;
compute Z values;
if (Z[i] == pattern.size()) a match starts at i - pattern.size() - 1;`, 'How does the Z array reveal pattern occurrences?', `In pattern$text, any Z value equal to the pattern length marks a substring matching the entire pattern.`),
      lesson('Rabin-Karp rolling hash', 'Hash the pattern and each same-length text window; update the window hash in O(1), then verify characters when hashes agree.', `remove outgoing contribution;
multiply by base;
add incoming character;
if (windowHash == patternHash) verify exact match;`, 'Why must equal hashes still be verified?', `Different strings can collide to the same finite hash, so character comparison protects correctness.`),
      lesson('Manacher palindrome radii', 'Transform or separately track odd/even centres, then reuse the mirror radius inside the current rightmost palindrome.', `for each center i:
  start from mirror radius inside [left, right]
  expand while characters match
  update rightmost palindrome`, 'What does Manacher improve over expanding independently from every centre?', `It reuses radii already known inside the rightmost palindrome, reducing worst-case time from O(n^2) to O(n).`),
    ],
    trap: 'String hashes are a filter, not a mathematical proof of equality, unless collisions are handled by direct verification or another guaranteed method.',
    practice: 'Build LPS, run KMP, compute a Z array, implement rolling-hash search, and find the longest palindromic substring.',
  }),
];

chapters.push(createRevisionChapter({
  number: 19,
  title: 'A2Z Complete Revision Map',
  hook: 'Revision should rebuild decisions, not merely reread solutions: recognise the pattern, state the invariant, and trace one example.',
  topics: [
    ['1. Foundations', 'Read constraints, estimate complexity, choose a container, and test the smallest and largest inputs.', `constraints -> brute force -> pattern -> invariant -> complexity`],
    ['2. Arrays and strings', 'Recall hashing, prefix sums, Kadane, two pointers, sliding windows, and prefix-matching algorithms.', `repeated range -> prefix/window
repeated lookup -> hash
repeated prefix match -> KMP/Z`],
    ['3. Binary search', 'Search sorted data directly or search a monotonic answer space for its first or last valid point.', `identify monotonic predicate -> preserve answer -> discard half`],
    ['4. Linked structures', 'Lists require saved pointers; stacks resolve nested or nearest items; queues preserve discovery order.', `save next -> rewire
stack: LIFO
queue: FIFO`],
    ['5. Recursion and bits', 'Recursion defines choices and undo steps; bitmasks compact independent yes-or-no decisions.', `choose -> recurse -> unchoose
mask bit i -> item i selected`],
    ['6. Trees and heaps', 'Tree calls return subtree information; BSTs add order; heaps expose only the current minimum or maximum.', `tree state from children
BST path by comparison
heap root = priority`],
    ['7. Graphs', 'Choose traversal and state by edge meaning: BFS, DFS, topological order, shortest paths, MST, or component structure.', `unit edge -> BFS
nonnegative weight -> Dijkstra
connect cheapest -> MST/DSU`],
    ['8. Greedy, DP, and tries', 'Greedy needs a safe-choice proof; DP stores repeated states; tries share prefixes or bit paths.', `greedy: prove exchange
DP: state + transition + base + order
trie: one edge per symbol`],
  ],
  trap: 'Recognising a problem name is not mastery. Re-derive why the pattern applies and what condition would make it fail.',
  plan: [
    { title: 'Four-Pass Revision', points: ['Pass 1: recall chapter patterns without code.', 'Pass 2: trace one representative example per pattern.', 'Pass 3: code from a blank editor and test edge cases.', 'Pass 4: solve mixed timed problems and update a mistake log.'] },
    { title: 'Eight-Day A2Z Sprint', points: ['Day 1: basics, sorting, and arrays.', 'Day 2: binary search and strings.', 'Day 3: linked lists, recursion, and bits.', 'Day 4: stacks, queues, windows, and heaps.', 'Day 5: greedy and binary trees.', 'Day 6: BSTs and graphs.', 'Day 7: dynamic programming and tries.', 'Day 8: advanced strings plus a mixed mock.'] },
    { title: 'Before Every Submission', points: ['State the invariant in one sentence.', 'Check empty, one-item, duplicate, and extreme inputs.', 'Confirm integer width and index boundaries.', 'Write time and extra-space complexity.', 'Test the condition that makes the chosen pattern valid.'] },
  ],
}));

export const dsaNotes = {
  id: 'dsa',
  name: 'DSA',
  accent: '#b4465a',
  status: 'Ready',
  source: {
    label: 'Striver A2Z-aligned original notes',
    url: 'https://takeuforward.org/dsa/strivers-a2z-sheet-learn-dsa-a-to-z',
  },
  prompts: ['Explain Big O', 'Array patterns', 'Binary search on answers', 'BFS vs DFS', 'DP state design', 'A2Z revision plan'],
  chapters,
};
