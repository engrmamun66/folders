<template>
  <nuxt-welcome></nuxt-welcome>
</template>

<script setup>
definePageMeta({
  middleware: ["auth"],
});

let cmpState = useCompanyState();
import userMixin from "~/mixins/users";
useNuxtApp().vueApp.mixin(userMixin);
</script>
