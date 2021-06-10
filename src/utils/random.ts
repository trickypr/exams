import random from 'random'
import seedrandom from 'seedrandom'

export const createRngWithSeed = (seed: string) => {
  return random.clone(seedrandom(seed))
}
