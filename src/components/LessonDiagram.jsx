import { useId } from 'react';

const DIAGRAMS = {
  'communication-model': { title: 'Communication model', layout: 'flow', labels: ['Sender', 'Message', 'Medium', 'Receiver'], note: 'Protocol rules coordinate every step.' },
  'osi-layers': { title: 'OSI layer stack', layout: 'stack', labels: ['7 Application', '6 Presentation', '5 Session', '4 Transport', '3 Network', '2 Data Link', '1 Physical'], note: 'Send downward; receive upward.' },
  'signal-types': { title: 'Analog and digital signals', layout: 'wave', note: 'Analog varies continuously; digital uses distinct levels.' },
  'optical-fiber': { title: 'Light through optical fiber', layout: 'flow', labels: ['Electrical\nsignal', 'LED / laser', 'Fiber core', 'Photodetector', 'Electrical\nsignal'], note: 'Total internal reflection keeps light inside the core.' },
  'encoding-path': { title: 'Bits become a transmitted signal', layout: 'flow', labels: ['Input bits', 'Encoder', 'Signal /\nsymbols', 'Channel', 'Decoder'], note: 'The receiver maps measured symbols back to bits.' },
  'line-coding': { title: 'NRZ-L and Manchester line coding', layout: 'linecode', note: 'Manchester adds a middle-bit transition for timing; NRZ-L uses one level for the full bit.' },
  'crc-path': { title: 'CRC checking route', layout: 'flow', labels: ['Data', 'Divide by\ngenerator', 'Append\nremainder', 'Transmit', 'Divide again'], note: 'A zero receiver remainder means no detected error.' },
  'stop-and-wait': { title: 'Stop-and-wait ARQ', layout: 'cycle', labels: ['Send frame 0', 'Receive frame', 'Return ACK 1', 'Send frame 1'], note: 'A timeout causes the outstanding frame to be sent again.' },
  'sliding-window': { title: 'Go-Back-N sliding window', layout: 'window', labels: ['0', '1', '2', '3', '4', '5', '6'], focus: 2, note: 'If frame 2 is lost, later unacknowledged frames are sent again from frame 2.' },
  multiplexing: { title: 'Multiplexing', layout: 'lanes', labels: ['Source A', 'Source B', 'Source C'], center: 'MUX', output: 'Shared link', note: 'The demultiplexer separates the combined channels at the destination.' },
  'switching-comparison': { title: 'Circuit and packet switching', layout: 'compare', rows: [['Circuit', 'Reserve path', 'Send stream', 'Release'], ['Packet', 'Split data', 'Route packets', 'Reassemble']], note: 'Circuit traffic owns a path; packets can take shared routes.' },
  'cellular-reuse': { title: 'Cellular frequency reuse', layout: 'cells', labels: ['A', 'B', 'C', 'A', 'B', 'C', 'A'], note: 'Separated cells may reuse the same channel group.' },
  'csma-cd': { title: 'CSMA/CD decision path', layout: 'flow', labels: ['Listen', 'Idle?', 'Transmit', 'Collision?', 'Back off'], note: 'After a collision, wait a random interval and try again.' },
  'lan-topologies': { title: 'Bus and tree LAN topologies', layout: 'lan', note: 'A tree extends a shared backbone through branching segments.' },
  'ethernet-frame': { title: 'Ethernet frame', layout: 'frame', labels: ['Preamble', 'Dest. MAC', 'Source MAC', 'Type', 'Payload', 'FCS'], widths: [48, 58, 58, 36, 82, 40], note: 'The FCS detects corruption; MAC fields identify local interfaces.' },
  'wifi-architecture': { title: 'Infrastructure Wi-Fi', layout: 'graph', nodes: [['STA 1', 42, 42], ['STA 2', 42, 128], ['Access\npoint', 176, 85], ['Switch', 302, 85]], edges: [[0, 2], [1, 2], [2, 3]], note: 'Stations join a basic service set through an access point.' },
  'subnet-address': { title: 'IPv4 address split', layout: 'frame', labels: ['Network prefix', 'Host part'], widths: [210, 110], note: 'The subnet mask decides where the network prefix ends.' },
  'tcp-handshake': { title: 'TCP three-way handshake', layout: 'sequence', actors: ['Client', 'Server'], messages: [['SYN', 'right'], ['SYN + ACK', 'left'], ['ACK', 'right']], note: 'Sequence numbers are synchronized before application data flows.' },
  'fec-path': { title: 'Forward error correction', layout: 'flow', labels: ['Data', 'Add redundant\nbits', 'Noisy channel', 'Syndrome', 'Correct data'], note: 'Enough redundancy lets the receiver correct errors without retransmission.' },
  'ofdm-subcarriers': { title: 'OFDM subcarriers', layout: 'bars', labels: ['f1', 'f2', 'f3', 'f4', 'f5'], note: 'Orthogonal overlapping subcarriers carry slower parallel symbol streams.' },
  'bluetooth-piconet': { title: 'Bluetooth piconet', layout: 'graph', nodes: [['Peripheral', 50, 38], ['Peripheral', 50, 135], ['Central', 180, 86], ['Peripheral', 310, 38], ['Peripheral', 310, 135]], edges: [[0, 2], [1, 2], [2, 3], [2, 4]], note: 'One central device coordinates active peripherals.' },
  'routing-map': { title: 'Link-state shortest path', layout: 'graph', nodes: [['A', 42, 84], ['B', 135, 35], ['C', 135, 135], ['D', 238, 35], ['E', 310, 100]], edges: [[0, 1, '2'], [0, 2, '5'], [1, 2, '1'], [1, 3, '3'], [2, 4, '2'], [3, 4, '1']], note: 'Each router builds the map, then calculates its lowest-cost paths.' },
  'congestion-window': { title: 'TCP congestion window', layout: 'plot', variant: 'saw', note: 'The window grows while delivery succeeds and drops when congestion is inferred.' },
  'packet-journey': { title: 'Packet across different links', layout: 'flow', labels: ['Host', 'Ethernet\nframe', 'Router', 'Wi-Fi\nframe', 'Host'], note: 'Link frames change at each hop; the IP packet continues end to end.' },
  'delay-components': { title: 'End-to-end delay', layout: 'flow', labels: ['Processing', 'Queueing', 'Transmission', 'Propagation'], note: 'Total nodal delay is the sum of these four parts.' },
  'mpls-labels': { title: 'MPLS label operations', layout: 'flow', labels: ['Ingress\nPUSH 18', 'LSR\nSWAP 18→7', 'LSR\nSWAP 7→3', 'Egress\nPOP 3'], note: 'Routers forward by short labels along a label-switched path.' },
  'dns-tree': { title: 'DNS hierarchy', layout: 'tree', nodes: [['Root .', 180, 25], ['.com', 95, 82], ['.edu', 265, 82], ['example.com', 62, 145], ['shop.com', 130, 145], ['college.edu', 265, 145]], edges: [[0, 1], [0, 2], [1, 3], [1, 4], [2, 5]], note: 'Resolution follows delegated authority down the name hierarchy.' },
  'adaptive-streaming': { title: 'Adaptive streaming path', layout: 'flow', labels: ['Video', 'Multiple\nbitrates', 'Segments', 'Network', 'Player adapts'], note: 'The player selects each next segment quality from current conditions.' },
  'multicast-tree': { title: 'Multicast distribution tree', layout: 'tree', nodes: [['Source', 180, 20], ['Router', 180, 63], ['Branch', 95, 108], ['Branch', 265, 108], ['Group A', 45, 155], ['Group B', 142, 155], ['Group C', 265, 155]], edges: [[0, 1], [1, 2], [1, 3], [2, 4], [2, 5], [3, 6]], note: 'One copy uses each common link and is replicated only at branches.' },
  'qos-framework': { title: 'QoS treatment path', layout: 'flow', labels: ['Measure\nneeds', 'Classify', 'Admit', 'Schedule', 'Monitor SLA'], note: 'Delay, jitter, loss, and throughput requirements drive packet treatment.' },
  'voip-path': { title: 'Voice over IP path', layout: 'flow', labels: ['Speech', 'Codec', 'RTP packets', 'IP network', 'Jitter buffer'], note: 'The receiver buffers delay variation before decoding and playback.' },
  'rtp-packet': { title: 'RTP packet', layout: 'frame', labels: ['Sequence', 'Timestamp', 'Source ID', 'Media payload'], widths: [70, 80, 72, 98], note: 'Sequence numbers reveal loss; timestamps preserve media timing.' },

  'twos-complement': { title: "Two's-complement negation", layout: 'flow', labels: ['00000101\n(+5)', 'Invert bits', '11111010', 'Add 1', '11111011\n(-5)'], note: 'Invert every bit, then add one.' },
  'register-bus': { title: 'Registers sharing a bus', layout: 'graph', nodes: [['R0', 48, 38], ['R1', 48, 135], ['Bus', 180, 86], ['ALU', 305, 86]], edges: [[0, 2], [1, 2], [2, 3]], note: 'Control signals select which register drives and receives the shared path.' },
  'instruction-cycle': { title: 'Instruction cycle', layout: 'cycle', labels: ['Fetch', 'Decode', 'Execute', 'Check interrupt'], note: 'The program counter leads the processor into the next fetch.' },
  'stack-machine': { title: 'Zero-address stack operation', layout: 'compare', rows: [['Before', 'TOP 7', '4'], ['After ADD', 'TOP 11']], note: 'ADD pops 7 and 4, then pushes their result, 11.' },
  'instruction-format': { title: 'Instruction fields', layout: 'frame', labels: ['Opcode', 'Mode', 'Register', 'Address / immediate'], widths: [70, 55, 70, 125], note: 'The opcode selects work; remaining fields locate operands.' },
  'microprogram-control': { title: 'Microprogrammed control unit', layout: 'flow', labels: ['Control\naddress', 'Control\nmemory', 'Microinstruction', 'Datapath\nsignals', 'Next address'], note: 'Each microinstruction controls one step and chooses what follows.' },
  'binary-adder': { title: 'Carry through an adder', layout: 'flow', labels: ['Bit 0\nA+B', 'Carry C1', 'Bit 1\nA+B+C1', 'Carry C2', 'Next bit'], note: 'Ripple waits for each carry; lookahead calculates carries in parallel.' },
  'cache-mapping': { title: 'Direct-mapped cache', layout: 'compare', rows: [['Memory blocks', '0, 4, 8', '1, 5, 9'], ['Cache lines', 'Line 0', 'Line 1']], note: 'Several memory blocks compete for the same line: line = block mod line count.' },
  'paging-translation': { title: 'Virtual-to-physical translation', layout: 'flow', labels: ['Virtual\naddress', 'Page + offset', 'Page table', 'Frame + offset', 'Physical\naddress'], note: 'The offset stays unchanged while the page number becomes a frame number.' },
  'dma-transfer': { title: 'Direct memory access', layout: 'graph', directed: true, nodes: [['CPU', 48, 38], ['DMA', 180, 38], ['Device', 310, 38], ['Memory', 180, 138]], edges: [[0, 1, 'setup'], [1, 2], [1, 3, 'block']], note: 'The CPU configures the DMA controller, then DMA moves the block.' },
  'cpu-pipeline': { title: 'Five-stage instruction pipeline', layout: 'pipeline', labels: ['IF', 'ID', 'EX', 'MEM', 'WB'], note: 'Instructions overlap; each row advances one stage per cycle.' },
  'flynn-classification': { title: 'Flynn classification', layout: 'matrix', labels: [['SISD', 'one instruction\none data'], ['SIMD', 'one instruction\nmany data'], ['MISD', 'many instructions\none data'], ['MIMD', 'many instructions\nmany data']], note: 'Classify machines by instruction streams and data streams.' },

  'complexity-growth': { title: 'Growth as input n increases', layout: 'plot', variant: 'growth', note: 'Lower growth scales better; constants matter less for large n.' },
  'array-layout': { title: 'Contiguous array storage', layout: 'array', labels: ['12', '25', '41', '8', '19'], note: 'Equal-size elements sit side by side, enabling direct indexed access.' },
  'linked-list': { title: 'Singly linked list', layout: 'flow', labels: ['HEAD', '12 | next', '25 | next', '41 | NULL'], note: 'Each node stores data and the address of the next node.' },
  'stack-operations': { title: 'Stack: last in, first out', layout: 'stack', labels: ['TOP → 30', '20', '10'], note: 'Push and pop both act at the top.' },
  'queue-operations': { title: 'Queue: first in, first out', layout: 'flow', labels: ['FRONT', '10', '20', '30', 'REAR'], note: 'Dequeue removes 10; enqueue adds after 30.' },
  'recursion-tree': { title: 'Recursive calls reach a base case', layout: 'tree', nodes: [['f(3)', 180, 25], ['f(2)', 180, 82], ['f(1)', 180, 139], ['base case', 180, 190]], edges: [[0, 1], [1, 2], [2, 3]], note: 'Calls descend to the base case, then return in reverse order.' },
  'tree-vocabulary': { title: 'Tree relationships', layout: 'tree', nodes: [['A root', 180, 25], ['B', 95, 88], ['C', 265, 88], ['D leaf', 55, 155], ['E leaf', 135, 155], ['F leaf', 265, 155]], edges: [[0, 1], [0, 2], [1, 3], [1, 4], [2, 5]], note: 'A is root; B and C are children; D, E, and F are leaves.' },
  'bst-invariant': { title: 'Binary search tree', layout: 'tree', nodes: [['8', 180, 25], ['3', 95, 88], ['10', 265, 88], ['1', 55, 155], ['6', 135, 155]], edges: [[0, 1], [0, 2], [1, 3], [1, 4]], note: 'Smaller keys go left; larger keys go right at every node.' },
  'heap-layout': { title: 'Heap tree and array indices', layout: 'tree', nodes: [['50 [0]', 180, 25], ['30 [1]', 95, 88], ['40 [2]', 265, 88], ['10 [3]', 55, 155], ['20 [4]', 135, 155]], edges: [[0, 1], [0, 2], [1, 3], [1, 4]], note: 'For index i, children are 2i+1 and 2i+2.' },
  'hash-chaining': { title: 'Hash table with separate chaining', layout: 'buckets', labels: [['0', '20 → 40'], ['1', '11'], ['2', '32 → 52'], ['3', '—']], note: 'Colliding keys remain in a list attached to the same bucket.' },
  'graph-representation': { title: 'Graph and adjacency list', layout: 'graph', nodes: [['A', 62, 85], ['B', 180, 35], ['C', 295, 85], ['D', 180, 150]], edges: [[0, 1], [0, 3], [1, 2], [1, 3], [2, 3]], note: 'Adjacency lists store only the neighbors connected by edges.' },
  'merge-sort': { title: 'Merge sort divide and combine', layout: 'tree', nodes: [['8 3 6 2', 180, 25], ['8 3', 95, 85], ['6 2', 265, 85], ['3 8', 95, 150], ['2 6', 265, 150]], edges: [[0, 1], [0, 2], [1, 3], [2, 4]], note: 'Split recursively, then merge sorted halves into 2 3 6 8.' },
  'binary-search': { title: 'Binary search', layout: 'array', labels: ['3', '8', '12', '17', '25', '31', '46'], focus: 3, note: 'Compare with the middle value 17, then discard one sorted half.' },
  'dp-table': { title: 'Dynamic programming table', layout: 'grid', labels: [['0', '0', '0', '0'], ['0', '2', '2', '2'], ['0', '2', '3', '5'], ['0', '2', '4', '6']], note: 'Each cell stores a solved subproblem so later work can reuse it.' },
};

