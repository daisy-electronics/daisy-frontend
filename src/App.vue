<template>
  <div id="app">
    <Header />
    <div class="separator" />
    <main class="content">
      <router-view />
    </main>
  </div>
</template>

<script>
import Header from './components/Header';

export default {
  components: {
    Header
  }
};
</script>

<style lang="stylus">
html, body
  font-family $font-family
  -webkit-font-smoothing antialiased
  -moz-osx-font-smoothing grayscale
  color $text-color
  background-color $color-bg
  height 100%

#app
  display flex
  margin 0 auto
  flex-direction column
  max-width $max-width
  height 100%

.separator
  width 95%
  background-color $color-light
  height 1px
  opacity 0.7
  align-self center

.content
  flex-grow 1
  position relative
</style>
