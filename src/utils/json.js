export function convertObjToUnderscoreCase(obj) {
  const underscoreObj = {};
  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      const underscoreKey = key.replace(/([A-Z])/g, "_$1").toLowerCase();
      underscoreObj[underscoreKey] = obj[key];
    }
  }
  return underscoreObj;
}

export function convertToCamelCase(obj) {
  const camelCaseObj = {};
  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      const camelCaseKey = key.replace(/_([a-z])/g, function (match, group) {
        return group.toUpperCase();
      });
      camelCaseObj[camelCaseKey] = obj[key];
    }
  }
  return camelCaseObj;
}

export function convertArrayToCamelCase(arr) {
  const camelCaseNamingData = [];
  for (let i = 0; i < arr.length; i++) {
    camelCaseNamingData.push(convertToCamelCase(arr[i]));
  }

  return camelCaseNamingData;
}
