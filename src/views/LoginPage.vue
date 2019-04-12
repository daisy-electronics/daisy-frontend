<template>
  <div class="login-page">
    <LoginForm class="form" />
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import LoginForm from '../components/LoginForm';

export default {
  components: {
    LoginForm
  },
  mounted() {
    if (this.isAuthenticated) {
      this.navigateAway();
    }
  },
  watch: {
    isAuthenticated(value) {
      if (value) {
        this.navigateAway();
      }
    }
  },
  computed: {
    ...mapGetters({
      isAuthenticated: 'auth/isAuthenticated'
    })
  },
  methods: {
    navigateAway() {
      this.$router.push('/');
    }
  }
};
</script>

<style lang="stylus">
.login-page
  @media screen and (min-width: 'calc(%s - 1px)' % $threshold-mobile)
    .form
      position absolute
      top 40%
      left 50%
      transform translate(-50%, -50%)

  @media screen and (max-width: $threshold-mobile)
    .form
      position absolute
      left $gap * 2
      right $gap * 2
      top 40%
      transform translateY(-50%)
</style>
