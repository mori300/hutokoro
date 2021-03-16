<template lang="pug">
  #salary-form-show-btn
    button(@click="showToggle()") {{ title }}
</template>

<script>
  export default {
    props: {
      show: {
        type: Boolean
      },
      title: {
        type: String
      }
    },
    computed: {
      toggleWatch: {
        get() {
          return this.show
        },
        set(ChangedToggle) {
          this.$emit('toggle', ChangedToggle)
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
@media (max-width: 768px) {
  #salary-form-show-btn {
    button {
      width: 70%;
      height: 50px;
      font-size: 16px;
      margin-bottom: 60px;
      border: 1px solid black;
      border-radius: 8px;
      background-color: white;
    }
  }
}

@media (min-width: 769px) {
  #salary-form-show-btn {
    button {
      width: 300px;
      height: 50px;
      font-size: 16px;
      margin-bottom: 30px;
      border: 1px solid black;
      border-radius: 8px;
      background-color: white;
    }
  }
}
</style>