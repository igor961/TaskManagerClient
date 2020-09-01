<template>
  <div id="app">
    <main class="container">
      <header>
        <h1>SIMPLE TODO LISTS</h1>
        <h3>FROM RUBY GARAGE</h3>
      </header>
      <section class="todo_lists" v-if="projects.length > 0">
        <TodoList v-for="(todoList, i) in projects" 
                  v-bind="{
                    todosProp: todoList.tasks, 
                    title: todoList.name,
                    id: todoList.id 
                  }"
                  :key="todoList.id"
                  :pos="i"
                  @delete="deleteList"
                  @delete:todo="deleteItem"
                  @update:projects="updateProjects" />
      </section>

      <button class="stripe blue_elem"><img class="ico" :src="btnIco" alt=""><div class="text">Add TODO List</div></button>

      <footer>
        &copy; Ruby Garage
      </footer>
    </main>
  </div>
</template>

<script>
import TodoList from "./TodoList/TodoList"
import btnIco from "@/assets/plus_btn.svg"


export default {
  methods: {
    onConnect () { 
      this.$wsClient.subscribe('/user/queue/projects-with-tasks', (data) => {
        console.log(data.body)
        this.projects = JSON.parse(data.body)
        const ids = new Map();
        this.projects.forEach((p, i) => ids.set(p.id, i))
        this.ids = ids
      })
      this.$wsClient.publish({
        destination: '/app/all'
      })

      this.$wsClient.subscribe('/user/queue/task', res => {
        const task = JSON.parse(res.body)
        this.updateProjects({pos: this.ids.get(task.projectId), todo: task})
        //this.$set(this.projects[this.ids.get(task.projectId)].tasks, String(task.id), task)
      })
    },
    deleteList (pos) {
      const id = this.projects[pos].id
      this.$wsClient.publish({
        destination: '/app/project/delete/' + id
      })
      this.$delete(this.projects, pos)
    },
    createList (e) {
      console.log("create TodoList", e)
      //TODO: create TodoList
    },
    updateProjects ({pos, todo}) {
      this.$set(this.projects[pos].tasks, String(todo.id), todo)
    },
    deleteItem ({pos, idx}) {
      this.$delete(this.projects[pos].tasks, String(idx))
    }
  },
  data () {
    return {
      projects: [],
      ids: null,
      btnIco
    }
  },
  components: {TodoList}
}
</script>

<style>
#app {
  font-family: Arial, Verdana, sans-serif;
  width: 100%;
}
main.container {
  width: 100%;
  display: flex;
  margin: auto;
  flex-direction: column;
  align-items: center;
  background: linear-gradient(#d9d5c1, #c0c6b8, #d4b756, #c8750d);
  position: absolute;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
  overflow: auto;
  box-sizing: border-box;
}

.container>header {
  margin: 50px;
  text-align: center;
}

footer {
  color: white;
  padding: 30px;
}

.blue_elem {
  background: linear-gradient(#5186c0, #335ba1);
  color: white;
  font-size: 1.2em;
  text-align: left;
  border: 1px solid #315589;
}

button.stripe {
  border-radius: 2px;
}

</style>
