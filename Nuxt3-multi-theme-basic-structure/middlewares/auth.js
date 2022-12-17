export default defineNuxtRouteMiddleware((to, from) => {
  if (process.client) { 
    if (!authMethods('isLogin')) {
      if(useRoute().fullPath != '/login'){
        return window.location.replace('/login');
      }
    }
  }
});
