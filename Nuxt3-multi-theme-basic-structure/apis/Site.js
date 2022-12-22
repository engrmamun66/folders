
const prefix = ''

export default {
  
    async listByCompanyId( config={} ){
        return await Api(true).get(`${prefix}/sites`, config)
    },
   
}