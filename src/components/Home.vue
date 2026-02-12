<template>
  <section
    class="home p-st pt-5"
    :class="{ dark: nightMode, light: !nightMode }"
    :style="themeStyle"
    id="home"
  >
    <div class="container" data-aos="fade" data-aos-once="true" data-aos-duration="900">
      <div class="row align-items-center">
        <!-- Image -->
        <div class="col-xl-6 col-lg-6 col-md-6 col-sm-12 text-center">
          <div class="img-wrap" :class="{ 'img-wrap-dark': nightMode }">
            <img :src="picture" alt="profile" class="profile-img" />
          </div>
        </div>

        <!-- Text -->
        <div class="col-xl-6 col-lg-6 col-md-6 col-sm-12 pt-4">
          <!-- ✅ Animated Title -->
          <h1 class="hero-title" :class="{ 'text-light': nightMode }">
            <span class="hello">Hello, I'm</span>
            <span class="name-wrap">
              <span class="name" :class="{ 'name-dark': nightMode }">{{ typedName }}</span>
              <span class="caret" aria-hidden="true">|</span>
            </span>
          </h1>

          <div class="underline" aria-hidden="true"></div>

          <p class="desc" :class="{ 'desc-dark': nightMode }" v-html="description"></p>

          <!-- Social Buttons -->
          <div class="pb-3">
            <button
              class="icon-btn"
              :class="{ 'icon-btn-dark': nightMode }"
              @click="openExternal('linkedin')"
              type="button"
              aria-label="LinkedIn"
              title="LinkedIn"
            >
              <i class="fab fa-linkedin"></i>
            </button>

            <button
              class="icon-btn"
              :class="{ 'icon-btn-dark': nightMode }"
              @click="openExternal('github')"
              type="button"
              aria-label="GitHub"
              title="GitHub"
            >
              <i class="fab fa-github"></i>
            </button>

            <button
              class="icon-btn"
              :class="{ 'icon-btn-dark': nightMode }"
              @click="openExternal('facebook')"
              type="button"
              aria-label="Facebook"
              title="Facebook"
            >
              <i class="fab fa-facebook-f"></i>
            </button>
          </div>

          <!-- ✅ Download Resume -->
          <a
            v-if="links.resume"
            class="btn-accent"
            :href="links.resume"
            download="Yem-Mike-CV.pdf"
          >
            Download Resume
          </a>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import info from "../../info";

export default {
  name: "Home",
  props: {
    nightMode: Boolean,
  },
  data() {
    return {
      fullName: "Yem Mike",
      typedName: "",
      typeIndex: 1,
      typingTimer: null,
      phase: "typing", // typing | pause | deleting
    };
  },
  computed: {
    themeStyle() {
      return {
        "--accent": info?.theme?.accent || "#ff7a00",
        "--accentSoft": info?.theme?.accentSoft || "rgba(255, 122, 0, 0.16)",
      };
    },
    picture() {
      return info.flat_picture;
    },
    description() {
      return info.description;
    },
    links() {
      return info.links || {};
    },
  },
  mounted() {
    this.startTyping();
  },
  beforeDestroy() {
    if (this.typingTimer) clearTimeout(this.typingTimer);
  },
  methods: {
    openExternal(key) {
      const url = this.links?.[key];
      if (!url) return;
      window.open(url, "_blank", "noopener,noreferrer");
    },

    // ✅ Typewriter (loop)
    startTyping() {
      const typeSpeed = 110;
      const deleteSpeed = 200;
      const pauseTime = 2000;

      const tick = () => {
        if (this.phase === "typing") {
          this.typedName = this.fullName.slice(0, this.typeIndex + 1);
          this.typeIndex++;

          if (this.typeIndex >= this.fullName.length) {
            this.phase = "pause";
            this.typingTimer = setTimeout(tick, pauseTime);
            return;
          }

          this.typingTimer = setTimeout(tick, typeSpeed);
          return;
        }

        if (this.phase === "pause") {
          this.phase = "deleting";
          this.typingTimer = setTimeout(tick, 350);
          return;
        }

        // deleting
        this.typedName = this.fullName.slice(0, this.typeIndex - 1);
        this.typeIndex--;

        if (this.typeIndex <= 0) {
          this.phase = "typing";
          this.typingTimer = setTimeout(tick, 450);
          return;
        }

        this.typingTimer = setTimeout(tick, deleteSpeed);
      };

      tick();
    },
  },
};
</script>

