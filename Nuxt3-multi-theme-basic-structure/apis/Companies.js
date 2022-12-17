
export default {
  
    async companyList(){
        return await Api(true).get('/companies')
    },
   
}