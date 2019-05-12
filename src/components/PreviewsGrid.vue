<template>
  <section class="previews-grid">
    <div class="grid">
      <GardenPreview class="preview"></GardenPreview>
    </div>
  </section>
</template>

<script>
import GardenPreview from './GardenPreview';

export default {
  components: {
    GardenPreview
  }
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
