import User from '~/apis/Users';


function authMethods(functionName = '', ...args) {
    const methods = {
        login(payload = {}) {
            let authState = useAuthState('auth').value
            User.login(payload)
                .then((response) => {
                    if (response.status == 200 && response.statusText == 'OK') {
                        useCookie('accessToken').value = response.data.access_token
                        useCookie('tokenType').value = response.data.token_type
                        useCookie('ID-token').value = btoa(payload.email + ',' + payload.password)
                        let seconds = (new Date().getTime() / 1000) //will give you the seconds since midnight, 1 Jan 1970
                        useCookie('tokenExpire').value = seconds + response.data.expires_in
                        Common().toaster('success', 'Login successfull')
                        setTimeout(() => {
                            window.location.replace('/')
                        }, 500);
                    } else {
                        Common().toaster('warning', response)
                    }
                }).catch((error) => {
                    Common().toaster('error', error)
                    if (error.response.status == 422) {
                        authState.error.type = 422
                        authState.error.message = error.response.data.errors
                    } else if (error.response.status == 401) {
                        authState.error.type = 401
                        authState.error.message = error.response.data.error
                    }
                }).finally(() => {
                    setTimeout(function stopLoader() {
                    }, 1000)
                });
        },
        loginFromInspectDeploy(){
            if(useRoute().query.hasOwnProperty('token')){
                let token = useRoute().query.token
                let [email, password] = atob(token).split(',')
                if(email && password){
                    useCookie('accessToken').value = null
                    useCookie('tokenType').value = null
                    useCookie('ID-token').value = null
                    useCookie('tokenExpire').value = null
                    authMethods().login({email, password})
                }
            }
        },
        logout() {
            User.logout()
                .then((response) => {
                    if (response.status == 200 && response.statusText == 'OK') {
                        useCookie('accessToken').value = null
                        useCookie('tokenType').value = null
                        useCookie('ID-token').value = null
                        useMenuState('menu').value.showProfilePopup = false
                        Common().toaster('success', 'Logout successfull')
                        setTimeout(() => {
                            window.location.replace('/login')
                        }, 500);
                    }
                }).catch(error => {
                    Common().toaster('error', error)
                }).finally(() => {
                    setTimeout(function stopLoader() {
                    }, 1000)
                });
        },
        logoutWhenExpireToken(){
            if(process.client){
                setTimeout(() => {
                    setInterval(() => {
                        if(useCookie('tokenExpire').value <= (new Date().getTime() / 1000) || useCookie('tokenExpire').value == undefined){
                            useCookie('accessToken').value = null
                            useCookie('ID-token').value = null
                            useCookie('tokenExpire').value = null
                            if(useRoute().fullPath != '/login')window.location.replace('/')
                        }
                    }, 5000);
                }, 2000);
            }
        },
        isLogin() {
            return (useCookie('accessToken').value)
        },
    };

    // ===============================
    // ====Dynamic Method call=======
    // ===============================
    if (functionName && methods.hasOwnProperty(functionName)) {
        return methods[functionName](...args)
    } else {
        return methods
    }
}

export { authMethods }; // We can call this function globally

export default function () {
    return useState('auth', () => ({
        user: null,
        error: { type: 401, message: null },
        loading:false,
        loading_insptd: false,
    }))
}

