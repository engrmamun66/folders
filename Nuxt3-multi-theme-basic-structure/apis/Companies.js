import Api from './Api'

export default {
  
    async companyList(){
        return await Api.get('/companies', {
            headers:{
                authorization: useCookie('tokenType').value + " " + useCookie('accessToken').value
            }
        })
    },
   
}