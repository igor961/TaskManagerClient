<template>
  <form @submit.prevent="submit" class="adding_list_form" v-show="addingList">
    <label>
      Project's name
      <input type="text" v-model.trim="$v.name.$model">
      <template v-if="$v.name.$invalid && $v.$anyDirty">(Field must not be empty)</template>
    </label>
    <label>
      Task's name
      <input type="text" v-model.trim="$v.firstTaskName.$model">
      <template v-if="$v.firstTaskName.$invalid && $v.$anyDirty">(Field must not be empty)</template>
    </label>
    <div class="form-group">
      <button type="submit" class="blue_elem">Create</button>
      <button @click="$emit('update:addingList', false)" class="blue_elem">Cancel</button>
    </div>
  </form>
</template>

<script>
import { required } from "vuelidate/lib/validators"

export default {
  name: 'add-list-sec',
  props: {
    addingList: Boolean,
    newProjectRef: Object
  },
  methods: {
    submit () {
      if (this.$v.$invalid) return
      this.$emit('update:newProjectRef', {name: this.name, firstTaskName: this.firstTaskName})
    }
  },
  data () {
    return {
      name: '',
      firstTaskName: ''
    }
  },
  validations: {
    name: {
      required
    },
    firstTaskName: {
      required
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
