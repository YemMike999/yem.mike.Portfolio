<template>
  <section
    class="about-section p-st py-5"
    :class="{ dark: nightMode, light: !nightMode }"
    id="about"
  >
    <div class="container">
      <!-- =========================
           ABOUT ME (center)
           ========================= -->
      <div
        class="about-hero"
        data-aos="fade"
        data-aos-once="true"
        data-aos-duration="900"
      >
        <div class="about-pill">{{ about.label }}</div>

        <h1 class="about-title">{{ about.title }}</h1>

        <p class="about-desc">
          {{ about.intro }}
        </p>
      </div>

      <!-- =========================
           PROFESSIONAL PROFILE (like screenshot)
           ========================= -->
      <div
        class="pro-wrap"
        data-aos="fade-up"
        data-aos-once="true"
        data-aos-duration="900"
      >
        <div class="pro-line"></div>
        <h2 class="pro-title">{{ about.sectionTitle }}</h2>

        <div class="pro-text">
          <p v-for="(p, i) in about.paragraphs" :key="i">{{ p }}</p>
        </div>
      </div>

      <!-- =========================
           EXPERIENCE
           ========================= -->
      <div class="exp-wrap">
        <div
          class="head"
          data-aos="fade"
          data-aos-once="true"
          data-aos-duration="900"
        >
          <h2 class="head-title">Experience</h2>
          <p class="head-sub">My professional journey and work experience</p>
        </div>

        <div class="row mt-4">
          <div
            class="col-xl-6 col-lg-6 col-md-12 mb-4"
            v-for="(exp, idx) in experienceList"
            :key="idx"
            data-aos="fade-up"
            data-aos-once="true"
            data-aos-duration="700"
          >
            <div class="exp-card" :class="{ 'exp-card-dark': nightMode }">
              <!-- Card head -->
              <div class="exp-card-head">
                <div class="logoWrap" :class="logoFitClass(exp)">
                  <img
                    v-if="resolveLogo(exp)"
                    :src="resolveLogo(exp)"
                    class="logoImg"
                    alt="logo"
                  />
                  <span v-else class="logoText">
                    {{ getInitials(exp.name || exp.position) }}
                  </span>
                </div>

                <div class="meta">
                  <div class="role">{{ exp.position || exp.name }}</div>
                  <div class="company">
                    {{ exp.name }}
                    <span class="sep">|</span>
                    {{ exp.date }}
                  </div>
                </div>
              </div>

              <!-- Bullets -->
              <ul class="bullets">
                <li v-for="(b, i) in getBullets(exp)" :key="i">{{ b }}</li>
              </ul>

              <!-- Skills badges -->
              <div class="skills" v-if="exp.skills && exp.skills.length">
                <span class="skill" v-for="s in exp.skills.slice(0, 8)" :key="s">
                  {{ s }}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- /Experience -->
    </div>
  </section>
</template>

<script>
import info from "../../info";

