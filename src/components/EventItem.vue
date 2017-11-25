<template>
  <section id="event">
    <h1>Event Item</h1>
    <h2 class="title">{{context.title}}</h2>
    <p class="description">{{context.description}}</p>
  </section>
</template>
<script>
import basecomponent from '@/traverser/basecomponent';

export default {
  mixins: [basecomponent],
  name: 'event',
};
</script>
