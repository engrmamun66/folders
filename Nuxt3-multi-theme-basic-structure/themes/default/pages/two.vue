<template>
  <div class="section-title leap-admin-subheader">
    <div class="d-flex align-items-center">
      <div class="mr-auto">
        <h3
          class="
            leap-admin-subheader__title leap-admin-subheader__title--separator
            border-0
          "
        >
          Two page
        </h3>
      </div>
    </div>
  </div>

  <button class="btn btn-success" @click="load">Load</button>

</template>

<script setup>
definePageMeta({
  middleware: ["auth"],
});
async function load(){
  let response = await Api(true).get('/companies')
console.log(response);
}

</script>