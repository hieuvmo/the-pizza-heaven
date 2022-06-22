export function capitalizeFirstLetter(string: string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

export function shortcutSentence(string: string) {
  if (string.length >= 25) return string?.slice(0, 25) + '...';
  return string;
}
