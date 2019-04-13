<template>
  <form class="login-form" @submit.prevent="onLogin">
    <Field class="control" autofocus autocomplete="username" v-model="username" />
    <Field class="control" password autocomplete="password" v-model="password" />
    <Button class="control" type="submit">Authenticate</Button>

    <div class="error" :style="{ visibility: error ? 'visible' : 'hidden' }">
      {{ error && error.message }}
    </div>
  </form>
</template>

<script>
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
        this.navigateAway();
      } catch (error) {
        this.error = error;
      }
    }
  }
};
</script>

<style lang="stylus">
.login-form
  display flex
  flex-direction column
  align-items center

  .control
    margin-bottom $gap

  .error
    height 1ex
</style>
