export const toE164 = (phoneNumber) => {
    // Use a regular expression to extract only the digits from the phone number
    const digits = phoneNumber.replace(/\D/g, '');
  
    // Check if the phone number is already in E.164 format
    if (digits.startsWith('+')) {
      return digits;
    }
  
    // If the phone number is not in E.164 format, assume it is in the format "area code + local number"
    // and format it as E.164
    return `+1${digits}`;
}

export const isValidE164 = (phoneNumber) => {
  // E.164 numbers are in the format +[country code][subscriber number including area code]
  // The minimum length of an E.164 number is 5 digits (e.g. +5551234)
  if (!phoneNumber || phoneNumber.length < 5) return false;

  // E.164 numbers must start with a '+' character
  if (phoneNumber[0] !== '+') return false;

  // The remaining characters must all be digits
  for (let i = 1; i < phoneNumber.length; i++) {
    if (isNaN(parseInt(phoneNumber[i]))) return false;
  }

  return true;
}
  