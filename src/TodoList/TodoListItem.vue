<template>
  <div class="stripe bgchangeable list_item">
    <input type="checkbox" @change="markDone" :checked="todo.done" />
    <div class="s5px bordered"></div>
    <div class="text" 
         @keydown.enter.prevent="newText=$event.target.innerText"
         @keyup.enter="updateItem"
         :contenteditable="editingState">
      <slot name="content"></slot>
    </div>
    <div class="s1px"></div>
    <Actions :actions="actions"
             v-on="{
                      delete: this.deleteItem, 
                      changePriority: this.changePriority,
                      edit: this.editItem
                    }" />
  </div>
</template>

<script>
import Actions from "@/components/Actions"

export default {
  props: {
    'todo': Object,
    'pos': Number,
  },
  data () {
    return {
      newText: "",
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
  methods: {
    onConnect() {

    },
    markDone () {
      const status = !this.todo.done
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
      this.editingState = true
    },
    updateItem () {
      console.log("update Todo", this.newText)
      this.editingState = false
      const newTodo = {...this.todo}
      newTodo.name = this.newText
      this.$wsClient.publish({
        destination: '/app/task/update',
        body: JSON.stringify(newTodo)
      });
      this.$emit('update:todo', newTodo)
    },
    deleteItem () {
      console.log("delete Todo", this.pos)
      this.$wsClient.publish({
        destination: '/app/task/delete/' + this.todo.id
      });
      this.$emit('delete:todo', this.todo.id)
    },
    changePriority () {
      console.log("change priority", this.pos)
      /*if (this.pos===0) return
      const tmp = todos[this.pos]
      todos[this.pos] = todos[this.pos-1]
      todos[this.pos-1] = tmp
       */
      // TODO: implement
    }
  },
  components: {
    Actions
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
