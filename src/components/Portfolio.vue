<template>
  <section
    class="portfolio p-st py-5"
    :class="{ dark: nightMode, light: !nightMode }"
    id="portfolio"
  >
    <div class="container">
      <!-- Title -->
      <div
        class="text-center"
        data-aos="fade"
        data-aos-once="true"
        data-aos-duration="900"
      >
        <h2 class="title">Portfolio</h2>
        <div class="underline"></div>
      </div>

      <!-- Tab -->
      <div class="tabs-wrap">
        <button class="tab active" type="button">Design</button>
      </div>

      <!-- EMPTY STATE -->
      <div v-if="items.length === 0" class="empty">
        <div class="empty-card">
          <div class="empty-title">No portfolio items found</div>
          <div class="empty-sub">
            Check <code>info.js</code> → <code>portfolio_design</code>
          </div>
        </div>
      </div>

      <!-- Cards -->
      <div v-else class="row justify-content-center cards-row">
        <div
          class="col-xl-4 col-lg-4 col-md-6 col-sm-12"
          v-for="(item, idx) in visibleItems"
          :key="idx"
        >
          <Card :portfolio="item" :nightMode="nightMode" @show="openModal" />
        </div>
      </div>

      <!-- Show more -->
      <div class="text-center mt-4" v-if="canShowMore">
        <button class="show-more" type="button" @click="loadMore">
          Show more
        </button>
      </div>
    </div>

    <!-- Modal -->
    <Modal
      v-if="selected"
      :showModal="true"
      :portfolio="selected"
      :nightMode="nightMode"
      @close="closeModal"
    />
  </section>
</template>

<script>
import info from "../../info";

// ✅ IMPORTANT: adjust these paths to match your project
// If your files are: src/components/Portfolio/helpers/Card.vue
import Card from "./helpers/Card.vue";
import Modal from "./helpers/Modal.vue";

export default {
  name: "Portfolio",
  components: { Card, Modal },
  props: {
    nightMode: Boolean,
  },
  data() {
    return {
      visibleCount: 6,
      selected: null,
    };
  },
  computed: {
    // ✅ always up-to-date even if you edit info.js
    items() {
      return (info && Array.isArray(info.portfolio_design)) ? info.portfolio_design : [];
    },
    visibleItems() {
      return this.items.slice(0, this.visibleCount);
    },
    canShowMore() {
      return this.visibleCount < this.items.length;
    },
  },
  methods: {
    loadMore() {
      this.visibleCount += 6;
    },
    openModal(item) {
      this.selected = item;
      document.body.classList.add("modal-open");
    },
    closeModal() {
      this.selected = null;
      document.body.classList.remove("modal-open");
    },
  },
  beforeDestroy() {
    document.body.classList.remove("modal-open");
  },
};
</script>

<style scoped>
.portfolio {
  --accent: #ff7a00;
  --accentSoft: rgba(255, 122, 0, 0.16);
  padding-top: 70px; /* ✅ helps if navbar fixed */
}

.portfolio.light {
  background: #ffffff;
  color: #111;
}

.portfolio.dark {
  background: #111417;
  color: #fff;
}

/* Title */
.title {
  font-size: 34px;
  font-weight: 900;
  margin: 0;
}

.underline {
  width: 120px;
  height: 3px;
  margin: 12px auto 0;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.12);
}

.portfolio.light .underline {
  background: rgba(0, 0, 0, 0.12);
}

/* Tabs */
.tabs-wrap {
  margin-top: 26px;
  margin-bottom: 26px;
  display: flex;
  justify-content: center;
  border-bottom: 1px solid rgba(255, 255, 255, 0.12);
  padding-bottom: 16px;
}

.portfolio.light .tabs-wrap {
  border-bottom: 1px solid rgba(0, 0, 0, 0.12);
}

.tab {
  padding: 10px 18px;
  border-radius: 999px;
  border: 1px solid rgba(255, 255, 255, 0.14);
  background: rgba(255, 255, 255, 0.06);
  color: rgba(255, 255, 255, 0.75);
  font-weight: 900;
  text-transform: uppercase;
  letter-spacing: 0.6px;
  font-size: 12px;
}

.portfolio.light .tab {
  border: 1px solid rgba(0, 0, 0, 0.12);
  background: rgba(0, 0, 0, 0.03);
  color: rgba(0, 0, 0, 0.65);
}

.tab.active {
  border-color: var(--accent);
  color: var(--accent);
  box-shadow: 0 10px 26px rgba(0, 0, 0, 0.10);
}

/* Cards spacing */
.cards-row {
  margin-top: 8px;
}

/* Show more button */
.show-more {
  padding: 10px 18px;
  border-radius: 14px;
  border: 1px solid var(--accent);
  background: transparent;
  color: var(--accent);
  font-weight: 900;
  cursor: pointer;
  transition: 0.2s ease;
}

.show-more:hover {
  background: var(--accent);
  color: #111;
}

/* Empty state */
.empty {
  margin-top: 40px;
  display: flex;
  justify-content: center;
}

.empty-card {
  width: 100%;
  max-width: 520px;
  border-radius: 16px;
  padding: 18px;
  text-align: center;
  border: 1px solid rgba(255, 255, 255, 0.10);
  background: rgba(255, 255, 255, 0.04);
}

.portfolio.light .empty-card {
  border: 1px solid rgba(0, 0, 0, 0.10);
  background: rgba(0, 0, 0, 0.03);
}

.empty-title {
  font-weight: 900;
  font-size: 16px;
}

.empty-sub {
  margin-top: 10px;
  opacity: 0.75;
  line-height: 1.6;
}

.empty code {
  padding: 3px 8px;
  border-radius: 8px;
  background: rgba(0, 0, 0, 0.15);
  color: #fff;
}

.portfolio.light .empty code {
  background: rgba(0, 0, 0, 0.08);
  color: #111;
}
</style>
