import { list } from '@keystone-6/core';

import {
  calendarDay,
  checkbox,
  float,
  image,
  integer,
  relationship,
  text,
  timestamp,
} from '@keystone-6/core/fields';

export const Gift = list({
  fields: {
    name: text({ validation: { isRequired: true }, label: 'Nom' }),
    link: text({ validation: { isRequired: true }, label: 'Lien' }),
    price: float({
      validation: { isRequired: true },
      label: 'Prix',
    }),
    description: text({
      label: 'Description',
    }),
    degree: integer({
      validation: { isRequired: true },
      label: 'Degré',
    }),
    image: image({ storage: 's3_images' }),
    color: text({
      label: 'Couleur',
    }),
    size: text({
      label: 'Taille',
    }),
    reserved: checkbox({
      label: 'Réservé',
      defaultValue: false,
    }),
    archived: checkbox({
      label: 'Archivé',
      defaultValue: false,
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
    reservedAt: calendarDay({
      label: 'Date de réservation',
    }),
    reservedBy: relationship({
      label: 'Réservé par',
      ref: 'User.reservedGifts',
    }),
    anonymousReservedBy: text({
      validation: { isRequired: false },
      label: 'Réservé par (non connecté)',
    }),
    list: relationship({
      ref: 'List.gifts',
    }),
    user: relationship({
      ref: 'User.gifts',
      hooks: {
        resolveInput: ({ resolvedData, fieldKey, context }): any =>
          resolvedData[fieldKey] || {
            connect: {
              // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
              id: context?.session?.itemId,
            },
          },
      },
    }),
  },
  ui: {
    listView: {
      initialColumns: ['name', 'price', 'degree', 'image', 'reserved'],
    },
  },
});
