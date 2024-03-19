export const formatTime = (date) => {
  const dateArr = date
    .replace(/[A-Za-z]/g, " ")
    .trim()
    .split(" ");
  // .join(" ")
  // .trim();
  dateArr[1] = dateArr[1].split(".")[0];
  return dateArr.join(" ").substring(0, dateArr.join(" ").length - 3);
};

const formatTimeString = (value, unit) => {
  return value === 1 ? `${value} ${unit}` : `${value} ${unit}s`;
};

export const getTimeDifference = (givenDateString) => {
  const givenDate = new Date(givenDateString);
  const currentDate = new Date();
  const timeDifference = currentDate - givenDate;

  const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
  const hours = Math.floor(
    (timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
  );
  const minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);

  if (days > 0) {
    return formatTimeString(days, "day");
  } else if (hours > 0) {
    return formatTimeString(hours, "hour");
  } else if (minutes > 0) {
    return formatTimeString(minutes, "minute");
  } else if (seconds > 10) {
    return formatTimeString(seconds, "second");
  } else {
    return "now";
  }
};
