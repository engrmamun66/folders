import CustomConfig from '~/constant.config';
import global from "~/mixins/global";

export default defineNuxtPlugin(nuxtApp => {
    nuxtApp.vueApp.mixin(global);

    // Login from inspect deploy
    authMethods().loginFromInspectDeploy()

    // Load store data
    if (useCookie('accessToken').value) {
        companyMethods().companyList()
        let authState = useAuthState().value
        authState.user = useCookie('user').value
    }

    // Onloade select sidebar menu
    menuMethods().onloadSelectMenu()

    return {
        provide: {
            Config: (key = '') => {
                if (!key) return CustomConfig
                else {
                    let result = CustomConfig
                    key.split('.').forEach((item, index) => {
                        if (result.hasOwnProperty(item)) result = result[item]
                    })
                    return result
                }
            },
            upper: (str) => str.toUpperCase(),
            lower: (str) => str.toLowerCase(),
            isValidEmail: (email) => {
                let emailPattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                return email.toLowerCase().match(emailPattern) != null
            },
        }
    }
})