const isEmpty = (data) =>
  data === null ||
  data === undefined ||
  (typeof data === "object" && Object.keys(data).length === 0) ||
  (typeof data === "string" && data.trime().length === 0);

module.exports = isEmpty;
