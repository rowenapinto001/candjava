const LESSON_VISUALS = {
  // Data communications
  'Five communication components': 'communication-model',
  'Seven OSI layers': 'osi-layers',
  'Analog and digital signals': 'signal-types',
  'Optical fiber': 'optical-fiber',
  'Digital modulation': 'encoding-path',
  'Line coding': 'line-coding',
  'Cyclic redundancy check': 'crc-path',
  'Stop-and-wait ARQ': 'stop-and-wait',
  'Go-Back-N ARQ': 'sliding-window',
  'Frequency-division multiplexing': 'multiplexing',
  'Circuit switching': 'switching-comparison',
  'Cells and frequency reuse': 'cellular-reuse',
  'CSMA/CD': 'csma-cd',
  'Bus and tree topologies': 'lan-topologies',
  'Ethernet frame': 'ethernet-frame',
  'IEEE 802.11 architecture': 'wifi-architecture',
  'IPv4 and subnet masks': 'subnet-address',
  'IPv4 operation and subnetting': 'subnet-address',
  'Principles of internetworking': 'packet-journey',
  'TCP connection and reliability': 'tcp-handshake',
  'Forward error correction': 'fec-path',
  OFDM: 'ofdm-subcarriers',
  'Bluetooth piconets': 'bluetooth-piconet',
  'Link-state routing': 'routing-map',
  'TCP congestion window': 'congestion-window',
  'Encapsulation across links': 'packet-journey',
  'Delay components': 'delay-components',
  'Push, swap, and pop': 'mpls-labels',
  'DNS hierarchy': 'dns-tree',
  'Streaming and adaptive bitrate': 'adaptive-streaming',
  'IP multicasting': 'multicast-tree',
  'QoS architectural framework': 'qos-framework',
  'Voice over IP': 'voip-path',
  'Real-time Transport Protocol': 'rtp-packet',

  // Computer architecture and organization
  "Two's complement": 'twos-complement',
  'Registers and buses': 'register-bus',
  'Fetch cycle': 'instruction-cycle',
  'Stack organization': 'stack-machine',
  'Instruction fields': 'instruction-format',
  'Microprogrammed control': 'microprogram-control',
  'Ripple and carry lookahead': 'binary-adder',
  'Cache mapping': 'cache-mapping',
  Paging: 'paging-translation',
  'Direct memory access': 'dma-transfer',
  'Pipeline stages and speedup': 'cpu-pipeline',
  'Flynn classification': 'flynn-classification',

  // Data structures and algorithms
  'Time and space complexity': 'complexity-growth',
  'Contiguous storage': 'array-layout',
  'Node structure': 'linked-list',
  'LIFO operations': 'stack-operations',
  'FIFO operations': 'queue-operations',
  'Base and recursive cases': 'recursion-tree',
  'Tree vocabulary': 'tree-vocabulary',
  'BST invariant': 'bst-invariant',
  'Array representation': 'heap-layout',
  'Separate chaining': 'hash-chaining',
  'Graph representations': 'graph-representation',
  'Merge sort': 'merge-sort',
  'Binary search': 'binary-search',
  'Memoization and tabulation': 'dp-table',
};

export const lesson = (title, point, example, question, answer, visual = null) => ({
  title,
  point,
  example,
  question,
  answer,
  visual: visual ?? LESSON_VISUALS[title] ?? null,
});

export const createChapter = ({ number, title, hook, lessons, trap, practice }) => {
  if (lessons.length !== 5) {
    throw new Error(`${title} must contain exactly five lessons.`);
  }

  return {
    number,
    title,
    hook,
    topics: lessons.map((item) => [item.title, item.point, item.example, item.visual, item.answer]),
    useIt: [
      'Read the idea, cover it, and explain it once in your own words.',
      'Work through the example by hand before checking the shown result.',
      'Finish the five practice questions without looking back at the topic table.',
    ],
    trap,
    example: lessons[0].example,
    practice,
    energy: 'Treat each topic as a small problem you can solve, not a paragraph you must memorise.',
    questions: lessons.map((item) => item.question),
    answers: lessons.map((item) => item.answer),
    programExamples: lessons.slice(0, 2).map((item) => ({
      title: `${item.title} Worked Example`,
      idea: item.point,
      code: item.example,
    })),
  };
};

export const createRevisionChapter = ({ number, title, hook, topics, plan, trap }) => ({
  number,
  title,
  hook,
  revisionOnly: true,
  topics,
  useIt: [
    'Recall the route names first, then fill in the details from memory.',
    'Mix calculations, diagrams, and explanation questions in one revision session.',
    'Keep a one-page mistake log and revisit it before starting another mock test.',
  ],
  trap,
  example: topics[0][2],
  practice: 'Choose one route below and rebuild its key diagram, procedure, and example without opening the chapter.',
  energy: 'Revision works when recall is active: close the notes, rebuild the idea, then check the missing pieces.',
  revisionPlan: plan,
});
