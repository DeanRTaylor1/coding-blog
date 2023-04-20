export function capitaliseFirstLetters(words: string[]) {
  return words.map((word) => {
    const firstLetter = word[0].toUpperCase();
    return firstLetter + word.slice(1);
  });
}
