// Experience timeline, newest first.

export type ExperienceItem = {
  title: string
  org: string
  place: string
  period: string
  icon: 'truck' | 'users' | 'bot' | 'tent'
  points: string[]
}

export const experience: ExperienceItem[] = [
  {
    title: 'Project Manager & Field Service Engineer Intern',
    org: 'TractEasy',
    place: 'Denver, CO',
    period: 'May – Aug 2026',
    icon: 'truck',
    points: [
      'Diagnosed and resolved hardware, software and integration issues on autonomous electric tow tractors at client sites, restoring operation with minimal downtime.',
      'Coordinated deployments with site operations managers, communicating status and prioritizing fixes around customer schedules.',
      'Designed and built a deployment management tool to streamline rollout tracking.',
    ],
  },
  {
    title: 'Lead Team & Ambassador',
    org: 'CETA Leadership Society, University of Hartford',
    place: 'West Hartford, CT',
    period: 'May 2025 – present',
    icon: 'users',
    points: [
      'Give campus tours and answer questions for prospective engineering students and families.',
      'Help create a welcoming first impression of the college.',
    ],
  },
  {
    title: 'Vice President & Treasurer',
    org: 'FIRST Tech Challenge team',
    place: 'Burnt Hills, NY',
    period: '2021 – 2023',
    icon: 'bot',
    points: [
      'Programmed robot subsystems in Java and drove the robot in competition.',
      'Designed a robotic arm attachment.',
      "Managed the team's finances.",
    ],
  },
  {
    title: 'Senior Patrol Leader & Eagle Scout',
    org: 'Scouts BSA',
    place: 'Glenville, NY',
    period: '2011 – 2023',
    icon: 'tent',
    points: [
      "Planned and ran troop meetings as the troop's senior youth leader.",
      'Led an Eagle project rebuilding 150 feet of bog bridge on a hiking trail.',
      'Completed National Youth Leadership Training in 2021.',
    ],
  },
]
