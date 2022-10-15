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
    // Photo
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

    // cart: relationship({
    //   ref: 'CartItem.user',
    //   many: true,
    //   ui: {
    //     createView: { fieldMode: 'hidden' },
    //     itemView: { fieldMode: 'read' },
    //   },
    // }),

    // Order
    // orders: relationship({
    //   ref: 'Order.user',
    //   many: true,
    // }),

    // Role
    // role: relationship({
    //   ref: 'Role.assignedTo',
    // }),

    // Products
    // products: relationship({
    //   ref: 'Product.user',
    //   many: true,
    // }),
  },
});
