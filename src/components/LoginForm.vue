<template>
  <form class="login-form">
    <input type="text" autocomplete="username" v-model="username" />
    <input type="password" autocomplete="password" v-model="password" />
    <button type="button" @click="onLogin">Authenticate</button>
    <button type="button" @click="onLogout">Deauthenticate</button>

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

<style lang="scss">
.login-form {
  display: flex;
  flex-direction: column;
  align-items: center;

  input {
    width: 100%;
  }
}
</style>
