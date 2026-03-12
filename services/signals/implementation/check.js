/**
 * Checks if a strategy would trigger a "decrease greatly" signal.
 * Uses the strategy score (0–10 scale, v2.0 methodology).
 * Uses in-memory previous/current; replace with DB reads when shared DB is wired.
 * Run: node check.js
 */

const GRADE_ORDER = ['A+', 'A', 'A-', 'B+', 'B', 'B-', 'C', 'D', 'F'];

function gradeIndex(letter) {
  const i = GRADE_ORDER.indexOf(letter);
  return i >= 0 ? i : GRADE_ORDER.length;
}

function numericToLetter(score) {
  if (score >= 9.7) return 'A+';
  if (score >= 9.3) return 'A';
  if (score >= 9.0) return 'A-';
  if (score >= 8.0) return 'B+';
  if (score >= 7.0) return 'B';
  if (score >= 6.0) return 'B-';
  if (score >= 4.0) return 'C';
  if (score >= 2.0) return 'D';
  return 'F';
}

/**
 * Determine if a score change should trigger an alert.
 * @param {{ letter: string, numeric: number }} previous
 * @param {{ letter: string, numeric: number }} current
 * @returns {{ alert: boolean, reasons: string[] }}
 */
function wouldAlert(previous, current) {
  if (!previous || !current) return { alert: false, reason: 'missing previous or current score' };

  const gradeDrop = gradeIndex(current.letter) - gradeIndex(previous.letter);
  const numericDrop = (previous.numeric || 0) - (current.numeric || 0);
  const belowThreshold = current.numeric < 4.0 || ['D', 'F'].includes(current.letter);

  const alert = gradeDrop >= 2 || numericDrop > 2.0 || belowThreshold;
  const reasons = [];
  if (gradeDrop >= 2) reasons.push(`grade_drop_${gradeDrop}`);
  if (numericDrop > 2.0) reasons.push(`numeric_drop_${numericDrop.toFixed(1)}`);
  if (belowThreshold) reasons.push('below_threshold');
  return { alert, reasons };
}

// Examples on the 0–10 scale
const prev = { letter: 'A', numeric: 9.3 };
const curr = { letter: 'B', numeric: 7.5 };
console.log('Example (A 9.3 -> B 7.5):', wouldAlert(prev, curr));

const curr2 = { letter: 'C', numeric: 5.0 };
console.log('Example (A 9.3 -> C 5.0):', wouldAlert(prev, curr2));

module.exports = { wouldAlert, numericToLetter, GRADE_ORDER };