function splitLabel(label) {
  const explicit = String(label).split('\n');
  if (explicit.length > 1) return explicit;
  const words = String(label).split(' ');
  if (String(label).length < 13 || words.length === 1) return [String(label)];
  const middle = Math.ceil(words.length / 2);
  return [words.slice(0, middle).join(' '), words.slice(middle).join(' ')];
}

function SvgLabel({ label, x, y, className = 'diagram-label' }) {
  const lines = splitLabel(label);
  return (
    <text className={className} x={x} y={y - ((lines.length - 1) * 6)}>
      {lines.map((line, index) => <tspan key={line} x={x} dy={index ? 13 : 0}>{line}</tspan>)}
    </text>
  );
}

function Arrow({ from, to, label, markerId }) {
  const [x1, y1] = from;
  const [x2, y2] = to;
  const angle = Math.atan2(y2 - y1, x2 - x1);
  const gap = 25;
  const sx = x1 + Math.cos(angle) * gap;
  const sy = y1 + Math.sin(angle) * gap;
  const ex = x2 - Math.cos(angle) * gap;
  const ey = y2 - Math.sin(angle) * gap;
  return (
    <g>
      <line className="diagram-edge" markerEnd={markerId ? `url(#${markerId})` : undefined} x1={sx} x2={ex} y1={sy} y2={ey} />
      {label && <SvgLabel className="diagram-edge-label" label={label} x={(sx + ex) / 2} y={(sy + ey) / 2 - 5} />}
    </g>
  );
}

