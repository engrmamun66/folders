import Site from '~/apis/Site';

function siteMethods(functionName='', ...args){
    
    const methods = {
        getSitesByCompanyId(companyId){
            let siteState = useSiteState('site').value
            Site.listByCompanyId({ params: { company_id: companyId } } )
            .then((response) => {
                if (response.status == 200 ) {
                    siteState.siteList = response.data.data;
                } else {
                    console.warn(response);
                }
            });
        },
    };
    // ===============================
    // ====Dynamic Method call=======
    // ===============================
    if(functionName && methods.hasOwnProperty(functionName)){
        return methods[functionName](...args) 
    }else{
        return methods
    }
}
  
export { siteMethods }; // We can call this function globally
export default function () {
    return useState('site', () => ({
        errors:null,
        siteList:[]
    }))
}

