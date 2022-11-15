import {
  calendarDay,
  relationship,
  text,
  checkbox,
  timestamp,
} from '@keystone-6/core/fields';
import { list } from '@keystone-6/core';

export const List = list({
  fields: {
    name: text({ validation: { isRequired: true }, label: 'Nom' }),
    category: relationship({
      ref: 'ListCategory.lists',
      ui: { displayMode: 'select' },
    }),
    updated_at: timestamp({
      label: 'Mise à jour le',
      db: {
        updatedAt: true,
      },
      ui: {
        createView: { fieldMode: 'hidden' },
        itemView: { fieldMode: 'hidden' },
        listView: { fieldMode: 'hidden' },
      },
    }),
    date: calendarDay({
      label: 'Date',
    }),
    description: text({
      // validation: { isRequired: true },
      label: 'Description',
    }),
    gifts: relationship({
      ref: 'Gift.list',
      many: true,
    }),
    private: checkbox({
      label: 'Privée',
      defaultValue: false,
    }),
    userFavorites: relationship({
      ref: 'User.favoritesLists',
      many: true,
      label: 'Utilisateurs qui ont ajouté cette liste à leurs favoris',
    }),
    user: relationship({
      ref: 'User.lists',
      hooks: {
        resolveInput: ({ resolvedData, fieldKey, context }): any =>
          resolvedData[fieldKey] || {
            connect: {
              // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
              id: context?.session?.itemId,
            },
          },
      },
      label: 'Créateur',
    }),
  },
});
