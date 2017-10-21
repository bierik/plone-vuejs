<template>
  <div class="post">
    <div class="loading" v-if="loading">
      Loading...
    </div>
    
    <div v-if="fields" class="content">
      <h1>{{ fields }}</h1>
      <div v-for="(field, index) in fields"  v-bind:key="'field' + index">
        {{ fieldsProperties[field] }}
      </div>
    </div>
  </div>
</template>

<script>
import { getSchemaTypes } from '../api';

export default {
  name: 'Edit',
  data() {
    return {
      loading: false,
      fields: null,
      fieldsProperties: null,
    };
  },
  props: [
    'id', 'type',
  ],
  created() {
    this.fetchData();
  },
  methods: {
    fetchData() {
      this.error = null;
      this.loading = true;
      getSchemaTypes(this.type).then((post) => {
        console.log(post);
        if (post) {
          this.loading = false;
          this.fields = post.fieldsets[0].fields;
          this.fieldsProperties = post.properties;
        }
      });
    },
  },
};
</script>

<style scoped>
h1 {
  color: #757575;
}
</style>


<!-- // 

1 get types of document (props)

2 display forms for this types (json schema)

3 get data for this types

4 display this data inside the form

5 save on edit

-->