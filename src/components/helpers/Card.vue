<template>
  <div class="my-3 mx-3">
    <div class="p-card" :class="{ 'p-card-dark': nightMode }">
      <!-- Image -->
      <div class="cover">
        <img class="cover-img" :src="coverImage" :alt="portfolio && portfolio.name ? portfolio.name : 'portfolio'" />
      </div>

      <!-- Body -->
      <div class="body">
        <h5 class="name" :class="{ 'text-light': nightMode }">
          {{ portfolio && portfolio.name ? portfolio.name : "Untitled" }}
        </h5>

        <!-- Tech -->
        <div class="badges">
          <span
            class="tag"
            v-for="tech in techList"
            :key="tech"
            :class="{ 'tag-dark': nightMode }"
          >
            {{ tech }}
          </span>
        </div>

        <!-- Desc -->
        <p class="desc" :class="{ 'desc-dark': nightMode }">
          {{ shortDesc }}
        </p>

        <!-- Actions -->
        <div class="actions">
          <button class="btn-accent" type="button" @click.prevent="showModal">
            Read more
          </button>

          <button
            v-if="portfolio && portfolio.visit"
            class="btn-ghost"
            type="button"
            @click.prevent="open(portfolio.visit)"
          >
            Visit website
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Card",
  props: {
    portfolio: {
      type: Object,
      required: true,
    },
    nightMode: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    coverImage() {
      // ✅ Safe check (prevents crash)
      if (!this.portfolio || !this.portfolio.pictures || !this.portfolio.pictures.length) {
        return "https://picsum.photos/900/600";
      }

      const first = this.portfolio.pictures[0];
      // pictures can be {img: ...} OR string
      return first && first.img ? first.img : first;
    },

    techList() {
      if (!this.portfolio || !this.portfolio.technologies) return [];
      return this.portfolio.technologies;
    },

    shortDesc() {
      const d = (this.portfolio && this.portfolio.description) ? this.portfolio.description : "";
      // remove html tags if exist
      const clean = d.replace(/<[^>]*>/g, "");
      return clean.length > 120 ? clean.substring(0, 120) + "..." : clean;
    },
  },
  methods: {
    open(url) {
      if (!url) return;
      window.open(url, "_blank", "noopener,noreferrer");
    },
    showModal() {
      this.$emit("show", this.portfolio);
    },
  },
};
</script>

<style scoped>
/* ✅ Same accent as Home.vue */
.p-card {
  --accent: #ff7a00;
  --accentSoft: rgba(255, 122, 0, 0.16);

  border-radius: 18px;
  overflow: hidden;
  background: #ffffff;
  border: 1px solid rgba(0, 0, 0, 0.08);
  box-shadow: 0 18px 50px rgba(0, 0, 0, 0.08);
  transition: 0.2s ease;
  height: 470px;
  display: flex;
  flex-direction: column;
}

.p-card:hover {
  transform: translateY(-3px);
  box-shadow: 0 22px 60px rgba(0, 0, 0, 0.12);
}

.p-card-dark {
  background: #151a20;
  border: 1px solid rgba(255, 255, 255, 0.08);
  box-shadow: 0 18px 55px rgba(0, 0, 0, 0.35);
}

/* Image */
.cover {
  height: 190px;
  position: relative;
  overflow: hidden;
}

.cover::after {
  content: "";
  position: absolute;
  inset: 0;
  background: linear-gradient(to bottom, rgba(0, 0, 0, 0) 55%, rgba(0, 0, 0, 0.35));
  pointer-events: none;
}

.cover-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

/* Body */
.body {
  padding: 14px 14px 16px;
  flex: 1;
  display: flex;
  flex-direction: column;
  border-top: 1px solid rgba(0, 0, 0, 0.08);
}

.p-card-dark .body {
  border-top: 1px solid rgba(255, 255, 255, 0.10);
}

.name {
  font-size: 20px;
  font-weight: 900;
  margin: 0 0 10px;
}

/* Tags */
.badges {
  min-height: 54px;
  overflow: hidden;
  margin-bottom: 6px;
}

.tag {
  display: inline-block;
  margin: 0 8px 8px 0;
  padding: 6px 10px;
  border-radius: 999px;
  font-size: 12px;
  font-weight: 900;
  background: var(--accentSoft);
  color: var(--accent);
  border: 1px solid rgba(255, 122, 0, 0.25);
}

.tag-dark {
  background: rgba(255, 255, 255, 0.06);
  color: rgba(255, 255, 255, 0.85);
  border: 1px solid rgba(255, 255, 255, 0.12);
}

/* Description (no ugly scrollbar) */
.desc {
  margin: 6px 0 0;
  font-size: 14px;
  line-height: 1.8;
  color: rgba(0, 0, 0, 0.68);

  display: -webkit-box;
  -webkit-line-clamp: 4;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.desc-dark {
  color: rgba(255, 255, 255, 0.72);
}

/* Actions */
.actions {
  margin-top: auto;
  display: flex;
  gap: 10px;
  justify-content: center;
  padding-top: 14px;
}

/* Buttons */
.btn-accent {
  padding: 10px 14px;
  border-radius: 12px;
  border: 1px solid var(--accent);
  background: transparent;
  color: var(--accent);
  font-weight: 900;
  cursor: pointer;
  transition: 0.2s ease;
}

.btn-accent:hover {
  background: var(--accent);
  color: #111;
}

.btn-ghost {
  padding: 10px 14px;
  border-radius: 12px;
  border: 1px solid rgba(0, 0, 0, 0.12);
  background: rgba(0, 0, 0, 0.03);
  color: rgba(0, 0, 0, 0.8);
  font-weight: 900;
  cursor: pointer;
  transition: 0.2s ease;
}

.p-card-dark .btn-ghost {
  border: 1px solid rgba(255, 255, 255, 0.12);
  background: rgba(255, 255, 255, 0.06);
  color: rgba(255, 255, 255, 0.85);
}

.btn-ghost:hover {
  border-color: var(--accent);
  background: var(--accentSoft);
  color: var(--accent);
}
</style>
