import { KeystoneContext } from '@keystone-6/core/types';
import { categories } from './data';

export async function insertSeedData(context: KeystoneContext): Promise<void> {
  console.log(`🌱 Insert seeds : ${categories.length} ListCategories`);

  for (const category of categories) {
    console.log(`🛍  Add category: ${category.name}`);

    await context
      .sudo()
      .query.ListCategory.createOne({
        data: {
          ...category,
        },
      })
      .catch((err: any) => console.error(err));
  }

  console.log(`✅ Seeds inserted with success:`);
  console.log('👋 Use `yarn dev``');

  process.exit();
}
