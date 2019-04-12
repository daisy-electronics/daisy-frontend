<template>
  <div />
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  mounted() {
    if (!this.isAuthenticated) {
      this.$router.push('/login');
    }
  },
  watch: {
    isAuthenticated(value) {
      if (!value) {
        this.$router.push('/login');
      }
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
</style>
