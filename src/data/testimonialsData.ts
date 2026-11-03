// ─── ImpactX Global — Reviews & Testimonials Data ─────────────────────────────

export interface Testimonial {
  id: string;
  name: string;
  review: string;
}

export interface Batch {
  id: string;
  name: string;         // e.g. "BATCH 01 — GENESIS"
  shortName: string;    // e.g. "GENESIS"
  number: string;       // e.g. "01"
  testimonials: Testimonial[];
}

export const TESTIMONIAL_BATCHES: Batch[] = [
  {
    id: 'batch-01',
    name: 'BATCH 01 — GENESIS',
    shortName: 'GENESIS',
    number: '01',
    testimonials: [
      {
        id: 'b01-saurabh-mojad',
        name: 'Saurabh Mojad',
        review: `What sets ImpactX Global apart is the trust it places in its interns. Rather than limiting us to routine tasks, we are encouraged to take on meaningful responsibilities and work on real-world, production-level architecture from day one. This level of trust, combined with high expectations, pushes us to think critically, take ownership, and approach challenges like professional engineers.

Working on the Network Intrusion Detection System (NIDS) has been one of the most rewarding learning experiences of my journey. It has challenged me to grow technically and strengthened my excitement for building solutions that matter.

Beyond technical learning, my experience with GENESIS helped me strengthen my communication, collaborate effectively within a team, take ownership of responsibilities, and adapt to challenges. It made me more confident, proactive, and open to different perspectives. Most importantly, it taught me that real growth is not just about becoming better at what you do, but also about becoming a better person, collaborator, and teammate.

I'm genuinely excited to see how far ImpactX Global and its unique journey will go. I'm grateful for an environment where interns are trusted to learn, build, and grow.`,
      },
      {
        id: 'b01-p-sriya-patra',
        name: 'P. Sriya Patra',
        review: `Honestly, I joined GENESIS with the intention of learning, but somewhere along the way, it became a place where I rediscovered myself. I found my lost confidence, recognised my growth, and created memories that I will genuinely cherish.

The supportive and approachable nature of the leadership team made me feel comfortable, encouraged, and motivated throughout the experience. I particularly appreciated the honest feedback, constructive reviews, and encouragement I received. Every interaction became an opportunity to improve, learn from my mistakes, and understand how I could do better.

This opportunity also helped me recognise my own potential and gain confidence in my abilities. The experience and guidance I received played an important role in helping me secure a position in graphic design, something I once doubted I could achieve.

This journey taught me that growth is not just about acquiring new skills; it is also about believing in your ideas, trusting your abilities, and becoming a better version of yourself. I'm genuinely grateful to the entire ImpactX Global team for believing in me and making this such a memorable learning journey.`,
      },
      {
        id: 'b01-swetlina-panda',
        name: 'Swetlina Panda',
        review: `My experience with GENESIS was a valuable learning journey that helped me develop both practical and professional skills. It taught me how to identify real-world problems, understand users' needs, develop practical solutions, and confidently present my ideas.

Working on weekly challenges further strengthened my creativity, teamwork, communication, and problem-solving abilities. More importantly, the constant guidance and encouragement from the mentors and team motivated me to step outside my comfort zone and believe in my own capabilities.

From feeling uncertain at the beginning to completing the journey with countless new learnings, my experience with ImpactX Global has been truly special. Having mentors who appreciated my efforts, supported me through challenges, and motivated me whenever I needed it made the entire experience more comfortable and memorable.

I'm truly grateful to the entire ImpactX Global team for providing an environment where I could learn, experiment, grow, and become more confident in myself.`,
      },
      {
        id: 'b01-rajashree-sahoo',
        name: 'Rajashree Sahoo',
        review: `GENESIS was much more than an internship for me; it was a journey of personal growth, self-discovery, and building confidence. The biggest thing I gained was belief in myself, my work, and the confidence to put myself out there.

Beyond the work and responsibilities, what made this experience truly special was the people I met, the connections I built, and the memories I created along the way. Every task, interaction, mistake, and challenge became an opportunity to learn and grow.

I am especially grateful to the mentors and leadership team for their constant support, encouragement, and guidance. Their belief in me, even during moments when I doubted myself, made this journey even more meaningful.

GENESIS gave me more than professional experience. It gave me confidence, wonderful connections, unforgettable memories, and an opportunity to become a better version of myself. I am genuinely grateful to have been a part of it.`,
      },
      {
        id: 'b01-mohammad-kaif',
        name: 'Mohammad Kaif',
        review: `My journey with GENESIS has been a truly valuable learning experience. I am sincerely grateful to the team for their constant guidance, support, and encouragement throughout the programme.

The learning environment created by the leadership team made it easier to explore ideas, ask questions, and grow with confidence. What stood out most was that the mentorship went beyond helping me complete tasks. It taught me how to think critically, question ideas, approach challenges, and develop better problem-solving skills.

I truly appreciate the time, effort, and encouragement invested in my growth. This experience has given me lessons that I will carry forward in my personal and professional journey.`,
      },
      {
        id: 'b01-subhasmita-jena',
        name: 'Subhasmita Jena',
        review: `My experience with GENESIS was much more than just learning project management. It helped me develop teamwork, communication, accountability, and the ability to handle challenges. I particularly appreciated the supportive and approachable mentors who guided us whenever we faced difficulties.

The interactions with the leadership team and mentors made the experience even more meaningful. They listened to our concerns, understood our perspectives, and created an environment where we felt comfortable asking questions and sharing our thoughts.

Overall, GENESIS contributed significantly to my personal and professional growth, and I am grateful for the experience.`,
      },
      {
        id: 'b01-sizolwethu-mndawe',
        name: 'Sizolwethu Mndawe',
        review: `Thank you to ImpactX Global for creating a platform where ambitious and talented individuals can dream bigger, think beyond limitations, and focus on the bigger picture.

The core management team has been truly inspirational. You encourage us to dream big while reminding us of the importance of staying humble, grounded, and considerate. Your vision and encouragement have inspired me to believe that the impact we can create is far greater than we often imagine.

I sincerely wish ImpactX Global continued growth and success in its journey of empowering people and creating meaningful impact.`,
      },
      {
        id: 'b01-sunayana-dutta',
        name: 'Sunayana Dutta',
        review: `My experience with GENESIS helped me develop practical skills in planning tasks, coordinating with team members, tracking progress, managing deadlines, and preparing reports.

Along the way, I also strengthened my communication, teamwork, problem-solving, and time-management abilities. The experience gave me valuable exposure to working collaboratively, managing responsibilities, and staying organised while working towards shared goals.

I am grateful for the opportunity to learn and develop these skills as part of ImpactX Global.`,
      },
    ],
  },
  {
    id: 'batch-02',
    name: 'BATCH 02 — ODYSSEY',
    shortName: 'ODYSSEY',
    number: '02',
    testimonials: [
      {
        id: 'b02-tanishq-dubey',
        name: 'Tanishq Dubey',
        review: `My journey with ImpactX Global through the ODYSSEY programme was a valuable learning experience. Working on the VidyaMitra 2.0 project helped me understand practical project management concepts, including prioritising features, planning timelines, managing risks, and making decisions when challenges arise.

I particularly enjoyed learning how to approach feature prioritisation, adapt to changing situations, and think from a product management perspective. The project-based approach helped me understand how theoretical concepts can be applied to real-world scenarios. It also helped me develop a more structured problem-solving approach and understand the importance of teamwork and communication.

I would encourage future students to actively participate, ask questions, and focus on applying what they learn to their projects. More regular mentor feedback and opportunities for live discussions would make the learning experience even more effective.`,
      },
      {
        id: 'b02-siya-singh',
        name: 'Siya Singh',
        review: `My experience at ImpactX Global has been genuinely enriching. One of the biggest things I gained from this experience was the confidence to come out of my shell, especially during presentations and informal coffee sessions. These interactions gave me the opportunity to express myself, connect with new people, and learn from their experiences and perspectives.

What I particularly appreciated was how approachable and understanding the mentors were. They created a very comfortable and welcoming environment where communication felt open and natural. We never had to think twice before approaching them with a question or sharing our thoughts. Even when we missed a few things or faced challenges along the way, the mentors were patient and supportive rather than overly strict. They focused on helping us understand, learn, and improve.

I also enjoyed the coffee sessions because they were both fun and insightful. I believe more frequent mid-week check-ins and interactions with team members could make the experience feel even more collaborative and closer to a professional workplace environment.

Overall, I really enjoyed my time at ImpactX Global, learned many new things, met wonderful people, and came away feeling more confident in myself and my ability to communicate and work with others.`,
      },
      {
        id: 'b02-sneha-jain',
        name: 'Sneha Jain',
        review: `My journey with ImpactX Global has been a really wonderful and valuable experience. I got the opportunity to learn new things, improve my communication skills, and understand how things work in a professional environment.

The team has been very supportive, friendly, and encouraging throughout my journey. I'm especially grateful to Sneha Ma'am, Ritika Ma'am, and Sourav Sir for their guidance and support.

I would encourage future students to take this opportunity with an open mind, stay active, and be ready to learn. Overall, I'm truly happy to be a part of ImpactX Global, and this journey will always be a special part of my learning experience.`,
      },
      {
        id: 'b02-pragyan-parimita-dash',
        name: 'Pragyan Parimita Dash',
        review: `Everyone at ImpactX Global is friendly and helpful. As this was my first internship experience, I found it to be a wonderful platform for students to learn, explore, and gain their first exposure to a professional environment.

I'm grateful to have been part of this journey and to have had the opportunity to learn alongside such a supportive team.`,
      },
      {
        id: 'b02-vishnu-sharma',
        name: 'Vishnu Sharma',
        review: `My experience with ImpactX Global has been one of the best learning experiences. I particularly enjoyed the coffee chats and the opportunity to interact with the leadership team.

Being part of this journey has helped me learn many new things and significantly boosted my confidence. I'm grateful for the experience and the opportunities to grow.`,
      },
      {
        id: 'b02-rahul-singh',
        name: 'Rahul Singh',
        review: `My experience at ImpactX Global was great. I particularly enjoyed the interactive sessions between colleagues, as they helped build stronger connections and create a positive working environment.

I believe the experience could be made even better through more frequent and well-timed meetings, along with short mid-week follow-up sessions between interns and mentors. Regular evaluation updates and constructive feedback on areas for improvement would also help interns understand their progress and continue developing their skills.

Overall, the interactive sessions and opportunities to connect with colleagues were among the highlights of my experience.`,
      },
      {
        id: 'b02-radha-ganesh',
        name: 'Radha Ganesh',
        review: `My experience at ImpactX Global gave me valuable insights into project management terminology and a high-level understanding of project management tasks.

I particularly appreciated the team environment and the complexity of the tasks, which provided an opportunity to explore different aspects of project management and gain a better understanding of the field.`,
      },
    ],
  },
];

