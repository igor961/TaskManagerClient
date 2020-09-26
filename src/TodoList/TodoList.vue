<template>
  <section class="window todo_list">
    <header class="stripe blue_elem">
      <img :src="ico" class="ico" alt="" />
      <div class="s10px"></div>
      <div class="text" 
           style="padding: 0;"
           :contenteditable="editingTitle"
           @keydown.enter.prevent="setNewTitle($event.target.innerText)"
           @keyup.enter="updateTitle"
           ref="title">
        {{title}}
      </div>
      <span class="cap" v-if="editingTitle && $v.newTitle.$invalid">(New title must not be empty or larger than 64 symbols)</span>
      <Actions :actions="actions" 
               @edit="editTitle" 
               @delete="$emit('delete', id)" />
    </header>
    <article>
      <AddSec @create="createItem" />
      <div class="view_sec">
        <TodoListItem v-for="(v, i) in projects[pos].tasks" 
                      @edit:todo="$emit('edit:todo', $event)"
                      @delete:todo="$emit('delete:todo', $event)"
                      @update:priority="$emit('update:priority', $event) && (batchReady = true)"
                      :todo="v"
                      :pos="parseInt(i)"
                      :key="v.id">
          <template v-slot:content>
            {{v.name}}
          </template>
        </TodoListItem>
      </div>
    </article>
    <button @click="$emit('send:batch', id) && (batchReady = false)" class="send_batch_button" v-show="batchReady">
      Finish
    </button>
  </section>
</template>

<script>
import AddSec from "./AddSec"
import TodoListItem from "./TodoListItem"
import Actions from "@/components/Actions"
import headerIco from "@/assets/tasks.svg"
import { required, maxLength } from "vuelidate/lib/validators"

export default {
  props: {
    projects: Array,
    todosProp: Object,
    title: String,
    id: Number,
    pos: Number
  },
  validations: {
    newTitle: {
      required,
      maxLength: maxLength(64)
    }
  },
  methods: {
    setNewTitle (title) {
      this.newTitle = title
      this.$v.newTitle.$touch()
    },
    createItem (content) {
      console.log("create Todo", content)
      this.$wsClient.publish({
        destination: '/app/task/create',
        body: JSON.stringify({
          projectId: this.id,
          name: content
        })
      })
    },
    updateTitle () {
      if (this.$v.newTitle.$invalid) return;
      this.editingTitle = false
      this.$wsClient.publish({
        destination: '/app/project/update',
        body: JSON.stringify({
          name: this.newTitle,
          id: this.id
        })
      })
    },
    editTitle () {
      this.newTitle = this.title
      this.editingTitle = true
      this.$nextTick(() => this.$refs.title.focus())
    }
  },
  data () {
    return {
      batchReady: false,
      newTitle: "",
      editingTitle: false,
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

.window {
  background: white;
  border-radius: 0 0 20px 20px;
  border: 1px solid #a8a8a8;
}

.todo_list {
  width: 1000px;
  margin-bottom: 50px;
  background: white;
  border-radius: 0 0 20px 20px;
  border: 1px solid #a8a8a8;
  cursor: pointer;
  position: relative;
}

.window>header>.ico {
  opacity: 0.4;
}

.stripe {
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
  min-height: 50px;
  box-sizing: border-box;
  padding: 10px;
}

.stripe .cap {
  position: absolute;
  top: 25px;
  left: 50px;
  color: red;
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

.stripe:hover .badge {
  visibility: hidden;
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
  background: #e7ebea;
  align-self: stretch;
}

header .s1px {
  background: #5284bf;
}

.send_batch_button {
  position: absolute;
  left: 150px;
  background: red;
  color: #fff;
}

</style>
