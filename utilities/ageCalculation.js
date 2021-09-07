const ageCalulation = (PatDOB) => {
  let age = new Date();
  const days = Math.floor((((age - PatDOB) / 1000 / 3600 / 24) % 365) % 30);
  const months = Math.floor((((age - PatDOB) / 1000 / 3600 / 24) % 365) / 30);
  const years = Math.floor((age - PatDOB) / 1000 / 3600 / 24 / 365);
  return `${years} y ${months} m ${days} d`;
};

export default ageCalulation;