function FlowDiagram({ labels, markerId }) {
  const width = labels.length > 4 ? 56 : 68;
  const gap = (330 - (width * labels.length)) / Math.max(1, labels.length - 1);
  return labels.map((label, index) => {
    const x = 15 + index * (width + gap);
    return (
      <g key={label + index}>
        {index < labels.length - 1 && <line className="diagram-edge" markerEnd={`url(#${markerId})`} x1={x + width} x2={x + width + gap - 5} y1="86" y2="86" />}
        <rect className={`diagram-node ${index === 0 || index === labels.length - 1 ? 'is-accent' : ''}`} height="58" rx="7" width={width} x={x} y="57" />
        <SvgLabel label={label} x={x + width / 2} y={89} />
      </g>
    );
  });
}

function StackDiagram({ labels }) {
  const height = Math.min(24, 140 / labels.length);
  const startY = 15;
  return labels.map((label, index) => (
    <g key={label + index}>
      <rect className={`diagram-node ${index === 0 ? 'is-accent' : ''}`} height={height - 2} rx="4" width="250" x="55" y={startY + index * height} />
      <SvgLabel label={label} x="180" y={startY + index * height + height / 2 + 4} />
    </g>
  ));
}

function CycleDiagram({ labels, markerId }) {
  const points = labels.map((_, index) => {
    const angle = (-Math.PI / 2) + (index * Math.PI * 2) / labels.length;
    return [180 + Math.cos(angle) * 118, 91 + Math.sin(angle) * 62];
  });
  return (
    <>
      {points.map((point, index) => <Arrow from={point} key={`edge-${index}`} markerId={markerId} to={points[(index + 1) % points.length]} />)}
      {points.map(([x, y], index) => (
        <g key={labels[index]}>
          <rect className={`diagram-node ${index === 0 ? 'is-accent' : ''}`} height="38" rx="7" width="82" x={x - 41} y={y - 19} />
          <SvgLabel label={labels[index]} x={x} y={y + 4} />
        </g>
      ))}
    </>
  );
}

