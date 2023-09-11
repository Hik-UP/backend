const dbSkinSelector = {
  id: true,
  name: true,
  description: true,
  pictures: true,
  model: true,
  owners: { select: { id: true, username: true } },
  price: true
};

export { dbSkinSelector };
