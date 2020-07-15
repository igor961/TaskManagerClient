<template>
  <div class="stripe bgchangeable list_item">
    <input type="checkbox" @click="markDone" />
    <div class="s5px bordered"></div>
    <div class="text" 
         @keydown.enter.prevent="newText=$event.target.innerText"
         @keyup.enter="mutateTodos(null, updateItem)"
         :contenteditable="editingState">
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
      itemListeners: this.getItemListeners({
        'edit': this.editItem, 
        'delete': this.deleteItem, 
        'changePriority': this.changePriority
      })
    }
  },
  methods: {
    markDone () {
      this.$emit("done", this.idx)
    },
    editItem (item) {
      console.log("edit Todo", item)
      this.editingState = true
    },
    updateItem(pld, todos) {
      console.log("update Todo", this.newText)
      this.editingState = false
      todos[this.pos].content = this.newText
    },
    deleteItem (item, todos) {
      console.log("delete Todo", item)
      todos.splice(item.itemPos, 1)
    },
    changePriority (p, todos) {
      console.log("change priority", p)
      if (p.itemPos===0) return
      const tmp = todos[p.itemPos]
      todos[p.itemPos] = todos[p.itemPos-1]
      todos[p.itemPos-1] = tmp
    },
    mutateTodos (payload, cb) {
      const todos = [...this.todos]
      cb(payload, todos)
      this.$emit('update:todos', todos)
    },
    getItemListeners (aux) {
      const res = {}
      for (const key in aux) {
        if (Object.prototype.hasOwnProperty.call(aux, key))
          res[key] = pld => this.mutateTodos(pld, aux[key])
      }
      return res
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