function CompareDiagram({ rows, markerId }) {
  return rows.map((row, rowIndex) => (
    <g key={row[0]}>
      {row.map((label, index) => {
        const x = 18 + index * 88;
        const y = 31 + rowIndex * 78;
        return (
          <g key={label}>
            {index < row.length - 1 && <line className="diagram-edge" markerEnd={`url(#${markerId})`} x1={x + 70} x2={x + 84} y1={y + 24} y2={y + 24} />}
            <rect className={`diagram-node ${index === 0 ? 'is-accent' : ''}`} height="48" rx="6" width="70" x={x} y={y} />
            <SvgLabel label={label} x={x + 35} y={y + 28} />
          </g>
        );
      })}
    </g>
  ));
}

function FrameDiagram({ labels, widths }) {
  let x = 18;
  return labels.map((label, index) => {
    const width = widths[index];
    const currentX = x;
    x += width;
    return (
      <g key={label}>
        <rect className={`diagram-node ${index % 2 === 0 ? 'is-accent' : ''}`} height="66" width={width} x={currentX} y="52" />
        <SvgLabel label={label} x={currentX + width / 2} y="89" />
      </g>
    );
  });
}

function GraphDiagram({ directed = false, edges, markerId, nodes }) {
  return (
    <>
      {edges.map(([from, to, label], index) => <Arrow from={nodes[from].slice(1)} key={`${from}-${to}-${index}`} label={label} markerId={directed ? markerId : null} to={nodes[to].slice(1)} />)}
      {nodes.map(([label, x, y], index) => (
        <g key={label + index}>
          <circle className={`diagram-circle ${index === 0 ? 'is-accent' : ''}`} cx={x} cy={y} r="25" />
          <SvgLabel label={label} x={x} y={y + 4} />
        </g>
      ))}
    </>
  );
}

