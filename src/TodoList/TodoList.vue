<template>
  <section class="todo_list">
    <header class="stripe">
      <img :src="ico" class="ico" alt="" />
      <div class="s10px"></div>
      <div class="text" style="padding: 0;">
        {{title}}
      </div>
      <Actions :actions="actions" v-on="listListeners" />
    </header>
    <article>
      <AddSec @create="createItem" />
      <div class="view_sec">
        <TodoListItem v-for="(v, i) in todos" 
                      :todos.sync="todos" 
                      :idx="v.key"
                      :pos="parseInt(i)"
                      :key="v.key"> 
          <template v-slot:content>
            {{v.content}}
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
    todosProp: Array,
    title: String
  },
  methods: { 
    createItem (content) {
      console.log("create Todo", content)
      this.$set(this.todos, this.todos.length, {content})
    }, 
    createList (e) {
      console.log("create TodoList", e)
      //TODO: create TodoList
    },
    updateList (e) {
      console.log("update TodoList", e)
      //TODO: update TodoList
    },
    deleteList () {
      console.log("delete TodoList")
      //TODO: delete TodoList
    },
  },
  data () {
    return {
      todos: [...this.todosProp],
      ico: headerIco,
      actions: [{
        name: "edit",
        src: 'edit_h.svg'
      }, {
        name: "delete",
        src: 'delete_h.svg',
        last: true
      }],    
      listListeners: {
        'edit': this.updateList, 
        'delete': this.deleteList
      }
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
  margin: 50px 10px;
  background: white;
  border-radius: 0 0 20px 20px;
  border: 1px solid #a8a8a8;
}

.todo_list>header {
  background: linear-gradient(#5282c0, #3963a0);
  color: white;
  font-size: 1.2em;
  text-align: left;
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
