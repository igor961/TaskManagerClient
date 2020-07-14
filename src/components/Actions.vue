<template>
  <div class="actions">
    <template  v-for="(a, i) in actions">
      <div class="action" :key="'a'+i">
        <img :src="require('@/assets/'+a.src)" @click="$emit(a.name, {itemIdx, itemPos})" alt="">
      </div>
      <div class="s1px" :key="'b'+i" v-if="!a.last"></div>
    </template>
  </div> 
</template>

<script>

export default {
  props: {
    actions: Array,
    itemIdx: Number,
    itemPos: Number
  }
}
</script>

<style scoped>
  .action>img {
    opacity: 0.5;
  }

  .action>img:hover {
    opacity: 1;
  }
</style>
