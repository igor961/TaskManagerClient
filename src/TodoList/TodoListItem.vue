<template>
  <div class="stripe bgchangeable list_item">
    <input type="checkbox" @click="markDone" />
    <div class="s5px bordered"></div>
    <div class="text">
      <slot name="content"></slot>
    </div>
    <div class="s1px"></div>
    <div class="actions">
      <div class="action">A</div>
      <div class="s1px"></div>
      <div class="action">B</div>
      <div class="s1px"></div>
      <div class="action">C</div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['idx'],
  methods: {
    markDone () {
      this.$emit("done", this.idx)
    }
  }
}
</script>

<style>
.list_item {
  padding: 0 !important;
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
  padding: 15px;
}
</style>
