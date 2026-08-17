import { createChapter, createRevisionChapter, lesson } from './studyTrackHelpers.js';

const chapters = [
  createChapter({
    number: 1,
    title: 'Digital Systems and Data Representation',
    hook: 'A processor only moves bit patterns; representation gives those patterns meaning as numbers, characters, and instructions.',
    lessons: [
      lesson('Number-system conversion', 'Binary, octal, decimal, and hexadecimal are positional systems; each digit contributes digit x base^position.', `(101101)2
= 32 + 8 + 4 + 1
= (45)10 = (2D)16`, 'Convert binary 101101 to decimal and hexadecimal.', `1011012 = 32 + 8 + 4 + 1 = 45 decimal. Grouping as 0010 1101 gives 2D hexadecimal.`),
      lesson('Unsigned and signed range', "An n-bit unsigned value ranges from 0 to 2^n - 1; n-bit two's-complement ranges from -2^(n-1) to 2^(n-1) - 1.", `8-bit unsigned: 0 to 255
8-bit signed: -128 to 127`, "Give the unsigned and two's-complement ranges for 8 bits.", `Unsigned: 0 through 255. Two's-complement: -128 through 127.`),
      lesson("Two's complement", "Negating a fixed-width two's-complement number means invert every bit and add one.", `+18 = 00010010
invert 11101101
add 1 11101110 = -18`, "Represent -18 in 8-bit two's complement.", `18 is 00010010. Invert to 11101101 and add 1, producing 11101110.`),
      lesson('Overflow', 'Signed overflow occurs when two operands with the same sign produce a result with the opposite sign.', `01111111 (+127)
+00000001 (+1)
=10000000 (-128 interpreted) -> overflow`, 'Why does 127 + 1 overflow in 8-bit signed arithmetic?', `The mathematical result 128 is outside the range -128 to 127. Two positive operands produce a negative sign bit, signaling overflow.`),
      lesson('Character and floating-point data', 'Characters use coded integers such as ASCII or Unicode; floating point stores sign, exponent, and significand.', `ASCII 'A' = 65 = 0x41
Float idea: (-1)^sign x significand x base^exponent`, 'What numeric ASCII value represents uppercase A?', `Uppercase A has ASCII decimal value 65, hexadecimal 41.`),
    ],
    trap: 'A bit pattern has no single meaning until its representation is known; 11111111 can mean 255 or -1.',
    practice: "Convert values among four bases, form two's complements, and test three signed additions for overflow.",
  }),
  createChapter({
    number: 2,
    title: 'Logic and Register Transfer',
    hook: 'Register-transfer notation is the processor choreography: which values move, which operation transforms them, and when.',
    lessons: [
      lesson('Boolean building blocks', 'AND requires both inputs, OR requires either input, XOR detects difference, and NOT complements one input.', `A B | AND OR XOR
0 0 |  0   0   0
0 1 |  0   1   1
1 0 |  0   1   1
1 1 |  1   1   0`, 'What outputs do AND, OR, and XOR produce for inputs A=1 and B=0?', `AND = 0, OR = 1, and XOR = 1.`),
      lesson('Registers and buses', 'Registers hold processor words; a shared bus provides a controlled path for transferring one selected source at a time.', `R1 -> bus -> R2
RTL: R2 <- R1`, 'Interpret the register-transfer statement R2 <- R1.', `On the active control event, the contents of R1 are copied into R2. R1 itself is unchanged.`),
      lesson('Conditional transfers', 'A control function before a colon enables a microoperation only when that condition is true.', `P: R2 <- R1
Means: if P = 1, copy R1 into R2`, 'What happens in P: R2 <- R1 when P is zero?', `No transfer occurs; R2 keeps its previous value.`),
      lesson('Arithmetic microoperations', 'Register-level arithmetic includes add, subtract, increment, decrement, and add-with-carry.', `R3 <- R1 + R2
R1 <- R1 + 1
R4 <- R4 - R5`, 'Write RTL to increment register R6.', `R6 <- R6 + 1`),
      lesson('Logic and shift microoperations', 'Logic operations manipulate selected bits; logical, arithmetic, and circular shifts move bit positions differently.', `R1 = 10110010
logical right shift -> 01011001
arithmetic right shift -> 11011001`, 'Right-shift 10110010 logically and arithmetically as an 8-bit signed value.', `Logical right shift fills with 0: 01011001. Arithmetic right shift preserves the sign bit 1: 11011001.`),
    ],
    trap: 'Register transfer copies a value; it does not normally erase the source register.',
    practice: 'Translate five short datapath actions into RTL and calculate the result of arithmetic, logic, and shift microoperations.',
  }),
  createChapter({
    number: 3,
    title: 'Basic Computer Organization',
    hook: 'The stored-program computer repeatedly fetches a coded instruction, decodes its promise, and performs its microoperations.',
    lessons: [
      lesson('Stored-program concept', 'Instructions and data reside in addressable memory, allowing programs to be fetched and changed like other stored information.', `Memory:
address 100 -> instruction
address 101 -> instruction
address 500 -> data`, 'What is the stored-program concept?', `Instructions and data are represented in memory, and the processor fetches instructions by address for execution.`),
      lesson('Core CPU registers', 'The PC selects the next instruction, IR holds the current instruction, MAR addresses memory, and MDR carries transferred data.', `PC -> MAR
Memory[MAR] -> MDR -> IR
PC <- PC + 1`, 'State the roles of PC and IR.', `The program counter holds the address of the next instruction. The instruction register holds the instruction currently being decoded or executed.`),
      lesson('Fetch cycle', 'A fetch copies PC to the memory address register, reads the instruction, loads IR, and advances PC.', `T0: MAR <- PC
T1: MDR <- M[MAR], PC <- PC + 1
T2: IR <- MDR`, 'Write a three-step RTL fetch sequence.', `MAR <- PC; MDR <- M[MAR] and PC <- PC + 1; IR <- MDR.`),
      lesson('Decode and execute', 'The control unit decodes opcode and addressing fields, then issues microoperations appropriate to that instruction.', `IR opcode = ADD
EA <- address field
AC <- AC + M[EA]`, 'What does instruction decoding determine?', `It determines the required operation, operand location or addressing method, and the control sequence needed to execute it.`),
      lesson('Interrupt cycle', 'An interrupt saves enough return state, branches to a service routine, handles an event, and later restores execution.', `finish instruction
save PC
load ISR address
service event
restore PC`, 'Why is processor state saved before an interrupt service routine runs?', `The saved state allows the interrupted program to resume from the correct point with its previous execution context.`),
    ],
    trap: 'The PC normally points to the next instruction after fetch, not the instruction currently held in IR.',
    practice: 'Trace fetch, decode, execute, and interrupt cycles using register-transfer statements.',
  }),
  createChapter({
    number: 4,
    title: 'CPU and Register Organization',
    hook: 'Inside the CPU, registers shorten the distance to data and the datapath decides what can happen in one clock step.',
    lessons: [
      lesson('General-purpose registers', 'A register file provides fast operands and destinations, reducing repeated memory access.', `ADD R1, R2, R3
R1 <- R2 + R3`, 'Interpret the three-register instruction ADD R1, R2, R3.', `The processor adds the contents of R2 and R3 and writes the result into R1.`),
      lesson('Accumulator organization', 'An accumulator machine uses an implied central register, producing compact instructions but more accumulator traffic.', `ADD X
AC <- AC + M[X]`, 'What operand is implied by ADD X in an accumulator machine?', `The accumulator is the implied first operand and destination; AC becomes AC + memory[X].`),
      lesson('Stack organization', 'A stack machine takes operands from the top of a LIFO stack and pushes the result, often using zero-address instructions.', `PUSH 4
PUSH 7
ADD
Stack top -> 11`, 'Evaluate PUSH 4, PUSH 7, ADD on a stack machine.', `ADD pops 7 and 4, adds them, and pushes 11. The stack top is 11.`),
      lesson('Datapath and ALU', 'Multiplexers select operands, the ALU performs an operation, and destination-enable signals store the result.', `Select A=R2, B=R3
ALU operation=ADD
Enable R1
=> R1 <- R2 + R3`, 'Which three control choices are needed for R1 <- R2 + R3?', `Select R2 and R3 as ALU inputs, select addition as the ALU function, and enable loading of R1.`),
      lesson('Status flags', 'Arithmetic results update flags such as zero, carry, negative/sign, and overflow for later conditional instructions.', `11111111 + 00000001
= 00000000 with carry out
Z=1, C=1`, 'For 8-bit FF + 01, what are the zero and carry flags?', `The result is 00 with a carry out, so Z = 1 and C = 1.`),
    ],
    trap: 'Carry and signed overflow are different: carry describes an unsigned extra bit, while overflow describes an invalid signed result.',
    practice: 'Evaluate short instruction sequences on accumulator, general-register, and stack organizations.',
  }),
  createChapter({
    number: 5,
    title: 'Instructions and Addressing Modes',
    hook: 'An instruction says what to do; its addressing mode explains where the real operand is hiding.',
    lessons: [
      lesson('Instruction fields', 'An instruction commonly contains an opcode plus register, addressing-mode, and immediate or address fields.', `| opcode | mode | register | address/immediate |`, 'What information does an opcode carry?', `The opcode identifies the operation the processor must perform, such as add, load, branch, or shift.`),
      lesson('Immediate and direct addressing', 'Immediate mode embeds the value; direct mode stores the memory address of the operand.', `MOV R1, #25 -> R1 <- 25
LOAD R1, 500 -> R1 <- M[500]`, 'Distinguish immediate #25 from direct address 25.', `Immediate #25 is the value 25 itself. Direct 25 means the operand is read from memory address 25.`),
      lesson('Indirect addressing', 'Indirect mode reads an address from a register or memory location before accessing the operand.', `R2 = 800
LOAD R1, (R2)
R1 <- M[800]`, 'If R2 contains 800, what effective address is used by register-indirect (R2)?', `The effective address is the value stored in R2, so EA = 800.`),
      lesson('Indexed and relative addressing', 'Indexed mode adds an index to a base address; PC-relative mode adds a displacement to the current PC.', `Base = 1000, index = 24
EA = 1024
PC = 400, displacement = -20 -> EA = 380`, 'Find the effective address for base 1000 and index 24.', `EA = base + index = 1000 + 24 = 1024.`),
      lesson('RISC and CISC', 'RISC favors simple regular instructions and load/store access; CISC typically provides richer, variable operations and addressing.', `RISC: LOAD, ADD registers, STORE
CISC: operation may combine memory access and arithmetic`, 'Give one characteristic commonly associated with RISC.', `A common RISC characteristic is a simple, regular instruction set in which arithmetic uses registers and separate load/store instructions access memory.`),
    ],
    trap: 'The address field is not always the effective address; the addressing mode determines how it must be interpreted.',
    practice: 'Calculate effective addresses for immediate, direct, indirect, indexed, and PC-relative examples.',
  }),
  createChapter({
    number: 6,
    title: 'Control Unit Design',
    hook: 'The control unit converts an instruction into precisely timed signals that animate the datapath.',
    lessons: [
      lesson('Control signals', 'Control signals choose register inputs, ALU functions, memory operations, and sequencing decisions during each clock step.', `T0: PCout, MARin
T1: Read, MDRin, PCincrement
T2: MDRout, IRin`, 'What do PCout and MARin accomplish together?', `PCout places the PC value on the internal path and MARin loads that value into the memory address register.`),
      lesson('Hardwired control', 'Hardwired logic generates signals directly from instruction bits, timing, and conditions; it is fast but harder to modify.', `signals = combinational/sequential logic(opcode, flags, time)`, 'Give one advantage and one disadvantage of hardwired control.', `It is generally fast, but redesigning or extending a complex instruction set is difficult.`),
      lesson('Microprogrammed control', 'A control memory stores microinstructions whose fields generate signals and choose the next microinstruction.', `Control address register -> control memory
microinstruction -> datapath signals + next address`, 'What is stored in control memory?', `Control memory stores microinstructions that specify datapath control signals and microprogram sequencing information.`),
      lesson('Horizontal and vertical microcode', 'Horizontal microcode uses wide, direct control bits; vertical microcode encodes fields that require decoding.', `Horizontal: wide, parallel, fast
Vertical: compact, encoded, extra decode`, 'Why is horizontal microcode usually wider than vertical microcode?', `It provides more direct control bits, often one or a small field per datapath action, rather than heavily encoding them.`),
      lesson('Microprogram sequencing', 'The next microaddress may be sequential, a branch chosen by a condition, or a mapped entry for a new opcode.', `next = CAR + 1
or branch address if flag true
or opcode mapping address`, 'Name three possible sources of the next microinstruction address.', `The next sequential address, a branch target selected by a condition, or an entry address derived from the instruction opcode.`),
    ],
    trap: 'Microcode is low-level control information, not the same thing as the machine-code program stored in main memory.',
    practice: 'Write a small control sequence for fetch and compare how hardwired and microprogrammed units would implement it.',
  }),
  createChapter({
    number: 7,
    title: 'Computer Arithmetic',
    hook: 'Arithmetic hardware is built from finite-width rules, so every operation carries questions about signs, carries, precision, and overflow.',
    lessons: [
      lesson('Binary addition and subtraction', "An n-bit adder forms sum and carry; subtraction can reuse it by adding the two's complement of the subtrahend.", `13 - 5
1101 + two's complement of 0101
1101 + 1011 = 1 1000 -> 1000 = 8`, "Calculate 13 - 5 using 4-bit two's-complement addition.", `Two's complement of 0101 is 1011. 1101 + 1011 = 1 1000; discard the carry, leaving 1000, which is 8.`),
      lesson('Ripple and carry lookahead', 'Ripple adders wait for carry to pass through stages; carry lookahead computes carries in parallel from generate and propagate terms.', `Gi = Ai AND Bi
Pi = Ai XOR Bi
C(i+1) = Gi OR (Pi AND Ci)`, 'Why is carry lookahead faster than ripple carry?', `It computes carry signals from generate/propagate logic in parallel instead of waiting for each preceding full adder.`),
      lesson('Shift-and-add multiplication', 'Binary multiplication adds shifted copies of the multiplicand for multiplier bits equal to one.', `101 (5) x 011 (3)
101
1010
=1111 (15)`, 'Multiply binary 101 by 011.', `The set multiplier bits select 101 and 1010. Their sum is 1111 binary, or 15 decimal.`),
      lesson('Restoring division idea', 'Binary division repeatedly shifts a partial remainder, subtracts the divisor, and restores when the subtraction is negative.', `Dividend 13 / divisor 3
Quotient = 4
Remainder = 1`, 'What quotient and remainder result from unsigned 13 divided by 3?', `Quotient = 4 and remainder = 1 because 13 = 3 x 4 + 1.`),
      lesson('Floating-point arithmetic', 'Floating-point addition aligns exponents, adds significands, normalizes, rounds, and checks exceptional ranges.', `1.5 x 2^3 + 1.0 x 2^1
align -> 1.5 x 2^3 + 0.25 x 2^3
= 1.75 x 2^3`, 'Why must exponents be aligned before floating-point significands are added?', `The significands represent different place values until their exponents match, so alignment is required for corresponding bits to have equal weight.`),
    ],
    trap: "Discarding a final carry is correct for fixed-width two's-complement subtraction, but carry alone does not decide signed overflow.",
    practice: 'Perform binary add, subtract, multiply, and divide operations, then outline the stages of floating-point addition.',
  }),
  createChapter({
    number: 8,
    title: 'Memory Hierarchy and Cache',
    hook: 'Memory hierarchy wins by keeping a small amount of likely-needed data close and tolerating distance for the rest.',
    lessons: [
      lesson('Locality', 'Temporal locality reuses recent items; spatial locality accesses addresses near a recent item.', `Loop reuses sum -> temporal locality
Sequential array scan -> spatial locality`, 'Identify the locality used by sequentially scanning an array.', `Spatial locality, because consecutive elements occupy nearby memory addresses.`),
      lesson('Cache mapping', 'Direct mapping allows one line, associative mapping allows any line, and set-associative mapping allows any line within one set.', `Direct-mapped line = block number mod line count
Block 29, 8 lines -> line 5`, 'Where does memory block 29 map in an 8-line direct-mapped cache?', `29 mod 8 = 5, so it maps to cache line 5.`),
      lesson('Cache address fields', 'An address divides into tag, set or line index, and block offset according to cache organization.', `32-bit address, 64-byte block -> 6 offset bits
256 direct lines -> 8 index bits
tag = 32 - 6 - 8 = 18 bits`, 'Find tag bits for a 32-bit direct cache with 256 lines and 64-byte blocks.', `Offset = log2(64) = 6 bits, index = log2(256) = 8 bits, so tag = 32 - 6 - 8 = 18 bits.`),
      lesson('Replacement and writes', 'Associative caches need a victim policy; write-through updates lower memory immediately, while write-back waits until eviction.', `Write-through: cache + memory now
Write-back: mark dirty, memory on eviction`, 'How does write-back reduce memory traffic?', `Repeated writes update only the cache block; lower memory is updated once when the dirty block is evicted.`),
      lesson('Average memory access time', 'AMAT combines hit time with miss probability and miss penalty.', `Hit time = 1 ns
Miss rate = 0.05
Penalty = 40 ns
AMAT = 1 + 0.05 x 40 = 3 ns`, 'Calculate AMAT for 1 ns hit time, 5% miss rate, and 40 ns miss penalty.', `AMAT = 1 + 0.05 x 40 = 3 ns.`),
    ],
    trap: 'A high hit rate can still perform poorly when the miss penalty is enormous; always evaluate AMAT.',
    practice: 'Split cache addresses, map blocks, and calculate AMAT for several cache designs.',
  }),
  createChapter({
    number: 9,
    title: 'Main and Virtual Memory',
    hook: 'Main memory stores the active working set; virtual memory gives each process a larger, protected address space by moving pages on demand.',
    lessons: [
      lesson('RAM and ROM families', 'SRAM is fast and used for caches; DRAM is dense and refreshed for main memory; nonvolatile memory retains data without power.', `SRAM -> cache
DRAM -> main memory
Flash/ROM -> firmware and persistent storage`, 'Why is DRAM commonly used for main memory instead of SRAM?', `DRAM cells are denser and cheaper per bit, allowing much larger capacities, although they are slower and require refresh.`),
      lesson('Memory organization', 'Capacity equals addressable locations multiplied by bits per location; address pins select locations.', `4K x 8 memory
locations = 4096 = 2^12
address lines = 12
capacity = 4096 bytes`, 'How many address lines are required for a 4K x 8 memory?', `4K = 4096 = 2^12 locations, so 12 address lines are required.`),
      lesson('Paging', 'Virtual and physical memory are divided into fixed-size pages and frames; a page table maps virtual page numbers to frames.', `virtual address = page number | offset
physical address = frame number | same offset`, 'Which part of a paged virtual address remains unchanged during translation?', `The page offset remains unchanged; the virtual page number is replaced by a physical frame number.`),
      lesson('Translation lookaside buffer', 'A TLB caches recent page-table entries so most translations avoid an extra main-memory lookup.', `TLB hit -> frame found quickly
TLB miss -> read page table, then update TLB`, 'What happens on a TLB miss when the page is present in memory?', `The processor or memory-management unit reads the page-table entry, obtains the frame number, and normally inserts the translation into the TLB.`),
      lesson('Page faults', 'A page fault occurs when a referenced page is not resident; the OS loads it, possibly evicting another page, then restarts the instruction.', `reference absent page
trap -> choose frame -> load page -> update table -> restart`, 'Outline the steps used to service a valid page fault.', `Trap to the OS, locate the page, obtain or free a frame, read the page from storage, update page tables/TLB, and restart the faulting instruction.`),
    ],
    trap: 'A TLB miss is not automatically a page fault; the page-table entry may still show that the page is resident.',
    practice: 'Calculate memory-chip organization and translate small virtual addresses using a supplied page table.',
  }),
  createChapter({
    number: 10,
    title: 'Input and Output Organization',
    hook: 'I/O connects a fast deterministic CPU to devices that arrive late, fail independently, and speak at wildly different rates.',
    lessons: [
      lesson('I/O interfaces', 'An interface exposes data, status, and control registers while translating timing and signals for a device.', `CPU bus <-> I/O interface <-> device
registers: DATA, STATUS, CONTROL`, 'Why is an I/O interface placed between the CPU bus and a peripheral?', `It adapts electrical timing and device protocols while presenting standard data, status, and control registers to the processor.`),
      lesson('Memory-mapped and isolated I/O', 'Memory-mapped I/O uses normal load/store addresses; isolated I/O uses a separate address space and special instructions.', `Memory mapped: LOAD R1, [device_status]
Isolated: IN R1, port`, 'Give one advantage of memory-mapped I/O.', `Normal memory instructions and addressing modes can access device registers, simplifying the instruction set and programming model.`),
      lesson('Programmed and interrupt I/O', 'Polling repeatedly checks status; interrupt-driven I/O lets the CPU work until the device requests attention.', `Polling: while (!(STATUS & READY)) {}
Interrupt: device signals CPU when ready`, 'Why can interrupt-driven I/O waste fewer CPU cycles than polling?', `The CPU performs other work instead of repeatedly reading a device status register while the device is idle.`),
      lesson('Direct memory access', 'A DMA controller transfers blocks between a device and memory, interrupting the CPU mainly at setup and completion.', `CPU configures source, destination, count
DMA transfers block
DMA interrupts on completion`, 'What information must the CPU usually provide to start a DMA transfer?', `The source or device, memory address, transfer direction, byte or word count, and control mode.`),
      lesson('Priority and interrupts', 'Priority logic selects among simultaneous requests; masking, vectored addresses, and nesting control service order.', `priority: disk > keyboard
both request -> service disk first
save state before ISR`, 'What is a vectored interrupt?', `It is an interrupt whose source supplies or selects an address or vector that leads directly to the appropriate service routine.`),
    ],
    trap: 'DMA reduces CPU copying work but still competes for memory or bus bandwidth.',
    practice: 'Compare polling, interrupts, and DMA for a keyboard, network adapter, and high-speed storage transfer.',
  }),
  createChapter({
    number: 11,
    title: 'Pipelining',
    hook: 'A pipeline overlaps instructions like an assembly line: latency remains, but completed work can emerge every cycle.',
    lessons: [
      lesson('Pipeline stages and speedup', 'A classic pipeline uses fetch, decode, execute, memory, and write-back stages; ideal throughput approaches one instruction per cycle.', `Nonpipeline: n x 5 cycles
Ideal 5-stage pipeline: 5 + (n - 1) cycles`, 'How many cycles does an ideal five-stage pipeline need for 10 instructions?', `It needs k + n - 1 = 5 + 10 - 1 = 14 cycles.`),
      lesson('Structural hazards', 'A structural hazard occurs when overlapping instructions need the same hardware resource at the same time.', `One memory for instruction fetch and data access
IF and MEM conflict -> stall or separate memories`, 'Give one way to remove a memory structural hazard.', `Provide separate instruction and data memories/caches or add sufficient multiported access so both operations can proceed.`),
      lesson('Data hazards', 'A read-after-write hazard occurs when an instruction needs a result that an earlier instruction has not yet written.', `ADD R1, R2, R3
SUB R4, R1, R5  // needs new R1`, 'Name the dependency in the shown ADD followed by SUB.', `It is a read-after-write (RAW) dependency because SUB must read the R1 value produced by ADD.`),
      lesson('Forwarding and stalls', 'Forwarding sends a result directly from a later pipeline stage to a dependent operation; stalls wait when forwarding is insufficient.', `ALU result -> next instruction ALU input
Load-use may still require a bubble`, 'How does forwarding reduce RAW stalls?', `It bypasses the register file and supplies a produced value directly to the dependent pipeline stage before normal write-back.`),
      lesson('Control hazards', 'A branch changes the PC before the pipeline knows the correct next instruction; prediction and early resolution reduce lost cycles.', `predict next PC
correct -> continue
wrong -> flush wrong-path instructions`, 'What happens after a branch prediction is found incorrect?', `Wrong-path instructions are flushed, the correct PC is installed, and fetching restarts from the correct path.`),
    ],
    trap: 'Pipelining improves throughput, not the execution latency of a single isolated instruction.',
    practice: 'Draw a five-stage timing chart and mark structural, data, and control hazards with their remedies.',
  }),
  createChapter({
    number: 12,
    title: 'Parallelism and Performance',
    hook: 'Performance comes from useful work per unit time, not clock rate alone; parallel hardware only helps the portion that can run in parallel.',
    lessons: [
      lesson('CPU performance equation', 'CPU time equals instruction count multiplied by cycles per instruction and clock-cycle time.', `IC = 1,000,000
CPI = 2
Clock = 2 GHz
CPU time = IC x CPI / rate = 1 ms`, 'Calculate CPU time for one million instructions, CPI 2, and a 2 GHz clock.', `CPU time = 1,000,000 x 2 / 2,000,000,000 second = 0.001 second = 1 ms.`),
      lesson('Speedup', 'Speedup is old execution time divided by new execution time; efficiency also considers resources used.', `Old = 20 s, new = 5 s
Speedup = 20 / 5 = 4`, 'Find the speedup when execution time falls from 20 seconds to 5 seconds.', `Speedup = 20 / 5 = 4, so the new system is four times as fast for this workload.`),
      lesson("Amdahl's law", 'If fraction P is accelerated by factor S, total speedup is 1 / ((1-P) + P/S).', `P = 0.8, S = 4
speedup = 1 / (0.2 + 0.8/4)
= 2.5`, "Apply Amdahl's law when 80% is accelerated fourfold.", `Speedup = 1 / (0.2 + 0.8/4) = 1 / 0.4 = 2.5.`),
      lesson('Flynn classification', 'SISD, SIMD, MISD, and MIMD classify systems by numbers of instruction and data streams.', `Vector/GPU-style lanes -> SIMD
Multicore independent threads -> MIMD`, 'Classify a multicore machine running independent instruction streams on different data.', `It is MIMD: multiple instruction streams operate on multiple data streams.`),
      lesson('Multicore and coherence', 'Private caches improve locality, but coherence protocols are needed so cores observe compatible values for shared blocks.', `Core 1 writes X in cache
coherence invalidates/updates other cached copies`, 'What problem does cache coherence solve?', `It prevents cores from indefinitely using inconsistent cached copies of the same shared memory location.`),
    ],
    trap: 'A higher clock rate does not guarantee a faster program; instruction count, CPI, memory behavior, and workload all matter.',
    practice: 'Calculate CPU time, speedup, and Amdahl limits, then classify four parallel architectures.',
  }),
];

