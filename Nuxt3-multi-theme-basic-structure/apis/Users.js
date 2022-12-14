import Api from './Api'

export default {
    async login(payload={}){
        return await Api.post('auth/login', payload)
    },
    async logout(payload={}){
        return await Api.post('auth/logout', {}, {
            headers:{
                authorization: useCookie('tokenType').value + " " + useCookie('accessToken').value
            }
        })
    },
   
}