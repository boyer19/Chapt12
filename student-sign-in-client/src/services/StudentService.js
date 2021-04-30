
import axios from 'axios'


let base_url = '/api/student'

export default {
    getAllStudents() {
        return axios.get(base_url).then(response => {
            return response.data
        })
    },
    addStudent(student) {
        return axios.post(base_url, student).then(response => {
            return response.data
        })
    }
    
}