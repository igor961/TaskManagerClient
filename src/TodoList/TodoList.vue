<template>
  <section class="todo_list">
    <header class="stripe blue_elem">
      <img :src="ico" class="ico" alt="" />
      <div class="s10px"></div>
      <div class="text" 
           style="padding: 0;" 
           :contenteditable="editingTitle"
           @keydown.enter.prevent="newTitle=$event.target.innerText"
           @keyup.enter="updateTitle">
        {{title}}
      </div>
      <Actions :actions="actions" 
               @edit="editTitle" 
               @delete="$emit('delete', pos)" />
    </header>
    <article>
      <AddSec @create="createItem" />
      <div class="view_sec">
        <TodoListItem v-for="(v, i) in todos" 
                      :todos.sync="todos"
                      @update:todo="updateProjects"
                      @delete:todo="deleteItem"
                      :idx="v.id"
                      :pos="parseInt(i)"
                      :key="v.id"
                      :done="v.status">
          <template v-slot:content>
            {{v.name}}
          </template>
        </TodoListItem>
      </div>
    </article>
  </section>
</template>

<script>
import AddSec from "./AddSec"
import TodoListItem from "./TodoListItem"
import Actions from "@/components/Actions"
import headerIco from "@/assets/tasks.svg"

export default {
  props: {
    todosProp: Object,
    title: String,
    id: Number,
    pos: Number
  },
  methods: {
    createItem (content) {
      console.log("create Todo", content)
      this.$set(this.todos, this.todos.length, {id: -1, name: content})
      this.$wsClient.publish({
        destination: '/app/task/create',
        body: JSON.stringify({
          projectId: this.id,
          name: content
        })
      })
    },
    updateTitle () {
      this.editingTitle = false
      if (this.newTitle === "") return;
      this.$wsClient.publish({
        destination: '/app/project/update',
        body: JSON.stringify({
          name: this.newTitle,
          id: this.id
        })
      })
    },
    editTitle () {
      this.editingTitle = true
    },
    updateProjects (todo) {
      this.$emit('update:projects', {
        pos: this.pos,
        todo
      })
    },
    deleteItem (idx) {
      this.$emit('delete:todo', {
        pos: this.pos,
        idx 
      })
    }
  },
  watch: {
    todosProp () {
      this.todos = Object.values(this.todosProp)
    }
  },
  data () {
    return {
      newTitle: "",
      editingTitle: false,
      todos: Object.values(this.todosProp),
      ico: headerIco,
      actions: [{
        name: "edit",
        src: 'edit_h.svg'
      }, {
        name: "delete",
        src: 'delete_h.svg',
        last: true
      }] 
    }
  },
  components: {AddSec, TodoListItem, Actions}
}
</script>

<style>
.view_sec {
  width: 100%;
}

.todo_list {
  width: 1000px;
  margin-bottom: 50px;
  background: white;
  border-radius: 0 0 20px 20px;
  border: 1px solid #a8a8a8;
}

.todo_list>header>.ico {
  opacity: 0.4;
}

.stripe {
  display: flex;
  justify-content: space-between;
  align-items: center;
  min-height: 50px;
  box-sizing: border-box;
  padding: 10px;
}

.stripe.bgchangeable:hover {
  background: #fcfed5;

}

.stripe .actions {
  visibility: hidden;
  flex-grow: 1;
  display: flex;
  justify-content: center;
  text-align: center;
}

.stripe .actions>.action {
  flex-grow: 1;
  padding: 0 10px;
}

.stripe:hover .actions {
  visibility: visible;
}

.stripe:hover:last-child {
  border-radius: 0 0 20px 20px;
} 

.s10px {
  width: 10px;
}

.stripe>.s5px.bordered {
  border-right: 1px solid #efdadf;
  border-left: 1px solid #efdadf;
  align-self: stretch;
  box-sizing: border-box;
}

.s5px {
  width: 5px;
}

.s1px {
  width: 1px;
  margin: 3px 0;
  background: #e7ebea;
  align-self: stretch;
}

header .s1px {
  background: #5284bf;
}


</style>
