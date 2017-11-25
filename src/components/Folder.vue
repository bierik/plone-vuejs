<template>
  <section id="folder">
    <h1>Folder</h1>
    <h2>{{context.title}}</h2>
    <ul>
      <li v-for="item in context.items" :key="item['@id']"><traverser-link :item="item" :class="item.title">{{item.title}}</traverser-link></li>
    </ul>
  </section>
</template>
<script>
import basecomponent from '@/traverser/basecomponent';

export default {
  mixins: [basecomponent],
  name: 'folder',
};
</script>
