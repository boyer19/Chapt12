<template>
  <div id="app">
    <NewStudentForm v-on:student-added="newStudentAdded"></NewStudentForm>
    <student-table 
      v-bind:students="students" 
      v-on:student-present="studentArrivedOrLeft"
      v-on:delete-student="studentDeleted">
    </student-table>

    <student-message v-bind:student="mostRecentStudent"></student-message>

  </div>
</template>

<script>
import NewStudentForm from './components/NewStudentForm.vue'
import StudentMessage from './components/StudentMessage.vue'
import StudentTable from './components/StudentTable.vue'

export default {
  name: 'App',
  data() {
    return {
      students: [],
      mostRecentStudent: {}
    }
  },
  components: {
    NewStudentForm,
    StudentMessage,
    StudentTable
  },
  mounted() {
    // load all students- make request to API
    this.updateStudents()
  },
  methods: {
    updateStudents() {
      this.$student_api.getAllStudents().then( students => {
        this.students = students
      })
    },
    newStudentAdded(student) {
      this.$student_api.addStudent(student).then( () => {
        this.updateStudents()
      })
    },
    studentArrivedOrLeft(student, present) {
      student.present = present //update present value
      this.$student_api.updateStudent(student).then( () => {
        this.mostRecentStudent = student
        this.updateStudents()
      })
    },
    studentDeleted(student) {
       this.$student_api.deleteStudent(student.id).then( () =>{
         this.updateStudents()
         this.mostRecentStudent = {} // clear welcome/goodbye message
       }) 
    }
  }
}
</script>

<style>
 @import "https://cdn.jsdelivr.net/npm/bootstrap@4.6.0/dist/css/bootstrap.min.css";
</style>
