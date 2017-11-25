<template>
  <section id="document">
    <h1>Document</h1>
    <h2>{{context.title}}</h2>
  </section>
</template>
<script>
import basecomponent from '@/traverser/basecomponent';

export default {
  mixins: [basecomponent],
  name: 'document',
};
</script>
