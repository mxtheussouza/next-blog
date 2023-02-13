export const dateFormatter = (createdAt: Date, hasHour?: boolean): string => {
  const date = new Date(createdAt).toDateString().substring(4);
  const hour = new Date(createdAt).toLocaleTimeString();

  if (hasHour) {
    return `${date} ${hour}`;
  }

  return `${date}`;
};
