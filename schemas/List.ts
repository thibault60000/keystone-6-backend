import {
  calendarDay,
  relationship,
  text,
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
      validation: { isRequired: true },
      label: 'Description',
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
