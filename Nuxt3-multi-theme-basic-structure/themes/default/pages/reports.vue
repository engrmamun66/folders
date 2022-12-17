<template>
    <div :class="{template_in: useMenuState().value.menu=='reports'}">
      <div class="section-title leap-admin-subheader">
        <div class="d-flex align-items-center">
          <div class="mr-auto">
            <h3
              class="leap-admin-subheader__title leap-admin-subheader__title--separator border-0"
            >
              Report page
            </h3>
          </div>
        </div>
      </div>
      <nuxtWelcome></nuxtWelcome>
    </div>
</template>

<script setup>
definePageMeta({
  middleware: ["auth"],
});
</script>
