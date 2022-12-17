export default {
    async login(payload={}){
        return await Api().post('auth/login', payload)
    },
    async logout(payload={}){
        return await Api(true).post('auth/logout')
    },
   
}