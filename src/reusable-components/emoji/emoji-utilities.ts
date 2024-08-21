export const topEmojis = [
  0x1f602, 0x2764, 0x1f923, 0x1f60d, 0x1f62d, 0x1f44d, 0x1f60a, 0x1f614,
  0x1f604, 0x1f629, 0x1f622, 0x1f60e, 0x1f612, 0x1f637, 0x1f609, 0x1f44c,
  0x1f970, 0x1f60f, 0x1f917, 0x1f92d, 0x1f62c, 0x1f621, 0x1f44f, 0x1f633,
  0x1f975, 0x1f60b, 0x1f61c, 0x1f618, 0x1f440, 0x1f615, 0x1f496, 0x1f601,
  0x1f64f, 0x1f4af, 0x1f634, 0x1f60c, 0x1f911, 0x1f61e, 0x1f48b, 0x1f389,
  0x1f929, 0x1f61d, 0x1f525, 0x1f64c, 0x1f499, 0x1f642, 0x1f926, 0x1f937,
  0x1f687, 0x1f553,
];

export const replaceEmojiCodes = (text: string) => {
  return text.replace(/u\+{([0-9a-f]{4,6})}/g, (match, codepoint) => {
    const emojiCodePoint = parseInt(codepoint, 16);
    if (topEmojis.includes(emojiCodePoint)) {
      return String.fromCodePoint(emojiCodePoint);
    }
    return match;
  });
};

export const replaceEmojiWithCodes = (text: string) => {
  return Array.from(text)
    .map((char) => {
      const codepoint = char.codePointAt(0);
      if (
        codepoint !== undefined &&
        codepoint > 127 &&
        topEmojis.includes(codepoint)
      ) {
        return `u+{${codepoint.toString(16).padStart(4, "0")}}`;
      }
      return char;
    })
    .join("");
};
