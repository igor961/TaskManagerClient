<template>
  <form @submit.prevent="$emit('update:newProjectRef', newProject)" class="adding_list_form" v-show="addingList">
    <label>
      Project's name
      <input type="text" v-model="newProject.name">
    </label>
    <label>
      Task's name
      <input type="text" v-model="newProject.firstTaskName">
    </label>
    <div class="form-group">
      <button type="submit" class="blue_elem">Create</button>
      <button @click="$emit('update:addingList', false)" class="blue_elem">Cancel</button>
    </div>
  </form>
</template>

<script>
export default {
  name: 'add-list-sec',
  props: {
    addingList: Boolean,
    newProjectRef: Object
  },
  data () {
    return {
      newProject: {
        name: '',
        firstTaskName: ''
      }
    }
  }
}
</script>

<style scoped>

.adding_list_form {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.adding_list_form>* {
  margin: 10px;
}

button {
  min-height: 50px;
  padding: 10px;
  margin: 10px;
}
</style>
