import { defineComponent, h } from 'vue';

import { GChart } from 'vue-google-charts';

export const type = 'Sankey';

export const options = {
  width: '100%',
  height: 600,
};

export default defineComponent({
  name: 'GoogleChart',
  components: {
    GChart,
  },
  props: {
    data: Object
  },
  setup(props) {
    return () =>
      h(GChart, {
        data: props.data,
        options,
        type,
        settings: {
          packages: ['sankey'],
        },
      });
  },
});