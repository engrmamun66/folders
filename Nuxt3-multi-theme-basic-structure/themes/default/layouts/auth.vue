<template>
  <ClientOnly>
    <slot />
  </ClientOnly>
</template>

<script setup>
useHead({
  title: "User Login",
  meta: [{ name: "description", content: "My amazing site434." }],
  bodyAttrs: [{"class": "leap-admin-body"},],
  link:[
    {rel: 'icon', type: 'image/x-icon', href:'/img/favicon.png'},  
    {type:'text/css', rel: 'stylesheet', href:'/css/bootstrap.min.css'},
    {type:'text/css', rel: 'stylesheet', href:'/css/style-admin.css'},
  ]
});
</script>
