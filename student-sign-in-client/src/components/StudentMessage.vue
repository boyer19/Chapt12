<!-- Template/HTML here -->
<template>
    <div>
    <!-- show a message when student arrives or leaves  -->
        <div v-show="student.name">
            <div v-if="student.present" class="alert alert-success">             <!-- https://getbootstrap.com/docs/4.0/components/alerts/-->
                Welcome, {{ student.name }}
            </div>

            <div  v-else class="alert alert-info">
                Goodbye, {{ student.name }}. See you later.
            </div>
        </div>
    </div>
   
</template>  

<script>
    export default {
        // create component here
        name: 'StudentMessage',
        props: {
            student: Object
        }
    }
</script>

<style scoped>

</style>