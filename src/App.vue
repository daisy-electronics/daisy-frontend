<template>
  <div id="app">
    <LoginForm />
    <button @click="subscribe">Subscribe</button>
    <button @click="unsubscribe">Unsubscribe</button>
  </div>
</template>

<script>
import LoginForm from './components/LoginForm';

export default {
  components: {
    LoginForm
  },
  methods: {
    subscribe() {
      this.$store.dispatch('ws/subscribe', { paths: ['temp0/humidity'] });
    },
    unsubscribe() {
      this.$store.dispatch('ws/unsubscribe', { paths: ['temp0/humidity'] });
    }
  }
};
</script>

<style lang="scss">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
