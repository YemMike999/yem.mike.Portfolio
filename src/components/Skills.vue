<template>
  <div class="skills-section p-st" :class="{ 'skills-dark': nightMode, 'skills-light': !nightMode }">
    <div class="container py-5">
      <!-- Title -->
      <div
        class="text-center mb-4"
        data-aos="fade"
        data-aos-once="true"
        data-aos-duration="900"
      >
        <h2 class="section-title" :class="{ 'text-light': nightMode }">
          Technical Expertise
        </h2>
      </div>

      <!-- Cards Grid -->
      <div class="skills-grid">
        <div
          v-for="(skill, idx) in cards"
          :key="skill.title"
          class="skill-card"
          data-aos="fade-up"
          data-aos-once="true"
          data-aos-duration="600"
          :style="{ 'transition-delay': idx / 10 + 's' }"
        >
          <div
            class="icon-badge"
            :style="{ background: skill.badgeBg, color: skill.badgeColor }"
          >
            <i :class="skill.icon"></i>
          </div>

          <h3 class="card-title" :class="{ 'text-light': nightMode }">
            {{ skill.title }}
          </h3>

          <p class="card-desc">
            {{ skill.desc }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import info from "../../info";

export default {
  name: "Skills",
  props: {
    nightMode: Boolean,
  },
  computed: {
    cards() {
      // colors like screenshot (orange, blue, green, purple)
      const palette = [
        { badgeBg: "rgba(246, 164, 0, 0.14)", badgeColor: "#f6a400" },
        { badgeBg: "rgba(59, 130, 246, 0.14)", badgeColor: "#3b82f6" },
        { badgeBg: "rgba(34, 197, 94, 0.14)", badgeColor: "#22c55e" },
        { badgeBg: "rgba(168, 85, 247, 0.14)", badgeColor: "#a855f7" },
      ];

      return (info.skills || []).map((s, i) => {
        const colors = palette[i % palette.length];

        return {
          title: s.title,
          icon: s.icon || "fas fa-code",
          // if you add s.desc in info.js it will use it
          desc: s.desc ? s.desc : (s.info ? s.info.join(", ") : ""),
          badgeBg: s.badgeBg || colors.badgeBg,
          badgeColor: s.badgeColor || colors.badgeColor,
        };
      });
    },
  },
};
</script>

<style scoped>
.skills-section.skills-dark {
  background: #111417; /* dark like screenshot */
}

.skills-section.skills-light {
  background: #ffffff;
}

.section-title {
  font-size: 28px;
  font-weight: 800;
  margin: 0;
}

/* 2 columns desktop, 1 column mobile */
.skills-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 22px;
}

@media (max-width: 992px) {
  .skills-grid {
    grid-template-columns: 1fr;
  }
}

/* Card style */
.skill-card {
  border-radius: 18px;
  padding: 26px;
  border: 1px solid rgba(255, 255, 255, 0.08);
  background: rgba(255, 255, 255, 0.03);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.25);
  transition: transform 0.25s ease, border-color 0.25s ease;
}

.skills-light .skill-card {
  border: 1px solid rgba(0, 0, 0, 0.08);
  background: rgba(0, 0, 0, 0.03);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.08);
}

.skill-card:hover {
  transform: translateY(-4px);
  border-color: rgba(255, 255, 255, 0.18);
}

.skills-light .skill-card:hover {
  border-color: rgba(0, 0, 0, 0.18);
}

/* icon badge */
.icon-badge {
  width: 46px;
  height: 46px;
  border-radius: 12px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 14px;
  font-size: 18px;
}

/* title + desc */
.card-title {
  font-size: 18px;
  font-weight: 800;
  margin: 0 0 8px 0;
}

.card-desc {
  margin: 0;
  font-size: 14px;
  line-height: 1.6;
  color: rgba(255, 255, 255, 0.65);
}

.skills-light .card-desc {
  color: rgba(0, 0, 0, 0.65);
}
</style>
