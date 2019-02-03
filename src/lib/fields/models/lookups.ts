import { ExactFieldLookup } from './lookups/exact';
import { StartsWithFieldLookup } from './lookups/starts-with';
import { GteFieldLookup } from './lookups/gte';
import { GtFieldLookup } from './lookups/gt';
import { LteFieldLookup } from './lookups/lte';
import { LtFieldLookup } from './lookups/lt';
import { IsNullFieldLookup } from './lookups/isnull';
import { InFieldLookup } from './lookups/in';
import { ContainsFieldLookup } from './lookups/contains';
import { EndsWithFieldLookup } from './lookups/ends-with';

export const exactFieldLookup = new ExactFieldLookup();
export const startsWithFieldLookup = new StartsWithFieldLookup();
export const endsWithFieldLookup = new EndsWithFieldLookup();
export const gteFieldLookup = new GteFieldLookup();
export const gtFieldLookup = new GtFieldLookup();
export const lteFieldLookup = new LteFieldLookup();
export const ltFieldLookup = new LtFieldLookup();
export const isNullFieldLookup = new IsNullFieldLookup();
export const inFieldLookup = new InFieldLookup();
export const containsFieldLookup = new ContainsFieldLookup();

export const lookups = [
  exactFieldLookup,
  startsWithFieldLookup,
  endsWithFieldLookup,
  gteFieldLookup,
  gtFieldLookup,
  lteFieldLookup,
  ltFieldLookup,
  isNullFieldLookup,
  inFieldLookup,
  containsFieldLookup
];