<style scoped>
/* Background */
.home {
  --photoY: 18%;
}

.home.dark {
  background: radial-gradient(900px 420px at 10% 0%, rgba(255,255,255,0.06), transparent 60%),
              radial-gradient(900px 420px at 90% 10%, var(--accentSoft), transparent 60%),
              #111417;
  color: #fff;
}

.home.light {
  background: radial-gradient(900px 420px at 10% 0%, rgba(0,0,0,0.03), transparent 60%),
              radial-gradient(900px 420px at 90% 10%, var(--accentSoft), transparent 60%),
              #ffffff;
  color: #111;
}

/* Image wrap */
.img-wrap {
  position: relative;
  display: inline-flex;
  padding: 14px;
  border-radius: 22px;
  background: rgba(0, 0, 0, 0.03);
  border: 1px solid rgba(0, 0, 0, 0.08);
  box-shadow: 0 18px 50px rgba(0, 0, 0, 0.1);
}
.img-wrap-dark {
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.08);
  box-shadow: 0 18px 50px rgba(0, 0, 0, 0.35);
}
.img-wrap-dark::before {
  content: "";
  position: absolute;
  inset: -10px;
  border-radius: 26px;
  background: radial-gradient(circle at 30% 20%, var(--accentSoft), transparent 60%);
  filter: blur(14px);
  z-index: 0;
}
.profile-img {
  position: relative;
  z-index: 1;
  width: min(420px, 100%);
  aspect-ratio: 4 / 5;
  height: auto;
  object-fit: cover;
  object-position: 50% var(--photoY);
  border-radius: 18px;
  display: block;
}

/* ✅ HERO TITLE ANIMATION */
.hero-title {
  font-size: 46px;
  font-weight: 900;
  line-height: 1.08;
  margin: 0 0 10px;
  letter-spacing: -0.5px;
}

.hello {
  display: block;
  font-size: 40px;
  opacity: 0;
  transform: translateY(14px);
  animation: helloIn 0.75s ease forwards;
}

.name-wrap {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  margin-top: 6px;
}

/* typed name */
.name {
  color: var(--accent);
  text-shadow: 0 14px 40px rgba(255, 122, 0, 0.12);
}

/* caret blink */
.caret {
  color: var(--accent);
  font-weight: 800;
  animation: caretBlink 0.8s infinite;
  transform: translateY(-1px);
}

/* underline grow like screenshot */
.underline {
  height: 4px;
  width: 0%;
  background: var(--accent);
  border-radius: 999px;
  margin: 6px 0 14px;
  animation: underlineGrow 0.85s ease forwards 0.35s;
  max-width: 360px;
}

@keyframes helloIn {
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
@keyframes underlineGrow {
  to {
    width: 72%;
  }
}
@keyframes caretBlink {
  0%, 49% { opacity: 1; }
  50%, 100% { opacity: 0; }
}

/* Description */
.desc {
  font-size: 14px;
  line-height: 1.8;
  color: rgba(0, 0, 0, 0.7);
  text-align: justify;
  max-width: 560px;
}
.desc-dark {
  color: rgba(255, 255, 255, 0.72);
}

/* Icon buttons */
.icon-btn {
  width: 44px;
  height: 44px;
  margin-right: 10px;
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

/* Button */
.btn-accent {
  margin-top: 8px;
  padding: 12px 18px;
  border-radius: 14px;
  border: 1px solid var(--accent);
  background: transparent;
  color: var(--accent);
  font-weight: 900;
  cursor: pointer;
  transition: all 0.2s ease;
  text-decoration: none;
  display: inline-flex;
  align-items: center;
}
.btn-accent:hover {
  background: var(--accent);
  color: #111;
}

/* Mobile */
@media only screen and (max-width: 580px) {
  .hero-title {
    font-size: 34px;
  }
  .hello {
    font-size: 30px;
  }
  .profile-img {
    width: 220px;
    aspect-ratio: 1 / 1;
    border-radius: 50%;
    object-position: 50% 20%;
  }
  .img-wrap {
    border-radius: 50%;
    padding: 10px;
  }
  .underline {
    max-width: 260px;
  }
}
</style>
