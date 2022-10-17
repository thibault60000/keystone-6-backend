import { list } from '@keystone-6/core';
import {
  text,
  password,
  relationship,
  checkbox,
  image,
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
    photo: image({
      label: 'Photo',
      storage: 's3_images',
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
