<template>
  <span class="logo" :class="{ 'logo-dark': nightMode, 'logo-light': !nightMode }">
    <span class="accent">&lt;</span>
    <span class="space"></span>
    <span class="name">{{ logoText }}</span>
    <span class="space"></span>
    <span class="accent">/&gt;</span>
  </span>
</template>

<script>
import info from "../../../info";

export default {
  name: "Logo",
  props: {
    nightMode: Boolean,
  },
  computed: {
    logoText() {
      // Use logo_name if exists, else fallback to name
      return info.logo_name || info.name || "Yem Mike";
    },
  },
};
</script>

<style scoped>
.logo {
  display: inline-flex;
  align-items: center;
  font-weight: 800;
  font-size: 30px;
  letter-spacing: 0.2px;
  user-select: none;
}

/* Orange like the screenshot */
.accent {
  color: #f6a400;
}

/* Name color depending on mode */
.logo-dark .name {
  color: #ffffff;
}

.logo-light .name {
  color: #2c3e50;
}

/* spacing between parts */
.space {
  width: 10px;
}

/* Optional: smoother look */
@media screen and (max-width: 580px) {
  .logo {
    font-size: 24px;
  }
  .space {
    width: 7px;
  }
}
</style>
