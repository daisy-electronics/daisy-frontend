<template>
  <section class="previews-grid">
    <div class="grid">
      <div class="preview">A</div>
      <div class="preview">B</div>
      <div class="preview">C</div>
      <div class="preview">D</div>
    </div>
  </section>
</template>

<script>
export default {

};
</script>

<style lang="stylus">
.previews-grid
  flex-grow 1

  .grid
    display grid
    grid-template-columns repeat(auto-fill, minmax(min-content, $preview-width))
    grid-gap $gap * 6
    justify-content center
    overflow-y auto
    padding $gap-page

  .preview
    border-radius $border-radius
    border 1px solid $color-primary
</style>