function TreeDiagram(props) {
  return <GraphDiagram {...props} />;
}

function ArrayDiagram({ focus, labels }) {
  const width = Math.min(54, 320 / labels.length);
  const total = width * labels.length;
  const start = (360 - total) / 2;
  return labels.map((label, index) => (
    <g key={label + index}>
      <text className="diagram-index" x={start + index * width + width / 2} y="49">{index}</text>
      <rect className={`diagram-node ${index === focus ? 'is-focus' : index === 0 ? 'is-accent' : ''}`} height="54" width={width} x={start + index * width} y="58" />
      <SvgLabel label={label} x={start + index * width + width / 2} y="90" />
    </g>
  ));
}

function SpecialDiagram({ markerId, spec }) {
  if (spec.layout === 'wave') return <WaveDiagram />;
  if (spec.layout === 'lanes') return <LanesDiagram markerId={markerId} spec={spec} />;
  if (spec.layout === 'cells') return <CellsDiagram labels={spec.labels} />;
  if (spec.layout === 'bars') return <BarsDiagram labels={spec.labels} />;
  if (spec.layout === 'plot') return <PlotDiagram variant={spec.variant} />;
  if (spec.layout === 'pipeline') return <PipelineDiagram labels={spec.labels} />;
  if (spec.layout === 'matrix') return <MatrixDiagram labels={spec.labels} />;
  if (spec.layout === 'buckets') return <BucketsDiagram labels={spec.labels} markerId={markerId} />;
  if (spec.layout === 'grid') return <GridDiagram labels={spec.labels} />;
  if (spec.layout === 'sequence') return <SequenceDiagram actors={spec.actors} markerId={markerId} messages={spec.messages} />;
  if (spec.layout === 'linecode') return <LineCodeDiagram />;
  if (spec.layout === 'window') return <WindowDiagram focus={spec.focus} labels={spec.labels} />;
  if (spec.layout === 'lan') return <LanDiagram />;
  return null;
}

function LineCodeDiagram() {
  return (
    <>
      {['1', '0', '1', '1', '0'].map((bit, index) => <text className="diagram-index" key={`${bit}-${index}`} x={92 + index * 52} y="22">{bit}</text>)}
      <text className="diagram-side-label" x="12" y="64">NRZ-L</text>
      <path className="diagram-wave" d="M64 47 H116 V78 H168 V47 H272 V78 H324" />
      <text className="diagram-side-label" x="12" y="127">Manchester</text>
      <path className="diagram-wave" d="M64 108 H90 V140 H116 V108 H142 V140 H168 V108 H194 V140 H220 V108 H246 V140 H272 V108 H298 V140 H324" />
      {[116, 168, 220, 272].map((x) => <line className="diagram-bit-boundary" key={x} x1={x} x2={x} y1="30" y2="151" />)}
    </>
  );
}

