import { createLink } from '@/traverser/normalizer';

export default {
  name: 'traverser-link',
  template: '<a :href="link"><slot></slot></a>',
  computed: {
    link() {
      const id = this.item['@id'];
      return createLink(id);
    },
  },
  props: {
    item: {
      required: true,
      type: Object,
    },
  },
};
