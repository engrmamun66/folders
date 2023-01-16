
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
                    email: { required: true, type: 'email' },
                    password: { required: true },
                    phone: { type: 'number', minLength: 6, maxLength: 14 },
                    deviceId: { required: true },
                    postId: { required: true },
                },
                login: {
                    email: { required: true, type: 'email' },
                    password: { required: true },
                }
            }
        }
    },
    methods: {
        goToInspectDeploy() {
            window.location = useRuntimeConfig().public.BASE_URL_INSPECT_DEPLOY + '/login-to-inspect-deploy?token=' + useCookie('ID-token').value;
        },
        back() {
            useRouter().back()
        },
        getRedStar(fieldName, validatorObject) {
            if (validatorObject.hasOwnProperty(fieldName)) {
                let item = validatorObject[fieldName]
                if (item.hasOwnProperty('required') && item.required)
                    return '<span class="text-danger p-1">*</span>'
            }
            return ''
        },
        getSelectedWeekdays(weekDayObject /** Object-Type: constant.config.js > week_days */, JSON_output = true) {
            let weekdays = { 0: [] }
            for (let key in weekDayObject) {
                if (weekDayObject[key]['selected']) {
                    weekdays[0].push(weekDayObject[key]['fullname'])
                }
            }
            // Output Format: {["saturday","sunday","monday","tuesday","wednesday"]}
            return JSON_output ? JSON.stringify(weekdays) : weekdays
        },
        getFieldError(fieldName, errors) {
            if (errors.hasOwnProperty(fieldName)) {
                let html = `<span class="field-error-span text-danger p-1">`
                html += errors[fieldName].join(' and ')
                html += '</span>'
                return html
            }
            return ''
        },
        objectValidation(DataObject, validators) {
            /**
             * Example:
             * ==============
             * DataObject = {
             *  name: 'Jhon',
             *  email: 'test@gmail.com',
             * }
             * validators = { 
             *  imei:{
             *      required: true,
             *      type: 'string', // string | number | boolean | array | object | email
             *      minLength: 2,
             *      maxLength: 5,
             *      min: 2,
             *      max: 5,
             *      regex: ["\d{2}", "gmi"], // [expression(required), flags(optional)]
             *      length: 15, //Check exact length
             *      callback: (value, DataObject, validators, errors) => value.length > 2, // this callback should return true or false
             *      message: 'default meesage for callback()', // Remind: We can controll message by validator param of callback() function
             *   },
             * }
             */

            let Types = ['string', 'number', 'boolean', 'array', 'object'];

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
                if (value == null) value = ''
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
                            var type = CurItemValidator['type'];
                            if (type == 'email' && !isValidEmail(value) && value != '')
                                (typeof errors[key] == 'object') ? errors[key].push(`Email address is not valid`) : errors[key] = [`Email address is not valid`]
                            else {
                                if (type == 'number') {
                                    if (isNaN(value))
                                        (typeof errors[key] == 'object') ? errors[key].push(` should be ${type}`) : errors[key] = [`${filterText(key)} should be ${type}`]
                                } else {
                                    if (!(type in ['email', 'number', 'string'])) {
                                        if (type == 'array') {
                                            if (!Array.isArray(value))
                                                (!Array.isArray(value)) ? errors[key].push(` should be array`) : errors[key] = [`${filterText(key)} should be array`]
                                        }
                                        if (type == 'object') {
                                            if (typeof value != 'object' || Array.isArray(value))
                                                (typeof errors[key] == 'object') ? errors[key].push(` should be ${type}`) : errors[key] = [`${filterText(key)} should be ${type}`]
                                        }
                                    }
                                }
                            }
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
                            (typeof errors[key] == 'object') ? errors[key].push(` maximum length to be ${maxLength}`) : errors[key] = [`${filterText(key)} maximum length to be ${maxLength}`]
                    }
                    //====== ================= ===========
                    //======== length checking ===========
                    //====== ================= ===========
                    if (CurItemValidator.hasOwnProperty('length')) {
                        let length = CurItemValidator['length'];
                        if (value.length > length)
                            (typeof errors[key] == 'object') ? errors[key].push(` length to be ${length}`) : errors[key] = [`${filterText(key)} length to be ${length}`]
                    }
                    //====== ================= ===========
                    //======== min checking ===========
                    //====== ================= ===========
                    if (CurItemValidator.hasOwnProperty('min')) {
                        let min = CurItemValidator['min'];
                        if (Number(value) < min)
                            (typeof errors[key] == 'object') ? errors[key].push(` minimum to be ${min}`) : errors[key] = [`${filterText(key)} minimum to be ${min}`]
                    }
                    //====== ================= ===========
                    //======== max checking ===========
                    //====== ================= ===========
                    if (CurItemValidator.hasOwnProperty('max')) {
                        let max = CurItemValidator['max'];
                        if (Number(value) > max)
                            (typeof errors[key] == 'object') ? errors[key].push(` maximum to be ${max}`) : errors[key] = [`${filterText(key)} maximum to be ${max}`]
                    }
                    //====== ================= ===========
                    //====== checking with regex =========
                    //====== ================= ===========
                    if (CurItemValidator.hasOwnProperty('regex')) {
                        try {
                            var regex = new RegExp(CurItemValidator['regex'][0], CurItemValidator['regex'][1] || 'gmi');
                            if (!regex.test(value))
                                (typeof errors[key] == 'object') ? errors[key].push(` is not matche with regex`) : errors[key] = [`${filterText(key)} is not matche with regex`]
                        } catch (error) {
                            (typeof errors[key] == 'object') ? errors[key].push(`:: ${error}`) : errors[key] = [`${filterText(key)}:: ${error}`]
                        }
                    }
                    //======================== =================================
                    //======== validate with callback function =================
                    //====== ================= =================================
                    if (CurItemValidator.hasOwnProperty('callback')) {
                        let callback = CurItemValidator['callback'];
                        if (value) {
                            if (!callback(value, DataObject, validators, errors)) {
                                CurItemValidator.message = CurItemValidator.message || `${filterText(key)} not validate by callback`
                                errors[key] = [CurItemValidator.message]
                            }
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
