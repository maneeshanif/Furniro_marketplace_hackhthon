import { type SchemaTypeDefinition } from 'sanity'
import { product } from './products'
import { User } from './user'
import { orders } from './orders'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [product,User,orders],
  // types: [product],
}
