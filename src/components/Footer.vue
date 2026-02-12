<!-- Footer.vue (FULL) -->
<template>
  <footer class="footer" :class="{ dark: nightMode, light: !nightMode }">
    <div class="container py-3">
      <div class="footer-row">
        <!-- Center Text -->
        <div class="footer-left">
          <span class="copy">
            Made with <span class="heart" aria-label="love">♥</span> by <b>Yem Mike</b>
          </span>
        </div>

        <!-- Social Icons -->
        <div class="footer-right">
          <button
            class="icon-btn"
            :class="{ 'icon-btn-dark': nightMode }"
            @click="open('linkedin')"
            type="button"
            aria-label="Open LinkedIn"
            title="LinkedIn"
          >
            <i class="fab fa-linkedin"></i>
          </button>

          <button
            class="icon-btn"
            :class="{ 'icon-btn-dark': nightMode }"
            @click="open('github')"
            type="button"
            aria-label="Open GitHub"
            title="GitHub"
          >
            <i class="fab fa-github"></i>
          </button>

          <button
            class="icon-btn"
            :class="{ 'icon-btn-dark': nightMode }"
            @click="open('facebook')"
            type="button"
            aria-label="Facebook"
            title="Facebook"
          >
            <i class="fab fa-facebook-f"></i>
          </button>

          <button
            class="icon-btn"
            :class="{ 'icon-btn-dark': nightMode }"
            @click="open('resume')"
            type="button"
            aria-label="Open Resume"
            title="Resume"
          >
            <i class="fa fa-file"></i>
          </button>
        </div>
      </div>
    </div>
  </footer>
</template>

<script>
import info from "../../info";

export default {
  name: "Footer",
  props: {
    nightMode: Boolean,
  },
  computed: {
    urls() {
      return {
        linkedin: info?.links?.linkedin,
        github: info?.links?.github,
        facebook: info?.links?.facebook, // ✅ add facebook in info.js
        resume: info?.links?.resume,
      };
    },
  },
  methods: {
    open(key) {
      const url = this.urls?.[key];
      if (!url) return;
      window.open(url, "_blank", "noopener,noreferrer");
    },
  },
};
</script>

<style scoped>
/* ✅ Same theme as Home.vue */
.footer {
  --accent: #ff7a00;
  --accentSoft: rgba(255, 122, 0, 0.16);
  border-top: 1px solid rgba(160, 159, 159, 0.18);
  transition: background 0.2s ease;
  padding-bottom: 10px;
}

.footer.light {
  background: #ffffff;
  color: #111;
}

.footer.dark {
  background: #111417;
  color: #fff;
  border-top: 1px solid rgba(255, 255, 255, 0.08);
}

/* ✅ Layout: center text + icons on right */
.footer-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 14px;
}

/* ✅ Center text area */
.footer-left {
  flex: 1;
  text-align: center; /* ✅ center */
}

/* Icons on right */
.footer-right {
  display: flex;
  align-items: center;
  justify-content: flex-end;
}

/* ✅ Change font (use system font stack) */
.copy {
  font-size: 16px;           /* ✅ smaller + clean */
  font-weight: 600;
  letter-spacing: 0.2px;
  font-family: ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto, Arial, "Noto Sans", "Helvetica Neue", sans-serif;
  color: rgba(0, 0, 0, 0.65);
}

.footer.dark .copy {
  color: rgba(255, 255, 255, 0.72);
}

/* Heart */
.heart {
  color: var(--accent);
  margin: 0 6px;
  display: inline-block;
  transform: translateY(1px);
  font-size: 18px;
  line-height: 1;
  animation: pulse 1.2s ease-in-out infinite;
}

@keyframes pulse {
  0%,
  100% {
    transform: translateY(1px) scale(1);
  }
  50% {
    transform: translateY(1px) scale(1.12);
  }
}

/* ✅ Icon buttons like Home.vue */
.icon-btn {
  width: 44px;
  height: 44px;
  margin: 0 6px;
  border-radius: 14px;
  border: 1px solid rgba(0, 0, 0, 0.12);
  background: rgba(0, 0, 0, 0.03);
  color: rgba(0, 0, 0, 0.8);
  cursor: pointer;
  transition: all 0.2s ease;
  display: inline-flex;
  align-items: center;
  justify-content: center;
}

.icon-btn:hover {
  border-color: var(--accent);
  background: var(--accentSoft);
  color: var(--accent);
  transform: translateY(-2px);
}

.icon-btn-dark {
  border: 1px solid rgba(255, 255, 255, 0.12);
  background: rgba(255, 255, 255, 0.06);
  color: rgba(255, 255, 255, 0.85);
}

.icon-btn-dark:hover {
  border-color: var(--accent);
  background: var(--accentSoft);
  color: var(--accent);
}

/* Remove outlines */
button {
  outline: none !important;
  border: none;
}
button:focus {
  outline: none !important;
}

/* ✅ Mobile: everything centered */
@media screen and (max-width: 768px) {
  .footer-row {
    flex-direction: column;
    justify-content: center;
  }
  .footer-right {
    justify-content: center;
  }
}
</style>
