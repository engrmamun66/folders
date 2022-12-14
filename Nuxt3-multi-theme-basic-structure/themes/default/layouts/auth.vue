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
    {rel: 'icon', type: 'image/x-icon', href:'../img/favicon.png'},
    {type:'text/css', rel:'stylesheet', href:'//fonts.googleapis.com/css?family=Poppins:200,300,400,500,600,700,800,900'},
    {type:'text/css', rel:'stylesheet', href:'//fonts.googleapis.com/css2?family=Work+Sans:wght@100;200;300;400;500;600;700;800;900&display=swap'},
    {type:'text/css', rel:'stylesheet', href:'//stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css'},
    {type:'text/css', rel:'stylesheet', href:'//cdn.lineicons.com/1.0.1/LineIcons.min.css'},
    {type:'text/css', rel:'stylesheet', href:'//cdn.lineicons.com/2.0/LineIcons.css'},
    {type:'text/css', rel: 'stylesheet', href:'../css/bootstrap.min.css'},
    {type:'text/css', rel: 'stylesheet', href:'../css/style-admin.css'},
    {type:'text/css', rel: 'stylesheet', href:'../css/sass/style.scss'},
  ]
});
</script>
