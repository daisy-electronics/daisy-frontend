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
      <!-- <Button class="item" @click="$store.dispatch('browserSettings/toggleMedia')">

      </Button> -->
      <Button class="item" @click="$store.dispatch('auth/logout')">
        logout
      </Button>
    </template>
    <template v-else>
      <Button class="item" navigateTo="/login">login</Button>
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
  padding $padding * 2
  // height $header-height

  .item:not(:last-child)
    margin-right $padding * 2

  .brand-name
    font-weight 600
    font-family $font-family-header
    font-size 1.5rem

  .spacer
    flex-grow 1
</style>
