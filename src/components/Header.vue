<template>
  <header class="header">
    <div class="item brand-name link" @click="$router.push('/')">
      DAISY
    </div>

    <div class="spacer" />

    <template v-if="isAuthenticated">
      <div class="item username">
        {{ username }}
      </div>
      <!-- <button class="item button" @click="$store.dispatch('browserSettings/toggleMedia')">

      </button> -->
      <button class="item button" @click="$store.dispatch('auth/logout')">
        Logout
      </button>
    </template>
    <template v-else>
      <button class="item button" @click="$router.push('/login')">
        Login
      </button>
    </template>
  </header>
</template>

<script>
import { mapGetters, mapState } from 'vuex';

export default {
  computed: {
    ...mapGetters({
      isAuthenticated: 'auth/isAuthenticated'
    }),
    ...mapState({
      username: state => state.auth.username
    })
  }
};
</script>

<style lang="stylus">
.header
  display flex
  align-items center
  justify-content space-between
  padding 0 $padding
  height $header-height

  .item
    margin 0 $padding

  .brand-name
    font-weight 600
    font-size 1.5rem

  .spacer
    flex-grow 1
</style>
