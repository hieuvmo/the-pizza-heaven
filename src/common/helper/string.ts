export function capitalizeFirstLetter(string: string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

export function shortcutSentence(string: string, length: number) {
  if (string.length >= length) return string?.slice(0, length) + '...';
  return string;
}
