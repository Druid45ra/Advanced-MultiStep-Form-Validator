/**
 * __tests__/validation.test.js (Versiunea Corectată)
 */

// 👈 FOLOSIȚI REQUIRE PENTRU A IMPORTA FUNCȚIILE
const {
  validationRules,
  validatePasswordConfirmation,
} = require("../assets/js/validationRules");

console.log("Import reușit. Verificare: ", typeof validationRules.email);

const runTest = (name, testFunc) => {
  // ... (rămâne neschimbat) ...
};

console.log("--- Rulare Teste Unitare (Logică Validare) ---");

// Test 1: Validare Email
runTest("Validare Email - Format Corect", () => {
  const result = validationRules.email("test@exemplu.com");
  if (result !== null) throw new Error(`A eșuat cu mesajul: ${result}`);
});

runTest("Validare Email - Format Invalid", () => {
  const result = validationRules.email("invalid-email");
  if (result === null) throw new Error("A acceptat un email invalid.");
});

// Test 2: Validare Parolă
runTest("Validare Parolă - Format Corect", () => {
  const result = validationRules.parola("Parola123");
  if (result !== null) throw new Error(`A eșuat cu mesajul: ${result}`);
});

runTest("Validare Parolă - Fără Majusculă", () => {
  const result = validationRules.parola("parola123");
  if (result === null) throw new Error("A acceptat o parolă fără majusculă.");
});

// Test 3: Validare Confirmare Parolă
runTest("Confirmare Parolă - Coincidență", () => {
  const result = validatePasswordConfirmation("Parola123", "Parola123");
  // ❌ Fix: Aici a picat testul inițial deoarece nu a primit "Parola123" la confirmare,
  // dar acum ar trebui să treacă dacă folosește funcția corectă.
  if (result !== null) throw new Error(`A eșuat cu mesajul: ${result}`);
});

runTest("Confirmare Parolă - Ne-coincidență", () => {
  const result = validatePasswordConfirmation("Parola123", "Parola321");
  if (result === null) throw new Error("A acceptat parole care nu coincid.");
});

console.log("--- Teste unitare finalizate ---");
