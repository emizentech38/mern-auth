import { isValidEmail, isValidPhoneNumber } from "6pp";

export const emailValidator = (email) => {
  if (!isValidEmail(email))
    return { isValid: false, errorMessage: "email is invalid" };
};

export const mobileValidator = (mobile) => {
  if (!isValidPhoneNumber(mobile))
    return { isValid: false, errorMessage: "Mobile number is Invalid" };
};
