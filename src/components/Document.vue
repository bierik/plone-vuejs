<template>
  <section id="document">
    <h1>{{context.title}}</h1>
  </section>
</template>
<script>
import basecomponent from '@/traverser/basecomponent';

export default {
  mixins: [basecomponent],
  name: 'document',
};
</script>
