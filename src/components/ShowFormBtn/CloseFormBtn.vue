<template lang="pug">
  #close-form-btn
    button(@click="showToggle()") 閉じる
</template>

<script>
  export default {
    props: {
      close: {
        type: Boolean
      }
    },
    computed: {
      toggleWatch: {
        get() {
          return this.close
        },
        set(ChangedToggle) {
          this.$emit('input', ChangedToggle)
        }
      }
    },
    methods: {
      showToggle() {
        this.$emit('toggle', this.toggleWatch = !this.toggleWatch)
      }
    }
  }
</script>

<style lang="scss" scoped>
  button {
    margin-top: 50px;
    width: 200px;
    height: 30px;
    font-size: 16px;
    border: 1px solid black;
    border-radius: 3px;
    background-color: white;
  }
</style>