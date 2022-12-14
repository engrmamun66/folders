import Api from './Api'

export default {
    async sitesByCompanyId(companyId){
        return await Api.get('auth/sites?company_id='+companyId,{
            headers:{
                authorization: useCookie('tokenType').value + " " + useCookie('accessToken').value
            }
        })
    },
}