const getSexFromAbbreviation = (abbreviation) => {
  switch (abbreviation) {
    case "M":
      return "Male";
    case "F":
      return "Female";
    case "U":
      return "Unknown";
    case "O":
      return "Other";
    case "N":
      return "Neutrois";
    case "I":
      return "Intergender";
    default:
      return "Unspecified";
  }
};

module.exports = getSexFromAbbreviation;
