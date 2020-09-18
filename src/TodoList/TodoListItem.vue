<template>
  <div class="stripe bgchangeable list_item">
    <input type="checkbox" @change="markDone" :checked="todo.status" />
    <div class="s5px bordered"></div>
    <div class="text">
      <slot name="content"></slot>
    </div>
    <div class="s1px"></div>
    <term-and-actions :actions="actions"
                      :handlers="{
                                   delete: this.deleteItem, 
                                   changePriority: this.changePriority,
                                   edit: this.editItem
                                 }"
                      :term="todo.term"  />
  </div>
</template>

<script>
import TermAndActions from "./TodoListItemTermAndActionsHybrid"
import { required, maxLength } from "vuelidate/lib/validators"

export default {
  props: {
    'todo': Object,
    'pos': Number,
  },
  data () {
    return {
      newText: "",
      newDate: null,
      editingState: false,
      actions: [{
        name: 'changePriority',
        src: 'ch_p.svg'
      }, {
        name: "edit",
        src: 'edit.svg'
      }, {
        name: "delete",
        src: 'delete.svg',
        last: true
      }],
    }
  },
  validations: {
    newText: {
      required,
      maxLength: maxLength(256)
    }
  },
  methods: {
    markDone () {
      const status = !this.todo.status
      console.log("change status (done)", status)
      const newTodo = {...this.todo}
      newTodo.status = status
      this.$emit('update:todo', newTodo)
      this.$wsClient.publish({
        destination: '/app/task/update',
        body: JSON.stringify(newTodo)
      })
    },
    editItem () {
      console.log("edit Todo")
      //this.editingState = true
      //this.newText = this.$slots.content[0].text
      this.$emit('edit:todo', this.todo)
    },
    deleteItem () {
      console.log("delete Todo", this.pos)
      this.$wsClient.publish({
        destination: '/app/task/delete/' + this.todo.id
      });
      this.$emit('delete:todo', this.todo)
    },
    changePriority () {
      console.log("change priority")
      this.$emit('update:priority', this.todo)
    }
  },
  components: {
    TermAndActions
  }
}
</script>

<style>
.list_item {
  padding: 0 !important;
  width: 100%;
  border-top: 1px solid #e7ebea;
}

.list_item>* {

}

.list_item>input[type="checkbox"] {
  margin: 14px;
}

.stripe>.text {
  flex-grow: 4;
  flex-basis: 60%;
  padding: 15px;
}

</style>
