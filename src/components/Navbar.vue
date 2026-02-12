<template>
  <div>
    <nav
      class="navbar navbar-expand-lg fixed-top p-st"
      :class="{
        'nav-light': !nightMode,
        'nav-dark': nightMode,
        'navbar-blur': navbarConfig.blur,
      }"
    >
      <div class="container">
        <!-- Logo -->
        <a class="navbar-brand" href="/" @click.prevent="$emit('scroll', 'home')">
          <Logo :nightMode="nightMode" />
        </a>

        <!-- Mobile toggle -->
        <button
          class="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="toggle-icon">
            <i class="fas fa-bars"></i>
          </span>
        </button>

        <!-- Links -->
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <ul class="navbar-nav ml-auto align-items-lg-center">
            <li class="nav-item mx-2">
              <a class="nav-link" href="/about" @click.prevent="$emit('scroll', 'about')">
                About
              </a>
            </li>

            <li class="nav-item mx-2">
              <a class="nav-link" href="/skills" @click.prevent="$emit('scroll', 'skills')">
                Skills
              </a>
            </li>

            <li class="nav-item mx-2">
              <a class="nav-link" href="/portfolio" @click.prevent="$emit('scroll', 'portfolio')">
                Portfolio
              </a>
            </li>

            <li class="nav-item mx-2">
              <a class="nav-link" href="/contact" @click.prevent="$emit('scroll', 'contact')">
                Contact
              </a>
            </li>

            <!-- ✅ Download CV -->
            <li class="nav-item mx-2" v-if="resume">
              <a
                class="nav-link"
                :href="resume"
                download="Yem-Mike-CV.pdf"
                title="Download CV"
              >
                <i class="fas fa-download mr-1"></i> CV
              </a>
            </li>

            <!-- Language Switch (UI only) -->
            <li class="nav-item ml-2 d-flex align-items-center">
              <div class="lang-wrap" :class="{ 'lang-dark': nightMode }">
                <button
                  class="lang-btn"
                  :class="{ active: lang === 'EN' }"
                  @click.prevent="setLang('EN')"
                  type="button"
                >
                  EN
                </button>
                <button
                  class="lang-btn"
                  :class="{ active: lang === 'KH' }"
                  @click.prevent="setLang('KH')"
                  type="button"
                >
                  KH
                </button>
              </div>
            </li>

            <!-- Dark/Light -->
            <li class="nav-item ml-2">
              <button
                class="mode-btn"
                type="button"
                @click.prevent="switchMode"
                :class="{ 'mode-btn-dark': nightMode }"
                aria-label="Toggle dark mode"
                title="Toggle theme"
              >
                <i :class="nightMode ? 'fas fa-moon' : 'far fa-moon'"></i>
              </button>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  </div>
</template>

<script>
import Logo from "./helpers/Logo";
import info from "../../info";

export default {
  name: "Navbar",
  components: { Logo },
  props: {
    nightMode: Boolean,
  },
  data() {
    return {
      navbarConfig: info.config.navbar,
      localNightMode: this.nightMode,
      lang: localStorage.getItem("lang") || "EN",
    };
  },
  computed: {
    resume() {
      return info?.links?.resume || "";
    },
  },
  watch: {
    nightMode(val) {
      this.localNightMode = val;
    },
  },
  methods: {
    switchMode() {
      this.localNightMode = !this.localNightMode;
      this.$emit("nightMode", this.localNightMode);
    },
    setLang(l) {
      this.lang = l;
      localStorage.setItem("lang", l);
    },
  },
};
</script>

<style scoped>
/* keep your styles same */
nav {
  --accent: #ff7a00;
  --accentSoft: rgba(255, 122, 0, 0.16);
  border-bottom: 1px solid rgba(160, 159, 159, 0.18);
  transition: background 0.2s ease, border-color 0.2s ease;
}

.nav-light {
  background: #ffffff;
  color: #111;
}
.nav-dark {
  background: #111417;
  color: #fff;
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
}

.navbar-blur.nav-light {
  background-color: rgba(255, 255, 255, 0.7) !important;
  backdrop-filter: blur(12px);
}
.navbar-blur.nav-dark {
  background-color: rgba(17, 20, 23, 0.72) !important;
  backdrop-filter: blur(12px);
}

.toggle-icon {
  color: rgba(0, 0, 0, 0.6);
  font-size: 22px;
}
.nav-dark .toggle-icon {
  color: rgba(255, 255, 255, 0.8);
}

.nav-link {
  font-weight: 700;
  border-radius: 10px;
  padding: 7px 12px;
  transition: 0.2s ease;
  color: rgba(0, 0, 0, 0.78);
}
.nav-dark .nav-link {
  color: rgba(255, 255, 255, 0.82);
}

.nav-link:hover {
  background: rgba(0, 0, 0, 0.06);
  color: rgba(0, 0, 0, 0.9);
}
.nav-dark .nav-link:hover {
  background: rgba(255, 255, 255, 0.06);
  color: rgba(255, 255, 255, 0.95);
}

.lang-wrap {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 6px;
  border-radius: 999px;
  background: rgba(0, 0, 0, 0.04);
  border: 1px solid rgba(0, 0, 0, 0.12);
}
.lang-dark {
  background: rgba(255, 255, 255, 0.06);
  border: 1px solid rgba(255, 255, 255, 0.12);
}

.lang-btn {
  background: transparent;
  padding: 7px 12px;
  border-radius: 999px;
  font-weight: 900;
  cursor: pointer;
  line-height: 1;
  transition: 0.2s ease;
  color: rgba(0, 0, 0, 0.55);
}
.lang-dark .lang-btn {
  color: rgba(255, 255, 255, 0.65);
}
.lang-btn:hover {
  color: var(--accent);
}
.lang-btn.active {
  background: var(--accent);
  color: #111;
  box-shadow: 0 10px 22px rgba(255, 122, 0, 0.25);
}

.mode-btn {
  width: 44px;
  height: 44px;
  border-radius: 14px;
  border: 1px solid rgba(0, 0, 0, 0.12);
  background: rgba(0, 0, 0, 0.03);
  cursor: pointer;
  transition: 0.2s ease;
  color: rgba(0, 0, 0, 0.75);
}
.mode-btn:hover {
  border-color: var(--accent);
  background: var(--accentSoft);
  color: var(--accent);
  transform: translateY(-1px);
}

.mode-btn-dark {
  border: 1px solid rgba(255, 255, 255, 0.12);
  background: rgba(255, 255, 255, 0.06);
  color: rgba(255, 255, 255, 0.85);
}
.mode-btn-dark:hover {
  border-color: var(--accent);
  background: var(--accentSoft);
  color: var(--accent);
}

button {
  outline: none !important;
  border: none;
}
button:focus {
  outline: none !important;
}

@media screen and (max-width: 991px) {
  .lang-wrap {
    margin-top: 10px;
    margin-bottom: 10px;
  }
  .mode-btn {
    margin-top: 6px;
  }
}
</style>
