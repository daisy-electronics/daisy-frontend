<template>
  <PreviewsGrid />
</template>

<script>
import { mapGetters } from 'vuex';
import PreviewsGrid from '../components/PreviewsGrid';

export default {
  components: {
    PreviewsGrid
  },
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
