<template>
  <form @submit.prevent="submit" class="adding_list_form" v-show="addingList">
    <label>
      Project's name
      <input type="text" v-model.trim="$v.name.$model">
      <template v-if="$v.name.$invalid && $v.$anyDirty">(Field must not be empty or larger than 64 symbols)</template>
    </label>
    <label>
      Task's name
      <input type="text" v-model.trim="$v.firstTaskName.$model">
      <template v-if="$v.firstTaskName.$invalid && $v.$anyDirty">(Field must not be empty or larger than 256 symbols)</template>
    </label>
    <div class="form-group">
      <button type="submit" class="blue_elem">Create</button>
      <button @click="cancel" class="blue_elem" type="button">Cancel</button>
    </div>
  </form>
</template>

<script>
import { required, maxLength } from "vuelidate/lib/validators"

export default {
  name: 'add-list-sec',
  props: {
    addingList: Boolean
  },
  methods: {
    submit () {
      if (this.$v.$invalid) return
      this.$emit('create:list', {name: this.name, firstTaskName: this.firstTaskName})
    },
    cancel () {
      this.$emit('update:addingList', false)
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
      required,
      maxLength: maxLength(64)
    },
    firstTaskName: {
      required,
      maxLength: maxLength(256)
    }
  }
}
</script>

<style scoped>

.adding_list_form {
  width: 50%;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.adding_list_form>* {
  margin: 10px;
}

label {
  width: 250px;
}

label>* {
  display: block;
  width: 100%;
  box-sizing: border-box;
}

button {
  min-height: 50px;
  padding: 10px;
  margin: 10px;
}


</style>
