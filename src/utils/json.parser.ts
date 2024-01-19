export function socketBodyParser(event, next) {
  try {
    if (typeof event[1] === "object") {
      return next();
    }

    if (typeof event[1] === "string") {
      event[1] = JSON.parse(event[1]);
      return next()
    }

    return next()
  } catch (error) {
   return null;
  }
}