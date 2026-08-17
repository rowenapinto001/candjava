export const chapterCoverage = {
  1: ['Enterprise networks', 'Communication model', 'Data communication', 'LAN and WAN', 'The Internet', 'Example configuration'],
  2: ['Protocol architecture', 'TCP/IP layers', 'Standardization', 'Internet applications', 'Multimedia', 'Sockets', 'TFTP'],
  3: ['Signal terminology', 'Analog and digital transmission', 'Attenuation, delay, and noise', 'Nyquist capacity', 'Shannon capacity', 'Decibels'],
  4: ['Twisted pair', 'Coaxial cable', 'Optical fiber', 'Radio and microwave', 'Wireless propagation', 'Line of sight'],
  5: ['Digital data to digital signal', 'Digital data to analog signal', 'Analog data to digital signal', 'Line coding', 'Modulation', 'PCM'],
  6: ['Error types', 'Parity', 'Internet checksum', 'CRC', 'Hamming distance', 'Forward error correction'],
  7: ['Flow control', 'Error control', 'Stop-and-wait ARQ', 'Sliding windows', 'HDLC', 'Link utilization'],
  8: ['FDM', 'Synchronous TDM', 'Cable modems', 'ADSL', 'xDSL', 'Multiple channel access'],
  9: ['Switched networks', 'Circuit switching', 'Softswitch', 'Packet switching', 'Datagrams and virtual circuits', 'ATM'],
  10: ['Cellular principles', 'Frequency reuse', 'Handoff', 'Mobile generations', 'LTE-Advanced', 'Capacity and interference'],
  11: ['Bus and tree LANs', 'LAN protocol architecture', 'Bridges', 'Hubs', 'Switches', 'Virtual LANs'],
  12: ['Traditional Ethernet', 'CSMA/CD', 'High-speed Ethernet', 'Switched Ethernet', 'IEEE 802.1Q VLANs', 'LAN encoding'],
  13: ['802.11 architecture', '802.11 services', 'Wireless MAC', 'Physical layer', 'Gigabit Wi-Fi', 'Wireless security'],
  14: ['Internetworking principles', 'IP operation', 'IPv4 header and subnetting', 'IPv6', 'VPNs', 'IPsec'],
  15: ['Transport service', 'Connection mechanisms', 'TCP reliability', 'TCP flow control', 'TCP congestion control', 'UDP'],
  16: ['Analog modulation', 'FEC codes', 'Block codes', 'Convolutional codes', 'ARQ performance', 'Code rate'],
  17: ['MIMO', 'OFDM', 'OFDMA', 'SC-FDMA', 'Spread spectrum', 'DSSS', 'CDMA'],
  18: ['Broadband wireless access', 'WiMAX', 'Bluetooth architecture', 'Bluetooth radio', 'Baseband', 'L2CAP'],
  19: ['Packet-network routing', 'ARPANET examples', 'Internet routing protocols', 'Least-cost algorithms', 'Distance vector', 'Link state'],
  20: ['Congestion effects', 'Congestion control', 'Traffic management', 'Packet-network control', 'TCP congestion control', 'DCCP'],
  21: ['IP multicasting', 'Multicast delivery trees', 'Software-defined networking', 'OpenFlow', 'Mobile IP'],
  22: ['QoS framework', 'Integrated Services', 'RSVP', 'Differentiated Services', 'Service-level agreements', 'IP performance metrics'],
  23: ['Role of MPLS', 'Forwarding equivalence classes', 'Label-switched paths', 'Label distribution', 'Traffic engineering', 'VPNs'],
  24: ['SMTP', 'MIME', 'DNS', 'HTTP requests and responses', 'Caching', 'Secure web access'],
  25: ['Real-time traffic', 'Voice over IP', 'SIP', 'RTP', 'RTCP', 'Delay, jitter, and loss'],
};

