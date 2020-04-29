export function getDependencies(cardsByCardUrl: Record<string, Card>) {
  console.log('array to act on', cardsByCardUrl);
  return Object.entries(cardsByCardUrl).reduce(
    (finalDependencies, [cardUrl, cardByCardUrl]) => {
      if (cardByCardUrl.children.size > 0) {
        console.log('has children', cardByCardUrl);

        return {
          ...finalDependencies,
          [cardUrl]: Array.from(cardByCardUrl.children),
        };
      }
      return finalDependencies;
    },
    {},
  );
}
