<template>
  <section id="plone-site">
    <h1>{{context.title}}</h1>
    <ul>
      <li v-for="item in context.items" :key="item['@id']"><traverser-link :class="item.title" :item="item">{{item.title}}</traverser-link></li>
    </ul>
  </section>
</template>
<script>
import basecomponent from '@/traverser/basecomponent';

export default {
  mixins: [basecomponent],
  name: 'plone-site',
};
</script>
