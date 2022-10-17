import 'dotenv/config';
import { relationship, text } from '@keystone-6/core/fields';
import { list } from '@keystone-6/core';

import { cloudinaryImage } from '@keystone-6/cloudinary';

export const cloudinary = {
  cloudName: process.env.CLOUDINARY_CLOUD_NAME || '',
  apiKey: process.env.CLOUDINARY_KEY || '',
  apiSecret: process.env.CLOUDINARY_SECRET || '',
  folder: process.env.CLOUDINARY_PRODUCT_FOLDER || '',
};

console.log('Cloudinary', cloudinary);

export const GiftImage = list({
  fields: {
    image: cloudinaryImage({
      cloudinary,
      label: 'Fichier à importer',
    }),

    altText: text({
      label: 'Texte alternatif',
    }),
    gift: relationship({
      ref: 'Gift.image',
    }),
  },
  ui: {
    listView: {
      initialColumns: ['image', 'altText', 'gift'],
    },
  },
});
