<template>
  <section id="plone-site">
    <h1>Plone Site</h1>
    <ul>
      <li v-for="item in context.items" :key="item['@id']"><a v-traverse='item' href="#">{{item.title}}</a></li>
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
