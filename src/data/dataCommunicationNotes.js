import { createChapter, createRevisionChapter, lesson } from './studyTrackHelpers.js';

const chapters = [
  createChapter({
    number: 1,
    title: 'Data Communications, Data Networks, and the Internet',
    hook: 'Every network conversation needs a sender, a path, shared rules, and a receiver that can interpret what arrives.',
    lessons: [
      lesson('Five communication components', 'A data communication system contains a sender, receiver, message, transmission medium, and protocol.', `Sender -> medium -> Receiver
          message
Rules used at both ends: protocol`, 'Name the five components needed for data communication.', `Sender, receiver, message, transmission medium, and protocol.`),
      lesson('Data-flow modes', 'Simplex travels one way, half-duplex takes turns, and full-duplex carries traffic both ways at the same time.', `Keyboard: simplex
Walkie-talkie: half-duplex
Phone call: full-duplex`, 'Classify a walkie-talkie and a phone call by data-flow mode.', `A walkie-talkie is half-duplex because users take turns. A phone call is full-duplex because both sides can speak and listen simultaneously.`),
      lesson('Network criteria', 'A useful network is judged by performance, reliability, and security rather than speed alone.', `Performance: delay and throughput
Reliability: failures and recovery
Security: confidentiality, integrity, availability`, 'What three criteria are commonly used to evaluate a network?', `Performance, reliability, and security.`),
      lesson('Physical topologies', 'Bus, star, ring, and mesh describe physical connection patterns; each changes cost and failure behavior.', `Star: every node -> central switch
Mesh links for n nodes = n(n - 1) / 2`, 'How many links are required for a full mesh of six devices?', `Use n(n - 1) / 2. For n = 6: 6 x 5 / 2 = 15 links.`, 'network-topologies'),
      lesson('Protocols and standards', 'A protocol defines syntax, semantics, and timing; standards let independently built systems interoperate.', `Syntax: message format
Semantics: field meaning
Timing: when and how fast`, 'Distinguish protocol syntax, semantics, and timing.', `Syntax defines the structure of data, semantics defines what each field means, and timing defines when data is sent and at what rate.`),
    ],
    trap: 'Do not confuse a topology with a protocol: one describes connections, while the other describes communication rules.',
    practice: 'Sketch a small college network and label its components, topology, flow mode, and most important reliability risk.',
  }),
  createChapter({
    number: 2,
    title: 'Protocol Architecture, TCP/IP, and Internet-Based Applications',
    hook: 'Layering turns one intimidating communication job into smaller contracts that can evolve independently.',
    lessons: [
      lesson('Why layers exist', 'Each layer offers a service upward and uses the service below, reducing complexity and isolating change.', `Application data
  -> Transport segment
  -> Network packet
  -> Link frame
  -> Physical bits`, 'Give two reasons network architectures use layers.', `Layers reduce complexity through separation of responsibilities and allow one layer to change without redesigning every other layer, provided its interface remains stable.`),
      lesson('Seven OSI layers', 'From bottom to top, OSI contains Physical, Data Link, Network, Transport, Session, Presentation, and Application.', `7 Application
6 Presentation
5 Session
4 Transport
3 Network
2 Data Link
1 Physical`, 'List all seven OSI layers from lowest to highest.', `Physical, Data Link, Network, Transport, Session, Presentation, Application.`),
      lesson('TCP/IP suite', 'The practical TCP/IP model groups communication into Link, Internet, Transport, and Application layers.', `Application: HTTP, DNS
Transport: TCP, UDP
Internet: IP
Link: Ethernet, Wi-Fi`, 'Place HTTP, TCP, IP, and Ethernet in TCP/IP layers.', `HTTP is Application, TCP is Transport, IP is Internet, and Ethernet is Link.`),
      lesson('Encapsulation', 'Every sending layer adds control information; receiving layers remove it in reverse order.', `Data -> [TCP|Data]
     -> [IP|TCP|Data]
     -> [Ethernet|IP|TCP|Data|FCS]`, 'What happens during encapsulation?', `Each layer wraps the payload with its own header, and sometimes a trailer. The receiver decapsulates by removing them in reverse order.`),
      lesson('Addressing at layers', 'MAC addresses deliver frames locally, IP addresses route between networks, and ports select applications.', `MAC -> local interface
IP  -> host across networks
Port -> process/service`, 'Which addresses identify the local interface, remote host, and application?', `A MAC address identifies a local interface, an IP address identifies a host across networks, and a port number identifies an application or process.`),
    ],
    trap: 'Do not say a switch normally routes by IP or a router normally forwards by port number; each device makes decisions at its relevant layer.',
    practice: 'Trace one browser request from application data to transmitted bits and label every protocol data unit.',
  }),
  createChapter({
    number: 3,
    title: 'Data Transmission',
    hook: 'Information becomes a changing physical signal, and the shape of that signal determines what a channel can carry.',
    lessons: [
      lesson('Analog and digital signals', 'Analog signals vary continuously; digital signals use discrete levels over time.', `Analog: continuously varying voltage
Digital: 0V -> bit 0, 5V -> bit 1`, 'State the main difference between analog and digital signals.', `An analog signal can take continuously varying values, while a digital signal uses a finite set of discrete levels.`),
      lesson('Period and frequency', 'Frequency counts cycles per second and period is the duration of one cycle: T = 1/f.', `f = 2 kHz
T = 1 / 2000 s = 0.0005 s = 0.5 ms`, 'Calculate the period of a 2 kHz signal.', `T = 1/f = 1/2000 second = 0.0005 second = 0.5 ms.`),
      lesson('Spectrum and bandwidth', 'A composite signal occupies a frequency range; bandwidth is highest frequency minus lowest frequency.', `Lowest = 20 kHz
Highest = 28 kHz
Bandwidth = 8 kHz`, 'A signal occupies 20 kHz through 28 kHz. Find its bandwidth.', `Bandwidth = 28 kHz - 20 kHz = 8 kHz.`),
      lesson('Bit rate and baud rate', 'Bit rate counts bits per second; baud rate counts signal units per second. One symbol may carry multiple bits.', `8 signal levels -> log2(8) = 3 bits/symbol
2400 baud x 3 = 7200 bit/s`, 'Find the bit rate of a 2400-baud signal with eight signal levels.', `Eight levels carry log2(8) = 3 bits per symbol. Bit rate = 2400 x 3 = 7200 bit/s.`),
      lesson('Transmission impairment', 'Attenuation weakens a signal, distortion changes its shape, and noise adds unwanted energy.', `Sent amplitude: 10 mW
Received: 1 mW
Loss = 10 log10(10/1) = 10 dB`, 'Name the three main transmission impairments.', `Attenuation, distortion, and noise.`),
    ],
    trap: 'Bandwidth in hertz measures frequency range; bit rate in bit/s measures delivered data. They are related but not interchangeable.',
    practice: 'Calculate period, bandwidth, and bit rate for three imaginary channels, then identify one likely impairment for each.',
  }),
  createChapter({
    number: 4,
    title: 'Transmission Media',
    hook: 'The medium is the road beneath the protocol: copper, glass, and air each bend performance in different ways.',
    lessons: [
      lesson('Twisted-pair cable', 'Twisting two insulated copper wires reduces electromagnetic interference; UTP is common in Ethernet LANs.', `Cat 6 UTP
Typical Ethernet segment: up to 100 m
Connector: 8P8C (commonly called RJ45)`, 'Why are the conductors in twisted-pair cable twisted?', `The twists make external interference affect both conductors similarly, helping the receiver cancel noise and reducing crosstalk.`),
      lesson('Coaxial cable', 'A central conductor, dielectric, shield, and jacket give coax better shielding than ordinary twisted pair.', `center conductor
dielectric
metal shield
outer jacket`, 'What part of coaxial cable protects it from external interference?', `The surrounding metallic shield blocks much of the external electromagnetic interference.`),
      lesson('Optical fiber', 'Fiber carries light through a core using total internal reflection; it offers high bandwidth and immunity to electromagnetic noise.', `Single-mode: long distance, small core
Multimode: shorter distance, multiple paths`, 'Why is optical fiber suitable for high-speed long-distance links?', `It has low attenuation, very high bandwidth, and immunity to electromagnetic interference.`),
      lesson('Radio and microwave', 'Radio is often omnidirectional; terrestrial microwave is directional and usually requires line of sight.', `Radio broadcast -> broad coverage
Microwave dish -> aligned point-to-point path`, 'Why must two terrestrial microwave antennas usually have line of sight?', `Microwave energy travels mainly in a straight, directional path, so obstacles and Earth curvature can block the link.`),
      lesson('Media selection', 'Distance, bandwidth, interference, installation cost, security, and mobility determine the best medium.', `Factory floor with electrical noise -> fiber
Mobile users -> wireless
Short office LAN -> UTP`, 'Choose a medium for a factory backbone with heavy electrical interference and explain why.', `Optical fiber is the best choice because electromagnetic interference does not affect light traveling through glass.`),
    ],
    trap: 'Wireless does not mean unlimited mobility or speed; obstacles, shared spectrum, interference, and regulation still constrain it.',
    practice: 'Build a comparison table for UTP, coax, fiber, radio, and microwave using bandwidth, distance, cost, and interference.',
  }),
  createChapter({
    number: 5,
    title: 'Signal Encoding Techniques',
    hook: 'Encoding decides how bits become signal changes; a good design stays synchronized and survives the channel.',
    lessons: [
      lesson('Line coding', 'Line coding maps bits to digital signal levels. NRZ is simple, while Manchester adds a transition for synchronization.', `Bits:       1 0 1
NRZ-L:      H L H
Manchester: each bit has a middle transition`, 'Why does Manchester encoding synchronize more easily than NRZ-L?', `Manchester guarantees a transition in the middle of every bit, giving the receiver a regular timing reference.`),
      lesson('Block coding and scrambling', 'Block coding adds controlled redundancy; scrambling replaces troublesome runs without increasing the bit count.', `4B/5B: every 4 data bits -> 5 coded bits
B8ZS/HDB3: replace long zero runs`, 'What different problems do block coding and scrambling solve?', `Block coding adds redundant patterns that support synchronization or error checks. Scrambling substitutes problematic signal sequences, such as long zero runs, without adding a new bit to every group.`),
      lesson('Pulse code modulation', 'PCM samples an analog signal, quantizes each sample, and encodes the level as bits.', `Samples/s = 8000
Bits/sample = 8
PCM rate = 8000 x 8 = 64,000 bit/s`, 'Find the PCM bit rate for 8000 samples per second and 8 bits per sample.', `Bit rate = sampling rate x bits per sample = 8000 x 8 = 64,000 bit/s.`),
      lesson('Digital modulation', 'ASK changes amplitude, FSK changes frequency, PSK changes phase, and QAM combines amplitude and phase.', `ASK -> amplitude
FSK -> frequency
PSK -> phase
QAM -> amplitude + phase`, 'Which carrier properties are changed by ASK, FSK, PSK, and QAM?', `ASK changes amplitude, FSK changes frequency, PSK changes phase, and QAM changes both amplitude and phase.`),
      lesson('Constellation size', 'An M-ary modulation symbol carries log2(M) bits when M is a power of two.', `16-QAM
bits/symbol = log2(16) = 4
10,000 symbols/s -> 40,000 bit/s`, 'Calculate the bit rate of 16-QAM sent at 10 kbaud.', `16-QAM carries 4 bits per symbol. At 10,000 symbols/s, bit rate = 40,000 bit/s.`),
    ],
    trap: 'More signal levels increase bits per symbol but reduce noise margin, so higher-order modulation needs a cleaner channel.',
    practice: 'Encode a short bit pattern with two line codes and calculate PCM and QAM rates for a small set of values.',
  }),
  createChapter({
    number: 8,
    title: 'Multiplexing',
    hook: 'Multiplexing lets independent conversations share an expensive link without becoming one confused stream.',
    lessons: [
      lesson('Frequency-division multiplexing', 'FDM gives simultaneous analog channels separate frequency bands with guard bands between them.', `Channel A: 0-4 kHz
Guard: 1 kHz
Channel B: 5-9 kHz`, 'Why are guard bands used in FDM?', `Guard bands separate adjacent frequency channels and reduce overlap caused by imperfect filters.`),
      lesson('Synchronous TDM', 'Synchronous TDM reserves a repeating time slot for every input, even when an input has nothing to send.', `Frame: [A][B][C][D]
Next:  [A][B][C][D]`, 'What inefficiency can occur in synchronous TDM?', `A reserved slot is wasted whenever its assigned source has no data to transmit.`),
      lesson('Cable modems', 'Cable Internet shares coaxial access capacity, normally using separate downstream and upstream frequency regions.', `provider headend -> shared coax segment -> cable modems
downstream and upstream use different channels`, 'Why can neighboring cable subscribers affect one another throughput?', `They may share access-segment channel capacity, so simultaneous demand creates contention for the same upstream or downstream resources.`),
      lesson('ADSL and xDSL', 'DSL carries digital data over telephone copper; ADSL allocates more capacity downstream than upstream.', `voice | upstream data | downstream data
separated frequency bands on one pair`, 'Why is ADSL called asymmetric?', `Its downstream and upstream data rates or bandwidth allocations are unequal, normally favoring downstream traffic.`),
      lesson('Multiple channel access', 'FDMA, TDMA, CDMA, and contention methods let multiple stations share a common communication resource.', `FDMA -> frequency slices
TDMA -> time slots
CDMA -> spreading codes`, 'Match FDMA, TDMA, and CDMA to their separating resources.', `FDMA separates users by frequency, TDMA by time slots, and CDMA by spreading codes.`),
    ],
    trap: 'TDM divides transmission time; FDM divides frequency. Do not describe a time slot as a frequency band.',
    practice: 'Draw FDM and synchronous TDM allocation, then compare cable, ADSL, FDMA, TDMA, and CDMA sharing.',
  }),
  createChapter({
    number: 6,
    title: 'Error Detection and Correction',
    hook: 'Errors are inevitable; redundancy makes them visible and, in carefully designed codes, repairable.',
    lessons: [
      lesson('Error patterns', 'A single-bit error changes one bit, while a burst error affects a span from the first corrupted bit to the last.', `Sent:     10110010
Received: 10100010  -> single-bit error`, 'What distinguishes a burst error from a single-bit error?', `A single-bit error changes exactly one bit. A burst error corrupts two or more bits within a span, although every bit in that span need not change.`),
      lesson('Hamming distance', 'The Hamming distance is the number of bit positions in which two codewords differ.', `101101
100001
differences at positions 3 and 4 -> distance 2`, 'Find the Hamming distance between 101101 and 100001.', `They differ in two positions, so the Hamming distance is 2.`),
      lesson('Parity and checksum', "Parity cheaply detects many bit errors; a checksum adds fixed-size words using one's-complement arithmetic.", `Data: 1011001 has four 1s
Even parity bit = 0`, 'Find the even-parity bit for 1011001.', `The data already contains four 1s, an even count, so the even-parity bit is 0.`),
      lesson('Cyclic redundancy check', 'CRC treats bits as a polynomial, divides by a generator using XOR, and appends the remainder.', `Data: 1101
Generator: 1011 (degree 3)
Append three zeros before modulo-2 division`, 'Why are zeros appended before CRC division?', `The number of appended zeros equals the generator degree and reserves space for the remainder that will be attached to the original data.`),
      lesson('Correction capability', 'A code needs minimum distance dmin >= s + 1 to detect s errors and dmin >= 2t + 1 to correct t errors.', `To correct 1 error:
dmin >= 2(1) + 1 = 3`, 'What minimum Hamming distance is needed to correct one bit error?', `A minimum distance of 3 is required because dmin >= 2t + 1 = 3 for t = 1.`),
    ],
    trap: 'Detection proves that a received block is invalid; it does not automatically reveal which bit should be changed.',
    practice: 'Calculate parity and Hamming distance by hand, then perform one complete CRC division on a short message.',
  }),
  createChapter({
    number: 7,
    title: 'Data Link Control Protocols',
    hook: 'The data-link layer turns a raw link into an orderly frame service with boundaries, pacing, and recovery.',
    lessons: [
      lesson('Framing', 'Frames establish boundaries around link-layer data using length fields, flags with stuffing, or physical coding rules.', `Flag: 01111110
After five consecutive 1s in data, insert 0
Receiver removes the stuffed 0`, 'Why is bit stuffing used in flag-based framing?', `It prevents the flag pattern from appearing accidentally inside frame data, preserving unambiguous frame boundaries.`),
      lesson('Flow control', 'Flow control prevents a fast sender from overwhelming a receiver with limited processing speed or buffer space.', `Sender rate > receiver drain rate
=> buffer grows
=> pause or reduce sending window`, 'What problem does flow control solve?', `It limits outstanding data so receiver buffers and processing capacity are not overwhelmed.`),
      lesson('Stop-and-wait ARQ', 'The sender transmits one frame and waits for an acknowledgment; sequence numbers distinguish a retransmission from new data.', `Send frame 0 -> wait ACK 1
Timeout -> resend frame 0`, 'Why does stop-and-wait ARQ use sequence numbers?', `If an acknowledgment is lost, the sender retransmits. A sequence number lets the receiver detect and discard the duplicate frame.`),
      lesson('Go-Back-N ARQ', 'Several frames may be outstanding, but an error causes retransmission of the missing frame and every later unacknowledged frame.', `Window: 0 1 2 3
Frame 2 lost
Resend 2 and 3`, 'What is retransmitted when frame 2 is lost in Go-Back-N and frames 2 and 3 are unacknowledged?', `The sender retransmits frame 2 and all later unacknowledged frames, including frame 3.`),
      lesson('Selective Repeat ARQ', 'The receiver buffers valid out-of-order frames, and the sender retransmits only missing or damaged frames.', `Received: 0, 1, 3
Buffer 3
Request/retransmit only 2`, 'How does Selective Repeat respond when frame 2 is lost but frame 3 arrives correctly?', `It buffers frame 3 and retransmits only frame 2, then delivers the reordered sequence.`),
    ],
    trap: 'An acknowledgment number may identify the next expected frame rather than the last frame received; always follow the protocol convention.',
    practice: 'Trace stop-and-wait, Go-Back-N, and Selective Repeat for the same lost-frame scenario.',
  }),
  createChapter({
    number: 11,
    title: 'Local Area Network Overview',
    hook: 'A LAN joins nearby devices; its topology and forwarding devices decide how far each frame and broadcast travels.',
    lessons: [
      lesson('Bus and tree topologies', 'A bus shares one backbone; a tree extends that shared medium through branching points so more stations can attach.', `Bus: A -- B -- C -- D
Tree: backbone -> branches -> stations`, 'What structural difference separates a bus LAN from a tree LAN?', `A bus uses one shared linear medium, while a tree adds branching segments rooted in a shared backbone.`),
      lesson('LAN protocol architecture', 'IEEE 802 divides the data-link work into Logical Link Control above a technology-specific MAC sublayer.', `Network layer
Logical Link Control (LLC)
Media Access Control (MAC)
Physical layer`, 'Which LAN sublayer controls access to the transmission medium?', `The Media Access Control, or MAC, sublayer.`),
      lesson('Bridges', 'A bridge learns source MAC locations and filters or forwards frames between LAN segments.', `learn source A on segment 1
destination B on segment 2
-> forward across bridge`, 'How does a bridge learn where a station is located?', `It records the source MAC address and incoming segment of received frames.`),
      lesson('Hubs and switches', 'A hub repeats every bit to all ports; a switch learns addresses and forwards a known unicast only to its destination port.', `Hub: one shared collision domain
Switch: one collision domain per port`, 'Why does a switch normally provide better capacity than a hub?', `A switch permits independent simultaneous port conversations instead of forcing all devices to share one repeated signal.`),
      lesson('Virtual LANs', 'A VLAN creates a logical broadcast domain across selected switch ports, independent of their physical location.', `ports 1, 3 -> VLAN 10
ports 2, 4 -> VLAN 20
between VLANs -> router`, 'What is needed for devices in different VLANs to communicate?', `A router or multilayer switch must route packets between the VLANs.`),
    ],
    trap: 'A switch separates collision domains, but all ports in the same VLAN normally remain in one broadcast domain.',
    practice: 'Draw bus and tree LANs, then trace the same frame through a hub, bridge, switch, and inter-VLAN router.',
  }),
  createChapter({
    number: 9,
    title: 'WAN Technology and Protocols',
    hook: 'Switching chooses a path through a network; the kind of path changes delay, efficiency, and failure behavior.',
    lessons: [
      lesson('Circuit switching', 'A dedicated end-to-end path is established before data transfer and remains reserved until release.', `setup -> data transfer -> teardown
Reserved capacity during the session`, 'Give one advantage and one disadvantage of circuit switching.', `Advantage: predictable reserved capacity after setup. Disadvantage: capacity can sit unused and setup adds delay.`),
      lesson('Packet switching', 'Packet switching shares links statistically, allowing packets from many sources to interleave.', `Link order: A1, B1, B2, A2
No permanently reserved channel`, 'Why does packet switching usually use link capacity more efficiently than circuit switching?', `Capacity is consumed only while packets are present, so idle users do not retain reserved bandwidth.`),
      lesson('Datagram and virtual circuit', 'Datagrams are routed independently; virtual-circuit packets follow a previously selected logical path.', `Datagram packets may take different routes
VC packets carry a short circuit identifier`, 'What path difference separates datagram service from virtual-circuit service?', `Each datagram may be routed independently, while all packets of a virtual circuit follow its established logical path.`),
      lesson('Softswitch architecture', 'A softswitch separates call-control software from media gateways that carry voice or other bearer traffic.', `signaling -> media gateway controller
media stream -> media gateway`, 'What separation is central to softswitch architecture?', `Call-control intelligence is separated from the gateways that switch or translate the media stream.`),
      lesson('Asynchronous Transfer Mode', 'ATM is a connection-oriented packet technology using short fixed 53-byte cells and virtual path/channel identifiers.', `5-byte header | 48-byte payload
VPI/VCI selects virtual connection`, 'Why do fixed-size ATM cells simplify switching?', `A constant cell size makes buffering and hardware switching timing predictable, although it adds segmentation overhead.`),
    ],
    trap: 'Connection-oriented packet switching still shares link capacity; a virtual circuit is not the same as a physically dedicated circuit.',
    practice: 'Compare circuit, datagram, virtual-circuit, and ATM operation, then sketch a softswitch control/media separation.',
  }),
  createChapter({
    number: 14,
    title: 'The Internet Protocol',
    hook: 'IP finds the host, transport finds the process, and together they turn many links into an end-to-end service.',
    lessons: [
      lesson('Principles of internetworking', 'Routers join unlike networks while IP supplies one best-effort packet format and global addressing scheme.', `host -> local frame [IP packet]
router -> new local frame [same IP packet]`, 'What allows unlike physical networks to participate in one internetwork?', `Each network carries a common IP packet service while routers replace the link-specific frame at every hop.`),
      lesson('IPv4 operation and subnetting', 'IPv4 uses a 32-bit address and a variable-length header; a subnet mask divides the address into prefix and host portions.', `192.168.10.37/24
network: 192.168.10.0
host part: 37`, 'Find the network address of 192.168.10.37/24.', `A /24 mask keeps the first 24 bits. The network address is 192.168.10.0.`),
      lesson('IPv6', 'IPv6 uses 128-bit addresses, simpler base headers, extension headers, and no broadcast addressing.', `2001:0db8:0000:0000:0000:0000:0000:0001
Compressed: 2001:db8::1`, 'Compress the IPv6 address 2001:0db8:0000:0000:0000:0000:0000:0001.', `Remove leading zeros and replace the longest zero run once: 2001:db8::1.`),
      lesson('Routing', 'Routers select the most specific matching prefix, then use metrics and policy to choose among eligible routes.', `10.0.0.0/8
10.20.0.0/16
Destination 10.20.4.5 -> choose /16`, 'Which route is selected for 10.20.4.5 when /8 and /16 prefixes both match?', `The /16 route is selected because longest-prefix matching chooses the most specific route.`),
      lesson('VPNs and IPsec', 'A VPN creates protected logical connectivity over a shared network; IPsec authenticates and can encrypt IP traffic.', `original IP packet
-> IPsec protection
-> outer tunnel packet`, 'What protections can IPsec provide to VPN traffic?', `IPsec can provide data-origin authentication, integrity, anti-replay protection, and confidentiality when encryption is used.`),
    ],
    trap: 'An IP address identifies an interface in an internetwork; it does not permanently identify one person or application.',
    practice: 'Trace one packet across unlike links, solve three subnet calculations, compress two IPv6 addresses, and label an IPsec tunnel.',
  }),
  createChapter({
    number: 22,
    title: 'Internetwork Quality of Service',
    hook: 'Quality of service turns application needs into measurable treatment, reservations, traffic classes, and service commitments.',
    lessons: [
      lesson('QoS architectural framework', 'A QoS framework describes application requirements using throughput, delay, jitter, and loss, then maps them to network treatment.', `voice -> low delay and jitter
backup -> high throughput, delay tolerant`, 'Which QoS measurements are especially important for an interactive voice call?', `Low end-to-end delay, low jitter, and low packet loss are especially important.`),
      lesson('Integrated Services', 'IntServ uses admission control and per-flow state to offer a requested service along the path.', `flow specification
-> admission at each hop
-> reserved per-flow resources`, 'Why must IntServ perform admission control?', `It must reject a new reservation when the path lacks resources, protecting guarantees already made to accepted flows.`),
      lesson('Resource Reservation Protocol', 'RSVP carries reservation messages along a route and refreshes soft state without performing the routing itself.', `PATH: sender -> receiver
RESV: receiver -> sender
periodic refresh`, 'Does RSVP calculate the route used by a flow?', `No. Routing selects the path; RSVP signals and refreshes resource reservations along that path.`),
      lesson('Differentiated Services', 'DiffServ marks packets into behavior aggregates so routers can apply scalable per-class queueing and drop treatment.', `mark DS field at edge
core router -> class behavior`, 'Why does DiffServ scale better than keeping per-flow state in every core router?', `Core routers handle a limited number of traffic classes rather than maintaining state for every individual flow.`),
      lesson('SLAs and performance metrics', 'A service-level agreement states measurable commitments such as availability, throughput, delay, jitter, and loss.', `SLA: delay <= 40 ms
loss <= 0.1%
availability >= 99.9%`, 'Why must an SLA use measurable quantities?', `Objective metrics let both parties verify whether the promised service was delivered.`),
    ],
    trap: 'QoS can allocate and prioritize existing resources, but it cannot manufacture capacity that the physical path does not have.',
    practice: 'Classify two applications, compare IntServ and DiffServ, trace RSVP signaling, and write a measurable SLA.',
  }),
  createChapter({
    number: 10,
    title: 'Cellular Wireless Networks',
    hook: 'Cellular systems divide a wide region into managed radio neighborhoods so spectrum can be reused as users move.',
    lessons: [
      lesson('Cells and frequency reuse', 'A cellular network reuses channels in sufficiently separated cells to increase capacity while limiting interference.', `reuse factor = 1/N
cluster size N = 7 -> each cell receives 1/7 of channel groups`, 'What is the reuse factor for a seven-cell frequency cluster?', `The reuse factor is 1/7 because each cell receives one of seven channel groups before the pattern repeats.`),
      lesson('Handoff', 'A handoff transfers an active connection to a new cell when radio conditions or load make the new cell preferable.', `measure serving and neighbor signals
choose target -> reserve resources -> switch path`, 'Why is a margin commonly used before triggering a handoff?', `A margin prevents rapid back-and-forth handoffs caused by small signal fluctuations near a cell boundary.`),
      lesson('Generations', '1G was analog voice, 2G introduced digital voice, 3G expanded packet data, and 4G made the core all-IP with much higher rates.', `1G analog -> 2G digital -> 3G mobile data -> 4G LTE all-IP`, 'What architectural shift is strongly associated with 4G?', `4G uses an all-IP packet architecture for voice and data rather than a separate circuit-switched voice core.`),
      lesson('LTE architecture', 'LTE uses an evolved packet core and a flatter radio access network built around eNodeBs.', `device -> eNodeB -> evolved packet core -> Internet`, 'What is the main LTE radio base-station element called?', `An eNodeB, which connects user equipment to the evolved packet core.`),
      lesson('Cellular capacity', 'Smaller cells, additional spectrum, spatial reuse, and better modulation increase capacity, but interference must be controlled.', `same area split into more cells
-> more reuse opportunities
-> more handoffs and infrastructure`, 'Give one benefit and one cost of reducing cell size.', `Benefit: greater frequency reuse and capacity. Cost: more base stations and more frequent handoffs.`),
    ],
    trap: 'A stronger neighboring signal alone should not always trigger a handoff; thresholds and hysteresis avoid unstable switching.',
    practice: 'Draw a seven-cell reuse pattern and trace one moving call through measurement, decision, and handoff.',
  }),
  createChapter({
    number: 12,
    title: 'Ethernet',
    hook: 'Ethernet survived by keeping a recognizable frame service while its physical speed and switching machinery evolved dramatically.',
    lessons: [
      lesson('Ethernet frame', 'An Ethernet frame carries destination and source MAC addresses, type/length, payload, and a CRC-based frame check sequence.', `preamble | destination | source | type | data | FCS
             6 B         6 B      2 B  46-1500 B 4 B`, 'Which Ethernet field detects accidental frame corruption?', `The four-byte Frame Check Sequence contains a CRC used to detect corruption.`),
      lesson('MAC addressing', 'A 48-bit MAC address identifies an interface for local frame delivery; the least significant bit of the first octet distinguishes group addressing.', `unicast -> one interface
multicast -> selected group
FF:FF:FF:FF:FF:FF -> broadcast`, 'What Ethernet destination address represents a broadcast?', `FF:FF:FF:FF:FF:FF.`),
      lesson('CSMA/CD', 'Shared half-duplex Ethernet sensed the medium, detected collisions, sent a jam signal, and used binary exponential backoff.', `sense -> transmit -> collision -> jam -> random backoff`, 'Why is CSMA/CD absent from ordinary full-duplex switched links?', `Each endpoint has a dedicated transmit and receive path, so the shared-medium collisions CSMA/CD handles do not occur.`),
      lesson('Ethernet switching', 'A switch learns source addresses, forwards known unicasts selectively, and floods unknown or broadcast destinations within the VLAN.', `frame from A on port 2 -> learn A:2
known B:5 -> forward to port 5`, 'How does a switch learn that MAC A is reachable through port 2?', `It reads the source address of a frame arriving on port 2 and records A-to-port-2 in its forwarding table.`),
      lesson('Fast and Gigabit Ethernet', 'Higher Ethernet rates preserve the MAC frame format while using newer physical coding, media, and full-duplex switching.', `10 Mbit/s -> 100 Mbit/s -> 1/10/40/100+ Gbit/s
same basic frame service`, 'What major compatibility feature remained across Ethernet speed generations?', `The basic Ethernet MAC frame format and service were retained even as physical layers and rates changed.`),
    ],
    trap: 'A switch creates separate collision domains, but ports in one VLAN still share a broadcast domain.',
    practice: 'Label an Ethernet frame and trace learning, unknown flooding, known forwarding, and broadcast delivery.',
  }),
  createChapter({
    number: 13,
    title: 'Wireless LANs',
    hook: 'Wi-Fi brings Ethernet-like local networking to a medium where every station hears a different version of the air.',
    lessons: [
      lesson('IEEE 802.11 architecture', 'Stations join a basic service set through an access point; multiple BSSs can connect through a distribution system.', `stations <-> access point <-> distribution system <-> LAN`, 'What is an infrastructure basic service set?', `It is a group of wireless stations communicating through one access point.`),
      lesson('CSMA/CA', 'A station senses, waits an interframe space, chooses a random backoff, transmits, and expects an acknowledgment.', `idle -> DIFS -> random backoff -> frame -> ACK`, 'Why does 802.11 use collision avoidance instead of collision detection?', `A radio cannot reliably hear a weak collision while transmitting its own strong signal, so Wi-Fi reduces collision probability before sending.`),
      lesson('Hidden stations and RTS/CTS', 'Stations that cannot hear each other may collide at an access point; RTS/CTS reserves airtime around the receiver.', `A cannot hear C
A -> AP <- C
RTS/CTS announces reservation`, 'What problem does RTS/CTS reduce?', `It reduces collisions caused by hidden stations that cannot sense one another but share a receiver.`),
      lesson('Association and security', 'A client discovers a network, authenticates, associates, and then uses link security such as WPA2 or WPA3.', `scan -> authenticate -> associate -> secure data exchange`, 'What must happen before an infrastructure Wi-Fi client can exchange normal data through an access point?', `It must discover and select the network, complete authentication as required, and associate with the access point.`),
      lesson('High-throughput Wi-Fi', 'Channel bonding, improved modulation, MIMO, OFDM/OFDMA, and spatial reuse raise modern Wi-Fi throughput.', `two spatial streams can carry two data streams
when the channel and antennas support separation`, 'How can MIMO increase Wi-Fi data rate without simply widening the channel?', `It can send independent spatial streams at the same time using multiple antennas and separable radio paths.`),
    ],
    trap: 'The advertised physical Wi-Fi rate is not application throughput; contention, headers, retransmissions, and signal conditions reduce it.',
    practice: 'Trace association and one CSMA/CA transmission, including a hidden-station case with RTS/CTS.',
  }),
  createChapter({
    number: 15,
    title: 'Transport Protocols',
    hook: 'Transport protocols turn host-to-host packet delivery into communication between processes with the reliability each application needs.',
    lessons: [
      lesson('Transport service', 'Ports identify application endpoints, and multiplexing lets many process conversations share the network layer.', `socket endpoint = IP address + port
connection identified by endpoint pair`, 'What information identifies one transport endpoint?', `An IP address identifies the host interface and a port number identifies the process endpoint.`),
      lesson('Connection-oriented mechanisms', 'Reliable transport uses sequence numbers, acknowledgments, timers, retransmission, flow control, and ordered delivery.', `send sequence 1000
ACK 1500 -> bytes through 1499 received`, 'In a cumulative byte acknowledgment, what does ACK 1500 normally mean?', `All bytes through 1499 have arrived in order and byte 1500 is expected next.`),
      lesson('TCP connection and reliability', 'TCP establishes state with a three-way handshake and provides a reliable ordered byte stream.', `client SYN -> server
client <- SYN+ACK server
client ACK -> server`, 'Why does TCP use a three-way rather than two-way handshake?', `The third message confirms that the client received the server sequence information, allowing both directions to agree on fresh connection state.`),
      lesson('TCP flow and congestion control', 'The receiver window protects buffers, while the congestion window adapts sending to inferred network capacity.', `usable flight size = min(receiver window, congestion window)`, 'If rwnd is 40 KB and cwnd is 24 KB, how much unacknowledged data may TCP send?', `At most 24 KB because the sender is limited by the smaller window.`),
      lesson('UDP', 'UDP adds ports and a checksum to independent datagrams without connection setup, ordering, or retransmission.', `DNS query, live media, or custom reliability
may choose UDP`, 'Why might a real-time application choose UDP?', `It avoids connection and retransmission delays and lets the application decide how to handle loss and timing.`),
    ],
    trap: 'TCP preserves byte order, not application message boundaries; applications must define their own framing.',
    practice: 'Trace a TCP handshake and loss recovery, then compare TCP and UDP for three application requirements.',
  }),
  createChapter({
    number: 16,
    title: 'Advanced Data Communications Topics',
    hook: 'Advanced link design asks how much redundancy and signal complexity are worth spending to survive a difficult channel.',
    lessons: [
      lesson('Analog modulation', 'Amplitude, frequency, and phase modulation vary a carrier continuously to represent analog information.', `AM -> carrier amplitude follows message
FM -> carrier frequency follows message
PM -> carrier phase follows message`, 'Which carrier property changes in frequency modulation?', `The instantaneous carrier frequency changes according to the message signal.`),
      lesson('Forward error correction', 'FEC adds enough structured redundancy for a receiver to correct selected errors without retransmission.', `code minimum distance 3
-> correct one bit error`, 'What minimum Hamming distance is needed to correct one error?', `A minimum distance of 2t+1 = 3 is required for t=1.`),
      lesson('Block and convolutional codes', 'Block codes transform fixed groups; convolutional codes produce output from current and previous input state.', `block code: k data bits -> n-bit codeword
convolutional code: shift-register history affects output`, 'What gives a convolutional encoder memory?', `Its shift-register state retains previous input bits, so output depends on both current and earlier inputs.`),
      lesson('ARQ performance', 'Stop-and-wait utilization falls when propagation time is large relative to frame transmission time; windows keep the path busy.', `frame time = 1 ms, round trip = 20 ms
one outstanding frame wastes most link time`, 'Why does a sliding window outperform stop-and-wait on a long-delay link?', `It permits multiple frames to be in flight during the round trip instead of leaving the link idle after each frame.`),
      lesson('Choosing correction or retransmission', 'FEC suits high-delay or one-way links; ARQ suits channels where feedback is available and retransmission cost is acceptable.', `satellite broadcast -> FEC attractive
reliable low-delay link -> ARQ attractive`, 'Why is FEC useful for a one-way broadcast?', `Receivers cannot request individual retransmissions, so correction redundancy must travel with the original data.`),
    ],
    trap: 'More redundancy improves protection but consumes capacity; code rate and channel conditions must be considered together.',
    practice: 'Compare two code rates and estimate stop-and-wait versus window utilization for a long-delay path.',
  }),
  createChapter({
    number: 17,
    title: 'Wireless Transmission Techniques',
    hook: 'Modern wireless systems combine many antennas, many subcarriers, and carefully separated users to tame a changing channel.',
    lessons: [
      lesson('MIMO antennas', 'MIMO uses multiple transmit and receive antennas for diversity, beamforming, or parallel spatial streams.', `2x2 MIMO -> up to two spatial streams
when channel rank supports them`, 'Name two different benefits MIMO can provide.', `It can improve reliability through diversity or increase throughput through spatial multiplexing; beamforming can also improve signal direction.`),
      lesson('OFDM', 'OFDM divides a high-rate stream among many orthogonal narrowband subcarriers and adds a cyclic prefix against multipath.', `serial data -> parallel symbols -> IFFT -> cyclic prefix`, 'What problem does the cyclic prefix help OFDM handle?', `It reduces intersymbol interference from delayed multipath components when the prefix covers the channel delay spread.`),
      lesson('OFDMA and SC-FDMA', 'OFDMA assigns groups of subcarriers to different users; SC-FDMA has lower peak-to-average power and was used for LTE uplink.', `user A -> subcarriers 0-11
user B -> subcarriers 12-23`, 'How does OFDMA support multiple users simultaneously?', `It assigns different orthogonal time-frequency resource blocks to different users.`),
      lesson('Spread spectrum', 'FHSS changes carrier frequencies using a shared hop sequence; DSSS multiplies data by a faster chip sequence.', `data rate 1 Mbit/s, 8 chips/bit
chip rate = 8 Mchip/s`, 'Find the chip rate for eight chips per bit at 1 Mbit/s.', `8 x 1 Mbit/s = 8 Mchip/s.`),
      lesson('CDMA', 'CDMA separates simultaneous users with spreading codes; correlation recovers the intended user when codes are suitably distinct.', `received mixture correlated with user code
-> desired symbol strengthened, others suppressed`, 'What receiver operation separates one CDMA user from others?', `The receiver correlates the combined signal with the desired user spreading code.`),
    ],
    trap: 'Orthogonal or low-correlation signals remain separable only when timing, channel estimation, and power are controlled well enough.',
    practice: 'Calculate chip rate, allocate OFDMA subcarriers, and explain MIMO diversity versus spatial multiplexing.',
  }),
  createChapter({
    number: 18,
    title: 'Wireless Networks',
    hook: 'Wireless network design joins radio access with discovery, mobility, addressing, and compact protocols for very different devices.',
    lessons: [
      lesson('Broadband wireless access', 'Fixed broadband wireless connects stationary customer equipment to a provider base station without a wired last mile.', `customer unit <-> base station <-> provider network`, 'What makes fixed broadband wireless different from cellular mobility?', `The subscriber equipment is normally installed at a fixed location, so continuous mobility and handoff are not primary requirements.`),
      lesson('WiMAX', 'IEEE 802.16 WiMAX defined scheduled metropolitan broadband access with point-to-multipoint operation.', `base station schedules uplink/downlink resources
subscriber stations follow grants`, 'Why can scheduled access be useful in a broadband wireless system?', `A central scheduler can control interference and allocate predictable capacity instead of relying entirely on contention.`),
      lesson('Bluetooth piconets', 'A Bluetooth piconet coordinates nearby devices around one central timing and hopping pattern.', `central device + connected peripherals -> piconet`, 'What is a Bluetooth piconet?', `It is a small Bluetooth network in which connected devices share coordination, timing, and channel hopping under a central device.`),
      lesson('Bluetooth radio and baseband', 'Bluetooth uses the 2.4 GHz band, adaptive frequency hopping, time slots, and link types suited to short-range devices.', `interference on one channel
-> adaptive hopping can avoid it`, 'How does adaptive frequency hopping improve Bluetooth reliability?', `It identifies poor or busy channels and removes them from the active hopping set.`),
      lesson('L2CAP', 'The Logical Link Control and Adaptation Protocol multiplexes higher protocols and handles segmentation and reassembly over baseband links.', `large upper-layer packet
-> L2CAP segments
-> baseband packets
-> reassembly`, 'What two core services does L2CAP provide?', `It multiplexes higher-layer protocols and performs segmentation and reassembly of their packets.`),
    ],
    trap: 'Bluetooth and Wi-Fi share spectrum but use different architectures and access methods; similar frequency does not mean compatible framing.',
    practice: 'Compare WiMAX, Wi-Fi, and Bluetooth by range, coordination method, mobility, and target use.',
  }),
  createChapter({
    number: 19,
    title: 'Routing',
    hook: 'Routing turns a map of possible links into forwarding decisions that adapt when cost, policy, or reachability changes.',
    lessons: [
      lesson('Routing and forwarding', 'Routing computes or learns paths; forwarding applies the resulting table to each arriving packet.', `routing process -> forwarding table
packet destination -> longest matching entry -> next hop`, 'Distinguish routing from forwarding.', `Routing builds path information and forwarding tables. Forwarding is the per-packet action of selecting an outgoing interface and next hop.`),
      lesson('Distance-vector routing', 'Routers exchange destination distances with neighbors and apply the Bellman-Ford relation.', `D_x(y) = min_v { cost(x,v) + D_v(y) }`, 'What information does a distance-vector router normally send to its neighbors?', `Its current estimated distance or cost to each known destination.`),
      lesson('Link-state routing', 'Each router floods local link information, builds a topology database, and runs Dijkstra shortest-path calculation.', `discover neighbors -> measure costs -> flood LSA -> run Dijkstra`, 'Why can every link-state router calculate routes independently?', `Reliable flooding gives routers a common topology database, so each can run the same shortest-path algorithm locally.`),
      lesson('Interior and exterior routing', 'An interior gateway protocol routes within one autonomous system; BGP exchanges reachability and policy between autonomous systems.', `OSPF -> within an AS
BGP -> between ASes`, 'Which protocol is used for policy-based routing between autonomous systems?', `BGP, the Border Gateway Protocol.`),
      lesson('Multicast routing', 'Multicast routing builds delivery trees so one packet can be replicated near receivers rather than sent separately end to end.', `source -> shared links -> branch near receiver groups`, 'Why is a multicast distribution tree more efficient than many independent unicasts?', `Packets share common path segments and are copied only where receiver paths diverge.`),
    ],
    trap: 'The numerically shortest route is not always selected between organizations; BGP policy can be more important than path length.',
    practice: 'Run one distance-vector update, one Dijkstra calculation, and classify routes as interior, exterior, or multicast.',
  }),
  createChapter({
    number: 20,
    title: 'Congestion Control',
    hook: 'Congestion begins when offered work outruns network resources; good control reacts before queues become pure delay and loss.',
    lessons: [
      lesson('Congestion symptoms', 'Persistent overload increases queueing delay, buffer loss, retransmissions, and eventually reduces useful throughput.', `offered load rises
-> queue grows -> loss -> retransmission -> more load`, 'Why can retransmissions make severe congestion worse?', `Retransmissions add traffic to an already overloaded path, consuming capacity that could deliver new data.`),
      lesson('Open-loop and closed-loop control', 'Open-loop policies prevent congestion by design; closed-loop methods measure feedback and adjust traffic.', `open loop: admission and scheduling policy
closed loop: detect congestion -> signal -> reduce rate`, 'Classify admission control as open-loop or closed-loop.', `It is mainly open-loop because it prevents new traffic from entering when resources cannot support it.`),
      lesson('TCP congestion window', 'TCP limits flight size with a congestion window, growing cautiously and reducing it when congestion is inferred.', `flight <= min(cwnd, rwnd)
loss -> reduce cwnd`, 'Which TCP window represents the sender estimate of network capacity?', `The congestion window, cwnd.`),
      lesson('Active queue management', 'AQM drops or marks selected packets before a queue is completely full to signal congestion and avoid long standing queues.', `queue delay rises -> early mark/drop -> senders slow`, 'Why can early marking be better than waiting for a full queue?', `It provides feedback before widespread tail drops and excessive queueing delay occur.`),
      lesson('Explicit congestion notification', 'ECN-capable routers mark packets instead of dropping them, and endpoints echo the signal so senders reduce load.', `router sets congestion mark
receiver echoes mark
sender reduces rate`, 'What advantage can ECN have over a congestion drop?', `It signals congestion without losing the packet, avoiding retransmission while still asking the sender to slow down.`),
    ],
    trap: 'Flow control protects a receiver; congestion control protects the network path. They can limit the same sender for different reasons.',
    practice: 'Trace queue growth and compare admission control, TCP response, AQM, and ECN for the same overloaded link.',
  }),
  createChapter({
    number: 21,
    title: 'Internetwork Operation',
    hook: 'Modern internetwork operation includes one-to-many delivery, programmable forwarding, and mobility across changing attachment points.',
    lessons: [
      lesson('IP multicasting', 'Multicast sends one packet stream to a group address and lets the network replicate packets only where receiver paths branch.', `source -> shared path -> branch
                        -> receiver A
                        -> receiver B`, 'Why can multicast use less bandwidth than separate unicasts?', `One packet copy crosses each shared path segment and is replicated only where paths to group members diverge.`),
      lesson('Multicast delivery trees', 'A multicast routing protocol builds source-based or shared trees while group-management messages track interested receivers.', `receiver joins group
routers add branch
traffic follows distribution tree`, 'What is the purpose of a multicast distribution tree?', `It connects the source or shared root to all interested receiver networks without unnecessary duplicate traffic on common links.`),
      lesson('Software-defined networking', 'SDN separates logically centralized control decisions from simple device forwarding and exposes programmable interfaces.', `controller computes policy
-> installs forwarding rules
-> switches apply rules`, 'What separation defines software-defined networking?', `The control plane is logically separated from the forwarding data plane and made programmable through controller interfaces.`),
      lesson('OpenFlow', 'OpenFlow lets a controller manage match-action flow-table entries in compatible forwarding devices.', `match: IP destination + TCP port
actions: forward, drop, modify, report`, 'What two broad parts make up an OpenFlow-style rule?', `Match fields identify traffic, and actions specify what the forwarding device should do with matching packets.`),
      lesson('Mobile IP', 'Mobile IP preserves a stable home address while a home agent tunnels packets toward the device current care-of address.', `correspondent -> home address
home agent -> tunnel -> care-of address`, 'Why does Mobile IP use a care-of address?', `It identifies the mobile device current attachment point so packets can be tunneled there while the home address remains stable.`),
    ],
    trap: 'SDN centralizes the control view logically, but implementations can use multiple controllers for scale and resilience.',
    practice: 'Draw a multicast tree, write one match-action flow rule, and trace a mobile node from home address to care-of address.',
  }),
  createChapter({
    number: 23,
    title: 'Multiprotocol Label Switching',
    hook: 'MPLS places a short forwarding label in front of a packet so a provider can steer traffic along engineered paths.',
    lessons: [
      lesson('Labels and forwarding classes', 'Packets assigned to the same forwarding equivalence class receive similar treatment and a label at the MPLS edge.', `IP packet -> classify FEC -> push label`, 'What is a forwarding equivalence class?', `It is a group of packets that receive the same forwarding treatment through an MPLS domain.`),
      lesson('Label-switched paths', 'A label-switched path is the ordered route followed by packets of an FEC through label-switching routers.', `ingress -> transit LSRs -> egress
forms one LSP`, 'What does LSP stand for and describe?', `Label-Switched Path; it describes the path followed through the MPLS domain.`),
      lesson('Push, swap, and pop', 'An ingress pushes a label, transit routers swap labels, and an egress or penultimate router pops the final label.', `push 17 -> swap 17 to 42 -> pop 42`, 'Which MPLS operation is normally performed by a transit router?', `It swaps the incoming label for the outgoing label selected by its table.`),
      lesson('Label stack', 'Multiple labels can be stacked to represent nested services or tunnels; routers commonly process the top label.', `outer transport label
inner VPN/service label
original packet`, 'Why can MPLS use more than one label on a packet?', `A stack can represent nested forwarding contexts, such as a provider transport tunnel carrying a customer VPN service.`),
      lesson('Traffic engineering and VPNs', 'MPLS can place traffic on selected paths and isolate customer forwarding information for provider VPN services.', `high-priority flow -> engineered low-delay LSP
customer routes -> separate VPN context`, 'How can MPLS traffic engineering differ from ordinary shortest-path forwarding?', `It can steer traffic along an explicitly chosen path based on capacity or policy instead of only the IGP shortest path.`),
    ],
    trap: 'An MPLS label has local significance between relevant routers; it is not a permanent global destination address.',
    practice: 'Trace push-swap-pop across an LSP and sketch a two-label provider VPN packet.',
  }),
  createChapter({
    number: 24,
    title: 'Electronic Mail, DNS, and HTTP',
    hook: 'Internet applications feel simple because mail, naming, and the web divide their work into clear protocols and reusable message exchanges.',
    lessons: [
      lesson('Electronic mail architecture', 'User agents submit mail to servers; SMTP transfers it, and IMAP or POP provides mailbox access.', `sender agent -> SMTP servers -> mailbox
receiver agent -> IMAP -> mailbox`, 'Which protocol normally transfers mail between servers?', `SMTP, the Simple Mail Transfer Protocol.`),
      lesson('MIME and mail content', 'MIME labels content types and transfer encodings so mail can carry non-ASCII text, images, attachments, and multipart bodies.', `Content-Type: multipart/mixed
each part has its own type`, 'What problem does MIME solve for electronic mail?', `It describes and safely represents different media types and attachments beyond the original simple text mail format.`),
      lesson('DNS hierarchy', 'DNS maps names to resource records through a distributed hierarchy of root, top-level, and authoritative servers.', `host.example.com
root -> .com -> example.com authority`, 'What server gives the final authoritative record for a domain?', `An authoritative name server for that domain.`),
      lesson('HTTP operation', 'HTTP uses request-response messages; methods identify intent, status codes report results, and persistent connections reuse transport state.', `GET /notes HTTP/1.1
Host: example.com
-> 200 OK`, 'What does HTTP status 200 indicate?', `The request succeeded and the response contains the requested result or representation.`),
      lesson('Caching and secure web access', 'Caches reuse fresh responses; HTTPS carries HTTP over TLS to authenticate the server and protect data in transit.', `browser cache -> avoid repeat transfer
HTTPS -> HTTP over authenticated encrypted TLS`, 'What protections does HTTPS add to HTTP?', `TLS provides server authentication, confidentiality, and integrity for data exchanged in transit.`),
    ],
    trap: 'DNS finds service addresses and HTTP requests resources; neither protocol alone guarantees that a web server is trustworthy.',
    practice: 'Trace one email and one web request, then follow a DNS lookup from local cache to authoritative answer.',
  }),
  createChapter({
    number: 25,
    title: 'Internet Multimedia Support',
    hook: 'Multimedia networking succeeds when timing is treated as part of correctness, not merely an afterthought to delivery.',
    lessons: [
      lesson('Real-time traffic', 'Interactive audio and video care about delay, jitter, loss, synchronization, and sustained rate more than perfect retransmission.', `voice: strict delay, tolerates some loss
file: tolerates delay, requires exact bytes`, 'Why can retransmitting every late voice packet be harmful?', `A retransmitted packet may arrive after its playback deadline, adding delay without improving the live conversation.`),
      lesson('Voice over IP', 'VoIP samples and encodes speech, groups it into packets, transports it with timing information, and uses a jitter buffer before playback.', `speech -> codec -> packetization
-> IP network -> jitter buffer -> playback`, 'What tradeoff is introduced by increasing a VoIP jitter buffer?', `A larger buffer tolerates more delay variation but increases end-to-end conversational delay.`),
      lesson('Session control with SIP', 'SIP locates participants and establishes, modifies, or ends multimedia sessions while media commonly travels separately.', `INVITE -> provisional/final response -> ACK
media flow negotiated by session description`, 'Does SIP normally carry the audio samples themselves?', `No. SIP controls session signaling; media is normally carried by protocols such as RTP.`),
      lesson('Real-time Transport Protocol', 'RTP carries media payloads with sequence numbers and timestamps so receivers can detect loss and schedule playback.', `RTP header: sequence + timestamp + source ID
payload: encoded audio/video`, 'Why does RTP include both sequence numbers and timestamps?', `Sequence numbers reveal loss and reordering, while timestamps identify media sampling time for playback timing.`),
      lesson('RTCP feedback', 'RTCP exchanges sender, receiver, and participant reports containing statistics such as loss, jitter, and timing.', `receiver report
-> fraction lost + jitter + timing
-> sender adapts or diagnoses`, 'Does RTCP normally retransmit a missing RTP packet?', `No. RTCP reports quality and control information; recovery behavior is handled separately when an application supports it.`),
    ],
    trap: 'SIP controls a session while RTP carries media; treating them as the same channel confuses signaling with payload delivery.',
    practice: 'Design a VoIP call from codec and packetization through SIP setup, RTP media, RTCP reports, and jitter-buffer playback.',
  }),
];

