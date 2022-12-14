export default defineNuxtRouteMiddleware((to, from) => {
  if(useRoute().query.hasOwnProperty('token')){
}
  if (process.client) { 
    if (!authMethods('isLogin')) {
      if(useRoute().fullPath != '/login'){
        return navigateTo("/login");
      }
    }
  }
});
