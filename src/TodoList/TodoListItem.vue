<template>
  <div class="stripe bgchangeable list_item">
    <input type="checkbox" @click="markDone" />
    <div class="s5px bordered"></div>
    <div class="text">
      <slot name="content"></slot>
    </div>
    <div class="s1px"></div>
    <Actions :actions="actions" :itemIdx="idx" />
  </div>
</template>

<script>
import Actions from "@/components/Actions"

export default {
  props: ['idx'],
  data () {
    return {
      actions: [{
        name: 'changePriority',
        src: 'ch_p.svg'
      }, {
        name: "edit",
        src: 'edit.svg'
      }, {
        name: "delete",
        src: 'delete.svg',
        last: true
      }],
      actionListeners: {}
    }
  },
  methods: {
    markDone () {
      this.$emit("done", this.idx)
    }
  },
  components: {
    Actions
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

.stripe>.text {
  flex-grow: 4;
  flex-basis: 60%;
  padding: 15px;
}
</style>
