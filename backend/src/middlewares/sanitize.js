/**
 * Input sanitization middleware
 * - Strips any MongoDB operator keys ($gt, $where, etc.) from body, query, and params
 * - Recursively trims all string values
 */
const cleanInput = (target) => {
  if (!target || typeof target !== 'object') {
    return target;
  }

  if (Array.isArray(target)) {
    return target.map((item) => cleanInput(item));
  }

  const cleaned = {};
  for (const [key, value] of Object.entries(target)) {
    // Strip keys with NoSQL operators or dots
    if (key.startsWith('$') || key.includes('.')) {
      continue;
    }

    if (typeof value === 'string') {
      cleaned[key] = value.trim();
    } else if (typeof value === 'object' && value !== null) {
      cleaned[key] = cleanInput(value);
    } else {
      cleaned[key] = value;
    }
  }

  return cleaned;
};

const sanitizeInput = (req, res, next) => {
  if (req.body) req.body = cleanInput(req.body);
  if (req.query) req.query = cleanInput(req.query);
  if (req.params) req.params = cleanInput(req.params);
  next();
};

module.exports = sanitizeInput;

