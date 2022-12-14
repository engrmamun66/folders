import axios from 'axios'
import config from '~/constant.config'

const Api = axios.create({
    // baseURL: 'http://localhost:3004/', //Json server >>> Command:: json-server --watch db.json --port 3004
    baseURL: config.baseURL,
    
})

export default Api