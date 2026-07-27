/**
 * Convert the editable input text into the numeric value used by a calculator.
 * An empty or invalid draft safely evaluates to zero without changing the text
 * the user is actively editing.
 *
 * @param {string} draft
 * @returns {number}
 */
export function calculatorNumberFromDraft(draft) {
  const next = draft === "" ? 0 : Number(draft);
  return Number.isFinite(next) ? next : 0;
}

/**
 * Restore the zero fallback only after the user leaves an empty field.
 *
 * @param {string} draft
 * @returns {string}
 */
export function calculatorDraftOnBlur(draft) {
  return draft === "" ? "0" : draft;
}
