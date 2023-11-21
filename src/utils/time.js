export const formatTime = (date) => {
  return date
    .replace(/[A-Za-z]/g, " ")
    .split(" ")
    .reverse()
    .join(" ")
    .trim();
};
