
import CustomConfig from '~/constant.config';

export default {
    mounted() {
        setTimeout(() => {
            let loader = document.getElementById('site_loader')
            if (loader != null) {
                document.getElementById('site_loader').style.display = 'none'
            }
        }, 500);
    },
    data() {
        return {
            validators: {
                user: {
                    name: { required: true },
                    role: { required: true },
                    email: { required: true, type: 'email'},
                    password: { required: true},
                    phone: { type: 'number', minLength: 6, maxLength: 14},
                    deviceId: { required: true },
                    postId: { required: true },
                },
                login:{
                    email: { required: true, type: 'email'},
                    password: { required: true},
                }
            }
        }
    },
    methods: {
        goToInspectDeploy(){
            window.location = useRuntimeConfig().public.BASE_URL_INSPECT_DEPLOY + '/login-to-inspect-deploy?token=' + useCookie('ID-token').value;
        },
        getRedStar(fieldName, validatorObject){
            if(validatorObject.hasOwnProperty(fieldName)){
                let item = validatorObject[fieldName]
                if(item.hasOwnProperty('required') && item.required) 
                    return '<span class="text-danger p-1">*</span>'
            }
            return ''
        },
        getFiledError(fieldName, errors){
            if(errors.hasOwnProperty(fieldName)) {
                let html = `<span class="text-danger p-1">`
                html +=  errors[fieldName].join(' and ')
                html +=  '</span>'
                return html
            }
            return ''
        },
        objectValidation(DataObject, validators) {
            /**
             * How to call function: objectValidation(defaultsObject = {}, newObject = {},)
             * 
             *  you can pass a key name, that you passed in defaultsObject{} object
             * Example:
             * DataObject = {
             *  name: 'Jhon',
             *  email: 'test@gmail.com',
             * }
             * validators = { 
             *  imei:{
             *      required: true, 
             *      type: 'string', // string | number | boolean | object | email
             *      minLength: 2,
             *      maxLength: 5,
             *      length: 15, //Check exact length
             *      callback: 'App.date.format', // callback will fire to change value
             *   },
             * }
             */

            let Types = ['string', 'number', 'boolean', 'object'];

            const filterText = (text) => {
                let tt = text.toString().replaceAll('_', ' ');
                return tt[0].toUpperCase() + tt.slice(1).toLowerCase();
            }
            const isValidEmail = (email) => {
                let emailPattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                return email.toLowerCase().match(emailPattern) != null
            }
            const isEmptyObject = (object) => {
                return Object.keys(object).length ? false : true;
            }

            let errors = {};
            Object.entries(DataObject).forEach(([key, value]) => {
                if(value==null) value = ''
                let needTovalidate = validators.hasOwnProperty(key);

                if (needTovalidate) {
                    //====== ================= ===========
                    //====== required checking ===========
                    //====== ================= ===========
                    let CurItemValidator = validators[key];
                    if (CurItemValidator.hasOwnProperty('required')) {
                        if (CurItemValidator.required && !value.toString().length)
                            (typeof errors[key] == 'object') ? errors[key].push(` is required`) : errors[key] = [`${filterText(key)} is required`]
                    }
                    //====== ================= ===========
                    //======== Type checking =============
                    //====== ================= ===========
                    if (CurItemValidator.hasOwnProperty('type')) {
                        if (Types.indexOf(CurItemValidator['type'] != -1)) {
                            let type = CurItemValidator['type'];
                            if (type == 'email' && !isValidEmail(value) && value!='')
                                (typeof errors[key] == 'object') ? errors[key].push(`Email address is not valid`) : errors[key] = [`Email address is not valid`]
                        }
                    }
                    //====== ================= ===========
                    //======== minLength checking ===========
                    //====== ================= ===========
                    if (CurItemValidator.hasOwnProperty('minLength')) {
                        let minLength = CurItemValidator['minLength'];
                        if (value.length < minLength)
                            (typeof errors[key] == 'object') ? errors[key].push(` minimum length to be ${minLength}`) : errors[key] = [`${filterText(key)} minimum length to be ${minLength}`]
                    }
                    //====== ================= ===========
                    //======== maxLength checking ===========
                    //====== ================= ===========
                    if (CurItemValidator.hasOwnProperty('maxLength')) {
                        let maxLength = CurItemValidator['maxLength'];
                        if (value.length > maxLength)
                            (typeof errors[key] == 'object') ? errors[key].push(` maximus length to be ${maxLength}`) : errors[key] = [`${filterText(key)} maximus length to be ${maxLength}`]
                    }
                    //====== ================= ===========
                    //======== length checking ===========
                    //====== ================= ===========
                    if (CurItemValidator.hasOwnProperty('length')) {
                        let length = CurItemValidator['length'];
                        if (value.length > length)
                            (typeof errors[key] == 'object') ? errors[key].push(` length to be ${length}`) : errors[key] = [`${filterText(key)} length to be ${length}`]
                    }
                    //======================== =================================
                    //======== fire callback functon to change value ===========
                    //====== ================= =================================
                    if (isEmptyObject(errors)) {
                        if (CurItemValidator.hasOwnProperty('callback')) {
                            let callback = CurItemValidator['callback'];
                            DataObject[key] = eval(`${callback}(value)`);
                        }
                    }

                }
            });
            if (isEmptyObject(errors)) {
                return { status: 'OK', data: DataObject };
            } else {
                return { status: 'NOK', errors: errors };
            }

        }
    },
}
