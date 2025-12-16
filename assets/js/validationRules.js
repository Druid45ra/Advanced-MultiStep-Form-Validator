/**
 * assets/js/validationRules.js (Versiunea Modulară)
 */

// Regex pentru formatul de email (simplificat, dar robust)
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Regex pentru parolă: minim 8 caractere, cel puțin o majusculă, o cifră
const PASSWORD_REGEX = /^(?=.*[A-Z])(?=.*\d).{8,}$/;

const validationRules = {
  // ... (restul regulilor, Nume, Prenume, Email, Parola, Termeni) ...
  nume: (value) => {
    if (!value || value.trim() === "") return "Numele este obligatoriu.";
    if (value.length < 2) return "Numele trebuie să aibă minim 2 caractere.";
    return null;
  },
  prenume: (value) => {
    if (!value || value.trim() === "") return "Prenumele este obligatoriu.";
    return null;
  },
  email: (value) => {
    if (!value || value.trim() === "") return "Emailul este obligatoriu.";
    if (!EMAIL_REGEX.test(value)) return "Format email invalid.";
    return null;
  },
  parola: (value) => {
    if (!value) return "Parola este obligatorie.";
    if (!PASSWORD_REGEX.test(value))
      return "Parola trebuie să aibă min. 8 caractere, o majusculă și o cifră.";
    return null;
  },
  termeni: (isChecked) => {
    if (!isChecked) return "Trebuie să fii de acord cu termenii și condițiile.";
    return null;
  },
};

const validatePasswordConfirmation = (passwordValue, confirmValue) => {
  if (!confirmValue) return "Confirmarea parolei este obligatorie.";
  if (passwordValue !== confirmValue) return "Parolele nu coincid.";
  return null;
};

// 👈 ADAUGAȚI ACEASTĂ LINIE LA FINALUL FIȘIERULUI
module.exports = {
  validationRules,
  validatePasswordConfirmation,
};
