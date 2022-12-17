<template> 
      <Toaster :animation="'left'" />
      <Loader id="site_loader" />
      <NuxtLoadingIndicator />
      <div class="leap-admin-main-wrapper">
      <Header />
      <Sidebar />
        <div  id="leap-admin-main-container" :class="{margin_left : menuMethods('isCollapse')}" >
          <div @click="useMenuState('menu').value.isCollapse = false">
            <slot />
          </div>
        </div>
    </div>
</template>

<script setup>
const state = useMenuState('menu');
useHead({
  title: "Guard App || Dashboard",
  meta: [{ name: "description", content: "My amazing site434." }],
  bodyAttrs: [{"class": "leap-admin-body"},],
  link:[
    {rel: 'icon', type: 'image/x-icon', href:'../img/favicon.png'},
    {type:'text/css', rel:'stylesheet', href:'//fonts.googleapis.com/css?family=Poppins:200,300,400,500,600,700,800,900'},
    {type:'text/css', rel:'stylesheet', href:'//fonts.googleapis.com/css2?family=Work+Sans:wght@100;200;300;400;500;600;700;800;900&display=swap'},
    {type:'text/css', rel:'stylesheet', href:'//stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css'},
    {type:'text/css', rel:'stylesheet', href:'//cdn.lineicons.com/1.0.1/LineIcons.min.css'},
    {type:'text/css', rel:'stylesheet', href:'//cdn.lineicons.com/2.0/LineIcons.css'},
    {type:'text/css', rel:'stylesheet', href:'//maxst.icons8.com/vue-static/landings/line-awesome/line-awesome/1.3.0/css/line-awesome.min.css'},
    {type:'text/css', rel: 'stylesheet', href:'/css/bootstrap.min.css'},
    {type:'text/css', rel: 'stylesheet', href:'/css/style-admin.css'},
  ]
});
import cart from '~/mixins/cart'
useNuxtApp().vueApp.mixin(cart)
</script>
