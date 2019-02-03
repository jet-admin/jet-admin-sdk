import { FormField } from '../models/form-field';

function stringify(obj) {
  const cache = [];

  return JSON.stringify(obj, function(key, value) {
    if (typeof value === 'object' && value !== null) {
      if (cache.indexOf(value) !== -1) {
        // Duplicate reference found
        try {
          // If this value does not reference a parent it can be deduped
          return JSON.parse(JSON.stringify(value));
        } catch (error) {
          // discard key if value cannot be deduped
          return;
        }
      }
      // Store value in our collection
      cache.push(value);
    }
    return value;
  });
}


export function createFormFieldFactory() {
  const cache = {};

  return options => {
    const cacheKey = stringify(options);

    if (cache[cacheKey]) {
      return cache[cacheKey];
    }

    const field = new FormField().deserialize(options);
    cache[cacheKey] = field;
    return field;
  };
}
