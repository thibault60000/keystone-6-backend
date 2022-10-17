import {
  calendarDay,
  checkbox,
  float,
  integer,
  relationship,
  text,
  timestamp,
} from '@keystone-6/core/fields';

import { list } from '@keystone-6/core';

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
    quantity: integer({
      validation: { isRequired: true },
      label: 'Quantité',
    }),
    degree: integer({
      validation: { isRequired: true },
      label: 'Degré',
    }),
    image: relationship({
      ref: 'GiftImage.gift',
      ui: {
        displayMode: 'cards',
        cardFields: ['image', 'altText'],
        inlineCreate: { fields: ['image', 'altText'] },
        inlineEdit: { fields: ['image', 'altText'] },
      },
      label: 'Image',
    }),
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
      label: 'Date de réservation',
    }),
    reservedBy: text({
      label: 'Réservé par',
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
});
