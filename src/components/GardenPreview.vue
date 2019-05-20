<template>
  <article class="garden-preview">
    M0: {{ moisture0 }}<br />
    M1: {{ moisture1 }}<br /><br />
    H0: {{ humidity0 }}<br />
    T0: {{ temperature0 }}<br /> <br />
    H1: {{ humidity1 }}<br />
    T1: {{ temperature1 }}<br /> <br />
    T2: {{ temperature2 }}<br /> <br />
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
    humidity0: 0,
    temperature0: 0,
    humidity1: 0,
    temperature1: 0,
    temperature2: 0,
    lamp: false,
    ventilation: false
  }),
  async created() {
    await this.$store.dispatch('views/garden/subscribe', { paths: [
      'moisture0',
      'moisture1',
      'humidity0',
      'temperature0',
      'humidity1',
      'temperature1',
      'temperature2',
      'lamp',
      'ventilation'
    ]});

    this.onViewStateChange = data => {
      if (data.variable === 'moisture0' || data.variable === 'moisture1' ||
          data.variable === 'humidity0' || data.variable === 'temperature0' ||
          data.variable === 'humidity1' || data.variable === 'temperature1' ||
          data.variable === 'temperature2') {
        this[data.variable] = data.value;
      } else if (data.variable === 'lamp') {
        this.lamp = Boolean(data.value);
      } else if (data.variable === 'ventilation') {
        this.ventilation = Boolean(data.value);
      }
    };
    ws.events.on('view-state-change', this.onViewStateChange);

    this.lamp = Boolean(await this.$store.dispatch('views/garden/getLamp'));
    this.ventilation = Boolean(await this.$store.dispatch('views/garden/getVentilation'));
  },
  async destroyed() {
    ws.events.off('view-state-change', this.onViewStateChange);

    await this.$store.dispatch('views/garden/unsubscribe', { paths: [
      'moisture0',
      'moisture1',
      'humidity0',
      'temperature0',
      'humidity1',
      'temperature1',
      'temperature2',
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
