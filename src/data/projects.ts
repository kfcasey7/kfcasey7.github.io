// Projects, grouped by year. To add a project: drop its images in public/media/<id>/
// (a full-size .webp plus a -thumb.webp) and add an entry below.

export type YearId = 'freshman' | 'sophomore' | 'junior' | 'senior' | 'personal'

export type Media =
  | { type: 'image'; src: string; thumb: string; alt: string; caption: string }
  | { type: 'clip'; src: string; poster: string; alt: string; caption: string }

export type Project = {
  id: string
  year: YearId
  title: string
  course?: string
  period: string
  role: string
  highlight?: string
  status?: string
  summary: string
  problem: string
  approach: string
  result: string
  tags: string[]
  cover?: { src: string; alt: string; fit?: 'cover' | 'contain' }
  coverIcon?: 'book' | 'truck'
  gallery: Media[]
  videos?: { src: string; poster: string; title: string }[]
  links?: { label: string; href: string }[]
}

export const years: { id: YearId; label: string; blurb: string }[] = [
  { id: 'freshman', label: 'Freshman year', blurb: 'First builds: sensors, motors and a working model.' },
  { id: 'sophomore', label: 'Sophomore year', blurb: 'Robot cars, web control and data structures.' },
  { id: 'junior', label: 'Junior year', blurb: 'Industrial automation, closed-loop control and machine learning.' },
  { id: 'senior', label: 'Senior year', blurb: 'A humanoid capstone and a summer in the field.' },
  { id: 'personal', label: 'Personal projects', blurb: 'Things I build because I want to use them.' },
]

const img = (id: string, name: string, alt: string, caption = alt): Media => ({
  type: 'image',
  src: `media/${id}/${name}.webp`,
  thumb: `media/${id}/${name}-thumb.webp`,
  alt,
  caption,
})

