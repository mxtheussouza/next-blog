export const stringToSlug = (text: string): string => {
  return text
    .toString()
    .toLowerCase()
    .replace(/[àÀáÁâÂãäÄÅåª]+/g, "a")
    .replace(/[èÈéÉêÊëË]+/g, "e")
    .replace(/[ìÌíÍîÎïÏ]+/g, "i")
    .replace(/[òÒóÓôÔõÕöÖº]+/g, "o")
    .replace(/[ùÙúÚûÛüÜ]+/g, "u")
    .replace(/[ýÝÿŸ]+/g, "y")
    .replace(/[ñÑ]+/g, "n")
    .replace(/[çÇ]+/g, "c")
    .replace(/[ß]+/g, "ss")
    .replace(/[Ææ]+/g, "ae")
    .replace(/[Øøœ]+/g, "oe")
    .replace(/[%]+/g, "pct")
    .replace(/\s+/g, "-")
    .replace(/[^\w\-]+/g, "")
    .replace(/\-\-+/g, "-")
    .replace(/^-+/, "")
    .replace(/-+$/, "");
};
