const prefix = 'device'

export default {
    async list(config = {}) {
        return await Api().get(`${prefix}/get-all`, config)
    },
    async isUsed(id, config = {}) {
        return await Api().get(`${prefix}/check-is-used/${id}`, config)
    },
}
