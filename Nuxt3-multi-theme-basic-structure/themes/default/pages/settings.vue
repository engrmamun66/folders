<template>
 <div :class="{template_in: useMenuState().value.menu=='settings'}">
   <div v-if="useMenuState('menu').value.menu=='settings'" class="section-title leap-admin-subheader">
      <div class="d-flex align-items-center">
        <div class="mr-auto">
          <h3
            class="leap-admin-subheader__title leap-admin-subheader__title--separator border-0">
            Settings page
          </h3>
        </div>
      </div>
    </div>
    <button @click="sites" class="btn btn-warning">Click</button>
    <pre>
    </pre>
 </div>

</template>

<script setup>

definePageMeta({
  middleware: ["auth"],
});


async function sites(){
    let res = await Api(true).get('/sites?he=4',{
    params:{
      company_id:44
    },
    headers:{
      'Accepts': 'image/jpeg'
    }
  })
  console.log('res', res);
}
</script>

