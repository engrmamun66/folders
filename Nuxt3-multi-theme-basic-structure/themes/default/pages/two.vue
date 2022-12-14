<template>
  <Nav />
  <h1 class="mb-2">Two.vue file</h1>
  <hr />

  <button @click="$testtt()" class="btn btn-secondary mb-2">Console</button>
 
  
</template>

<script setup>
definePageMeta({
  middleware: ["auth"],
});

</script>
