import { computed } from 'nanostores';

import { counter } from './counter';
import { fruits } from './fruits';

export const filteredFruits = computed([counter, fruits], (num, allFruits) => {
  return allFruits.filter(fruit => fruit.cost > num)
});