function WindowDiagram({ focus, labels }) {
  const width = 42;
  const start = 33;
  return (
    <>
      <path className="diagram-window-bracket" d="M72 45 V30 H240 V45" />
      <text className="diagram-index" x="156" y="22">sender window</text>
      {labels.map((label, index) => <g key={label}><rect className={`diagram-node ${index === focus ? 'is-focus' : index < focus ? 'is-accent' : ''}`} height="48" width={width} x={start + index * width} y="58" /><SvgLabel label={label} x={start + index * width + width / 2} y="87" />{index === focus && <text className="diagram-index" x={start + index * width + width / 2} y="126">lost</text>}</g>)}
      <path className="diagram-window-bracket" d="M114 140 V155 H282 V140" />
      <text className="diagram-index" x="198" y="170">retransmit from 2</text>
    </>
  );
}

function LanDiagram() {
  return (
    <>
      <text className="diagram-matrix-title" x="82" y="22">BUS</text>
      <line className="diagram-edge is-heavy" x1="25" x2="139" y1="82" y2="82" />
      {[42, 82, 122].map((x, index) => <g key={x}><line className="diagram-edge" x1={x} x2={x} y1="82" y2={index % 2 ? 122 : 43} /><circle className="diagram-circle is-accent" cx={x} cy={index % 2 ? 132 : 33} r="11" /></g>)}
      <text className="diagram-matrix-title" x="266" y="22">TREE</text>
      <line className="diagram-edge" x1="266" x2="266" y1="39" y2="72" /><line className="diagram-edge" x1="210" x2="322" y1="72" y2="72" /><line className="diagram-edge" x1="210" x2="210" y1="72" y2="126" /><line className="diagram-edge" x1="322" x2="322" y1="72" y2="126" />
      <circle className="diagram-circle is-accent" cx="266" cy="34" r="11" /><circle className="diagram-circle" cx="210" cy="82" r="11" /><circle className="diagram-circle" cx="322" cy="82" r="11" /><circle className="diagram-circle is-accent" cx="210" cy="137" r="11" /><circle className="diagram-circle is-accent" cx="322" cy="137" r="11" />
    </>
  );
}

function SequenceDiagram({ actors, markerId, messages }) {
  const positions = [88, 272];
  return (
    <>
      {actors.map((actor, index) => <g key={actor}><rect className="diagram-node is-accent" height="34" rx="6" width="82" x={positions[index] - 41} y="13" /><SvgLabel label={actor} x={positions[index]} y="34" /><line className="diagram-lifeline" x1={positions[index]} x2={positions[index]} y1="47" y2="157" /></g>)}
      {messages.map(([label, direction], index) => {
        const y = 72 + index * 36;
        const from = direction === 'right' ? positions[0] : positions[1];
        const to = direction === 'right' ? positions[1] : positions[0];
        return <g key={label}><line className="diagram-edge" markerEnd={`url(#${markerId})`} x1={from} x2={to + (direction === 'right' ? -8 : 8)} y1={y} y2={y} /><SvgLabel className="diagram-edge-label" label={label} x="180" y={y - 7} /></g>;
      })}
    </>
  );
}

function WaveDiagram() {
  return (
    <>
      <text className="diagram-side-label" x="16" y="47">Analog</text>
      <path className="diagram-wave" d="M75 42 C95 10 115 10 135 42 S175 74 195 42 S235 10 255 42 S295 74 325 42" />
      <text className="diagram-side-label" x="16" y="118">Digital</text>
      <path className="diagram-wave" d="M75 132 V96 H130 V132 H185 V96 H270 V132 H325" />
    </>
  );
}

function LanesDiagram({ markerId, spec }) {
  return (
    <>
      {spec.labels.map((label, index) => {
        const y = 35 + index * 47;
        return <g key={label}><SvgLabel label={label} x="46" y={y + 4} /><line className="diagram-edge" markerEnd={`url(#${markerId})`} x1="83" x2="143" y1={y} y2="83" /></g>;
      })}
      <rect className="diagram-node is-accent" height="54" rx="7" width="62" x="145" y="56" />
      <SvgLabel label={spec.center} x="176" y="87" />
      <line className="diagram-edge is-heavy" markerEnd={`url(#${markerId})`} x1="207" x2="298" y1="83" y2="83" />
      <SvgLabel label={spec.output} x="316" y="87" />
    </>
  );
}

