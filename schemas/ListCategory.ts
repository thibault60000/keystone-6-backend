import { relationship, text } from '@keystone-6/core/fields';
import { list } from '@keystone-6/core';

export const ListCategory = list({
  fields: {
    name: text({ validation: { isRequired: true }, label: 'Nom' }),
    // Icon : https://fontawesome.com/icons
    icon: text({ validation: { isRequired: true }, label: 'Icone' }),
    primaryColor: text({
      validation: { isRequired: true },
      label: 'Couleur primaire',
    }),
    secondaryColor: text({
      validation: { isRequired: true },
      label: 'Couleur secondaire',
    }),
    lists: relationship({
      ref: 'List.category',
      many: true,
    }),
  },
  ui: {
    listView: {
      initialColumns: ['name', 'icon', 'lists'],
    },
  },
});
