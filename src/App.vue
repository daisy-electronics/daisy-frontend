<template>
  <div id="app">
    <Header />
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
html, body {
  font-family $font-family
  -webkit-font-smoothing antialiased
  -moz-osx-font-smoothing grayscale
  color $text-color
  padding 0
  margin 0
  background-color $color-primary
}
</style>
