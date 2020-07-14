<template>
  <div class="stripe bgchangeable list_item">
    <input type="checkbox" @click="markDone" />
    <div class="s5px bordered"></div>
    <div class="text">
      <slot name="content"></slot>
    </div>
    <div class="s1px"></div>
    <Actions :actions="actions" 
             :itemIdx="idx"
             :itemPos="pos"
             v-on="itemListeners" />
  </div>
</template>

<script>
import Actions from "@/components/Actions"

export default {
  props: {
    'idx': Number, 
    'todos': Array, 
    'pos': Number
  },
  data () {
    return {
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
      itemListeners: {
        'edit': this.updateItem, 
        'delete': this.deleteItem, 
        'changePriority': this.changePriority
      },
    }
  },
  methods: {
    markDone () {
      this.$emit("done", this.idx)
    },
    updateItem (item) {
      console.log("update Todo", item)
      //TODO: update TodoItem
    },
    deleteItem (item) {
      console.log("delete Todo", item)
      const todos = [...this.todos]
      todos.splice(item.itemPos, 1)
      this.$emit('update:todos', todos)
    },
    changePriority (p) {
      console.log("change priority", p)
      if (p.itemPos===0) return
      const todos = [...this.todos]
      const tmp = todos[p.itemPos]
      todos[p.itemPos] = todos[p.itemPos-1]
      todos[p.itemPos-1] = tmp
      this.$emit('update:todos', todos)
    },
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