export const chapterComparisons = {
  1: {
    title: 'Data-flow modes',
    columns: ['Mode', 'Direction', 'Example'],
    rows: [['Simplex', 'One direction only', 'Keyboard to computer'], ['Half-duplex', 'Both directions, one at a time', 'Walkie-talkie'], ['Full-duplex', 'Both directions together', 'Phone call']],
  },
  2: {
    title: 'OSI and TCP/IP models',
    columns: ['OSI', 'TCP/IP', 'Main job'],
    rows: [['Application + Presentation + Session', 'Application', 'User services and representation'], ['Transport', 'Transport', 'Process-to-process delivery'], ['Network', 'Internet', 'Routing across networks'], ['Data Link + Physical', 'Link', 'Local frames and signals']],
  },
  4: {
    title: 'Transmission media',
    columns: ['Medium', 'Strength', 'Limitation'],
    rows: [['Twisted pair', 'Low cost and easy installation', 'Noise and distance'], ['Coaxial', 'Better shielding and bandwidth', 'Bulkier cable'], ['Optical fiber', 'Very high rate and long distance', 'Termination cost'], ['Wireless', 'Mobility and rapid deployment', 'Interference and security']],
  },
  7: {
    title: 'ARQ protocols',
    columns: ['Protocol', 'Outstanding frames', 'On one lost frame'],
    rows: [['Stop-and-wait', 'One', 'Resend that frame'], ['Go-Back-N', 'Several', 'Resend lost and later frames'], ['Selective Repeat', 'Several', 'Resend only missing frames']],
  },
  8: {
    title: 'FDM and TDM',
    columns: ['Method', 'Resource divided', 'Users transmit'],
    rows: [['FDM', 'Frequency bands', 'At the same time'], ['Synchronous TDM', 'Repeating time slots', 'During assigned slots'], ['Statistical TDM', 'Slots on demand', 'When data is ready']],
  },
  9: {
    title: 'WAN switching choices',
    columns: ['Method', 'Path', 'Best-known property'],
    rows: [['Circuit', 'Reserved before transfer', 'Predictable capacity'], ['Datagram packet', 'Chosen for each packet', 'Flexible shared links'], ['Virtual circuit', 'Logical path established first', 'Short connection identifier'], ['ATM', 'Virtual path using fixed cells', 'Predictable switching structure']],
  },
  11: {
    title: 'LAN connecting devices',
    columns: ['Device', 'Decision', 'Traffic effect'],
    rows: [['Hub', 'Repeats bits', 'One shared collision domain'], ['Bridge', 'Filters by MAC address', 'Separates LAN segments'], ['Switch', 'Forwards by learned MAC table', 'One collision domain per port'], ['Router', 'Forwards by IP prefix', 'Separates broadcast domains']],
  },
  13: {
    title: 'Ethernet and Wi-Fi access',
    columns: ['Property', 'Ethernet CSMA/CD', 'Wi-Fi CSMA/CA'],
    rows: [['Goal', 'Detect collision', 'Avoid collision'], ['While sending', 'Can monitor shared cable', 'Cannot reliably hear weak collision'], ['Success signal', 'No collision detected', 'Receiver acknowledgment']],
  },
  14: {
    title: 'IPv4 and IPv6',
    columns: ['Property', 'IPv4', 'IPv6'],
    rows: [['Address size', '32 bits', '128 bits'], ['Header', 'Variable base length', 'Fixed 40-byte base'], ['Broadcast', 'Supported', 'Replaced by multicast/anycast'], ['Fragmentation', 'Router or sender', 'Sender only']],
  },
  15: {
    title: 'TCP and UDP',
    columns: ['Property', 'TCP', 'UDP'],
    rows: [['Connection', 'Connection-oriented', 'Connectionless'], ['Delivery', 'Reliable ordered byte stream', 'Best-effort datagrams'], ['Controls', 'Flow and congestion control', 'Application decides'], ['Typical use', 'Web, mail, file transfer', 'DNS, live media, games']],
  },
  16: {
    title: 'FEC and ARQ',
    columns: ['Method', 'Recovery', 'Good fit'],
    rows: [['FEC', 'Receiver corrects using redundancy', 'Long delay, broadcast, real time'], ['ARQ', 'Receiver requests retransmission', 'Feedback path and tolerable delay'], ['Hybrid ARQ', 'Correction first, retransmit if needed', 'Variable wireless channels']],
  },
  17: {
    title: 'Multicarrier access methods',
    columns: ['Method', 'Who uses subcarriers', 'Main purpose'],
    rows: [['OFDM', 'One transmission uses many', 'Resist multipath'], ['OFDMA', 'Subsets assigned to users', 'Multiuser downlink/access'], ['SC-FDMA', 'Spread allocation per user', 'Lower transmitter peak power']],
  },
  18: {
    title: 'Wireless network roles',
    columns: ['Technology', 'Typical scope', 'Coordination'],
    rows: [['Wi-Fi', 'Local network', 'Access point and CSMA/CA'], ['WiMAX', 'Metropolitan broadband', 'Scheduled base station'], ['Bluetooth', 'Personal area', 'Central-led piconet']],
  },
  19: {
    title: 'Routing approaches',
    columns: ['Approach', 'Knowledge', 'Calculation'],
    rows: [['Distance vector', 'Neighbor distance reports', 'Bellman-Ford relation'], ['Link state', 'Flooded topology map', 'Dijkstra shortest path'], ['BGP path vector', 'AS path and policy attributes', 'Policy-based selection']],
  },
  20: {
    title: 'Flow and congestion control',
    columns: ['Control', 'Protects', 'Typical signal'],
    rows: [['Flow control', 'Receiver buffers', 'Advertised receive window'], ['Congestion control', 'Network path', 'Loss, ECN, delay'], ['Admission control', 'Reserved service quality', 'Accept or reject new flow']],
  },
  22: {
    title: 'QoS architectures',
    columns: ['Approach', 'State', 'Use'],
    rows: [['Integrated Services', 'Per-flow state', 'Explicit resource reservation'], ['RSVP', 'Reservation signaling', 'Requests and refreshes path state'], ['Differentiated Services', 'Per-class state', 'Scalable aggregate treatment']],
  },
  23: {
    title: 'IP and MPLS forwarding',
    columns: ['Property', 'IP', 'MPLS'],
    rows: [['Forwarding key', 'Destination prefix', 'Top label'], ['Path choice', 'Routing-table next hop', 'Label-switched path'], ['Traffic engineering', 'Usually metric-driven', 'Explicit engineered paths']],
  },
  24: {
    title: 'Application protocols',
    columns: ['Protocol', 'Job', 'Typical transport'],
    rows: [['SMTP', 'Transfers email', 'TCP'], ['DNS', 'Resolves names and records', 'UDP or TCP'], ['HTTP', 'Transfers web representations', 'TCP or QUIC transport'], ['IMAP', 'Accesses server mailbox', 'TCP']],
  },
  25: {
    title: 'Real-time protocol roles',
    columns: ['Protocol', 'Carries', 'Job'],
    rows: [['SIP', 'Session signaling', 'Establish and end calls'], ['RTP', 'Timestamped media', 'Sequence and playback timing'], ['RTCP', 'Control reports', 'Loss, jitter, and participant feedback']],
  },
};

