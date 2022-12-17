<template>
  <div :class="{template_in: useMenuState().value.menu=='dashboard'}">
    <div class="section-title leap-admin-subheader">
      <div class="d-flex align-items-center">
        <div class="mr-auto">
          <h3
            class="leap-admin-subheader__title leap-admin-subheader__title--separator border-0"
          >
            Dashboard
          </h3>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
definePageMeta({
  middleware: ["auth"],
});
</script>
