export function getExcerpt(content, wordLimit = 10) {
    const words = content.split(' ');
    if (words.length > wordLimit) {
      return words.slice(0, wordLimit).join(' ') + '...';
    } else {
      return content;
    }
  }