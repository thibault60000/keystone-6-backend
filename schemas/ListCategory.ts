import { relationship, text } from '@keystone-6/core/fields';
import { list } from '@keystone-6/core';

export const ListCategory = list({
  fields: {
    name: text({ validation: { isRequired: true }, label: 'Nom' }),
    lists: relationship({
      ref: 'List.category',
      many: true,
    }),
  },
  ui: {
    listView: {
      initialColumns: ['name', 'lists'],
    },
  },
});