chapters.sort((a, b) => a.number - b.number);

chapters.push(createRevisionChapter({
  number: 26,
  title: 'Stallings 10th Edition Revision Map',
  hook: 'Rebuild all 25 chapters as connected routes from physical signals to global applications and real-time media.',
  topics: [
    ['1. Architecture route', 'Chapters 1-2 connect communication models, network types, protocol layers, TCP/IP, applications, and sockets.', `application -> transport -> internet -> link`],
    ['2. Transmission route', 'Chapters 3-8 cover signals, media, encoding, errors, link control, multiplexing, and channel access.', `signal -> medium -> frame -> reliable shared link`],
    ['3. WAN and cellular route', 'Chapters 9-10 compare switched WAN mechanisms with cellular reuse, mobility, generations, and LTE.', `switching path + mobile radio access`],
    ['4. LAN route', 'Chapters 11-13 move from LAN principles to Ethernet switching and 802.11 wireless access.', `MAC address -> switch/AP -> local delivery`],
    ['5. Internetwork route', 'Chapters 14-23 connect IP, TCP/UDP, routing, congestion, tunneling, QoS, and MPLS.', `IP packet -> route -> controlled transport -> engineered path`],
    ['6. Wireless depth route', 'Chapters 16-18 revisit FEC and ARQ, then add MIMO, OFDM, spread spectrum, WiMAX, and Bluetooth.', `code + antennas + subcarriers + access network`],
    ['7. Application route', 'Chapters 24-25 connect email, DNS, HTTP, TLS, RTP, SIP, streaming, multicast, and multimedia QoS.', `name/service lookup -> session -> protected or timed delivery`],
  ],
  trap: 'Memorising acronyms without tracing one complete frame, packet, connection, or media stream creates fragile knowledge.',
  plan: [
    { title: 'Eight-Day Recall Plan', points: ['Day 1: chapters 1-2 overview and protocols.', 'Day 2: chapters 3-5 transmission and encoding.', 'Day 3: chapters 6-8 errors, links, and multiplexing.', 'Day 4: chapters 9-13 WAN, cellular, Ethernet, and Wi-Fi.', 'Day 5: chapters 14-15 IP and transport.', 'Day 6: chapters 16-18 advanced wireless.', 'Day 7: chapters 19-23 routing, congestion, QoS, and MPLS.', 'Day 8: chapters 24-25 applications, multimedia, and a mixed test.'] },
    { title: 'Calculation Checklist', points: ['Write units before substituting values.', 'Convert prefixes carefully: k = 10^3, M = 10^6, G = 10^9.', 'Separate transmission delay from propagation delay.', 'Check whether an address count asks for total or usable addresses.'] },
  ],
}));

export const dataCommunicationNotes = {
  id: 'data-communication',
  name: 'Data Communications',
  navName: 'Data Communication',
  accent: '#147d64',
  status: 'Ready',
  supportsPlayground: false,
  source: {
    label: 'Data and Computer Communications, 10th Edition - William Stallings',
    url: 'https://www.pearson.com/en-us/subject-catalog/p/data-and-computer-communications/P200000003353/9780133506488',
  },
  prompts: ['Explain the OSI model', 'CRC worked example', 'Subnetting practice', 'TCP vs UDP', 'Ethernet revision', 'Chapter 1 recap'],
  chapters,
};
