export default {
    data() {
        return {
            user: {
                name: null,
                email: null,
                password: null,
                company: null,
                sites: [],
                site: null,
                role: null,
                phone: null,
                deviceId: null,
                postId: null,
            },
            errors:{},
        }
    },
    
    methods: {
        addUser() {
            let AuthState = useAuthState().value
            console.log(authMethods('isLogin'));

            let res = this.objectValidation(this.user, this.validators.user)
            if(res.status=='NOK'){
                this.errors = res.errors
                console.log(res);
                return
            }
        },
        // fetchSitesByCompany(event){
        //     let companyId = event.target.value
        //     siteMethods.sitesByCompanyId(companyId);

        // },
        cancel() {
            Object.keys(this.user).forEach(key => {
                if (['company'].includes(key))
                    this.user[key] = []
                else
                    this.user[key] = null
            })
        },
        back() {
            useRouter().back()
        },
    },

}

// let ndd = new Date().toTimeString()