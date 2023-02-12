
export const validateOnlyLetters = (value: string | undefined): boolean => {
  if (value === undefined) return false;

  return /[\D]{3}/.test(value);
}

export const  validateInputEmail = (value: string | undefined): boolean => {
  if (value === undefined) return false;

  return   /^[a-zA-Z0-9.-/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/.test(value);
}

export const validateInputPhone = (value: string | undefined): boolean => {
  if(value === undefined) return false;

  return /(\d{10})/.test(value)
}
