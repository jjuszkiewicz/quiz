export const convertResultToString = (score: number) => {
  if (score <= 40) {
    return "Diligent failure";
  }
  if (score > 40 && score <= 60) {
    return "Failed";
  }
  if (score > 60 && score <= 80) {
    return "Good";
  }
  if (score > 80 && score <= 90) {
    return "Very good";
  }
  return "Excellent";
};
