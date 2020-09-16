<template>
  <div id="app">
    <main class="container">
      <header>
        <h1>SIMPLE TODO LISTS</h1>
        <h3>FROM RUBY GARAGE</h3>
      </header>
      <loading :active.sync="isLoading" />
      <section class="todo_lists" v-if="projects && !addingList">
        <todo-list v-for="(todoList, i) in projectsArr" 
                  v-bind="{
                    todosProp: todoList.tasks, 
                    title: todoList.name,
                    id: todoList.id,
                    pos: i,
                    projects: projectsArr
                  }"
                  :key="todoList.id"
                  @send:batch="sendBatch"
                  @update:priority="updatePriority"
                  @delete="deleteList"
                  @delete:todo="deleteItem"
                  @update:todo="updateItem" />
      </section>

      <add-list-sec :addingList.sync="addingList" @create:list="createList" />

      <button @click="addingList=true" class="stripe blue_elem" v-show="!isLoading && !addingList">
        <img class="ico" :src="btnIco" alt="">
        <div class="text">Add TODO List</div>
      </button>

      <footer>
        &copy; Ruby Garage
      </footer>
    </main> 
  </div>
</template>

<script>
import TodoList from "./TodoList/TodoList"
import AddListSec from "./TodoList/AddListSec"
import btnIco from "@/assets/plus_btn.svg"
import Projects from "@/projects"
import Loading from 'vue-loading-overlay'

export default {
  methods: {
    onConnect () { 
      this.isLoading = false
      this.$wsClient.subscribe('/user/queue/projects-with-tasks', (data) => {
        console.log(data.body)
        this.projects = new Projects(JSON.parse(data.body), this.notifyProjects)
      })
      this.$wsClient.publish({
        destination: '/app/all'
      })

      this.$wsClient.subscribe('/user/queue/task', res => {
        const task = JSON.parse(res.body)
        this.projects.createTask(task.projectId, task)
      })

      //Subscribe on 'new project created' event
      this.$wsClient.subscribe('/user/queue/project', res => {
        const project = JSON.parse(res.body)
        const task = {
          name: this.newProject.firstTaskName,
          projectId: project.id
        }

        this.projects.create(project)

        this.$wsClient.publish({
          destination: '/app/task/create',
          body: JSON.stringify(task)
        })
      })
    },
    deleteList (projId) {
      this.projects.delete(projId)
      this.$wsClient.publish({
        destination: '/app/project/delete/' + projId
      })
    },
    updateItem ({id, todo}) {
      console.log("UpdateItem", id, todo)
      this.projects.updateTask(id, todo)
    },
    deleteItem ({projId, task}) {
      this.projects.deleteTask(projId, task)  
    },
    createList (newProject) {
      console.log("create TodoList")
      this.newProject = newProject
      const newProj = {
        name: this.newProject.name
      }
      this.$wsClient.publish({
        destination: '/app/project/create',
        body: JSON.stringify(newProj)
      })
      this.addingList = false
    },
    notifyProjects () {
      this.$set(this, 'projectsArr', this.projects.getAll())
    },
    updatePriority (task) {
      this.projects.changePriority(task)
    },
    sendBatch (id) {
      console.log(id)
      const project = this.projects.get(id)
      this.$wsClient.publish({
        destination: '/app/task/batch',
        body: JSON.stringify(Object.values(project.tasks))
      })
    }
  },
  watch: {
    projects () {
      console.log("Watching projects")
      this.projectsArr = this.projects.getAll()
    }
  },
  data () {
    return {
      projects: null,
      projectsArr: null,
      addingList: false,
      newProject: null,
      btnIco,
      isLoading: true
    }
  },
  components: {TodoList, AddListSec, Loading}
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

button.blue_elem:hover {
  background: linear-gradient(#335ba1, #5186c0);
}

button {
  border-radius: 2px;
  border: 0;
  cursor: pointer;
}


</style>
