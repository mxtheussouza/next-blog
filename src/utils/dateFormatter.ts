export const dateFormatter = (createdAt: Date) => {
  return new Date(createdAt).toDateString().substring(4);
};
