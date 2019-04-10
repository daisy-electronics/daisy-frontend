<template>
  <button class="button" type="button" @click="onClick">
    <slot />
  </button>
</template>

<script>
export default {
  props: {
    navigateTo: String
  },
  methods: {
    onClick() {
      if (this.navigateTo) {
        this.$router.push(this.navigateTo);
      }
      this.$emit('click');
    }
  }
};
</script>

<style lang="stylus">
.button
  display inline-block
  padding $padding $padding * 2.5
  border 1px solid $text-color
  background-color $color-primary
  margin 0
  text-decoration none
  font-family $font-family
  font-size 1rem
  cursor pointer
  text-align center
  border-radius $border-radius
  transition background 250ms ease-in-out
              transform 150ms ease
  -webkit-appearance none
  -moz-appearance none

.button:active
  transform scale(0.95)
  outline 0
</style>