export const workedProblems = {
  1: [{ title: 'Full-mesh link count', kind: 'Calculation', question: 'How many links connect 8 devices in a full mesh?', given: ['n = 8 devices', 'Each link joins one unique pair'], steps: ['Use L = n(n - 1) / 2.', 'L = 8 x 7 / 2.', 'L = 28.'], answer: 'A full mesh of 8 devices requires 28 links.' }],
  3: [
    { title: 'Transmission and propagation delay', kind: 'Calculation', question: 'A 1,500-byte packet crosses a 10 Mbit/s link over 200 km of fiber at 2 x 10^8 m/s. Ignore queueing and processing. Find total one-way delay.', given: ['L = 1,500 x 8 = 12,000 bits', 'R = 10,000,000 bit/s', 'd = 200,000 m'], steps: ['Transmission = L/R = 12,000/10,000,000 = 1.2 ms.', 'Propagation = d/v = 200,000/(2 x 10^8) = 1 ms.', 'Total = 1.2 + 1 = 2.2 ms.'], answer: 'The one-way delay is 2.2 ms.' },
    { title: 'Shannon capacity', kind: 'Calculation', question: 'Find the theoretical capacity of a 3 kHz channel with SNR = 30 dB.', given: ['B = 3,000 Hz', 'SNRlinear = 10^(30/10) = 1,000'], steps: ['Use C = B log2(1 + SNR).', 'C = 3,000 log2(1,001).', 'log2(1,001) is about 9.97.'], answer: 'Capacity is approximately 29.9 kbit/s.' },
  ],
  5: [{ title: 'QAM bit rate', kind: 'Calculation', question: 'What bit rate results from 64-QAM at 20 kbaud?', given: ['M = 64 constellation points', 'Symbol rate = 20,000 baud'], steps: ['Bits per symbol = log2(64) = 6.', 'Bit rate = 20,000 x 6.'], answer: 'The bit rate is 120 kbit/s.' }],
  6: [{ title: 'Detection and correction distance', kind: 'Calculation', question: 'A code has minimum Hamming distance 5. How many errors can it detect and correct?', given: ['dmin = 5', 'Detect s when dmin >= s + 1', 'Correct t when dmin >= 2t + 1'], steps: ['Maximum detected errors: s = dmin - 1 = 4.', 'For correction: 5 >= 2t + 1, so t <= 2.'], answer: 'It can detect up to 4 bit errors or correct up to 2 bit errors.' }],
  7: [{ title: 'Stop-and-wait utilization', kind: 'Calculation', question: 'A frame takes 1 ms to transmit and the one-way propagation delay is 9 ms. ACK time is negligible. Estimate stop-and-wait utilization.', given: ['Tframe = 1 ms', 'Tprop = 9 ms one way', 'Cycle = Tframe + 2Tprop'], steps: ['Cycle time = 1 + 18 = 19 ms.', 'Useful sending occupies 1 ms.', 'Utilization = 1/19 = 0.0526.'], answer: 'Utilization is about 5.3%, showing why a sliding window helps on long-delay links.' }],
  8: [{ title: 'Synchronous TDM output rate', kind: 'Calculation', question: 'Four 2 kbit/s sources each contribute one bit per frame. Ignore framing overhead. Find the output rate.', given: ['4 sources', 'Each source rate = 2 kbit/s'], steps: ['Each frame carries one bit from every source.', 'The link carries all four source rates.', 'Rate = 4 x 2 kbit/s.'], answer: 'The multiplexed output rate is 8 kbit/s.' }],
  10: [{ title: 'Frequency-reuse channels', kind: 'Calculation', question: 'A system has 420 channels and reuse cluster size N = 7. How many channels can one cell receive under equal allocation?', given: ['Total channels = 420', 'Cluster size N = 7'], steps: ['Each cluster divides the channel set among 7 cells.', 'Channels per cell = 420/7.'], answer: 'Each cell receives 60 channels.' }],
  14: [{ title: 'IPv4 subnet design', kind: 'Calculation', question: 'Choose the smallest prefix for at least 50 usable IPv4 host addresses.', given: ['Need 50 usable addresses', 'Usable hosts = 2^h - 2'], steps: ['Find h where 2^h - 2 >= 50.', 'h = 6 gives 64 total and 62 usable.', 'Prefix length = 32 - 6.'], answer: 'Use /26, which normally provides 62 usable host addresses.' }],
  16: [{ title: 'Code-rate overhead', kind: 'Calculation', question: 'A (7,4) block code sends 7 coded bits for 4 data bits. Find code rate and redundancy overhead relative to data.', given: ['n = 7 coded bits', 'k = 4 data bits'], steps: ['Code rate = k/n = 4/7 = 0.571.', 'Redundant bits = 7 - 4 = 3.', 'Overhead relative to data = 3/4 = 75%.'], answer: 'The code rate is about 0.571 and redundancy overhead is 75% of the original data size.' }],
  17: [{ title: 'DSSS chip rate', kind: 'Calculation', question: 'A DSSS system uses 16 chips per bit at 2 Mbit/s. Find chip rate.', given: ['16 chips/bit', '2,000,000 bit/s'], steps: ['Chip rate = chips per bit x bit rate.', '16 x 2,000,000 = 32,000,000 chips/s.'], answer: 'The chip rate is 32 Mchip/s.' }],
  20: [{ title: 'Congestion-window growth', kind: 'Trace', question: 'Starting at cwnd = 1 MSS, show ideal slow-start values after three successful RTTs.', given: ['Initial cwnd = 1 MSS', 'Every segment is acknowledged', 'No loss occurs'], steps: ['After RTT 1: cwnd = 2 MSS.', 'After RTT 2: cwnd = 4 MSS.', 'After RTT 3: cwnd = 8 MSS.'], answer: 'The idealized sequence is 1, 2, 4, 8 MSS.' }],
  22: [{ title: 'End-to-end delay budget', kind: 'Calculation', question: 'Add 2 ms processing, 5 ms queueing, 1.5 ms transmission, and 4 ms propagation delay.', given: ['Processing = 2 ms', 'Queueing = 5 ms', 'Transmission = 1.5 ms', 'Propagation = 4 ms'], steps: ['Total delay is the sum of all components.', '2 + 5 + 1.5 + 4 = 12.5 ms.'], answer: 'The total one-way delay is 12.5 ms.' }],
  25: [{ title: 'Voice packetization delay', kind: 'Calculation', question: 'A codec generates 64 kbit/s and places 160 bytes of audio in each packet. Find packetization delay.', given: ['Payload = 160 x 8 = 1,280 bits', 'Codec rate = 64,000 bit/s'], steps: ['Packetization delay = payload bits / codec rate.', '1,280/64,000 = 0.02 s.'], answer: 'The packetization delay is 20 ms.' }],
};

