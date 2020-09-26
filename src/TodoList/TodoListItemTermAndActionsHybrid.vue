<template>
  <div class="actions_container">
    <actions :actions="actions" v-on="handlers" /> 
    <span class="badge" v-if="term">{{ termStr }}</span>
  </div>
</template>

<script>
import {DateTime} from "luxon"
import Actions from "@/components/Actions"

export default {
  name: 'term-and-actions',
  props: [
    'actions',
    'handlers',
    'term'
  ],
  components: {
    Actions
  },
  computed: {
    termStr () {
      return DateTime.fromISO(this.term).toFormat('dd/MM/yyyy HH:mm')
    }
  }
}
</script>

<style scoped>
.badge {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  text-align: center;
  display: block;
  margin: auto;
}

.actions_container {
  position: relative;
}
</style>
