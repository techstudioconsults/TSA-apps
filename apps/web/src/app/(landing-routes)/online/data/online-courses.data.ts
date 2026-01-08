export interface OnlineCourse {
  slug: string;
  title: string;
  description: string;
  hero: {
    title: string;
    subTitle: string;
    backgroundImage?: string;
    image: string;
  };
  whyChoose: {
    title: string;
    description: string;
    features: Array<{
      icon: string;
      title: string;
      description: string;
    }>;
  };
  coreSkills?: {
    title: string;
    description: string;
    skills: Array<{
      icon: string;
      title: string;
      description: string;
    }>;
  };
  learningJourney: {
    title: string;
    description: string;
    units: Array<{
      unitNumber: number;
      title: string;
      topics: string[];
    }>;
  };
  whoShouldJoin: {
    title: string;
    description: string;
    audiences: Array<{
      icon: string;
      title: string;
      description: string;
    }>;
  };
  outcomes: {
    title: string;
    description?: string;
    items: Array<{
      icon: string;
      title: string;
      description: string;
    }>;
  };
  testimonials: Array<{
    name: string;
    role: string;
    rating: number;
    text: string;
    avatar?: string;
  }>;
  bonuses: Array<{
    icon: string;
    title: string;
  }>;
  pricing: {
    title: string;
    price: string;
    paymentOption: string;
    features: string[];
    buttonText: string;
  };
  faqs: Array<{
    question: string;
    answer: string;
  }>;
  cta: {
    bg: string;
    title: string;
    description: string;
    buttonText: string;
  };
}

