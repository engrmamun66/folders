

function Common(functionName = '', ...args) {
    const methods = {
        toaster(type, message='') {
            let CS = useCommonState().value
            var message = { message: message, type: type, time: new Date().getTime() / 1000 }
            CS.messages.push(message)
            setTimeout(() => {
                CS.messages.forEach((item, index) => {
                    if (item.time == message.time) {
                        CS.messages.splice(index, 1)
                    }
                });
            }, 3000);
        },
        closeToaster(index) {
            useCommonState().value.messages.splice(index, 1)
        },
        /* -------------------------------------------------------------------------- */
        /*                               Modal Function                               */
        /* -------------------------------------------------------------------------- */
        toggleConfirmModal(){
            let commonState = useCommonState().value
            commonState.modals.confirm.show = ! commonState.modals.confirm.show
        },
        toggleGlobalModal(){
            let commonState = useCommonState().value
            commonState.modals.global.show = ! commonState.modals.global.show
        }
    };

    // ===============================
    // ====Dynamic Method call=======
    // ===============================
    if (functionName && methods.hasOwnProperty(functionName)) {
        return methods[functionName](...args)
    } else {
        return methods
    }
}

export { Common }; // We can call this function globally

export default function () {
    return useState('common', () => ({
        messages: [],
        modals:{
            confirm:{
                show: false,
            },
            global:{
                show: false,
            }
        }
    }))
}

