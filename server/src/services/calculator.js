export function parseQuestions(rawQuestions) {
  if (typeof rawQuestions === 'string') {
    return JSON.parse(rawQuestions);
  }
  return rawQuestions;
}

export function validateAnswers(config, answers) {
  const questions = parseQuestions(config.questions);
  const errors = [];

  for (const question of questions) {
    if (!question.active) continue;

    const value = answers[question.key];

    if (question.required && (value === undefined || value === null || value === '')) {
      errors.push(`${question.label} is required.`);
      continue;
    }

    if (question.type === 'number') {
      const numericValue = Number(value);
      if (Number.isNaN(numericValue)) {
        errors.push(`${question.label} must be a valid number.`);
        continue;
      }
      if (question.min !== undefined && numericValue < question.min) {
        errors.push(`${question.label} must be at least ${question.min}.`);
      }
      if (question.max !== undefined && numericValue > question.max) {
        errors.push(`${question.label} must be at most ${question.max}.`);
      }
    }

    if (question.type === 'select') {
      const selected = question.options?.find((option) => option.value === value);
      if (!selected) {
        errors.push(`${question.label} has an invalid selection.`);
      }
    }
  }

  return errors;
}

export function calculateEstimate(config, answers) {
  const questions = parseQuestions(config.questions);
  const roofArea = Number(answers.roof_area || 0);

  const getSelectedOption = (questionKey) => {
    const question = questions.find((item) => item.key === questionKey);
    if (!question?.options) return null;
    return question.options.find((option) => option.value === answers[questionKey]) || null;
  };

  const materialOption = getSelectedOption('material');
  const pitchOption = getSelectedOption('pitch');
  const layersOption = getSelectedOption('layers');
  const storiesOption = getSelectedOption('stories');

  const ratePerSqft = Number(materialOption?.rate_per_sqft || 0);
  const pitchMultiplier = Number(pitchOption?.multiplier || 1);
  const tearOffPerSqft = Number(layersOption?.tear_off_per_sqft || 0);
  const storiesMultiplier = Number(storiesOption?.multiplier || 1);

  const wasteFactor = Number(config.wasteFactor ?? 0.10);
  const permitFee = Number(config.permitFlatFee ?? 350);
  const spreadPct = Number(config.rangeSpreadPct ?? 12) / 100;

  const baseMaterialCost = roofArea * ratePerSqft * (1 + wasteFactor);
  const tearOffCost = roofArea * tearOffPerSqft;
  const adjustedSubtotal = (baseMaterialCost + tearOffCost) * pitchMultiplier * storiesMultiplier;
  const midPointEstimate = adjustedSubtotal + permitFee;
  const estimateLow = Math.round(midPointEstimate * (1 - spreadPct));
  const estimateHigh = Math.round(midPointEstimate * (1 + spreadPct));

  return {
    estimate_low: estimateLow,
    estimate_high: estimateHigh,
    estimate_mid: Math.round(midPointEstimate),
  };
}

export function formatConfigForPublic(config) {
  const questions = parseQuestions(config.questions)
    .filter((question) => question.active)
    .sort((a, b) => (a.order ?? 0) - (b.order ?? 0));

  return {
    config_version: config.configVersion,
    business: {
      name: config.businessName,
      region: config.businessRegion,
      currency: config.currency,
    },
    questions,
    modifiers: {
      waste_factor: config.wasteFactor,
      permit_flat_fee: config.permitFlatFee,
      range_spread_pct: config.rangeSpreadPct,
    },
  };
}