function CellsDiagram({ labels }) {
  const positions = [[180, 45], [125, 76], [235, 76], [70, 108], [180, 108], [290, 108], [125, 140]];
  return labels.map((label, index) => <g key={index}><circle className={`diagram-cell cell-${label}`} cx={positions[index][0]} cy={positions[index][1]} r="37" /><SvgLabel label={label} x={positions[index][0]} y={positions[index][1] + 4} /></g>);
}

function BarsDiagram({ labels }) {
  return (
    <>
      <line className="diagram-axis" x1="30" x2="332" y1="140" y2="140" />
      {labels.map((label, index) => {
        const x = 68 + index * 56;
        return <g key={label}><path className="diagram-subcarrier" d={`M${x - 34} 140 Q${x} 22 ${x + 34} 140`} /><text className="diagram-index" x={x} y="158">{label}</text></g>;
      })}
    </>
  );
}

function PlotDiagram({ variant }) {
  return (
    <>
      <line className="diagram-axis" x1="45" x2="330" y1="145" y2="145" />
      <line className="diagram-axis" x1="45" x2="45" y1="145" y2="20" />
      {variant === 'growth' ? <>
        <path className="diagram-plot plot-log" d="M48 135 C100 115 180 100 325 88" /><path className="diagram-plot plot-linear" d="M48 140 L325 55" /><path className="diagram-plot plot-square" d="M48 143 Q220 135 325 22" />
        <text className="diagram-plot-label" x="275" y="91">log n</text><text className="diagram-plot-label" x="284" y="62">n</text><text className="diagram-plot-label" x="292" y="25">n²</text>
      </> : <>
        <path className="diagram-plot plot-linear" d="M48 140 L105 115 L160 85 L163 123 L225 78 L228 113 L292 57 L295 96 L328 75" />
        <text className="diagram-plot-label" x="232" y="38">congestion event</text>
      </>}
      <text className="diagram-index" x="322" y="163">time / n</text>
    </>
  );
}

function PipelineDiagram({ labels }) {
  return [0, 1, 2].flatMap((instruction) => labels.map((label, stage) => {
    const x = 58 + (instruction + stage) * 45;
    const y = 30 + instruction * 43;
    return <g key={`${instruction}-${label}`}><rect className={`diagram-stage stage-${stage}`} height="31" rx="4" width="40" x={x} y={y} /><SvgLabel label={label} x={x + 20} y={y + 19} /></g>;
  }));
}

function MatrixDiagram({ labels }) {
  return labels.map(([title, detail], index) => {
    const x = 34 + (index % 2) * 164;
    const y = 22 + Math.floor(index / 2) * 73;
    return <g key={title}><rect className={`diagram-node ${index === 3 ? 'is-accent' : ''}`} height="60" rx="7" width="146" x={x} y={y} /><SvgLabel className="diagram-matrix-title" label={title} x={x + 73} y={y + 20} /><SvgLabel label={detail} x={x + 73} y={y + 43} /></g>;
  });
}

function BucketsDiagram({ labels, markerId }) {
  return labels.map(([bucket, chain], index) => {
    const y = 24 + index * 36;
    return <g key={bucket}><rect className="diagram-node is-accent" height="27" rx="4" width="38" x="55" y={y} /><SvgLabel label={bucket} x="74" y={y + 17} /><line className="diagram-edge" markerEnd={`url(#${markerId})`} x1="93" x2="127" y1={y + 13} y2={y + 13} /><rect className="diagram-node" height="27" rx="4" width="164" x="132" y={y} /><SvgLabel label={chain} x="214" y={y + 17} /></g>;
  });
}

function GridDiagram({ labels }) {
  return labels.flatMap((row, rowIndex) => row.map((label, columnIndex) => {
    const x = 94 + columnIndex * 47;
    const y = 17 + rowIndex * 37;
    return <g key={`${rowIndex}-${columnIndex}`}><rect className={`diagram-node ${rowIndex === labels.length - 1 && columnIndex === row.length - 1 ? 'is-focus' : ''}`} height="32" width="42" x={x} y={y} /><SvgLabel label={label} x={x + 21} y={y + 20} /></g>;
  }));
}

function DiagramArtwork({ markerId, spec }) {
  if (spec.layout === 'flow') return <FlowDiagram labels={spec.labels} markerId={markerId} />;
  if (spec.layout === 'stack') return <StackDiagram labels={spec.labels} />;
  if (spec.layout === 'cycle') return <CycleDiagram labels={spec.labels} markerId={markerId} />;
  if (spec.layout === 'compare') return <CompareDiagram markerId={markerId} rows={spec.rows} />;
  if (spec.layout === 'frame') return <FrameDiagram labels={spec.labels} widths={spec.widths} />;
  if (spec.layout === 'graph') return <GraphDiagram directed={spec.directed} edges={spec.edges} markerId={markerId} nodes={spec.nodes} />;
  if (spec.layout === 'tree') return <TreeDiagram edges={spec.edges} markerId={markerId} nodes={spec.nodes} />;
  if (spec.layout === 'array') return <ArrayDiagram focus={spec.focus} labels={spec.labels} />;
  return <SpecialDiagram markerId={markerId} spec={spec} />;
}

