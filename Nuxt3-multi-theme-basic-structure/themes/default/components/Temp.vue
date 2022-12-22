<template> 
    
    <h1>Check Property</h1>
    <button @click="changeName">Change Name</button>
    <button @click="name = 'New Name'">Change Prop</button>
    <hr>
    <h2> {{ name }} </h2>

</template>

<script setup>
let props = defineProps({name: String})

async function changeName(){
  props.name = 'Abdullah Al Mamun'
  console.log('props', props);
}

</script>
