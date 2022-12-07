<script>
export default {
  props: {
    block: Object,
    dataBinding: String,
  },

  data() {
      return {
      count: 0
      }
  }
}
</script>

<template>
  <div class="" :data-cms-bind="dataBinding">
      <button @click="count++">You clicked me {{ count }} times.</button>
      <p>{{ block.title }}</p>
  </div>
</template>