export default {
  name: "About",
  props: { nightMode: Boolean },
  computed: {
    experienceList() {
      return info.experience || [];
    },

    // ✅ Uses info.about from info.js (fallbacks safe)
    about() {
      const a = info.about || {};
      return {
        label: a.label || "ABOUT ME",
        
        intro: a.intro || info.description || "",
        sectionTitle: a.sectionTitle || "Professional Profile",
        paragraphs: Array.isArray(a.paragraphs)
          ? a.paragraphs
          : [
              "With over 2 years of hands-on experience in the software industry, I specialize in engineering robust web applications that solve real-world problems.",
              "I thrive in environments that challenge me to push the boundaries of what's possible with modern web technologies.",
            ],
      };
    },
  },
  methods: {
    getInitials(text) {
      if (!text) return "EX";
      const parts = String(text).trim().split(" ");
      if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
      return (parts[0].charAt(0) + parts[1].charAt(0)).toUpperCase();
    },

    // ✅ runtime-safe logo load (won't break compile if image missing)
    safeAsset(name) {
      try {
        return require(`@/assets/${name}`);
      } catch (e) {
        return null;
      }
    },

    resolveLogo(exp) {
      if (!exp) return null;

      // If you already set logo in info.js (require(...)), it will show
      if (exp.logo) return exp.logo;

      const name = (exp.name || "").toLowerCase();
      const pos = (exp.position || "").toLowerCase();

      // POS / Norton
      if (
        name === "nt" ||
        name.includes("norton") ||
        pos.includes("pos") ||
        pos.includes("coffee") ||
        pos.includes("shop")
      ) {
        return this.safeAsset("norton.png");
      }

      // EAST MICRO
      if (name.includes("east") || name.includes("micro")) {
        return this.safeAsset("eastmicro.png");
      }

      // Annex (optional)
      if (name.includes("annex")) {
        return this.safeAsset("annex.png");
      }

      return null;
    },

    // cover by default, but wide logos use contain
    logoFitClass(exp) {
      const name = (exp.name || "").toLowerCase();
      if (name.includes("east") || name.includes("micro")) return "fit-contain";
      return "fit-cover";
    },

    getBullets(exp) {
      if (!exp) return [];

      if (exp.highlights && exp.highlights.length) return exp.highlights;

      const name = (exp.name || "").toLowerCase();
      const pos = (exp.position || "").toLowerCase();

      if (
        name === "nt" ||
        name.includes("norton") ||
        pos.includes("pos") ||
        pos.includes("coffee")
      ) {
        return [
          "Developed a full-featured POS system with cashier and admin roles.",
          "Implemented real-time order tracking using Laravel WebSockets.",
          "Integrated QR code menus and Bakong KHQR e-payment flow.",
          "Built dashboards with Chart.js for sales analytics.",
        ];
      }

      if (name.includes("east") || name.includes("micro")) {
        return [
          "Entered and updated information into the system with accuracy.",
          "Modified data records and ensured consistency across reports.",
          "Organized documents and reports inside and outside the institution.",
          "Supported daily operations and administrative tasks.",
        ];
      }

      if (name.includes("wholesale") || name.includes("market") || pos.includes("sale")) {
        return [
          "Managed inventory and ensured stock availability.",
          "Supported daily sales operations and customer service.",
          "Coordinated restocking and product organization.",
          "Assisted with reporting and sales follow-ups.",
        ];
      }

      // Split description if exists
      if (exp.description && String(exp.description).trim().length) {
        const txt = String(exp.description).replace(/<[^>]*>/g, "").replace(/\r/g, "");
        const parts = txt
          .split(/\n|•|\./g)
          .map((s) => s.trim())
          .filter((s) => s.length > 8);
        if (parts.length) return parts.slice(0, 5);
      }

      return ["Delivered tasks and collaborated with teams to meet project goals."];
    },
  },
};
</script>

<style scoped>
/* Theme */
.about-section {
  --accent: #ff7a00;
}
.about-section.dark {
  background: #111417;
  color: #fff;
}
.about-section.light {
  background: #ffffff;
  color: #111;
}

/* ABOUT HERO */
.about-hero {
  text-align: center;
  padding: 22px 0 26px;
}
.about-pill {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 7px 14px;
  border-radius: 999px;
  font-weight: 900;
  letter-spacing: 1px;
  font-size: 12px;
  margin-bottom: 16px;
  color: var(--accent);
  background: rgba(255, 122, 0, 0.12);
  border: 1px solid rgba(255, 122, 0, 0.22);
}
.about-title {
  font-size: 58px;
  font-weight: 900;
  margin: 0;
  letter-spacing: -0.8px;
}
.about-desc {
  max-width: 820px;
  margin: 18px auto 0;
  font-size: 18px;
  line-height: 1.85;
  opacity: 0.7;
}

/* PROFESSIONAL PROFILE */
.pro-wrap {
  margin: 36px auto 0;
  max-width: 900px;
  text-align: left;
}
.pro-line {
  width: 40px;
  height: 4px;
  background: var(--accent);
  border-radius: 999px;
  margin-bottom: 14px;
}
.pro-title {
  font-size: 32px;
  font-weight: 900;
  margin: 0 0 12px;
}
.pro-text p {
  margin: 0 0 14px;
  line-height: 1.85;
  opacity: 0.72;
}