export function LessonDiagram({ type }) {
  const reactId = useId().replace(/:/g, '');
  if (type === 'network-topologies') return <NetworkTopologyDiagrams />;
  const spec = typeof type === 'object' ? type : DIAGRAMS[type];
  if (!spec) return null;
  const markerId = `diagram-arrow-${reactId}`;
  return (
    <figure className="lesson-diagram">
      <figcaption>{spec.title}</figcaption>
      <svg aria-label={`${spec.title}. ${spec.note}`} role="img" viewBox="0 0 360 180">
        <defs><marker id={markerId} markerHeight="7" markerWidth="7" orient="auto" refX="6" refY="3.5"><path d="M0,0 L7,3.5 L0,7 z" /></marker></defs>
        <DiagramArtwork markerId={markerId} spec={spec} />
      </svg>
      <div className="lesson-diagram-note">{spec.note}</div>
    </figure>
  );
}

function NetworkTopologyDiagrams() {
  return (
    <div className="topology-grid" aria-label="Bus, star, ring, and mesh topology diagrams">
      <TopologyCard caption="Star" note="Every device has its own link to the central switch.">
        <g className="topology-links"><line x1="90" y1="60" x2="32" y2="24" /><line x1="90" y1="60" x2="148" y2="24" /><line x1="90" y1="60" x2="32" y2="96" /><line x1="90" y1="60" x2="148" y2="96" /></g>
        <g className="topology-nodes"><circle cx="32" cy="24" r="11" /><circle cx="148" cy="24" r="11" /><circle cx="32" cy="96" r="11" /><circle cx="148" cy="96" r="11" /><rect className="topology-hub" height="28" rx="5" width="48" x="66" y="46" /><text x="90" y="64">Switch</text></g>
      </TopologyCard>
      <TopologyCard caption="Ring" note="Each device links to two neighbors, forming a loop.">
        <g className="topology-links"><line x1="90" y1="16" x2="153" y2="52" /><line x1="153" y1="52" x2="129" y2="101" /><line x1="129" y1="101" x2="51" y2="101" /><line x1="51" y1="101" x2="27" y2="52" /><line x1="27" y1="52" x2="90" y2="16" /></g>
        <g className="topology-nodes"><circle cx="90" cy="16" r="10" /><circle cx="153" cy="52" r="10" /><circle cx="129" cy="101" r="10" /><circle cx="51" cy="101" r="10" /><circle cx="27" cy="52" r="10" /></g>
      </TopologyCard>
      <TopologyCard caption="Bus" note="All devices tap into one shared backbone cable.">
        <g className="topology-links"><line className="topology-backbone" x1="18" y1="65" x2="162" y2="65" /><line x1="38" y1="28" x2="38" y2="65" /><line x1="73" y1="65" x2="73" y2="101" /><line x1="108" y1="28" x2="108" y2="65" /><line x1="143" y1="65" x2="143" y2="101" /></g>
        <g className="topology-nodes"><circle cx="38" cy="24" r="10" /><circle cx="73" cy="105" r="10" /><circle cx="108" cy="24" r="10" /><circle cx="143" cy="105" r="10" /><circle className="topology-terminator" cx="18" cy="65" r="5" /><circle className="topology-terminator" cx="162" cy="65" r="5" /></g>
      </TopologyCard>
      <TopologyCard caption="Mesh" note="Every device has a direct link to every other device." formula="links = n(n - 1) / 2">
        <g className="topology-links"><line x1="42" y1="25" x2="138" y2="25" /><line x1="42" y1="95" x2="138" y2="95" /><line x1="42" y1="25" x2="42" y2="95" /><line x1="138" y1="25" x2="138" y2="95" /><line x1="42" y1="25" x2="138" y2="95" /><line x1="138" y1="25" x2="42" y2="95" /></g>
        <g className="topology-nodes"><circle cx="42" cy="25" r="11" /><circle cx="138" cy="25" r="11" /><circle cx="42" cy="95" r="11" /><circle cx="138" cy="95" r="11" /></g>
      </TopologyCard>
    </div>
  );
}

function TopologyCard({ caption, children, formula, note }) {
  return <figure className="topology-card"><figcaption>{caption}</figcaption><svg aria-label={`${caption} topology`} role="img" viewBox="0 0 180 120">{children}</svg><p>{note}</p>{formula && <code>{formula}</code>}</figure>;
}
