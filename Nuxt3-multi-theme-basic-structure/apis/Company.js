
const prefix = ''

export default {
  
    async companyList(config={}){
        return await Api().get(`${prefix}/companies`, config)
    },
   
}