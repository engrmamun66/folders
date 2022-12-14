import Company from '~/apis/Companies';

function companyMethods(functionName='', ...args){

    const methods = {
        companyList(){
            let companyState = useCompanyState('auth').value
            Company.companyList()
            .then((response) => {
                if (response.status == 200 && response.statusText == 'OK') {
                    companyState.companyList = response.data.data;
                } else {
                    console.warn(response);
                }
            }).catch((error)=>{
                 console.log('error from companyList',error)

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

export { companyMethods }; // We can call this function globally
export default function () {
    return useState('company', () => ({
        errors:null,
        companyList:null
    }))
}

