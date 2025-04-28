
function myDeepcopy(obj: any): any {
  if (obj === null || typeof obj !== 'object') {
    // Primitive value or null
    return obj;
  }

  if (Array.isArray(obj)) {
    // Handle arrays
    return obj.map(item => myDeepcopy(item));
  }

  // Handle objects
  const copy: any = {};
  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      copy[key] = myDeepcopy(obj[key]);
    }
  }
  return copy;
}