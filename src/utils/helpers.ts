export const getRandomInt = (min: number, max: number): number =>
  Math.floor(Math.random() * (max - min + 1)) + min;

export const cosX = (sectorRadius: number, radius: number): number =>
  200 + sectorRadius * Math.cos(radius);
export const sinY = (sectorRadius: number, radius: number): number =>
  200 + sectorRadius * Math.sin(radius);
