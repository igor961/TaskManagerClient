<template>
  <div id="app">
    <main class="container">
      <header>
        <h1>SIMPLE TODO LISTS</h1>
        <h3>FROM RUBY GARAGE</h3>
      </header>
      <TodoList v-for="(todoList, i) in todoLists" :todos="todoList.todos" :title="todoList.title" :key="i" />
      <footer>
        &copy; Ruby Garage
      </footer>
    </main>
  </div>
</template>

<script>
import TodoList from "./TodoList/TodoList"

export default {
  data () {
    return {
      todoLists: [
        {
          title: "Complete the test task for Ruby Garage",
          todos: [
            {
              content: 'Open this mock-up in Adobe Fireworks', done: false
            },
            {
              content: 'Attentively check the file', done: false
            },
            {
              content: 'Write HTML and CSS', done: false
            },
            {
              content: 'Add Javascript to implement adding / editing / removing for todo items and lists taking into account as more use cases as possible', done: false
            }
          ]
        },
        {
          title: "For Home",
          todos: [
            {
              content: 'Buy a milk', done: true
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
