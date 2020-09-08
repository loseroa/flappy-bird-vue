<template>
  <div
    id="bird"
    tabindex="-1"
    :style="getBirdAppearance"
    @keypress.space="birdFly()"></div>
</template>
<script>
import { mapGetters } from 'vuex'

export default {
  name: 'Bird',
  computed: {
    ...mapGetters({
      getBirdAppearance: 'bird/getAppearance'
    })
  }
}
</script>
