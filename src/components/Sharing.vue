<template>
  <section id="sharing">
    <h1>{{context.title}}</h1>
    <p id="sharing-content">{{context['@sharing'].title}}</p>
  </section>
</template>
<script>
import basecomponent from '@/traverser/basecomponent';

export default {
  mixins: [basecomponent],
  name: 'sharing',
  onTraverse(from, to, next) { next('@sharing'); },
};
</script>
