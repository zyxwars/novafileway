export const formatFileSize = (size: number) => {
  if (size > 10 ** 9) return `${(size / 10 ** 9).toFixed(2)} Gb`;
  else if (size > 10 ** 6) return `${(size / 10 ** 6).toFixed(2)} Mb`;
  else if (size > 10 ** 3) return `${(size / 10 ** 3).toFixed(2)} Kb`;
  else return `${size} B`;
};

export const formatTimeRemaining = (time: number) => {
  const DAY = 1000 * 60 * 60 * 24;
  const HOUR = 1000 * 60 * 60;
  const MINUTE = 1000 * 60;
  const SECONDS = 1000;
  console.log(time);

  if (time > DAY) {
    return `${Math.round(time / DAY)} days`;
  } else if (time > HOUR) {
    return `${Math.round(time / HOUR)} hours`;
  } else if (time > MINUTE) {
    return `${Math.round(time / MINUTE)} minutes`;
  } else if (time > 0) {
    return `${Math.round(time / SECONDS)} seconds`;
  }
  return "Deleting soon";
};
