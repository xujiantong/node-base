export const buildFlatMap = (tree: any) => {
  return tree.reduce((acc: any, item: any) => {
    acc[item.key] = item;
    if (item.children) {
      acc = { ...acc, ...buildFlatMap(item.children) };
    }
    return acc;
  }, {});
};