export const projects: Project[] = [
  // ── Freshman year ──────────────────────────────────────────
  {
    id: 'drawbridge',
    year: 'freshman',
    title: 'Arduino Drawbridge',
    course: 'CETA Design Expo',
    period: 'Fall 2023',
    role: 'Team of three',
    highlight: '2nd of 50+ at the 2023 Freshman Engineering Competition',
    summary: 'A model drawbridge that senses an approaching boat, stops traffic and lifts its span on its own.',
    problem:
      'Build a working system for the CETA Design Expo inside a 6 ft × 6 ft footprint, using one Arduino and at least two sensors from the ELEGOO kit, in the few weeks between mid-November and early December.',
    approach:
      'Ultrasonic sensors under the bridge watch for a passing boat. After several consistent readings the Arduino drives two stepper motors that wind string to raise the popsicle-stick span, swings two servo roadblocks down across the road, and switches LED signals for cars and boats.',
    result:
      'The project placed 2nd of 50+ at the 2023 Freshman Engineering Competition. At the expo the span raised and the roadblocks lowered on command; connecting the ultrasonic trigger to the stop/go LEDs was the remaining step.',
    tags: ['Arduino', 'Stepper motors', 'Servos', 'Ultrasonic sensing'],
    cover: { src: 'media/drawbridge/bridge-build-thumb.webp', alt: 'Popsicle-stick drawbridge between two towers on a workbench' },
    gallery: [
      img('drawbridge', 'bridge-build', 'Drawbridge span between its two towers during the build'),
      img('drawbridge', 'truss', 'Popsicle-stick truss span'),
      img('drawbridge', 'sketch', 'Hand sketch of the bridge and towers on graph paper'),
      img('drawbridge', 'breadboard', 'Breadboard wiring for the sensors and LEDs'),
    ],
  },

  // ── Sophomore year ─────────────────────────────────────────
  {
    id: 'mobile-robot',
    year: 'sophomore',
    title: 'Wi-Fi Controlled Mobile Robot',
    course: 'ROBO 201, Introduction to Robotics',
    period: 'Spring 2025',
    role: 'Group project; I did most of the work',
    summary: 'A Raspberry Pi and Arduino robot car you drive from any laptop or phone on the same Wi-Fi.',
    problem:
      'Build a mobile robot that pulls together the sensors, motors and programming from the course labs, and make it easy to drive without buying a dedicated controller.',
    approach:
      'A Flask web server on the Raspberry Pi captures key presses in the browser and sends them over USB serial to an Arduino, which drives two DC motors through an L298N driver. I added a phone page with buttons, LED turn signals, a time-of-flight distance sensor and a direction-hold mode. The body went from a cardboard prototype to a 3D-printed housing with mounts for the sensor and LEDs.',
    result:
      'A working robot that drives, responds to keyboard or phone input and reports distance on request. Choosing a web page over a Bluetooth controller means any device on the network can drive it, and the whole build could be made for under $100.',
    tags: ['Raspberry Pi', 'Arduino', 'Python', 'Flask', 'JavaScript', '3D printing'],
    cover: { src: 'media/mobile-robot/final-robot-thumb.webp', alt: '3D-printed robot car on a toy road mat' },
    gallery: [
      img('mobile-robot', 'final-robot', 'Final robot with its 3D-printed housing'),
      img('mobile-robot', 'prototype', 'Cardboard prototype used to test the code and electronics'),
      img('mobile-robot', 'keyboard-control', 'Keyboard control page with the D key lit'),
      img('mobile-robot', 'phone-control', 'Phone control page with direction buttons'),
      img('mobile-robot', 'flask-server', 'Flask server code that relays key presses to the Arduino'),
    ],
  },
  {
    id: 'library-system',
    year: 'sophomore',
    title: 'Library Management System',
    course: 'CS 220, Data Structures',
    period: 'Sophomore year',
    role: 'Team project',
    summary: 'A Java library catalog built on a custom hash table, with borrowing, returns and a by-genre view.',
    problem: 'Design a data structure around library ISBN numbers that handles the everyday operations of a small library.',
    approach:
      'Books live in a hash table keyed by ISBN, with chained nodes to handle collisions. A menu-driven program lets a user borrow, return, look up, add and remove books, and lists the whole catalog grouped by genre.',
    result:
      'All seven menu operations worked against a preloaded sample library. Testing caught a mix-up between int and long types for ISBNs. Next steps would be a real database and a friendlier interface.',
    tags: ['Java', 'Hash tables', 'Data structures'],
    cover: { src: 'media/library-system/menu-thumb.webp', alt: 'Terminal showing the library menu and a borrowed book', fit: 'contain' },
    gallery: [
      img('library-system', 'menu', 'Library menu borrowing a book by ISBN'),
      img('library-system', 'by-genre', 'Catalog listed by genre'),
      img('library-system', 'add-book', 'Adding a new book'),
    ],
  },

  // ── Junior year ────────────────────────────────────────────
  {
    id: 'conveyor-cell',
    year: 'junior',
    title: 'Conveyor Sorting & SCARA Palletizing Cell',
    course: 'ROBO 301, Robotics and Automation',
    period: 'Nov – Dec 2025',
    role: 'PLC, HMI and robot programming',
    summary: 'A dual-conveyor line that sorts parts by height and material, assembles a product and hands it to a robot arm.',
    problem:
      'Run a two-belt manufacturing cell from a single start button: sort washers on the top belt, assemble finished products on the bottom belt, and palletize them with a SCARA arm.',
    approach:
      'I wrote the ladder logic for a CLICK PLC as a chain of phases. A height probe checks each washer, an inductive sensor checks for metal, and solenoids push good parts into plastic or metal chutes while out-of-spec parts go to scrap. Counters release a base once both chutes are stocked, steer finished products into a 2 × 2 pattern, and start the Epson T3 SCARA arm through its discrete I/O once four are ready. The arm runs a SPEL palletizing program with an OnRobot vacuum gripper, and a C-more HMI provides the start button.',
    result:
      'The top belt sorted by height and material and the bottom belt assembled and arranged products as designed. The gripper’s communication cable was missing, so the palletizing program was proven in the Epson RC+ simulator rather than on the arm. Next steps: a faster height sensor, a shift register to test several washers at once, and production counts on the HMI.',
    tags: ['PLC ladder logic', 'HMI', 'Epson SCARA', 'SPEL', 'Industrial automation'],
    cover: { src: 'media/conveyor-cell/block-diagram-thumb.webp', alt: 'Block diagram of the PLC, conveyor, HMI and robot arm', fit: 'contain' },
    gallery: [
      img('conveyor-cell', 'block-diagram', 'System block diagram: PLC, I/O cards, conveyor, HMI and arm'),
      img('conveyor-cell', 'ladder-1', 'Ladder logic rungs 1–6: dispenser, top belt and sensor timing'),
      img('conveyor-cell', 'ladder-2', 'Rungs 7–13: height probe and good or bad height checks'),
      img('conveyor-cell', 'ladder-end', 'Final rungs: product counter that starts the robot arm'),
      img('conveyor-cell', 'hmi', 'HMI start button'),
      img('conveyor-cell', 'arm-points', 'Taught pick and pallet points for the SCARA arm'),
      img('conveyor-cell', 'spel-program', 'SPEL palletizing program'),
    ],
  },
  {
    id: 'pid-elevator',
    year: 'junior',
    title: 'PID-Controlled Elevator',
    course: 'ME 405, Mechatronics System Design',
    period: 'Junior year',
    role: 'Two-person team',
    summary: 'A model elevator that moves between floors under closed-loop PID control, with homing, a request queue and end stops.',
    problem: 'Move an elevator cab to requested floors accurately and smoothly, and serve several requests in the order they arrive.',
    approach:
      'An ultrasonic sensor measures cab height, limit switches set the floor positions, and LabVIEW running on National Instruments DAQ hardware closes a PID loop on a geared motor through a PWM servo amplifier. Floor requests go into a first-in, first-out queue. We started from the equations of motion, 3D-printed the mounts and cab parts, and tested in stages: sensors alone, manual control, a PD controller on a setpoint, auto homing, then full floor sequences, with end stops added as a safeguard.',
    result:
      'The elevator positioned reliably under closed-loop control and ran homing, queued floor sequences and end-stop tests (see the videos). The main limit was the DAQ hardware’s analog, digital and counter channels. Next steps: more precise position sensing, less vibration, more floors and smarter scheduling.',
    tags: ['LabVIEW', 'NI DAQ', 'PID control', 'Ultrasonic sensing', '3D printing'],
    cover: { src: 'media/pid-elevator/cab-thumb.webp', alt: 'Elevator cab on an aluminum rail in the lab' },
    gallery: [
      img('pid-elevator', 'elevator-rig', 'Full elevator rig on the lab bench'),
      img('pid-elevator', 'cab', 'Printed cab riding the aluminum rail'),
      img('pid-elevator', 'sensor-mount', 'Base mount with the ultrasonic sensor'),
      img('pid-elevator', 'pid-response', 'Setpoint and measured height during a floor change'),
      img('pid-elevator', 'system-integration', 'System integration diagram'),
      img('pid-elevator', 'electrical', 'Electrical design'),
      img('pid-elevator', 'cad-bracket', 'CAD of a motor bracket'),
      img('pid-elevator', 'cad-base', 'CAD of the rail base'),
      img('pid-elevator', 'hand-calcs', 'Hand calculations for the equations of motion'),
    ],
    videos: [
      { src: 'media/pid-elevator/homing.mp4', poster: 'media/pid-elevator/homing-poster.webp', title: 'Homing' },
      { src: 'media/pid-elevator/queue.mp4', poster: 'media/pid-elevator/queue-poster.webp', title: 'Queued floor requests' },
      { src: 'media/pid-elevator/end-stop.mp4', poster: 'media/pid-elevator/end-stop-poster.webp', title: 'End-stop test' },
    ],
  },
  {
    id: 'nav-prediction',
    year: 'junior',
    title: 'Predicting Robot Navigation Outcomes',
    course: 'CS 368, Data Mining',
    period: 'Spring 2026',
    role: 'Team of three',
    summary: 'Machine-learning models that predict whether a robot’s navigation run ends in success, collision, partial completion or timeout.',
    problem:
      'Given time-stepped sensor and movement logs from autonomous navigation runs, can a model tell how a run will end, and which signals drive that outcome?',
    approach:
      'We collapsed each run’s time steps into one row (for example, lowest battery level, closest obstacle and whether a collision ever occurred), scaled the features, and compared SVM, k-means, KNN, decision tree and random forest models, sweeping each model’s key parameter and checking 5-fold cross-validation for consistency.',
    result:
      'Decision trees and random forests were the strongest and most consistent models. Per-run aggregation and feature scaling both made a large difference, and path smoothness and the collision flag carried most of the signal. No model could pick out timeouts, which suggests they depend on factors the dataset doesn’t record.',
    tags: ['Python', 'scikit-learn', 'Machine learning', 'Data mining'],
    cover: { src: 'media/nav-prediction/decision-tree-thumb.webp', alt: 'Decision tree diagram', fit: 'contain' },
    gallery: [
      img('nav-prediction', 'decision-tree', 'First three levels of the decision tree'),
      img('nav-prediction', 'class-distribution', 'How the runs split across the four outcomes'),
      img('nav-prediction', 'confusion-matrix', 'Random forest confusion matrix'),
      img('nav-prediction', 'feature-importance', 'Random forest feature importance'),
      img('nav-prediction', 'clusters', 'k-means clusters compared with the true outcomes'),
    ],
  },
  {
    id: 'pinocchio-tutorial',
    year: 'junior',
    title: 'Intro to Pinocchio Tutorial',
    course: 'ROBO 303 Honors Project',
    period: 'Junior year',
    role: 'Solo honors project',
    summary: 'A step-by-step web tutorial that takes students from a SolidWorks arm model to forward and inverse kinematics in Pinocchio.',
    problem:
      'Give students one clear path from CAD to working kinematics code, set up for the Windows laptops the university recommends.',
    approach:
      'The tutorial walks through designing a simple arm in SolidWorks, exporting it to URDF with its joint constraints, installing WSL2, Miniconda and Pinocchio, then loading and inspecting the model, programming forward and inverse kinematics, and visualizing the arm in Meshcat.',
    result: 'A complete tutorial site built in Google Sites, covering setup through visualization.',
    tags: ['Pinocchio', 'Python', 'URDF', 'SolidWorks', 'WSL2', 'Meshcat'],
    coverIcon: 'book',
    gallery: [],
    // Add the published Google Sites link here once the site is published:
    links: [],
  },

  // ── Senior year ────────────────────────────────────────────
  {
    id: 'humanoid-legs',
    year: 'senior',
    title: 'Low-Cost 3D-Printed Humanoid Legs',
    course: 'Senior capstone',
    period: '2026 – 2027',
    role: 'Two-person team: hip and ankle joints, ROS 2 control',
    status: 'In progress',
    summary: 'Designing the hips and ankles of an open, 3D-printed humanoid research platform, with ROS 2 control aimed at standing and balancing.',
    problem:
      'Humanoid research platforms often cost well over $10,000 (a Unitree G1 starts at $13,500), which keeps them out of reach for many university labs and student teams.',
    approach:
      'We are building a modular platform from FFF 3D-printed parts that labs can print, repair and extend with common equipment. Our scope is the legs: a 2-DOF hip and a 2-DOF ankle driven by integrated joint motors with built-in drivers and encoders, carbon-fiber-filled plastic near the motors and PETG elsewhere, load cells and an IMU in each foot, and an ankle-hip balance controller in ROS 2 with Pinocchio, tested in a digital twin before it touches hardware.',
    result:
      'The proposal is complete, with requirements, trade studies and component selections. Targets include under $1,200 for the hip and ankle hardware, a 200 Hz control loop and unsupported standing for more than 10 minutes.',
    tags: ['ROS 2', 'Pinocchio', 'MuJoCo', '3D printing', 'Balance control', 'CAD'],
    cover: { src: 'media/humanoid-legs/block-diagram-thumb.webp', alt: 'System block diagram for the humanoid legs', fit: 'contain' },
    gallery: [img('humanoid-legs', 'block-diagram', 'System block diagram for the humanoid legs')],
  },
  {
    id: 'tracteasy',
    year: 'senior',
    title: 'TractEasy Internship',
    course: 'Project management & field service engineering',
    period: 'Summer 2026',
    role: 'Intern, Denver, CO',
    summary: 'Field service on autonomous electric tow tractors, plus two internal tools: a deployment tracker and an AI-assisted onboarding guide.',
    problem:
      'Deploying a vehicle is a lot for a new field service engineer. Beyond technical skill it takes documentation, strict timelines and organization, and shadowing alone doesn’t teach all of that.',
    approach:
      'I built Flown, a Python and PyQt6 desktop tool that combines a node-based deployment flowchart, a Gantt chart, a progress tracker, an instructional guide and a document generator. I also used the company’s AI tools to build an interactive onboarding and training resource from approved documentation.',
    result:
      'Engineers who tried Flown said it would have helped during their own onboarding and that they’d prefer it to a shared document. In the field I diagnosed and resolved hardware, software and integration issues and coordinated deployments with site managers.',
    tags: ['Python', 'PyQt6', 'Field service', 'Project management'],
    coverIcon: 'truck',
    gallery: [],
  },

  // ── Personal projects ─────────────────────────────────────
  {
    id: 'track-pacer',
    year: 'personal',
    title: 'Track Pacing Robot',
    period: 'May 2025 – present',
    role: 'Solo design project',
    status: 'Building and bench testing',
    summary: 'A 1/10-scale robot that follows the lane line at a programmed pace so a runner can chase it.',
    problem:
      'Without a pacer, runners go out too fast and fade, and only learn how far off they were after the rep. As a cross-country runner I wanted an objective, portable pacer that holds a speed, switches between work and recovery on its own, and sets up from a phone.',
    approach:
      'The system is split by timescale. An Arduino runs a 100 Hz PID speed loop from an encoder on the rear axle, damps steering with a gyro, and drops to neutral if commands stop for 500 ms. A Raspberry Pi running ROS 2 handles OpenCV lane following, workout segments and the phone interface. A sensored brushless motor and a 9:1 belt reduction put race pace at mid-throttle, so the controller always has headroom.',
    result:
      'Hardware is selected and documented, the ESC is calibrated, and the firmware and ROS 2 nodes are drafted while the chassis is modeled in Fusion for 3D printing. Pacing accuracy will be measured lap by lap on a real track before I claim it.',
    tags: ['ROS 2', 'Python', 'Arduino C++', 'PID control', 'OpenCV', 'Autodesk Fusion'],
    cover: { src: 'media/track-pacer/cad-render-thumb.webp', alt: 'CAD render of the pacing robot chassis', fit: 'contain' },
    gallery: [
      img('track-pacer', 'cad-render', 'Chassis concept render'),
      img('track-pacer', 'printed-prototype', 'Printed parts in progress'),
      img('track-pacer', 'architecture', 'System architecture: the Arduino holds the speed loop, the Pi sends setpoints'),
      { type: 'clip', src: 'media/track-pacer/clip.mp4', poster: 'media/track-pacer/clip-poster.webp', alt: 'Short clip of the printed parts', caption: 'Printed parts, short clip' },
    ],
  },
  {
    id: 'roas',
    year: 'personal',
    title: 'Roundnet Officiating Aid System (ROAS)',
    period: 'Personal project',
    role: 'Solo design project',
    status: 'Design and prototyping',
    summary: 'An embedded system that tells a rim hit from a net hit by the way the frame vibrates.',
    problem:
      'Roundnet has no referee, and the hardest call is whether the ball touched the rim or the net. In fast rallies the difference is often invisible, so teams argue and replay the point.',
    approach:
      'A rim hit is short and sharp (about 1–5 ms of contact); a net hit is slow and soft (about 10–30 ms). Five ±200 g ADXL375 accelerometers, one per rim arc, feed an Arduino Mega through an I2C multiplexer. Each impact triggers a capture that is run through time-domain features and an FFT, classified, and a buzzer sounds on a rim hit. I chose the ADXL375 because the other candidates either missed the rim’s signature or clipped on hard hits.',
    result:
      'The architecture is specified and the capture-and-classify firmware is written. Next: build the five-sensor rig, collect labeled rim, net, pocket and roll-up hits, and check that they separate before tuning thresholds and training a classifier.',
    tags: ['Arduino C++', 'FFT', 'Accelerometers', 'I2C', 'Signal processing'],
    cover: { src: 'media/roas/sensor-mount-thumb.webp', alt: 'Accelerometer prototype mounted on a yellow rim section' },
    gallery: [
      img('roas', 'sensor-mount', 'Prototype sensor mount on a rim section'),
      img('roas', 'architecture', 'Five rim sensors feed one real-time FFT pipeline'),
      { type: 'clip', src: 'media/roas/clip.mp4', poster: 'media/roas/clip-poster.webp', alt: 'Short clip of the sensor mount', caption: 'Sensor mount, short clip' },
    ],
  },
]
