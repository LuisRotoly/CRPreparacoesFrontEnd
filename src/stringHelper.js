function getLastSegment(pathname) {
  const url = pathname;
  const lastSegment = url.split("/").pop();
  return lastSegment;
}

function isEmpty(string) {
  return string === null || string.length === 0;
}

export { getLastSegment, isEmpty };
