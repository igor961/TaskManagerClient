<template>
  <div class="actions">
    <template  v-for="(a, i) in actions">
      <div class="action" :key="'a'+i">
        <img :src="require('@/assets/'+a.src)" @click="$emit(a.name)" alt="">
      </div>
      <div class="s1px" :key="'b'+i" v-if="!a.last"></div>
    </template>
  </div> 
</template>

<script>

export default {
  props: {
    actions: Array
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

  .s1px {
    margin: 3px 0;
  }
</style>
