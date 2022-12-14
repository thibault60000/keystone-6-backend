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
    firstName: text({
      validation: { isRequired: false },
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
    favoritesLists: relationship({
      ref: 'List.userFavorites',
      label: 'Listes en favoris',
      many: true,
    }),
    gifts: relationship({
      ref: 'Gift.user',
      many: true,
    }),
    reservedGifts: relationship({
      ref: 'Gift.reservedBy',
      many: true,
    }),
  },
});
