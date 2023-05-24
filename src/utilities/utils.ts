// Generates a random int with the min and max indicated. 
// If not provided, generates a 12 digit int.
export const getRandomInt = (min = 10000000000, max = 90000000000): number => {
  return Math.floor(min + Math.random() * max)
}
