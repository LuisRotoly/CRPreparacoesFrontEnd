function getLastSegment(pathname) {
  const url = pathname;
  const lastSegment = url.split("/").pop();
  return lastSegment;
}

function isEmpty(string) {
  return string === null || string.length === 0;
}

function getFormmatedDate(date) {
  return new Date(date).toLocaleDateString();
}

function getFormmatedMoney(number) {
  return parseFloat(number).toFixed(2);
}

export { getLastSegment, isEmpty, getFormmatedDate, getFormmatedMoney };
