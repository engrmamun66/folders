import axios from 'axios'
function Api(accessToken=true, baseURL='get_from_env') {

    let options = {
        baseURL: baseURL=='get_from_env' ? useRuntimeConfig().public.API_BASE_URL : baseURL,
        timeout: 10000,
    }
    if(accessToken) options['headers'] = {
        authorization: useCookie('tokenType').value + " " + useCookie('accessToken').value
    }
    let api = axios.create(options)
    api.interceptors.request.use((config)=>{
        authMethods().logoutIfExpireToken()
        return config
    }, (error)=>{
        return Promise.reject(error)
    })
    api.interceptors.response.use((response)=>{
        return response
    }, (error)=>{
        return Promise.reject(error);
    })
    return api
}
export { Api }