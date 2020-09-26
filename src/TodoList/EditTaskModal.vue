<template>
  <div class="window modal" v-show="editing.status">
    <header class="stripe blue_elem">
      <img :src="ico" alt="" class="ico">
      <div class="text">{{ title || 'Edit task' }}</div>
    </header>
    <article>
      <form @submit.prevent="submit">
        <div class="form-row">
          <h6>A new name for this task</h6>
          <input v-model.trim="$v.newTask.name.$model" type="text" />
        </div>
        <div class="form-row">
          <h6>A new term for this task</h6>
          <div>
            <datetime v-model="$v.newTask.term.$model" 
                      type="datetime" 
                      :min-datetime="new Date().toISOString()" />
            <button type="button" style="position: absolute;" @click="($v.newTask.term.$model = null)">Clear</button>
          </div>
        </div>
        <div class="form-row">
          <h6 v-show="errorSubmitting" style="color: red;">Please, fill in the form correctly!</h6>
        </div>
        <div class="form-row footer-row">
          <button type="submit" :disabled="!$v.$anyDirty">Submit</button>
          <button type="button" @click="cancel" class="cancel-btn">Cancel</button>
        </div>
      </form>
    </article>
  </div>
</template>

<script>
import headerIco from "@/assets/edit_stripe.svg"
import { required, maxLength } from "vuelidate/lib/validators"
import { Datetime } from 'vue-datetime'
import 'vue-datetime/dist/vue-datetime.css'

export default {
  props: [
    'title',
    'editing'
  ],
  watch: {
    editing (newVal) {
      this.newTask = {...newVal.task}
    }
  },
  validations: {
    newTask: {
      name: {
        required,
        maxLength: maxLength(256)
      },
      id: {required},
      term: {}
    }
  },
  data () {
    return {
      ico: headerIco,
      errorSubmitting: false,
      newTask: {...this.editing.task}
    }
  },
  methods: {
    submit () {
      this.$v.$touch()
      if (this.$v.$invalid) {
        this.errorSubmitting = true
        setTimeout(() => this.errorSubmitting = false, 5000)
      } else {
        this.$emit('update:task', this.newTask)
        this.$v.$reset()
      }
    },
    cancel () {
      this.$emit('update:editing', {...this.editing, status: false})
      this.$v.$reset()
    }
  },
  components: {
    Datetime
  }
}

</script>

<style>
.modal {
  position: fixed;
  width: 700px;
  top: 20vh;
  /*bottom: 20vh;*/
  left: 0;
  right: 0;
  margin: auto;
  z-index: 100;
  box-shadow: 0px 0px 20px 20px #a8a8a8;
}

.modal>* {
  padding: 10px;
  box-sizing: border-box;
}

.modal .stripe {
  height: 50px;
}

form>.form-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 10px 100px;
  height: 50px;
}

form>.form-row.footer-row {
  margin: 10px 0 0 0;
  padding: 0;
  width: 100%;
  height: 50px;
  align-items: stretch;
}

form>.form-row.footer-row>* {
  flex: 1 1 auto;
  font-size: 1em;
}

form>.footer-row>button[type=submit] {
  background: #fff;
  border: 3px solid #A5C23D;
  border-radius: 10px 0 0 10px;
  margin: 0 10px 0 100px;
}

form>.footer-row>button[type=submit]:hover {
  background: #A5C23Dee;
}

form>.footer-row>button[disabled]:hover {
  background: #fff;
}

form>.footer-row>button.cancel-btn {
  background: #fff;
  border: 3px solid #E5B12E;
  border-radius: 0 10px 10px 0;
  margin: 0 100px 0 10px;
}

form>.footer-row>button.cancel-btn:hover {
  background: #E5B12Eee;
}

form h6 {
  font-size: 16px;
  font-style: italic;
  font-weight: normal;
}
</style>
