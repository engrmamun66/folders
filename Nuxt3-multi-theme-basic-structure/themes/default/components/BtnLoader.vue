<template>
  <div v-show="show"
    class="spinner-border text-secondary"
    role="status"
    :style="'width:' +
          size +
          ';height:' +
          size
          + (';font-size:' + font_size + ' !important;')  + 'color:'+ color +' !important'"
  >
    <span class="visually-hidden">Loading...</span>
  </div>
</template>

<script setup>
const props = defineProps({
  show: {
    default: false,
    type: Boolean,
    required: true,
  },
  font_size: {
    default: "10px",
    type: String,
    required: false,
  },
  size: {
    default: "1rem",
    type: String,
    required: false,
  },
  color: {
    default: "",
    type: String,
    required: false,
  },
});
</script>

<style scoped>
.spinner-border {
  color: var(--bgcolor-primary) !important;
}
</style>