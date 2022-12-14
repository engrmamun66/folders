export default {
    // baseURL: 'http://localhost:3004/', //Json server >>> Command:: json-server --watch db.json --port 3004
    baseURL: 'http://localhost:8000/api/',
    baseURL_InspectDeploy: 'http://localhost:8001/',
    roles: [
        { id: 9, name: 'Dispatcher Admin' },
        { id: 10, name: 'Dispatcher' },
        { id: 11, name: 'Guard' },
    ],
    sites: [
        { id: 3, name: 'Site-3' },
        { id: 4, name: 'Site-4' },
        { id: 5, name: 'Site-5' },
        { id: 6, name: 'Site-4' },
        { id: 7, name: 'Site-3' },
        { id: 8, name: 'Site-2' },
    ],
}