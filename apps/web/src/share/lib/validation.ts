export const passwordValidation = (password: string) => {
  const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d).{10,}$/;
  return passwordRegex.test(password);
};

export const emailValidation = (password: string) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(password);
};