export const protocolJourney = [
  { layer: 'Application', unit: 'Data', title: 'The app creates a request', detail: 'A browser creates an HTTP request for /notes. DNS has already supplied the server IP address.', headers: ['HTTP', 'DATA'] },
  { layer: 'Transport', unit: 'TCP segment', title: 'TCP identifies processes', detail: 'TCP adds source and destination ports, sequence information, flags, and reliability fields.', headers: ['TCP', 'HTTP', 'DATA'] },
  { layer: 'Internet', unit: 'IP packet', title: 'IP identifies the end hosts', detail: 'IP adds source and destination addresses plus fields such as hop limit or TTL.', headers: ['IP', 'TCP', 'HTTP', 'DATA'] },
  { layer: 'Link', unit: 'Ethernet frame', title: 'The first local link wraps the packet', detail: 'Ethernet adds next-hop MAC addresses and an FCS trailer for the local hop.', headers: ['ETH', 'IP', 'TCP', 'DATA', 'FCS'] },
  { layer: 'Physical', unit: 'Bits/signals', title: 'The interface transmits signals', detail: 'The frame becomes electrical, optical, or radio symbols on the medium.', headers: ['1', '0', '1', '1', '0', '…'] },
  { layer: 'Router', unit: 'Forwarded packet', title: 'A router changes the local envelope', detail: 'The router removes the incoming frame, checks the IP destination, reduces TTL, and creates a new outgoing frame.', headers: ['NEW LINK', 'IP', 'TCP', 'DATA', 'FCS'] },
  { layer: 'Destination', unit: 'Decapsulation', title: 'Headers are removed in reverse', detail: 'Link, IP, and TCP processing deliver the original HTTP data to the correct server process.', headers: ['DATA', '← HTTP', '← TCP', '← IP'] },
];

