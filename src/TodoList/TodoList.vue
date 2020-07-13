<template>
  <section class="todo_list">
    <header class="stripe">
      <img :src="ico" class="ico" alt="" />
      <div class="s10px"></div>
      <span>
        {{title}}
      </span>
      <div class="actions"></div>
    </header>
    <article>
      <AddSec/>
      <div class="view_sec">
        <TodoListItem v-for="(v, i) in todos" :idx="i" :key="i">
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
import headerIco from "@/assets/tasks.svg"

export default {
  props: {
    todos: Array,
    title: String
  },
  data () {
    return {
      ico: headerIco
    }
  },
  components: {AddSec, TodoListItem}
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

.todo_list>header>.text {
  flex-grow: 4;
}

.stripe {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 50px;
  box-sizing: border-box;
  padding: 10px;
}

.actions {
  visibility: hidden;
  flex-grow: 1;
}

.actions:hover {
  visibility: visible;
} 

.s10px {
  width: 10px;
}
</style>
