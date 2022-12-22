const prefix = 'guard'

export default {
    async save(payload = {}, config = {}) {
        return await Api().post(`${prefix}/save`, payload, config)
    },
    async update(id, payload = {}, config = {}) {
        return await Api().post(`${prefix}/update/${id}`, payload, config)
    },
    async list(config = {}) {
        return await Api().get(`${prefix}/list`, config)
    },
}