chapters.push(createRevisionChapter({
  number: 13,
  title: 'Architecture Revision Map',
  hook: 'Follow one instruction from bits to registers, control, arithmetic, memory, I/O, pipeline, and measured performance.',
  topics: [
    ['1. Representation route', "Bases, signed numbers, two's complement, character codes, overflow, and floating point.", `value -> fixed bit pattern -> interpretation`],
    ['2. Datapath route', 'Registers, buses, ALU operations, RTL, status flags, and addressing modes move and transform operands.', `source registers -> ALU -> destination register`],
    ['3. Control route', 'Fetch, decode, execute, interrupts, hardwired control, and microprograms sequence each operation.', `PC -> IR -> decode -> timed control signals`],
    ['4. Memory route', 'Locality, caches, RAM, paging, TLBs, and page faults trade capacity for speed.', `register -> cache -> RAM -> secondary storage`],
    ['5. I/O route', 'Interfaces, polling, interrupts, DMA, and priority connect asynchronous devices.', `device -> interface -> bus -> memory/CPU`],
    ['6. Performance route', "Pipelines, hazards, CPU time, speedup, Amdahl's law, and parallel architectures explain real performance.", `CPU time = IC x CPI / clock rate`],
  ],
  trap: 'Architecture questions become confusing when representation, organization, and timing are mixed. Label each level before solving.',
  plan: [
    { title: 'Six-Day Recall Plan', points: ['Day 1: representation and arithmetic.', 'Day 2: RTL, datapath, and instruction formats.', 'Day 3: fetch, control, and interrupts.', 'Day 4: cache and virtual memory.', 'Day 5: I/O and DMA.', 'Day 6: pipelining, performance, and a mixed paper.'] },
    { title: 'Diagram Method', points: ['Draw storage elements first.', 'Add arrows showing data movement.', 'Write the control condition beside each arrow.', 'Trace one concrete value through the diagram.'] },
  ],
}));

export const computerArchitectureNotes = {
  id: 'computer-architecture',
  name: 'Computer Architecture & Organization',
  navName: 'Computer Architecture',
  accent: '#9a5a16',
  status: 'Ready',
  supportsPlayground: false,
  source: { label: 'Original curriculum-based notes' },
  prompts: ['Explain the instruction cycle', 'Cache mapping example', 'Addressing modes', 'Pipeline hazards', 'Amdahl calculation', 'Chapter 1 recap'],
  chapters,
};
