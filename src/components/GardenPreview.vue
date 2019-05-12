<template>
  <article class="garden-preview">
    {{ moisture0 }}<br />
    {{ moisture1 }}<br />
    {{ lamp ? 'on' : 'off' }} <button class="button" @click="toggleLamp">Toggle Lamp</button><br />
    {{ ventilation ? 'on' : 'off' }} <button class="button" @click="toggleVentilation">Toggle Ventilation</button>
  </article>
</template>

<script>
import * as ws from '../ws';

export default {
  data: () => ({
    moisture0: 0,
    moisture1: 0,
    lamp: false,
    ventilation: false
  }),
  async created() {
    await this.$store.dispatch('views/garden/subscribe', { paths: [
      'moisture0',
      'moisture1',
      'lamp',
      'ventilation'
    ]});

    this.onViewStateChange = data => {
      if (data.variable === 'moisture0') {
        this.moisture0 = data.value;
      } else if (data.variable === 'moisture1') {
        this.moisture1 = data.value;
      } else if (data.variable === 'lamp') {
        this.lamp = data.value !== '0';
      } else if (data.variable === 'ventilation') {
        this.ventilation = data.value !== '0';
      }
    };
    ws.events.on('view-state-change', this.onViewStateChange);

    this.lamp = (await this.$store.dispatch('views/garden/getLamp')) !== '0';
    this.ventilation = (await this.$store.dispatch('views/garden/getVentilation')) !== '0';
  },
  async destroyed() {
    ws.events.off('view-state-change', this.onViewStateChange);

    await this.$store.dispatch('views/garden/unsubscribe', { paths: [
      'moisture0',
      'moisture1',
      'lamp',
      'ventilaion'
    ]});
  },
  methods: {
    toggleLamp() {
      this.$store.dispatch('views/garden/toggleLamp');
    },
    toggleVentilation() {
      this.$store.dispatch('views/garden/toggleVentilation');
    }
  }
};
</script>

<style lang="stylus">
.garden-preview {
  
}
</style>