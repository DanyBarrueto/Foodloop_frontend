
// Coincide con cualquier carácter que no sea un dígito
export const RE_NON_DIGITS = /\D/g;

// Agrupa 4 dígitos consecutivos cuando van seguidos de otro dígito 
export const RE_GROUP_4_DIGITS = /(\d{4})(?=\d)/g;

// Coincide con el formato de vencimiento de tarjeta MM/YY
export const RE_EXPIRY_MM_YY = /^\d{2}\/\d{2}$/;

// Coincide con el prefijo de fecha ISO YYYY-MM-DD y captura año, mes, día
export const RE_ISO_YYYY_MM_DD = /^(\d{4})-(\d{2})-(\d{2})/;

// Coincide con espacios en blanco (general)
export const RE_WHITESPACE = /\s/g;
