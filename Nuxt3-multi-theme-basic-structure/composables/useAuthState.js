import Auth from '~/apis/Auth';


function authMethods(functionName = '', ...args) {
    const methods = {
        login(payload = {}) {
            let authState = useAuthState('auth').value
            Auth.login(payload)
                .then((response) => {
                    if (response.status == 200 && response.statusText == 'OK') {
                        useCookie('accessToken').value = response.data.access_token
                        useCookie('user').value = response.data.user
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
                }).finally(()=>{
                    useAuthState().value.loading = false
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
            Auth.logout()
                .then((response) => {
                    if (response.status == 200 && response.statusText == 'OK') {
                        useCookie('accessToken').value = null
                        useCookie('tokenType').value = null
                        useCookie('ID-token').value = null
                        useCookie('user').value = null
                        useCookie('tokenExpire').value = null
                        useMenuState('menu').value.showProfilePopup = false
                        Common().toaster('success', 'Logout successfull')
                        setTimeout(() => {
                            window.location.replace('/login')
                        }, 500);
                    }
                }).catch(error => {
                    Common().toaster('error', error)
                }).finally(()=>{
                    useAuthState().value.loading = false
                });
        },
        logoutIfExpireToken(){
            if(useCookie('tokenExpire').value <= (new Date().getTime() / 1000) || useCookie('tokenExpire').value == undefined){
                useCookie('accessToken').value = null
                useCookie('ID-token').value = null
                useCookie('tokenExpire').value = null
                if(useRoute().path != '/login'){
                    Common().toaster('error', 'Access token has expired')
                    setTimeout(() => {
                        window.location.replace('/login')
                    }, 1000);
                }
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

