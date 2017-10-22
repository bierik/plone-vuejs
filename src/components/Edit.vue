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

    <vue-form-generator :schema="schema" :model="model" :options="formOptions"></vue-form-generator>
  </div>
</template>

<script>
import getSchemaTypes from '@/api';
import schemaType from '@/helper';
import VueFormGenerator from 'vue-form-generator';

export default {
  components: {
    'vue-form-generator': VueFormGenerator.component,
  },
  name: 'Edit',
  data() {
    return {
      loading: false,
      fields: null,
      fieldsProperties: null,
      model: {},
      schema: { fields: [] },
      formOptions: {},
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
      this.loading = true;
      getSchemaTypes(this.type).then((post) => {
        if (post) {
          this.loading = false;
          this.fields = post.fieldsets[0].fields;
          this.fieldsProperties = post.properties;
          this.fields.forEach((field) => {
            const schemaHelper = Object.prototype.hasOwnProperty.call(this.fieldsProperties[field], 'widget')
              ? { ...schemaType[this.fieldsProperties[field].widget] }
              : { ...schemaType[this.fieldsProperties[field].type] };
            if (Object.keys(schemaHelper).length) {
              schemaHelper.label = field;
              schemaHelper.model = field;
              this.schema.fields.push(schemaHelper);
            }
          });
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