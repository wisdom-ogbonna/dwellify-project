export const isValidPhoneNumber = (phone) => {
  return typeof phone === 'string' && phone.trim().length >= 10;
};
