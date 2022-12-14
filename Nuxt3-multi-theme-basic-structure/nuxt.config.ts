// https://nuxt.com/docs/api/configuration/nuxt-config

const THEME = process.env.THEME ? process.env.THEME : "default";

export default defineNuxtConfig({
  dir: {
    middleware: `middlewares`,
    pages: `themes/${THEME}/pages`,
    assets: `themes/${THEME}/assets`,
    public: `themes/${THEME}/public`,
    layouts: `themes/${THEME}/layouts`,
    static: `themes/${THEME}/static`,
  },

  components: {
    dirs: [
        `~/themes/${THEME}/components`, 
        `~/themes/${THEME}/components/modals`, 
    ],
  },

  runtimeConfig: {
    // The private keys which are only available server-side
    apiSecret: "123",
    // Keys within public are also exposed client-side
    public: {
      baseURL: "http://localhost:8000/api/",
    },
  },
});
