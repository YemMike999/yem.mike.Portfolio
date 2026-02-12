<template>
  <div>
    <div class="modal-mask" @click.self="$emit('close')">
      <div class="modal-wrapper">
        <div
          class="modal-container"
          :class="{ dark: nightMode, light: !nightMode }"
        >
          <!-- Header -->
          <div class="modal-head">
            <div class="modal-title" :class="{ 'text-light': nightMode }">
              {{ portfolio.name }}
            </div>

            <button class="icon-btn" @click="$emit('close')" type="button">
              <i class="fas fa-times"></i>
            </button>
          </div>

          <div class="divider"></div>

          <!-- Body -->
          <div class="modal-body">
            <div class="meta">
              <span>{{ portfolio.date }} • {{ portfolio.category }}</span>
            </div>

            <div class="tags">
              <span
                class="tag"
                v-for="tech in portfolio.technologies"
                :key="tech"
              >
                {{ tech }}
              </span>
            </div>

            <div class="desc">
              <span v-html="portfolio.description"></span>
            </div>

            <div class="divider soft"></div>

            <Gallery :images="portfolio.pictures" :design="true" />
          </div>

          <!-- Footer -->
          <div class="modal-foot">
            <button class="btn-accent" @click="$emit('close')" type="button">
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Gallery from "./Gallery";

export default {
  name: "Modal",
  components: { Gallery },
  props: {
    showModal: Boolean,
    portfolio: Object,
    nightMode: Boolean,
  },
  created() {
    document.getElementsByTagName("body")[0].classList.add("modal-open");
  },
};
</script>

<style scoped>
/* ✅ ACCENT COLOR */
.modal-container {
  --accent: #ff7a00;
  --accentSoft: rgba(255, 122, 0, 0.16);
}

body.modal-open {
  overflow: hidden;
}

/* Overlay */
.modal-mask {
  position: fixed;
  z-index: 9998;
  inset: 0;
  background: rgba(0, 0, 0, 0.55);
  backdrop-filter: blur(6px);
}

/* Center */
.modal-wrapper {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 18px;
}

/* Container (glass style like Skills) */
.modal-container {
  width: 46%;
  max-height: 78vh;
  border-radius: 18px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  border: 1px solid rgba(255, 255, 255, 0.08);
  background: rgba(255, 255, 255, 0.04);
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.35);
  transition: transform 0.25s ease;
}

.modal-container.light {
  border: 1px solid rgba(0, 0, 0, 0.08);
  background: rgba(255, 255, 255, 0.95);
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.15);
}

@media screen and (max-width: 1600px) {
  .modal-container {
    width: 64%;
  }
}
@media screen and (max-width: 1200px) {
  .modal-container {
    width: 86%;
  }
}
@media screen and (max-width: 580px) {
  .modal-container {
    width: 96%;
  }
}

/* Header */
.modal-head {
  padding: 18px 18px 10px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.modal-title {
  font-size: 20px;
  font-weight: 800;
  color: #111;
}
.dark .modal-title {
  color: #fff;
}

.icon-btn {
  border: none;
  outline: none;
  background: transparent;
  width: 38px;
  height: 38px;
  border-radius: 12px;
  cursor: pointer;
  color: rgba(0, 0, 0, 0.7);
  transition: background 0.2s ease, color 0.2s ease;
}

.dark .icon-btn {
  color: rgba(255, 255, 255, 0.8);
}

.icon-btn:hover {
  background: rgba(0, 0, 0, 0.06);
}
.dark .icon-btn:hover {
  background: rgba(255, 255, 255, 0.08);
}

/* Divider */
.divider {
  height: 1px;
  background: rgba(0, 0, 0, 0.08);
}
.dark .divider {
  background: rgba(255, 255, 255, 0.10);
}
.divider.soft {
  margin: 16px 0;
}

/* Body */
.modal-body {
  padding: 16px 18px 0;
  overflow-y: auto;
}

.meta {
  font-size: 13px;
  font-weight: 500;
  color: rgba(0, 0, 0, 0.6);
  margin-bottom: 10px;
}
.dark .meta {
  color: rgba(255, 255, 255, 0.65);
}

/* Tags (better than old badge) */
.tags {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-bottom: 12px;
}

.tag {
  padding: 6px 10px;
  border-radius: 999px;
  font-size: 12px;
  font-weight: 600;
  background: rgba(0, 0, 0, 0.05);
  color: rgba(0, 0, 0, 0.75);
  border: 1px solid rgba(0, 0, 0, 0.06);
}
.dark .tag {
  background: rgba(255, 255, 255, 0.06);
  color: rgba(255, 255, 255, 0.75);
  border: 1px solid rgba(255, 255, 255, 0.08);
}

/* Description */
.desc {
  text-align: justify;
  font-size: 14px;
  line-height: 1.7;
  color: rgba(0, 0, 0, 0.75);
}
.dark .desc {
  color: rgba(255, 255, 255, 0.72);
}

/* Footer */
.modal-foot {
  padding: 16px 18px 18px;
  display: flex;
  justify-content: center;
}

.btn-accent {
  width: 180px;
  border-radius: 12px;
  padding: 10px 14px;
  font-weight: 800;
  border: 1px solid var(--accent);
  background: transparent;
  color: var(--accent);
  transition: all 0.2s ease;
  cursor: pointer;
}

.btn-accent:hover {
  background: var(--accent);
  color: #111;
}
</style>
