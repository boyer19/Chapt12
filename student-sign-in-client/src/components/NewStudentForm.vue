<template>
    <div>
    <!-- Template/HTML here -->

<!-- show errors from form validation -->
 <!-- show errors from form validation -->
        <div class="alert alert-danger" v-show="errors.length > 0">
            <li v-for="error in errors" v-bind:key="error">{{ error}}</li>
        </div>

        <div class="card add-student m-2 p-2">
            <h4 class="card-title">Add new student</h4>

            <div class="form-group">
                <label for="name">Name</label>
                <input id="name" class="form-control" v-model.trim="newStudentName">                <!-- .trim clears whitespace from beginning and end to validate against spaces being entered -->
            </div>
            <div class="form-group">
                <label for="starID">Star ID</label>
                <input id="starID" class="form-control" v-model.trim="newStarID">                   <!-- .trim clears whitespace from beginning and end to validate against spaces being entered -->
            </div>
            <button class="btn btn-primary" v-on:click="addStudent">Add</button>
        </div>      
    </div>
</template>  

<script>
    export default {
        // create component here
        name: 'NewStudentForm',
        emits: ['student-added'],
        data() {
            return {
                newStudentName: '',
                newStarID: '',
                errors: []
            }
        },
        methods: {
            addStudent() {
                    // Validation of no empty info entered
                this.errors = []                            // clears errors array
    // Alternate version
                // if ( this.newStudentName && this.newStarID ) {
                //     let student = { name: this.newStudentName, starID: this.newStarID, present: false }

                //     // TO DO emit message to parent with new student

                //     this.newStudentName = ''
                //     this.newStarID= ''
                // } else {
                //     this.errors.push('Name and StarID are required.')
                // }

                if (!this.newStudentName) {
                    this.errors.push('Student name must be entered')
                }

                if (!this.newStarID) {
                    this.errors.push('StartID must be entered')
                }
    // if there are no errors   
                if (this.errors.length == 0) {                  
                    let student = { name: this.newStudentName, starID: this.newStarID, present: false }

                    //  emit message to parent with new student

                    this.$emit('student-added', student)

                    this.newStudentName = ''                                        // clears the form Name
                    this.newStarID = ''
                }
            }
        }
    }
</script>

<style scoped>

</style>
