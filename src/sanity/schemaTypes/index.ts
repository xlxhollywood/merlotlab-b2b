import { type SchemaTypeDefinition } from 'sanity'
import notices from './notices'
import disclosures from './disclosures'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [notices, disclosures],
}