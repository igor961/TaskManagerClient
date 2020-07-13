<template>
  <div class="list_item">
    <input type="checkbox" @click="markDone" />
    <div class="text">
      <slot name="content"></slot>
    </div>
    <div class="actions">
      <span>A1</span>
      <span>A2</span>
      <span>A3</span>
    </div>
  </div>
</template>

<script>
export default {
  props: ['idx'],
  data () {
    return {

    }
  },
  methods: {
    markDone () {
      this.$emit("done", this.idx)
    }
  }
}
</script>

<style>
  .list_item {
    display: flex;
    flex-direction: row;
    align-items: center;
    width: 100%;
    border-top: 1px solid #e7ebea;
  }

  .list_item>* {
    
  }

  .list_item>input[type="checkbox"] {
    margin: 14px;
  }

  .list_item>.text {
    flex-grow: 4;
    flex-basis: 60%;
  }

  .list_item>.actions {
    flex-grow: 1
  }

</style>
