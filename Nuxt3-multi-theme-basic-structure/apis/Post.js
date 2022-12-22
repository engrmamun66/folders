const prefix = 'post'

export default {
    async activeList(config = {}) {
        return await Api().get(`${prefix}/get-active-list`, config)
    },
    async isUsed(id, config = {}) {
        return await Api().get(`${prefix}/auth/check-is-used/${id}`, config)
    },
    async geofences(config = {}) {
        return await Api().get(`${prefix}/get-geofences`, config)
    },
    async checkGeofences(id, config = {}) {
        return await Api().get(`${prefix}/check-geofences/${id}`, config)
    },
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