export const dataCommunicationGlossary = [
  ['ACK', 'Acknowledgment confirming successful receipt.'], ['ADSL', 'DSL access that normally provides more downstream than upstream capacity.'], ['ARQ', 'Automatic Repeat reQuest; error recovery using feedback and retransmission.'], ['ATM', 'Asynchronous Transfer Mode; virtual-circuit switching using fixed-size cells.'],
  ['Bandwidth', 'The carrying capacity or frequency span of a channel, depending on context.'], ['Baud', 'Symbols transmitted per second.'], ['BGP', 'Border Gateway Protocol for policy-based routing between autonomous systems.'], ['Bit rate', 'Number of data bits transmitted per second.'],
  ['Bridge', 'A data-link device that filters and forwards frames between LAN segments.'], ['CDMA', 'Multiple access that separates users through spreading codes.'], ['CRC', 'Cyclic Redundancy Check using polynomial division to detect errors.'], ['CSMA/CA', 'Carrier-sense access that attempts to avoid wireless collisions.'], ['CSMA/CD', 'Carrier-sense access that detects collisions on shared classic Ethernet.'],
  ['Datagram', 'A self-contained packet routed independently.'], ['DiffServ', 'Scalable QoS that assigns packets to behavior classes.'], ['DNS', 'Distributed naming service that stores resource records.'], ['ECN', 'Explicit Congestion Notification; marks congestion without necessarily dropping a packet.'], ['FEC', 'Forward Error Correction; redundancy that permits receiver-side correction.'],
  ['FDM', 'Frequency-Division Multiplexing.'], ['Frame', 'Data-link protocol data unit.'], ['HDLC', 'High-Level Data Link Control, a bit-oriented link protocol.'], ['HTTP', 'Application protocol for request-response transfer of web representations.'], ['IP', 'Internet Protocol providing best-effort packet delivery across networks.'], ['IPsec', 'Security mechanisms that protect IP traffic.'],
  ['Jitter', 'Variation in packet delay.'], ['L2CAP', 'Bluetooth adaptation layer for multiplexing and segmentation/reassembly.'], ['LAN', 'Local Area Network.'], ['MIMO', 'Multiple antennas used for diversity, beamforming, or spatial streams.'], ['MPLS', 'Label-based forwarding through provider networks.'], ['MTU', 'Maximum Transmission Unit accepted by a link.'], ['NAT', 'Address translation between network realms, often with port translation.'],
  ['OFDM', 'Multicarrier modulation using orthogonal subcarriers.'], ['OFDMA', 'Multiuser access by assigning OFDM time-frequency resources.'], ['OSI', 'Seven-layer reference model for network functions.'], ['Packet', 'Network-layer protocol data unit.'], ['PCM', 'Pulse Code Modulation: sampling, quantization, and binary encoding.'], ['Protocol', 'Rules governing message syntax, semantics, and timing.'],
  ['QoS', 'Quality of Service treatment for rate, delay, jitter, and loss needs.'], ['RSVP', 'Resource Reservation Protocol used with Integrated Services.'], ['RTP', 'Real-time Transport Protocol carrying sequenced, timestamped media.'], ['RTCP', 'RTP companion protocol carrying control and quality reports.'], ['SDN', 'Software-Defined Networking separating programmable control from forwarding.'], ['SIP', 'Session Initiation Protocol for multimedia session signaling.'],
  ['SMTP', 'Protocol used to submit and relay electronic mail.'], ['Subnet mask', 'Bit mask dividing an IPv4 address into prefix and host portions.'], ['Switch', 'A LAN device that forwards frames using learned MAC addresses.'], ['TCP', 'Reliable, ordered, connection-oriented byte-stream transport.'], ['TDM', 'Time-Division Multiplexing.'], ['Throughput', 'Actual successfully delivered rate.'], ['TTL', 'IPv4 hop-limit field reduced by each router.'], ['UDP', 'Connectionless best-effort datagram transport.'], ['VLAN', 'Logical Layer-2 broadcast domain, commonly identified by IEEE 802.1Q.'], ['WAN', 'Wide Area Network.'], ['WiMAX', 'IEEE 802.16 broadband wireless access family.'],
];

export function getQuestionKind(question) {
  const text = question.toLowerCase();
  if (/how many|find |calculate|minimum|rate|distance/.test(text)) return 'Calculation';
  if (/what happens|respond|when |scenario|lost|arrives/.test(text)) return 'Scenario';
  if (/why |problem|advantage|harmful|protect/.test(text)) return 'Reasoning';
  if (/trace|path|sequence|operation/.test(text)) return 'Diagram';
  return 'Concept';
}

export function getQuestionHint(chapter, index) {
  const topic = chapter.topics[index];
  if (!topic) return 'Return to the topic table and identify the rule that controls this situation.';
  const [title, point] = topic;
  const firstSentence = point.split(/(?<=[.!?])\s/)[0];
  return `Focus on ${title.toLowerCase()}. Start from this clue: ${firstSentence}`;
}
