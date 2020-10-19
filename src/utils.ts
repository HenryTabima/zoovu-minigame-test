export function shuffle(a: Array<any>) {
  const array = Array.from(a);
  const lastIndex = array.length - 1;
  for (let i = lastIndex; i > 0; i--) {
    const j = Math.floor(Math.random() * i);
    const temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
  return array;
}
