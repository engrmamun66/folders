export default {
    async sitesByCompanyId(companyId){
        return await Api(true).get('auth/sites?company_id='+companyId)
    },
}