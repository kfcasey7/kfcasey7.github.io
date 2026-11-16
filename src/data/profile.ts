// Personal details shown across the site. Edit these to update the hero, About and Contact sections.

export const profile = {
  name: 'Keller Casey',
  roles: ['Robotics engineer', 'Embedded systems builder', 'Controls programmer'],
  tagline:
    'Robotics Engineering senior at the University of Hartford. I design, wire and program machines, from humanoid legs to a robot that paces my track workouts.',
  email: 'kellercasey7@gmail.com',
  linkedin: 'https://www.linkedin.com/in/keller-casey-5614ab323/',
  // Add your GitHub profile URL to show it in the side rail and contact section.
  github: 'https://github.com/kfcasey7',
  // Put an address-free resume at public/resume.pdf, then set this to 'resume.pdf' to show the download button.
  resume: '',
  headshot: {
    src: 'media/about/headshot.webp',
    alt: 'Portrait of Keller Casey in a suit jacket',
  },
  // Draft bio from the resume. Replace with your LinkedIn About text if you prefer.
  bio: [
    "I'm a senior in Robotics Engineering at the University of Hartford, with minors in mathematics and computer science, graduating in spring 2027.",
    'I like projects where the mechanical design, the electronics and the code all have to work together: the hips and ankles of a 3D-printed humanoid for my capstone, PLC-run production lines, and a pacing robot I am building for my own track workouts.',
    'This summer I interned as a project manager and field service engineer at TractEasy, keeping autonomous electric tow tractors running at customer sites. Outside the lab I run cross-country and track, tutor classes on campus, and serve as vice president of Tau Beta Pi.',
  ],
  stats: [
    { value: '3.91', label: "GPA, on the President's List every semester" },
    { value: 'Tau Beta Pi', label: 'Vice president, engineering honor society' },
    { value: 'Eagle Scout', label: 'Rebuilt 150 feet of hiking-trail bog bridge' },
  ],
  education: {
    school: 'University of Hartford',
    degree: 'B.S. Robotics Engineering, minors in Mathematics and Computer Science',
    detail: 'Honors College, ABET-accredited program',
    period: '2023 – 2027',
  },
}
