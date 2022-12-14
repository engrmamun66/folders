import Site from '~/apis/Sites';

function siteMethods(functionName='', ...args){
    
    const methods = {
        siteList(companyId){
            let siteState = useSiteState('site').value
            Site.sitesByCompanyId()
            .then((response) => {
                if (response.status == 200 && response.statusText == 'OK') {
                    siteState.siteList = response.data;
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
        siteList:null
    }))
}

