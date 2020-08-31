<template>
  <div id="app">
    <main class="container">
      <header>
        <h1>SIMPLE TODO LISTS</h1>
        <h3>FROM RUBY GARAGE</h3>
      </header>
      <section class="todo_lists" v-if="projects.length > 0">
        <TodoList v-for="todoList in projects" :todosProp="todoList.tasks" :title="todoList.name" :key="todoList.id" />
      </section>
      <footer>
        &copy; Ruby Garage
      </footer>
    </main>
  </div>
</template>

<script>
import TodoList from "./TodoList/TodoList"

export default {
  methods: {
    onConnect () {
      this.$wsClient.publish({
        destination: '/app/all'
      })
      this.$wsClient.subscribe('/user/queue/projects-with-tasks', (data) => {
        console.log(data.body)
        this.projects = JSON.parse(data.body)
      })
    }
  },
  data () {
    return {
      projects: [],
      todoLists: [
        {
          key: 1,
          title: "Complete the test task for Ruby Garage",
          todos: [
            {
              key: 1, content: 'Open this mock-up in Adobe Fireworks', done: false
            },
            {
              key:2, 
              content: 'Attentively check the file', done: false
            },
            {
              key: 3,
              content: 'Write HTML and CSS', done: false
            },
            {
              key: 4,
              content: 'Add Javascript to implement adding / editing / removing for todo items and lists taking into account as more use cases as possible', done: false
            }
          ]
        },
        {
          key: 2,
          title: "For Home",
          todos: [
            {
              key: 1,
              content: 'Buy a milk', done: true
            },
            {
              key: 2,
              content: 'Call Mam', done: true
            },
            {
              key: 3,
              content: 'Clean the room', done: true
            },
            {
              key: 4,
              content: 'Repair the DVD player', done: true
            }
          ]
        }
      ]
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
  justify-content: space-around;
  background: linear-gradient(#d9d5c1, #c0c6b8, #d4b756, #c8750d);
  padding: 10px;
  position: absolute;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
  overflow: auto;
  box-sizing: border-box;
}

.container>header {
  margin: 6vh 0;
  text-align: center;
}

</style>
