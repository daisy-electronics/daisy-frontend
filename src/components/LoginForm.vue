<template>
  <form class="login-form">
    <Field autocomplete="username" v-model="username" />
    <Field password autocomplete="password" v-model="password" />
    <Button @click="onLogin">Authenticate</Button>
    <Button @click="onLogout">Deauthenticate</Button>

    <div v-if="error">{{ error.message }}</div>
    <big>{{ isAuthenticated ? 'authenticated' : 'guest' }}</big>
  </form>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  data: () => ({
    username: '',
    password: '',
    error: null
  }),
  methods: {
    async onLogin() {
      try {
        await this.$store.dispatch('auth/login', {
          username: this.username,
          password: this.password
        });
        this.error = null;
      } catch (error) {
        this.error = error;
      }
    },
    async onLogout() {
      this.$store.dispatch('auth/logout');
      this.error = null;
    }
  },
  computed: {
    ...mapGetters({
      isAuthenticated: 'auth/isAuthenticated'
    })
  }
};
</script>

<style lang="stylus">
.login-form
  display flex
  flex-direction column
  align-items center

  input
    width 100%
</style>