export const onlineCourses: OnlineCourse[] = [
  {
    slug: "cybersecurity",
    title: "Cybersecurity Specialist",
    description: "Become a Cybersecurity Specialist Career-Ready in Just 12 Weeks",
    hero: {
      title: "Become a Cybersecurity Specialist Career-Ready in Just 12 Weeks",
      subTitle: "Learn to analyze, visualize, and model data using industry-standard tools fully online, beginner-friendly, and designed to help you build a strong data portfolio.",
      backgroundImage: "/images/programming-coding1.png",
      image: "/images/cybersecurity.png"
    },
    whyChoose: {
      title: "Why Choose Our Online Cyber Security Program?",
      description: "A practical, beginner-friendly program focused on real-world cybersecurity skills and hands-on practice.",
      features: [
        {
          icon: "/icons/MonitorPlay.svg",
          title: "Online Classes",
          description: "Live, interactive sessions with guided walkthroughs and real-time Q&A.",
        },
        {
          icon: "/icons/wifi.svg",
          title: "100% Online Learning",
          description: "Learn from anywhere with just your laptop and internet connection .",
        },
        {
          icon: "/icons/BookOpen.svg",
          title: "Beginner-Friendly",
          description: "No prior IT or security experience required. We start from the basics.",
        },
        {
          icon: "/icons/Kanban.svg",
          title: "Hands-On Projects",
          description: "Practice with real-world security scenarios and practical exercises.",
        },
        {
          icon: "/icons/PenNib.svg",
          title: "Modern Tools",
          description: "Learn and work with industry-relevant tools for networking & system security.",
        },
        {
          icon: "/icons/PersonSimpleSwim.svg",
          title: "Complete Journey",
          description: "From threat awareness and network security to access control, etc.",
        },
      ],
    },
    coreSkills: {
      title: "Core Cybersecurity Skills You'll Gain",
      description: "Master the essential competencies needed to protect organizations from evolving digital threats",
      skills: [
        {
          icon: "/icons/ShieldCheck.svg",
          title: "Threat Analysis & Risk Management",
          description: "Identify,and prioritize security threats while implementing risk mitigation strategies.",
        },
        {
          icon: "/icons/Network.svg",
          title: "Network & System Security",
          description: "Secure networks, systems, and infrastructure from intrusions.",
        },
        {
          icon: "/icons/Key.svg",
          title: "Access Control & Identity",
          description: "Implement authentication and authorization systems.",
        },
        {
          icon: "/icons/Globe.svg",
          title: "Cryptography & Data Protection",
          description: "Master encryption and secure data handling techniques.",
        },
        {
          icon: "/icons/FileText.svg",
          title: "Web & Application Security",
          description: "Prevent common web vulnerabilities using OWASP best practices.",
        },
        {
          icon: "/icons/Users.svg",
          title: "Incident Response & Compliance",
          description: "Handle security incidents and meet compliance standards.",
        },
      ],
    },
    learningJourney: {
      title: "Your 12-Week Learning Journey",
      description: "Our comprehensive curriculum is structured to take you from foundational concepts to advanced security practices.",
      units: [
        {
          unitNumber: 1,
          title: "Cybersecurity Fundamentals & Threat Landscape",
          topics: [
            "CIA triad principles & security foundations",
            "Threat types & attack vectors",
            "Breach analysis & risk management basics",
          ],
        },
        {
          unitNumber: 2,
          title: "Networking & System Security",
          topics: [
            "OSI/TCP-IP models & protocols",
            "Subnetting & routing fundamentals",
            "Windows/Linux system hardening",
          ],
        },
        {
          unitNumber: 3,
          title: "Social Engineering & Access Control",
          topics: [
            "Human-factor security awareness",
            "Authentication & authorization methods",
            "RBAC & defense strategies",
          ],
        },
        {
          unitNumber: 4,
          title: "Cryptography & Data Protection",
          topics: [
            "Symmetric & asymmetric encryption",
            "Digital signatures & certificates",
            "Key management best practices",
          ],
        },
        {
          unitNumber: 5,
          title: "Web & Application Security",
          topics: [
            "OWASP Top 10 vulnerabilities",
            "Secure coding principles",
            "Web application penetration testing",
          ],
        },
        {
          unitNumber: 6,
          title: "Policies, Compliance & Incident Response",
          topics: [
            "Incident response procedures",
            "Disaster recovery & business continuity",
            "NIST & ISO/IEC 27001 frameworks",
          ],
        },
      ],
    },
    whoShouldJoin: {
      title: "Who Should Join This Program?",
      description: "Our program is designed to meet you where you are and take you where you want to go.",
      audiences: [
        {
          icon: "/icons/RocketLaunch.svg",
          title: "Absolute Beginners",
          description: "Starting a career in cybersecurity with no prior IT or security experience",
        },
        {
          icon: "/icons/Briefcase.svg",
          title: "Professionals Upskilling",
          description: "Adding in-demand cybersecurity skills to strengthen your technical profile",
        },
        {
          icon: "/icons/ArrowsClockwise.svg",
          title: "Career Switchers",
          description: "Transitioning into cybersecurity roles from IT or non-tech backgrounds",
        },
        // {
        //   icon: "/icons/Briefcase2.svg",
        //   title: "Career Changers",
        //   description: "Aspiring Analysts, Engineers, or Incident Responders",
        // },
      ],
    },
    outcomes: {
      title: "What You'll Be Able to Do After 12 Weeks",
      description: "Graduate with practical, job-ready skills that employers are actively seeking in the cybersecurity field.",
      items: [
        {
              icon: "/icons/mark.svg",
              title: "Threat Analysis & Risk Management",
              description: "Identify,and prioritize security threats while implementing risk mitigation strategies.",
            },
            {
              icon: "/icons/mark.svg",
              title: "Network & System Security",
              description: "Secure networks, systems, and infrastructure from intrusions.",
            },
            {
              icon: "/icons/mark.svg",
              title: "Access Control & Identity",
              description: "Implement authentication and authorization systems.",
            },
            {
              icon: "/icons/mark.svg",
              title: "Cryptography & Data Protection",
              description: "Master encryption and secure data handling techniques.",
            },
            {
              icon: "/icons/mark.svg",
              title: "Web & Application Security",
              description: "Prevent common web vulnerabilities using OWASP best practices.",
            },
            {
              icon: "/icons/mark.svg",
              title: "Incident Response & Compliance",
              description: "Handle security incidents and meet compliance standards.",
            },
        // "Identify,and prioritize security threats while implementing risk mitigation strategies.",
        // "Secure networks, systems, and infrastructure from intrusions.",
        // "Implement authentication and authorization systems.",
        // "Master encryption and secure data handling techniques.",
        // "Prevent common web vulnerabilities using OWASP best practices.",
        // "Handle security incidents and meet compliance standards.",
      ],
    },
    testimonials: [
      {
        name: "Chinedu M.",
        role: "Security Operations Analyst",
        rating: 5,
        text: "TI had zero cybersecurity background before joining this program. Within 12 weeks, I could confidently analyze threats, configure firewalls, and respond to security incidents.",
        avatar: "/images/peter.jpg"
      },
      {
        name: "Amara T.",
        role: "Incident Response Specialist",
        rating: 5,
        text: "The hands-on labs and real-world scenarios were my biggest wins. Working on actual security tools helped me understand how cybersecurity works in real companies.",
        avatar: "/images/testimonial-image-3.svg"
      },
      {
        name: "Emeka J.",
        role: "Network Security Engineer ",
        rating: 5,
        text: "As a career switcher, I needed clarity and direction. This program gave me both. The mentorship and portfolio support helped me transition into a security role in months.",
        avatar: "/images/testimonial-image-2.svg"
      },
    ],
    bonuses: [
      {
        icon: "linkedin",
        title: "LinkedIn Optimization"
      },
      {
        icon: "job",
        title: "Job Application Swipe File"
      },
      {
        icon: "network",
        title: "Alumni Network Access"
      },
      {
        icon: "support",
        title: "Portfolio Review & Support"
      },
    ],
    pricing: {
      title: "Full Program",
      price: "₦350,000",
      paymentOption: "One-time payment",
      features: [
        "Full 12-week program access",
        "Live Online classes",
        "Certificate of completion",
        "Portfolio Guidance",
        "Career support",
      ],
      buttonText: "Enroll Now",
    },
    faqs: [
      {
        question: "Do I need prior IT or security experience?",
        answer: "No prior experience is required. Our program is designed for complete beginners and provides a comprehensive foundation in cybersecurity.",
      },
      {
        question: "Is the course fully online?",
        answer: "The program covers cybersecurity fundamentals, network security, access control, cryptography, web application security, and incident response.",
      },
      {
        question: "Will I gain practical skills?",
        answer: "Yes, the program includes hands-on labs, real-world projects, and practical exercises to ensure you gain practical, job-ready skills.",
      },
      {
        question: "What career can I pursue after this course?",
        answer: "Graduates can pursue roles such as Cybersecurity Analyst, IT Security Specialist, Security Consultant, and other entry to mid-level cybersecurity positions.",
      },
    ],
    cta: {
      bg:"/images/csctabg.png",
      title: "Ready to Enter the Cybersecurity Field?",
      description: "Develop skills that are critical across industries worldwide and start your cybersecurity career today.",
      buttonText: "Apply Now!",
    },
  },
  {
    slug: "data-analytics",
    title: "Data Analytics",
    description: "Turn Your Curiosity Into a Data Career in Just 12 Weeks",
    hero: {
      title: "Turn Your Curiosity Into a Data Career in Just 12 Weeks",
      subTitle: "Learn to analyze, visualize, and model data using industry-standard tools fully online, beginner-friendly, and designed to help you build a strong data portfolio.",
      backgroundImage: "/images/programming-coding1.png",
      image: "/images/data-analysis.png"
    },
    whyChoose: {
      title: "Why Choose Our Online Data Analysis Program?",
      description: "A practical, beginner-friendly program focused on real-world data skills and portfolio-ready projects.",
      features: [
        // {
        //   icon: "/icons/RocketLaunch.svg",
        //   title: "Absolute Beginners",
        //   description: "Starting a career in data with no prior experience",
        // },
        // {
        //   icon: "/icons/Briefcase.svg",
        //   title: "Professionals Upskilling",
        //   description: "Adding high-demand data skills to your toolkit",
        // },
        // {
        //   icon: "/icons/ArrowsClockwise.svg",
        //   title: "Career Switchers",
        //   description: "Transitioning into analytics or tech from another field",
        // },
        // {
        //   icon: "/icons/LightbulbFilament.svg",
        //   title: "Curious Learners",
        //   description: "Anyone wanting practical, hands-on data experience",
        // },
        {
          icon: "/icons/MonitorPlay.svg",
          title: "Online Classes",
          description: "Live, interactive sessions with guided walkthroughs and real-time Q&A.",
        },
        {
          icon: "/icons/wifi.svg",
          title: "100% Online Learning",
          description: "Learn from anywhere with just your laptop and internet connection.",
        },
        {
          icon: "/icons/BookOpen.svg",
          title: "Beginner-Friendly",
          description: "No prior data experience needed, we start from the fundamentals.",
        },
        {
          icon: "/icons/Kanban.svg",
          title: "Hands-On Projects",
          description: "Work on real-world datasets and practical tasks to reinforce learning.",
        },
        {
          icon: "/icons/PenNib.svg",
          title: "Modern Tools",
          description: "Learn and practice with Excel, SQL, Python, and Power BI / Tableau.",
        },
        {
          icon: "/icons/PersonSimpleSwim.svg",
          title: "Complete Journey",
          description: "From data cleaning and analysis to visualization and basic machine learning.",
        },
      ],
    },
    learningJourney: {
      title: "Your Learning Journey",
      description: "A carefully structured 7-unit curriculum designed to take you from beginner to job-ready",
      units: [
        {
          unitNumber: 1,
          title: "Microsoft Excel",
          topics: [
            "Excel fundamentals & formulas",
            "Pivot tables",
            " Power Query and structured data organization.",
          ],
        },
        {
          unitNumber: 2,
          title: "SQL",
          topics: [
            "Database concepts",
            "Querying, filtering & joins",
            "Table management",
          ],
        },
        {
          unitNumber: 3,
          title: "Data Visualization",
          topics: [
            "Power BI/Tableau",
            "Data preprocessing & dashboards",
            "Interactive visual reports.",
          ],
        },
        {
          unitNumber: 4,
          title: "Python Fundamentals",
          topics: [
            "Python syntax & variables",
            "Loops & functions",
            "Modules for data analysis.",
          ],
        },
        {
          unitNumber: 5,
          title: "Python for Data Analysis",
          topics: [
            "NumPy + Pandas combined ",
            "Data cleaning & wrangling",
            "DataFrame operations.",
          ],
        },
        {
          unitNumber: 6,
          title: "ML & Advanced Visualization",
          topics: [
            "Plotly for interactive charts",
            "Introductory ML models for prediction and insights.",
          ],
        },
      ],
    },
    whoShouldJoin: {
      title: "Who Should Join This Program?",
      description: "Our program is designed to meet you where you are and take you where you want to go.",
      audiences: [
        {
          icon: "/icons/RocketLaunch.svg",
          title: "Absolute Beginners",
          description: "Starting a career in data with no prior experience",
        },
        {
          icon: "/icons/Briefcase.svg",
          title: "Professionals Upskilling",
          description: "Adding high-demand data skills to your toolkit",
        },
        {
          icon: "/icons/ArrowsClockwise.svg",
          title: "Career Switchers",
          description: "Transitioning into analytics or tech from another field",
        },
        // {
        //   icon: "/icons/Briefcase2.svg",
        //   title: "Portfolio-Ready",
        //   description: "Build projects that impress employers to hire you",
        // },
        // {
        //   icon: "/icons/BookOpen2.svg",
        //   title: "Beginner-friendly Structure",
        //   description: "No prior experience require",
        // },
      ],
    },
    outcomes: {
      title: "Data Analysis Skills You'll Gain",
      description: "Build practical data skills to analyze, visualize, and extract insights from real-world data.",
      items: [
        {
          icon: "/icons/mark.svg",
          title: "Data Cleaning & Preparation",
          description: "Organize, clean, and prepare raw data for accurate analysis.",
        },
        {
          icon: "/icons/mark.svg",
          title: "SQL & Data Querying",
          description: "Query, filter, and join datasets using SQL to answer real business questions.",
        },
        {
          icon: "/icons/mark.svg",
          title: "Data Analysis with Python",
          description: "Analyze datasets using Python, NumPy, and Pandas for deeper insights.",
        },
        {
          icon: "/icons/mark.svg",
          title: "Data Visualization & Dashboards",
          description: "Create clear, interactive dashboards using Power BI or Tableau.",
        },
        {
          icon: "/icons/mark.svg",
          title: "Statistical Thinking & Insights",
          description: "Interpret trends, patterns, and results to support decision-making.",
        },
        {
          icon: "/icons/mark.svg",
          title: "Introductory Machine Learning",
          description: "Build basic predictive models and understand core machine learning concepts.",
        },
        // "Gain core data analysis skills and industry-relevant tools",
        // "Build real-world projects for your portfolio",
        // "Receive job search assistance and interview guidance",
        // "Get personalized support throughout your learning journey",
        // "Study online with convenient access to learn at your own pace",
      ],
    },
    testimonials: [
      {
        name: "Adebayo O.",
        role: "Data Analyst at E-Commerce Startup",
        rating: 5,
        text: "I had zero data background before joining this program. Within 12 weeks, I could confidently analyze datasets, write SQL queries, and build dashboards in Power BI.",
        avatar: "/images/rilwan.jpg"
      },
      {
        name: "Fatima L.",
        role: "Junior Data Analyst",
        rating: 5,
        text: "The Python and data visualization modules were my biggest wins. Working on real datasets helped me understand how data analysis works in real companies.",
        avatar: "/images/testimonial-image-1.svg"
      },
      {
        name: "Samuel K.",
        role: "Business Intelligence Analyst",
        rating: 5,
        text: "As a career switcher, I needed clarity and direction. This program gave me both. The mentorship and portfolio support helped me transition into a data-focused role in months.",
        avatar: "/images/joseph.jpg"
      },
    ],
    bonuses: [
        {
            icon: "linkedin",
            title: "LinkedIn Optimization"
          },
          {
            icon: "job",
            title: "Job Application Swipe File"
          },
          {
            icon: "network",
            title: "Alumni Network Access"
          },
          {
            icon: "support",
            title: "Portfolio Review & Support"
          },
    ],
    pricing: {
      title: "Full Program",
      price: "N350,000",
      paymentOption: "One-time payment",
      features: [
        "Full 12-week program access",
        "Live Online classes",
        "Certificate of completion",
        "Portfolio Guidance",
        "Career support",
      ],
      buttonText: "Enroll Now",
    },
    faqs: [
      {
        question: "Do I need prior experience?",
        answer: "No prior experience is required. The program is designed for complete beginners and provides comprehensive training from the ground up.",
      },
      {
        question: "How is the certificate recognized?",
        answer: "Our certificate is recognized by industry professionals and employers. It demonstrates your commitment to learning and practical skills in data analytics.",
      },
      {
        question: "Can I pay in installments?",
        answer: "Yes, we offer flexible payment options including installment plans. Please contact us for more details.",
      },
      {
        question: "What happens if I miss a class?",
        answer: "All live classes are recorded and made available for review. You can access the recordings at any time to catch up on missed sessions.",
      },
      {
        question: "How long do I have access to the materials?",
        answer: "You will have lifetime access to all course materials, recordings, and resources after completing the program.",
      },
      {
        question: "Is there a certificate upon completion?",
        answer: "Yes, you will receive a certificate of completion upon successfully finishing the program.",
      },
    ],
    cta: {
      bg: "/images/datactabg.png",
      title: "Ready to Start Your Data Career?",
      description: "Join the 12-week Data Analysis & Machine Learning program and gain skills that employers are actively looking for.",
      buttonText: "Apply Now!",
    },
  },
  {
    slug: "full-stack-development",
    title: "Full-Stack Development",
    description: "Turn Your Passion for Tech Into a N250k - N1.5M+/Month Career",
    hero: {
      title: "Turn Your Passion for Tech Into a N250k - N1.5M+/Month Career",
      subTitle: "Our 18-week Online Full-Stack Development Program equips you with real coding skills, real projects, and a job-ready portfolio, even if you're starting from zero.",
      backgroundImage: "/images/programming-coding1.png",
      image: "/images/full-stack.png"
    },
    whyChoose: {
      title: "Why Choose Our Online Full Stack Web Development Program?",
      description: "A practical, beginner-friendly program focused on building real-world web applications and portfolio-ready projects.",
      features: [
        // {
        //   icon: "/icons/Code.svg",
        //   title: "Learn by Doing",
        //   description: "Build websites, dashboards, APIs, and full-stack apps from day one.",
        // },
        // {
        //   icon: "/icons/CalendarBlank.svg",
        //   title: "Structured Curriculum",
        //   description: "HTML→ CSS→Tailwind→JavaScript →TypeScript→React→Node.js→ Express→MongoDB→ SQL",
        // },
        // {
        //   icon: "/icons/MonitorPlay.svg",
        //   title: "Live Weekend Learning",
        //   description: "Perfect for full-time workers and busy schedules. Learn without quitting your job.",
        // },
        // {
        //   icon: "/icons/Clock.svg",
        //   title: "Self-Paced Recordings",
        //   description: "Missed a class? Catch up anytime with high-quality recorded sessions.",
        // },
        // {
        //   icon: "/icons/BriefcaseMetal.svg",
        //   title: "Real Portfolio Projects",
        //   description: "Graduate with 3+ portfolio-ready projects to show employers what you can build.",
        // },
        // {
        //   icon: "/icons/UsersThree.svg",
        //   title: "Community & Support",
        //   description: "Access tutors + active student community for daily help and networking.",
        // },
        {
          icon: "/icons/MonitorPlay.svg",
          title: "Online Classes",
          description: "Live, interactive coding sessions with guided explanations and live demos",
        },
        {
          icon: "/icons/wifi.svg",
          title: "100% Online Learning",
          description: "Learn from anywhere with just your laptop and internet connection.",
        },
        {
          icon: "/icons/BookOpen.svg",
          title: "Beginner-Friendly",
          description: "No prior coding experience needed, we start from the fundamentals.",
        },
        {
          icon: "/icons/Kanban.svg",
          title: "Hands-On Projects",
          description: "Build real-world frontend and backend applications to reinforce learning.",
        },
        {
          icon: "/icons/PenNib.svg",
          title: "Modern Tools",
          description: "Learn and work with modern technologies.",
        },
        {
          icon: "/icons/PersonSimpleSwim.svg",
          title: "Complete Journey",
          description: "From frontend interfaces to backend logic and deployment.",
        },
      ],
    },
    learningJourney: {
      title: "What You'll Learn in 16 Weeks",
      description: "A comprehensive learning journey designed to take you from beginner to a job-ready full-stack developer.",
      units: [
        {
          unitNumber: 1,
          title: "Web Foundations",
          topics: [
            "HTML& CSS",
            "Responsive design",
            "UI basics & developer tools.",
          ],
        },
        {
          unitNumber: 2,
          title: "JavaScript & TypeScript Essentials",
          topics: [
            "Core programming concepts",
            "Modern JS",
            "Strong TypeScript foundations.",
          ],
        },
        {
          unitNumber: 3,
          title: "Frontend Development with React",
          topics: [
            "Real-world frontend projects.",
            "Interactive UIs & components",
            "Props, state & hooks,",
          ],
        },
        {
          unitNumber: 4,
          title: "Backend Development with Node.js",
          topics: [
            "Servers & Express",
            "REST APIs, routing & authentication,",
            "Backend structure.",
          ],
        },
        {
          unitNumber: 5,
          title: "Databases & Deployment",
          topics: [
            "MongoDB, CRUD operations.",
            "Connecting backend to DB",
            "Deploying fullstack apps.",
          ],
        },
        {
          unitNumber: 6,
          title: "Git, GitHub & Version Control",
          topics: [
            "Branching & merging",
            "Pull requests",
            "Collaboration workflows used by teams.",
          ],
        },
      ],
    },
    whoShouldJoin: {
      title: "Who Should Join This Program?",
      description: "Our program is designed to meet you where you are and take you where you want to go.",
      audiences: [
        {
          icon: "/icons/RocketLaunch.svg",
          title: "Absolute Beginners",
          description: "Starting a career in web development with no prior coding experience",
        },
        {
          icon: "/icons/Briefcase.svg",
          title: "Professionals Upskilling",
          description: "Adding modern frontend and backend development skills to your toolkit",
        },
        {
          icon: "/icons/ArrowsClockwise.svg",
          title: "Career Switchers",
          description: "Transitioning into software development from another career path",
        },
        // {
        //   icon: "professional",
        //   title: "IT Professionals",
        //   description: "Enhance your existing skills and become full-stack ready.",
        // },
      ],
    },
    outcomes: {
      title: "Full Stack Web Development Skills You'll Gain",
      description: "Deploy applications and connect frontend, backend, and databases",
      items: [
        {
          icon: "/icons/mark.svg",
          title: "Frontend Development",
          description: "Build responsive user interfaces using HTML, CSS, JavaScript, and modern frameworks.",
        },
        {
          icon: "/icons/mark.svg",
          title: "JavaScript & TypeScript Fundamentals",
          description: "Write clean, reliable code using modern JavaScript and TypeScript.",
        },
        {
          icon: "/icons/mark.svg",
          title: "Backend Development",
          description: "Create servers, APIs, and application logic using Node.js and Express.",
        },
        {
          icon: "/icons/mark.svg",
          title: "Database Management",
          description: "Store and manage data using databases like MongoDB and SQL.",
        },
        {
          icon: "/icons/mark.svg",
          title: "Version Control & Collaboration",
          description: "Work professionally with Git, GitHub, branches, and pull requests.",
        },
        {
          icon: "/icons/mark.svg",
          title: "Deployment & Full-Stack Integration",
          description: "Deploy applications and connect frontend, backend, and databases",
        },
        // "18 weeks live training",
        // "Quality curriculum",
        // "Mentor support",
        // "Certificate included",
      ],
    },
    testimonials: [
      {
        name: "Daniel O.",
        role: "Backend Developer at Fintech Startup",
        rating: 5,
        text: "Zero coding experience to ₦500k/month backend role in just 8 months. The structured curriculum and mentor support made all the difference.",
        avatar: "/images/daniel.png"
      },
      {
        name: "Blessing A.",
        role: "Remote Frontend Developer",
        rating: 5,
        text: "Career switch from banking → $2,200/mo remote job with a US company. The very best investment I ever made in myself to be honest.",
        avatar: "/images/blessing.png"
      },
      {
        name: "Emmanuel K.",
        role: "Full-Stack Engineer",
        rating: 5,
        text: "The weekend schedule was really perfect for me. I could keep my job while learning. Now I'm earning 3x my previous salary. The best decision ever",
        avatar: "/images/emmanuel.png"
      },
    ],
    bonuses: [
        {
            icon: "linkedin",
            title: "LinkedIn Optimization"
          },
          {
            icon: "job",
            title: "Job Application Swipe File"
          },
          {
            icon: "network",
            title: "Alumni Network Access"
          },
          {
            icon: "support",
            title: "Portfolio Review & Support"
          },
    ],
    pricing: {
      title: "Full Program",
      price: "N350,000",
      paymentOption: "One-time payment",
      features: [
        "18 weeks of training",
        "Build real-world projects",
        "Expert support",
        "Flexible schedule",
        "Certificate of completion",
      ],
      buttonText: "Enroll Now",
    },
    faqs: [
      {
        question: "How long is the program?",
        answer: "The program is 18 weeks long, with live weekend classes and self-paced learning options.",
      },
      {
        question: "Is the program fully online?",
        answer: "Yes, the program is fully online with live weekend classes and recorded sessions available for review.",
      },
      {
        question: "Do I need prior experience?",
        answer: "No prior experience is required. The program is designed for complete beginners and provides comprehensive training from the ground up.",
      },
      {
        question: "What happens after I enroll?",
        answer: "After enrollment, you'll receive access to the learning platform, course materials, and join the community. You'll be notified about class schedules and program details.",
      },
      {
        question: "Can I pay in installments?",
        answer: "Yes, we offer flexible payment options including installment plans. Please contact us for more details.",
      },
    ],
    cta: {
      bg: "/images/fsctabg.png",
      title: "Your Tech Career Starts With One Decision",
      description: "In just 18 weeks, you could be applying for developer roles, working remotely, and earning globally. The only question is: will you start today?",
      buttonText: "Apply Now!",
    },
  },
  {
    slug: "ui-ux-design",
    title: "UI/UX Design",
    description: "Learn How to Design Beautiful, User-Friendly Digital Products",
    hero: {
      title: "Learn How to Design Beautiful, User-Friendly Digital Products",
      subTitle: "Our program is designed to help you develop the skills, knowledge, and portfolio needed to launch your career in UI/UX design.",
      backgroundImage: "/images/programming-coding1.png",
      image: "/images/ui-ux-design.png"
    },
    whyChoose: {
      title: "Why Learn UI/UX Design?",
      description: "Everything you need to launch your design career, packaged into a flexible format.",
      features: [
        // {
        //   icon: "/icons/VideoCamera.svg",
        //   title: "Online Classes",
        //   description: "Interactive sessions with real-time feedback and Q&A",
        // },
        // {
        //   icon: "/icons/wifi.svg",
        //   title: "100% Online Learning",
        //   description: "Learn from anywhere with just your laptop and internet connection",
        // },
        // {
        //   icon: "/icons/BookOpen.svg",
        //   title: "Beginner-Friendly",
        //   description: "No prior design experience needed, we start from the fundamentals",
        // },
        // {
        //   icon: "/icons/Kanban.svg",
        //   title: "Hands-On Projects",
        //   description: "Apply what you learn through real-world design challenges",
        // },
        // {
        //   icon: "/icons/PenNib.svg",
        //   title: "Modern Tools",
        //   description: "Master industry-standard tools like Figma, FigJam, and Miro",
        // },
        // {
        //   icon: "/icons/PersonSimpleSwim.svg",
        //   title: "Complete Journey",
        //   description: "From research to prototyping — learn the full product design process",
        // },
        {
          icon: "/icons/MonitorPlay.svg",
          title: "Online Classes",
          description: "Interactive sessions with real-time feedback and Q&A",
        },
        {
          icon: "/icons/wifi.svg",
          title: "100% Online Learning",
          description: "Learn from anywhere with just your laptop and internet connection.",
        },
        {
          icon: "/icons/BookOpen.svg",
          title: "Beginner-Friendly",
          description: "No prior design experience needed, we start from the fundamentals.",
        },
        {
          icon: "/icons/Kanban.svg",
          title: "Hands-On Projects",
          description: "Apply what you learn through real-world design challenges.",
        },
        {
          icon: "/icons/PenNib.svg",
          title: "Modern Tools",
          description: "Master industry-standard tools like Figma, FigJam, and Miro.",
        },
        {
          icon: "/icons/PersonSimpleSwim.svg",
          title: "Complete Journey",
          description: "From research to prototyping — learn the full product design process.",
        },
      ],
    },
    learningJourney: {
      title: "What You'll Learn In 12 Weeks",
      description: "A comprehensive journey from design fundamentals to building your portfolio.",
      units: [
        {
          unitNumber: 1,
          title: "Foundations of Product Design",
          topics: [
            "Introduction to UI/UX",
            "Design thinking process",
            "Product design lifecycle",
          ],
        },
        {
          unitNumber: 2,
          title: "User Research & UX Fundamentals",
          topics: [
            "User interviews & surveys",
            "Creating user personas",
            "Empathy mapping",
          ],
        },
        {
          unitNumber: 3,
          title: "Layout & Wireframing",
          topics: [
            "Information architecture",
            "User flows",
            "Sketches & Low-fidelity wireframes"
          ],
        },
        {
          unitNumber: 4,
          title: "Visual & Interface Design",
          topics: [
            "Typography & color usage",
            "Design systems",
            "High-fidelity wireframes"
          ],
        },
        {
          unitNumber: 5,
          title: "Prototyping & Interaction Design",
          topics: [
            "Interactive prototypes",
            "Micro-interactions",
            "Usability testing"
          ],
        },
        {
          unitNumber: 6,
          title: "Capstone Project + Portfolio Prep",
          topics: [
            "End-to-end case study",
            "Portfolio presentation",
            "Career preparation",
          ],
        },
      ],
    },
    whoShouldJoin: {
      title: "Who Should Join This Program?",
      description: "Our program is designed to meet you where you are and take you where you want to go.",
      audiences: [
        {
          icon: "/icons/RocketLaunch.svg",
          title: "Absolute Beginners",
          description: "Starting a career in UI/UX design with no prior design experience",
        },
        {
          icon: "/icons/Briefcase.svg",
          title: "Professionals Upskilling",
          description: "Adding product design and UI/UX skills to your existing career toolkit",
        },
        {
          icon: "/icons/ArrowsClockwise.svg",
          title: "Career Switchers",
          description: "Transitioning into product design from non-design or non-tech roles",
        },
        // {
        //   icon: "/icons/GraduationCap2.svg",
        //   title: "Students",
        //   description: "Building skills for future career opportunities",
        // },
        // {
        //   icon: "/icons/Briefcase2.svg",
        //   title: "Young Professionals",
        //   description: "Adding design skills to your toolkit",
        // },
        // {
        //   icon: "/icons/Lightbulb.svg",
        //   title: "Curious Minds",
        //   description: "Anyone interested in product or UX/UI design",
        // },
      ],
    },
    outcomes: {
      title: "What You'll Be Able to Do After 12 Weeks",
      description: "Great digital products don't happen by accident, they're intentionally designed with empathy, clarity, and purpose.. UI/UX remains one of the most in-demand careers in tech and digital product teams worldwide.",
      items: [
        {
          icon: "/icons/mark.svg",
          title: "User Research & Problem Definition",
          description: "Understand user needs through research, interviews, and insights to define problems.",
        },
        {
          icon: "/icons/mark.svg",
          title: "Information Architecture & UX Flows",
          description: "Structure content and design clear user journeys, flows, and navigation systems.",
        },
        {
          icon: "/icons/mark.svg",
          title: "Wireframing & Layout Design",
          description: "Create low- to mid-fidelity wireframes that translate ideas into usable layouts.",
        },
        {
          icon: "/icons/mark.svg",
          title: "Visual & Interface Design",
          description: "Design clean, modern interfaces with strong design principles.",
        },
        {
          icon: "/icons/mark.svg",
          title: "Prototyping & Interaction Design",
          description: "Build interactive prototypes to test ideas and demonstrate product behavior.",
        },
        {
          icon: "/icons/mark.svg",
          title: "Usability Testing & Iteration",
          description: "Validate designs through testing and refine solutions based on feedback.",
        },
        // "Create wireframes & flows",
        // "user journeys",
        // "Conduct user research",
        // "Design modern UI screens",
        // "Build interactive prototypes",
        // "Usability Testing",
        // "Present a full product case study",
        // "Build a polished portfolio project",
      ],
    },
    testimonials: [
      {
        name: "Ada M.",
        role: "Product Designer at Fintech Startup",
        rating: 5,
        text: "Before joining the UI/UX program, I had no design background. Within 3 months, I was confidently creating user flows, wireframes, and polished interfaces. ",
        avatar: "/images/blessing.png"
      },
      {
        name: "Ibrahim S.",
        role: "Freelance Product Designer",
        rating: 5,
        text: "The mentorship was the biggest game-changer for me. Getting feedback on my capstone project helped me refine my skills quickly.",
        avatar: "/images/rilwan.jpg"
      },
      {
        name: "Tosin K.",
        role: "UI/UX Designer at SaaS Company",
        rating: 5,
        text: "I switched from customer service into product design thanks to this program. A few months after finishing my portfolio, I landed a ₦350k/month design role.",
        avatar: "/images/testimonial-image-3.svg"
      },
    ],
    bonuses: [
        {
            icon: "linkedin",
            title: "LinkedIn Optimization"
          },
          {
            icon: "job",
            title: "Job Application Swipe File"
          },
          {
            icon: "network",
            title: "Alumni Network Access"
          },
          {
            icon: "support",
            title: "Portfolio Review & Support"
          },
    ],
    pricing: {
      title: "Full Program",
      price: "₦350,000",
      paymentOption: "One-time payment",
      features: [
        "Full 12-week program access",
        "Live Online classes",
        "Certificate of completion",
        "Portfolio Guidance",
        "Career support",
      ],
      buttonText: "Continue",
    },
    faqs: [
      {
        question: "What happens after I enroll?",
        answer: "After enrollment, you'll receive access to the learning platform, course materials, and join the design community. You'll be notified about class schedules and program details.",
      },
      {
        question: "Do I need a design background?",
        answer: "No design background is required. The program is designed for complete beginners and covers everything from fundamentals to advanced concepts.",
      },
      {
        question: "Can I pay in installments?",
        answer: "Yes, we offer flexible payment options including installment plans. Please contact us for more details.",
      },
      {
        question: "Is the program online?",
        answer: "Yes, the program is fully online with live sessions and recorded content available for flexible learning.",
      },
      {
        question: "Will I get a project?",
        answer: "Yes, you'll work on multiple projects throughout the program, culminating in a capstone project that becomes part of your portfolio.",
      },
      {
        question: "Will I get recordings?",
        answer: "Yes, all live sessions are recorded and made available for review. You'll have access to recordings throughout the program.",
      },
    ],
    cta: {
      bg: "/images/uictabg.png",
      title: "Ready to Start Your UI/UX Design Journey?",
      description: "Take the first step today, create meaningful digital products and open doors to new career opportunities.",
      buttonText: "Apply Now!",
    },
  },
];

export const getOnlineCourseBySlug = (slug: string): OnlineCourse | undefined => {
  return onlineCourses.find((course) => course.slug === slug);
};

