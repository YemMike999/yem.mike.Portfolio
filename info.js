// info.js (FULL)

const info = {
  // =========================
  // Basic Info
  // =========================
  name: "Yem Mike",
  logo_name: "Yem Mike",
  flat_picture: require("./src/assets/me.png"),

  // =========================
  // Global Theme
  // =========================
  theme: {
    accent: "#ff7a00",
    accentSoft: "rgba(255, 122, 0, 0.16)",
    darkBg: "#111417",
    lightBg: "#ffffff",
    textDark: "#111",
    textLight: "#fff",
  },

  // =========================
  // Config
  // =========================
  config: {
    use_cookies: true,
    navbar: { blur: false },
    footer: { year: new Date().getFullYear() },
  },

  // =========================
  // Hero / About Description
  // =========================
  description:
    "Junior Web Developer",

  // (Optional) Extra About content (if you want to use it in About.vue)
  about: {
    label: "ABOUT ME",
    title: "About Me",
    intro:
      "I'm a passionate junior web developer with a strong foundation in modern web technologies. I love creating seamless user experiences and writing clean, maintainable code. My journey in web development is driven by curiosity and a desire to continuously learn and improve.",
    sectionTitle: "Professional Profile",
    paragraphs: [
      "I have successfully delivered a diverse range of projects, including enterprise-grade POS systems and high-traffic e-commerce platforms. I thrive in environments that challenge me to push the boundaries of what's possible with modern web technologies.",
      "My goal is to continue building software that empowers users and drives business growth through technical excellence.",
    ],
  },

  // =========================
  // Links
  // =========================
  links: {
    linkedin: "https://www.linkedin.com/in/yemmike/",
    github: "https://github.com/YemMike999",
    behance: "https://web.facebook.com/yem.mike.technozoon",

    // ✅ Because your file is in: public/yem.mike.cv.pdf
    // The correct public URL is:
    resume: "/yem.mike.cv.pdf",

    // ✅ recommended fix
    email: "yem.mike.official@gmail.com",

    phone: "+885 70 500 313",
    location: "Egypt",
  },

  // =========================
  // Education
  // =========================
  education: [
    {
      name: "KFS University",
      place: "Kafr Elsheikh",
      date: "Sep, 2018 - Present",
      degree: "Bachelor in Software Engineering",
      gpa: "3.1/4.0",
      description: "",
      skills: [
        "Software Engineering",
        "Web Programming",
        "UI/UX Design",
        "Front-end Development",
      ],
    },
  ],

  // =========================
  // Experience
  // =========================
  experience: [
    {
      name: "NT",
      place: "Kafr Elsheikh, Egypt",
      date: "Sep 1, 2021 - Sep 28, 2021",
      position: "Develop Coffee Shop POS System",
      logo: require("./src/assets/norton.png"),
      highlights: [
        "Developed a full-featured POS system with cashier and admin roles.",
        "Implemented real-time order tracking using Laravel WebSockets.",
        "Integrated QR code menus and Bakong KHQR e-payment flow.",
        "Built dashboards with Chart.js for sales analytics.",
      ],
      skills: ["HTML5", "CSS3", "Bootstrap", "JavaScript", "Vue.js"],
    },

    {
      name: "EAST MICRO",
      place: "Main",
      date: "2024 - 2026",
      position: "Assistant Operation",
      logo: require("./src/assets/eastmicro.png"),
      highlights: [
        "Entered and updated information into the system with accuracy.",
        "Modified data records and ensured consistency across reports.",
        "Organized documents and reports inside and outside the institution.",
        "Supported daily operations and administrative tasks.",
      ],
      skills: ["Excel", "Word", "Reporting", "Data Entry"],
    },

    {
      name: "DS WHOLESALE MARKET",
      place: "Main",
      date: "2022 - 2024",
      position: "Sales Supervisor",
      highlights: [
        "Managed inventory and ensured stock availability.",
        "Supported daily sales operations and customer service.",
        "Coordinated restocking and product organization.",
        "Assisted with reporting and sales follow-ups.",
      ],
      skills: ["Sales", "Stock Management"],
    },
  ],

  // =========================
  // Skills
  // =========================
  skills: [
    {
      title: "Frontend Engineering",
      desc: "Building responsive UI with Vue, React and modern CSS.",
      info: ["Vue", "React", "HTML5", "CSS3", "Bootstrap", "ES6"],
      icon: "fas fa-code",
      badgeBg: "rgba(255, 122, 0, 0.16)",
      badgeColor: "#ff7a00",
    },
    {
      title: "UI/UX Design",
      desc: "Designing clean interfaces and consistent design systems.",
      info: ["Figma", "Illustrator", "Adobe XD", "Photoshop", "Gimp"],
      icon: "fa fa-pencil-square-o",
      badgeBg: "rgba(0, 200, 255, 0.16)",
      badgeColor: "#00c8ff",
    },
    {
      title: "Programming Languages",
      desc: "Writing clean code with JavaScript/TypeScript and more.",
      info: ["JavaScript", "TypeScript", "Python", "Java", "C#"],
      icon: "fa fa-code",
      badgeBg: "rgba(0, 255, 150, 0.16)",
      badgeColor: "#00ff96",
    },
    {
      title: "Tools & Technologies",
      desc: "Working with modern tools and libraries for web development.",
      info: ["Node", "Git", "APIs", "REST", "Webpack"],
      icon: "fas fa-laptop-code",
      badgeBg: "rgba(190, 0, 255, 0.16)",
      badgeColor: "#be00ff",
    },
  ],

  // =========================
  // Portfolio (UI/UX Designs)
  // =========================
  portfolio_design: [
    {
      name: "Keep it Green",
      title: "UI/UX Design",
      pictures: [
        { img: require("./src/assets/designs/Keep it green/cover.png"), title: "MoodBoard" },
        { img: require("./src/assets/designs/Keep it green/show.png"), title: "Show" },
      ],
      technologies: ["Figma", "Photoshop"],
      category: "Visual Design",
      github: "",
      date: "Jan, 2022",
      visit: "",
      description: "UI/UX case study and visual concept.",
    },
    {
      name: "Digital agency website",
      title: "UI/UX Design",
      pictures: [
        { img: require("./src/assets/designs/digital agency/behance cover.png"), title: "Cover" },
        { img: require("./src/assets/designs/digital agency/1. start.png"), title: "Start" },
        { img: require("./src/assets/designs/digital agency/2. about.png"), title: "About" },
        { img: require("./src/assets/designs/digital agency/3. Our services.png"), title: "Services" },
        { img: require("./src/assets/designs/digital agency/4. latest project.png"), title: "Latest Project" },
        { img: require("./src/assets/designs/digital agency/5. Contact us.png"), title: "Contact" },
      ],
      technologies: ["Figma", "Illustrator"],
      category: "Visual Design",
      github: "",
      date: "Dec, 2021",
      visit: "",
      description: "",
    },
    {
      name: "Credit card design",
      title: "Illustration",
      pictures: [
        { img: require("./src/assets/designs/credit/behance cover.png"), title: "Cover" },
        { img: require("./src/assets/designs/credit/degisning.png"), title: "Designing" },
        { img: require("./src/assets/designs/credit/Dual tune.png"), title: "Dual tone" },
        { img: require("./src/assets/designs/credit/Glassmorphism.png"), title: "Glassmorphism" },
        { img: require("./src/assets/designs/credit/Gradiant.png"), title: "Gradient" },
        { img: require("./src/assets/designs/credit/Monochrome.png"), title: "Monochrome" },
        { img: require("./src/assets/designs/credit/Neumorphism.png"), title: "Neumorphism" },
      ],
      technologies: ["Figma", "Illustrator"],
      category: "Visual Design",
      github: "",
      date: "Dec, 2022",
      visit: "",
      description: "",
    },
    {
      name: "BOOKSI",
      title: "E-Book library - UI/UX Design",
      pictures: [
        { img: require("./src/assets/designs/booksi/behance cover.png"), title: "Cover" },
        { img: require("./src/assets/designs/booksi/behance board.png"), title: "MoodBoard" },
        { img: require("./src/assets/designs/booksi/login.png"), title: "Login" },
        { img: require("./src/assets/designs/booksi/register.png"), title: "Register" },
        { img: require("./src/assets/designs/booksi/home page.png"), title: "Home Page" },
        { img: require("./src/assets/designs/booksi/For you.png"), title: "For you" },
      ],
      technologies: ["Figma", "Photoshop"],
      category: "Visual Design",
      github: "",
      date: "Nov, 2021",
      visit: "",
      description: "BOOKSI is an Ebook android app for easy reading books.",
    },
    {
      name: "Quiet Weather",
      title: "UI/UX Design",
      pictures: [
        { img: require("./src/assets/designs/weather/Wooden Hand iPhone 12 Pro.png"), title: "Mockup" },
        { img: require("./src/assets/designs/weather/artboard.png"), title: "Artboard" },
        { img: require("./src/assets/designs/weather/weather app react native.png"), title: "Components" },
      ],
      technologies: ["Figma", "Illustrator"],
      category: "Visual Design",
      github: "",
      date: "Nov, 2021",
      visit: "",
      description:
        "Quiet Weather is a React Native app using OpenWeatherMap API. I designed the UI/UX and coded it in React Native.",
    },
    {
      name: "Pill Reminder",
      title: "Pill Reminder - Mockup Design",
      pictures: [
        { img: require("./src/assets/designs/pill reminder/Web 1.png"), title: "Moodboard" },
        { img: require("./src/assets/designs/pill reminder/1.png"), title: "Mockup 1" },
        { img: require("./src/assets/designs/pill reminder/2.png"), title: "Mockup 2" },
      ],
      technologies: ["Adobe XD", "Illustrator"],
      category: "Visual Design",
      github: "",
      date: "Apr, 2021",
      visit: "",
      description: "Pill reminder app for necessary daily medication tracking.",
    },
  ],

  // =========================
  // Portfolio (Web Projects)
  // =========================
  portfolio: [
    {
      name: "Diary App",
      pictures: [
        { img: require("./src/assets/portfolio/diary/1.png") },
        { img: require("./src/assets/portfolio/diary/2.png") },
        { img: require("./src/assets/portfolio/diary/3.png") },
      ],
      technologies: ["React", "SCSS", "Local Storage"],
      category: "Web App",
      date: "Aug, 2021 - 20 days",
      github: "https://github.com/mahy209/notes-react-app.git",
      visit: "https://github.com/mahy209/notes-react-app.git",
      description:
        "Diary React app with features: Dark mode, upload images, tags, and search by title/content/tag.",
    },
    {
      name: "Online Examination",
      pictures: [
        { img: require("./src/assets/portfolio/online examination/exam (1).png") },
        { img: require("./src/assets/portfolio/online examination/exam (2).png") },
        { img: require("./src/assets/portfolio/online examination/exam (3).png") },
        { img: require("./src/assets/portfolio/online examination/exam (4).png") },
        { img: require("./src/assets/portfolio/online examination/exam (5).png") },
      ],
      technologies: ["HTML", "CSS", "JavaScript", "jQuery", "PHP", "MySQL"],
      category: "Web App",
      date: "Apr, 2021 - May, 2021",
      github: "https://github.com/mahy209/online-examination.git",
      visit: "https://github.com/mahy209/online-examination.git",
      description:
        "Online Examination System (PHP/MySQL) with admin and student flows, question management, timed exams, and results.",
    },
    {
      name: "MyFlix.com",
      pictures: [
        { img: require("./src/assets/portfolio/myflix.com/1.png") },
        { img: require("./src/assets/portfolio/myflix.com/2.png") },
        { img: require("./src/assets/portfolio/myflix.com/3.png") },
        { img: require("./src/assets/portfolio/myflix.com/4.png") },
      ],
      technologies: ["React", "CSS", "TMDB API"],
      category: "Web App",
      date: "Aug, 2021 - 10 days",
      github: "https://github.com/mahy209/MyFlix-react-app.git",
      visit: "https://github.com/mahy209/MyFlix-react-app.git",
      description: "Netflix clone using React and TMDB with carousel and search.",
    },
  ],
};

export default info;
