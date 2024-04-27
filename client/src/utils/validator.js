export const isValidEmail = (email) => {
  const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return emailPattern.test(email);
}

export const isValidPhone = (phone) => {
  const usCanadaRegex = /^(\+?1\s?)?(\(\d{3}\)|\d{3})[-.\s]?\d{3}[-.\s]?\d{4}$/;
  const internationalRegex = /^\+(?:[0-9] ?){6,14}[0-9]$/;
  const indiaRegex = /^[6-9]\d{9}$/;

  if (usCanadaRegex.test(phone) || internationalRegex.test(phone) || indiaRegex.test(phone)) {
    return true;
  } else {
    return false;
  }
}
