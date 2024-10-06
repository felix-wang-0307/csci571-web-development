export function createDivElement(className, textContent) {
  const element = document.createElement("div");
  element.className = className;
  element.textContent = textContent;
  return element;
}

export function convertDate(ISODate) {
  const date = new Date(ISODate);
  // Transfer the ISODate to "Wednesday, 1 Jan 2020" format
  return date.toLocaleDateString("en-US", {weekday: "long", day: "2-digit", month: "short", year: "numeric"});
}

