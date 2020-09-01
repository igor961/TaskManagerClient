<template>
  <div class="stripe add_sec">
    <img :src="img" class="ico" alt="" />
    <div class="s10px"></div>
    <form @submit.prevent="$emit('create', newTaskContent)">
      <input type="text" placeholder="Start typing here to create a task" v-model="newTaskContent" />
      <button type="submit">Add Task</button>
    </form>
  </div>
</template>

<script>
  import ico from "@/assets/plus.svg"

  export default {
    data () {
      return {
        img: ico, 
        newTaskContent: ""
      }
    }
  }
</script>

<style scoped>
.add_sec {
  width: 100%;
  height: 100%;
  display: flex; 
  height: 50px;
  background: linear-gradient(#e0e0e0, #dedede, #cfcfcf, #cdcdcd);
}

.add_sec>.ico {
}

.add_sec>form {
  display: flex;
  flex-grow: 2;
  height: 100%;
}

.add_sec>form>button {
  border-radius: 0 3px 3px 0;
  border: 1px solid #447557;
  text-shadow: 0 1px 0 #1c2922;
  box-sizing: border-box;
  width: 108px;
  background: linear-gradient(#94cbae, #508767);
  color: white;
}

.add_sec>form>* {
  border-radius: 0;
  border: 1px solid #a9a9a9;
}

.add_sec>form>input {
  width: 70%;
  flex-grow: 1;
}
</style>