/* EXPERIENCE header */
.exp-wrap {
  margin-top: 42px;
}
.head-title {
  font-size: 46px;
  font-weight: 900;
  margin: 0;
  letter-spacing: -0.5px;
}
.head-sub {
  margin: 10px 0 0;
  font-size: 16px;
  opacity: 0.7;
}

/* Cards */
.exp-card {
  border-radius: 16px;
  padding: 18px 18px 16px;
  background: rgba(0, 0, 0, 0.03);
  border: 1px solid rgba(0, 0, 0, 0.10);
  box-shadow: 0 18px 55px rgba(0, 0, 0, 0.10);
  transition: 0.2s ease;
  height: 100%;
}
.exp-card:hover {
  transform: translateY(-2px);
  border-color: rgba(0, 0, 0, 0.16);
}
.exp-card-dark {
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.08);
  box-shadow: 0 22px 70px rgba(0, 0, 0, 0.45);
}
.exp-card-dark:hover {
  border-color: rgba(255, 122, 0, 0.55);
  box-shadow: 0 22px 70px rgba(0, 0, 0, 0.45), 0 0 0 1px rgba(255, 122, 0, 0.12);
}

/* head row */
.exp-card-head {
  display: flex;
  gap: 12px;
  align-items: center;
  margin-bottom: 12px;
}

/* logo box */
.logoWrap {
  width: 56px;
  height: 56px;
  border-radius: 16px;
  overflow: hidden;
  flex: 0 0 56px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid rgba(255, 255, 255, 0.10);
  background: rgba(255, 255, 255, 0.06);
}
.about-section.light .logoWrap {
  border: 1px solid rgba(0, 0, 0, 0.10);
  background: rgba(0, 0, 0, 0.03);
}

/* cover */
.fit-cover .logoImg {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
  display: block;
}

/* contain */
.fit-contain {
  padding: 8px;
  box-sizing: border-box;
}
.fit-contain .logoImg {
  width: 100%;
  height: 100%;
  object-fit: contain;
  object-position: center;
  display: block;
}

/* initials fallback */
.logoText {
  font-weight: 900;
  font-size: 14px;
  color: #111;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #ffb000, #ff7a00);
}

/* meta text */
.meta .role {
  font-size: 18px;
  font-weight: 900;
  line-height: 1.2;
}
.meta .company {
  margin-top: 2px;
  font-size: 13px;
  opacity: 0.7;
}
.sep {
  margin: 0 8px;
  opacity: 0.6;
}

/* bullets */
.bullets {
  list-style: none;
  padding: 0;
  margin: 0;
}
.bullets li {
  position: relative;
  padding-left: 18px;
  margin: 10px 0;
  line-height: 1.7;
  opacity: 0.92;
}
.bullets li::before {
  content: "•";
  position: absolute;
  left: 0;
  top: 0;
  color: var(--accent);
  font-size: 22px;
  line-height: 1;
}

/* skills */
.skills {
  margin-top: 12px;
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}
.skill {
  padding: 6px 10px;
  border-radius: 999px;
  font-size: 12px;
  font-weight: 900;
  background: rgba(255, 255, 255, 0.06);
  color: rgba(255, 255, 255, 0.85);
  border: 1px solid rgba(255, 255, 255, 0.12);
}
.about-section.light .skill {
  background: rgba(0, 0, 0, 0.05);
  color: rgba(0, 0, 0, 0.7);
  border: 1px solid rgba(0, 0, 0, 0.10);
}

/* responsive */
@media (max-width: 680px) {
  .about-title {
    font-size: 40px;
  }
  .head-title {
    font-size: 34px;
  }
  .about-desc {
    font-size: 16px;
  }
  .pro-title {
    font-size: 26px;
  }
}
</style>
