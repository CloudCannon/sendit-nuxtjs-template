<script>
export default {
    props: ['title'],

    data() {
        return {
        count: 0
        }
    }
}
</script>

<template>
  <button @click="count++">You clicked me {{ count }} times.</button>
  <p>{{ title }}</p>
</template>