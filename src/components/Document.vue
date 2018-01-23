<template>
  <section id="document">
    <h1>{{context.title}}</h1>
    <p id="sharing">{{context['@sharing'].title}}</p>
  </section>
</template>
<script>
import basecomponent from '@/traverser/basecomponent';

export default {
  mixins: [basecomponent],
  name: 'document',
  onTraverse(from, to, next) { next('@sharing'); },
};
</script>
