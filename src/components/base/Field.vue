<template>
  <input class="input" :type="password ? 'password' : 'text'"
    :value="value" @input="$emit('input', $event.target.value)" />
</template>

<script>
export default {
  props: {
    password: Boolean,
    value: String
  }
};
</script>

<style lang="stylus">
.input
  color #333
  width 100%
  box-sizing border-box
  border 0
  padding 7px 15px
  border 1px solid #ccc
  position relative
  background $color-bg
  transition 0.5s
  border-radius $border-radius
  outline 0

.input:focus
  background alpha($color-light, 0.05)
  transition 0.5s
  border-color $color-primary
</style>
