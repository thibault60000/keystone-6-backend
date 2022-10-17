import { list } from '@keystone-6/core';
import {
  text,
  password,
  relationship,
  checkbox,
} from '@keystone-6/core/fields';

export const User = list({
  fields: {
    name: text({
      validation: { isRequired: true },
    }),
    isAdmin: checkbox(),
    email: text({
      validation: { isRequired: true },
      isIndexed: 'unique',
      isFilterable: true,
    }),

    password: password(),
    photo: relationship({
      ref: 'UserImage.user',
      ui: {
        displayMode: 'cards',
        cardFields: ['image', 'altText'],
        inlineCreate: { fields: ['image', 'altText'] },
        inlineEdit: { fields: ['image', 'altText'] },
      },
      label: 'Photo',
    }),
    lists: relationship({
      ref: 'List.user',
      many: true,
    }),
    gifts: relationship({
      ref: 'Gift.user',
      many: true,
    }),
  },
});
