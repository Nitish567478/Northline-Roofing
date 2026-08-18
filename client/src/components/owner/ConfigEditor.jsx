import { useEffect, useState } from 'react';
import { fetchConfig, updateConfig } from '../../services/api.js';

function OptionEditor({ option, onChange }) {
  return (
    <div className="grid gap-3 rounded-xl border border-slate-200/80 bg-slate-50/40 p-4 transition-all hover:bg-white hover:shadow-sm md:grid-cols-4">
      <div className="space-y-1">
        <label className="text-xs font-semibold uppercase tracking-wider text-slate-500">Label</label>
        <input
          value={option.label}
          onChange={(event) => onChange({ ...option, label: event.target.value })}
          className="w-full rounded-lg border border-slate-200 bg-white p-2.5 text-sm font-medium text-slate-900 outline-none transition-all placeholder:text-slate-400 focus:border-brand-500 focus:ring-4 focus:ring-brand-500/10"
          placeholder="Option label"
        />
      </div>
      <div className="space-y-1">
        <label className="text-xs font-semibold uppercase tracking-wider text-slate-500">Value</label>
        <input
          value={option.value}
          onChange={(event) => onChange({ ...option, value: event.target.value })}
          className="w-full rounded-lg border border-slate-200 bg-white p-2.5 text-sm font-medium text-slate-900 outline-none transition-all placeholder:text-slate-400 focus:border-brand-500 focus:ring-4 focus:ring-brand-500/10"
          placeholder="Option value"
        />
      </div>
      {'rate_per_sqft' in option && (
        <div className="space-y-1">
          <label className="text-xs font-semibold uppercase tracking-wider text-slate-500">Rate / sqft</label>
          <input
            type="number"
            step="0.01"
            value={option.rate_per_sqft ?? ''}
            onChange={(event) =>
              onChange({ ...option, rate_per_sqft: Number(event.target.value) })
            }
            className="w-full rounded-lg border border-slate-200 bg-white p-2.5 text-sm font-medium text-slate-900 outline-none transition-all placeholder:text-slate-400 focus:border-brand-500 focus:ring-4 focus:ring-brand-500/10"
            placeholder="0.00"
          />
        </div>
      )}
      {'multiplier' in option && (
        <div className="space-y-1">
          <label className="text-xs font-semibold uppercase tracking-wider text-slate-500">Multiplier</label>
          <input
            type="number"
            step="0.01"
            value={option.multiplier ?? ''}
            onChange={(event) =>
              onChange({ ...option, multiplier: Number(event.target.value) })
            }
            className="w-full rounded-lg border border-slate-200 bg-white p-2.5 text-sm font-medium text-slate-900 outline-none transition-all placeholder:text-slate-400 focus:border-brand-500 focus:ring-4 focus:ring-brand-500/10"
            placeholder="1.00"
          />
        </div>
      )}
      {'tear_off_per_sqft' in option && (
        <div className="space-y-1">
          <label className="text-xs font-semibold uppercase tracking-wider text-slate-500">Tear-off / sqft</label>
          <input
            type="number"
            step="0.01"
            value={option.tear_off_per_sqft ?? ''}
            onChange={(event) =>
              onChange({ ...option, tear_off_per_sqft: Number(event.target.value) })
            }
            className="w-full rounded-lg border border-slate-200 bg-white p-2.5 text-sm font-medium text-slate-900 outline-none transition-all placeholder:text-slate-400 focus:border-brand-500 focus:ring-4 focus:ring-brand-500/10"
            placeholder="0.00"
          />
        </div>
      )}
    </div>
  );
}

export default function ConfigEditor() {
  const [config, setConfig] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  // New State for "Add Question" form
  const [newQuestionLabel, setNewQuestionLabel] = useState('');
  const [newQuestionKey, setNewQuestionKey] = useState('');
  const [newQuestionType, setNewQuestionType] = useState('number');
  
  // Extra fields based on selection type
  const [tempOptions, setTempOptions] = useState([{ label: '', value: '', rate_per_sqft: 0 }]);
  const [defaultValue, setDefaultValue] = useState('');

  useEffect(() => {
    fetchConfig()
      .then(setConfig)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  function updateQuestion(index, updatedQuestion) {
    setConfig((prev) => {
      const questions = [...prev.questions];
      questions[index] = updatedQuestion;
      return { ...prev, questions };
    });
  }

  function updateOption(questionIndex, optionIndex, updatedOption) {
    setConfig((prev) => {
      const questions = [...prev.questions];
      const options = [...questions[questionIndex].options];
      options[optionIndex] = updatedOption;
      questions[questionIndex] = { ...questions[questionIndex], options };
      return { ...prev, questions };
    });
  }

  function handleAddQuestion() {
    if (!newQuestionLabel || !newQuestionKey) {
      alert("Please enter both Label and Key");
      return;
    }

    const newQ = {
      key: newQuestionKey,
      label: newQuestionLabel,
      type: newQuestionType,
      active: true,
      ...(newQuestionType === 'select'
        ? { options: tempOptions }
        : { default_value: defaultValue })
    };

    setConfig((prev) => ({ ...prev, questions: [...prev.questions, newQ] }));
    
    // Reset form
    setNewQuestionLabel('');
    setNewQuestionKey('');
    setNewQuestionType('number');
    setTempOptions([{ label: '', value: '', rate_per_sqft: 0 }]);
    setDefaultValue('');
  }

  async function handleSave() {
    setSaving(true);
    setMessage('');
    setError('');

    try {
      const updated = await updateConfig({
        business: config.business,
        questions: config.questions,
        modifiers: config.modifiers,
      });
      setConfig(updated);
      setMessage('Configuration saved successfully.');
    } catch (err) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  }

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center space-y-3 py-12">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-slate-200 border-t-brand-600"></div>
        <p className="text-sm font-medium text-slate-500">Loading configuration...</p>
      </div>
    );
  }

  if (!config) {
    return (
      <div className="rounded-xl border border-red-100 bg-red-50 p-6 text-red-700 shadow-sm">
        <span className="font-semibold">{error || 'Unable to load config.'}</span>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Top Banner with Version & Save Button */}
      <div className="flex flex-wrap items-center justify-between gap-4 rounded-xl border border-slate-100 bg-slate-50/50 p-5">
        <div className="space-y-0.5">
          <div className="flex items-center gap-2">
            <h2 className="text-lg font-bold text-slate-900">Configuration Editor</h2>
            <span className="rounded-full bg-brand-50 px-2.5 py-0.5 text-xs font-semibold text-brand-700">
              v{config.config_version}
            </span>
          </div>
          <p className="text-xs text-slate-500">Fine-tune global multipliers, fees, and wizard questionnaire options.</p>
        </div>
        <button
          type="button"
          onClick={handleSave}
          disabled={saving}
          className="flex items-center gap-2 rounded-xl bg-brand-600 px-5 py-2.5 text-sm font-bold text-white shadow-md shadow-brand-600/20 transition-all hover:bg-brand-700 disabled:pointer-events-none disabled:opacity-50"
        >
          {saving ? (
            <>
              <svg className="h-4 w-4 animate-spin text-white" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Saving Changes...
            </>
          ) : (
            'Save Changes'
          )}
        </button>
      </div>

      {message && (
        <div className="flex items-center space-x-2 rounded-xl border border-green-100 bg-green-50 p-4 text-sm font-medium text-green-700 shadow-sm animate-in fade-in">
          <svg className="h-5 w-5 shrink-0 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
          <span>{message}</span>
        </div>
      )}

      {error && (
        <div className="flex items-center space-x-2 rounded-xl border border-red-100 bg-red-50 p-4 text-sm font-medium text-red-700 shadow-sm animate-in fade-in">
          <svg className="h-5 w-5 shrink-0 text-red-500" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
          </svg>
          <span>{error}</span>
        </div>
      )}

      {/* Modifiers Section Card */}
      <div className="rounded-2xl border border-slate-200/80 bg-white p-6 shadow-sm space-y-4">
        <div>
          <h3 className="text-base font-bold text-slate-900">Global Modifiers & Fees</h3>
          <p className="text-xs text-slate-500">Configure cost multipliers, waste percentages, and standard flat fees.</p>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          <div className="space-y-1.5">
            <label className="text-xs font-semibold uppercase tracking-wider text-slate-600">Waste Factor</label>
            <input
              type="number"
              step="0.01"
              value={config.modifiers.waste_factor}
              onChange={(event) =>
                setConfig((prev) => ({
                  ...prev,
                  modifiers: { ...prev.modifiers, waste_factor: Number(event.target.value) },
                }))
              }
              className="w-full rounded-xl border border-slate-200 bg-slate-50/50 p-3 text-sm font-medium text-slate-900 outline-none transition-all focus:border-brand-500 focus:bg-white focus:ring-4 focus:ring-brand-500/10"
            />
          </div>
          <div className="space-y-1.5">
            <label className="text-xs font-semibold uppercase tracking-wider text-slate-600">Permit Fee</label>
            <input
              type="number"
              value={config.modifiers.permit_flat_fee}
              onChange={(event) =>
                setConfig((prev) => ({
                  ...prev,
                  modifiers: { ...prev.modifiers, permit_flat_fee: Number(event.target.value) },
                }))
              }
              className="w-full rounded-xl border border-slate-200 bg-slate-50/50 p-3 text-sm font-medium text-slate-900 outline-none transition-all focus:border-brand-500 focus:bg-white focus:ring-4 focus:ring-brand-500/10"
            />
          </div>
          <div className="space-y-1.5">
            <label className="text-xs font-semibold uppercase tracking-wider text-slate-600">Range Spread (%)</label>
            <input
              type="number"
              value={config.modifiers.range_spread_pct}
              onChange={(event) =>
                setConfig((prev) => ({
                  ...prev,
                  modifiers: { ...prev.modifiers, range_spread_pct: Number(event.target.value) },
                }))
              }
              className="w-full rounded-xl border border-slate-200 bg-slate-50/50 p-3 text-sm font-medium text-slate-900 outline-none transition-all focus:border-brand-500 focus:bg-white focus:ring-4 focus:ring-brand-500/10"
            />
          </div>
        </div>
      </div>

      {/* Questions & Options Management Section */}
      <div className="space-y-4">
        <div>
          <h3 className="text-base font-bold text-slate-900">Estimator Wizard Questions</h3>
          <p className="text-xs text-slate-500">Manage question titles, active statuses, and specific option pricing metrics.</p>
        </div>

        <div className="space-y-4">
          {config.questions.map((question, questionIndex) => (
            <div key={question.key} className="rounded-2xl border border-slate-200/80 bg-white p-6 shadow-sm transition-all hover:border-slate-300">
              <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 pb-4">
                <div className="space-y-0.5">
                  <span className="inline-block rounded-md bg-slate-100 px-2.5 py-0.5 text-xs font-mono font-semibold text-slate-600">
                    {question.key}
                  </span>
                </div>
                <label className="flex items-center gap-2.5 rounded-lg border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs font-semibold text-slate-700 cursor-pointer transition hover:bg-slate-100">
                  <input
                    type="checkbox"
                    checked={question.active}
                    onChange={(event) =>
                      updateQuestion(questionIndex, { ...question, active: event.target.checked })
                    }
                    className="h-4 w-4 rounded border-slate-300 text-brand-600 focus:ring-brand-500"
                  />
                  <span>Active Step</span>
                </label>
              </div>

              <div className="mt-4 space-y-1.5">
                <label className="text-xs font-semibold uppercase tracking-wider text-slate-500">Question Title / Label</label>
                <input
                  value={question.label}
                  onChange={(event) =>
                    updateQuestion(questionIndex, { ...question, label: event.target.value })
                  }
                  className="w-full rounded-xl border border-slate-200 bg-slate-50/50 p-3 text-sm font-medium text-slate-900 outline-none transition-all focus:border-brand-500 focus:bg-white focus:ring-4 focus:ring-brand-500/10"
                />
              </div>

              {question.options?.length > 0 && (
                <div className="mt-5 space-y-3">
                  <p className="text-xs font-bold uppercase tracking-wider text-slate-400">Options & Pricing Rates</p>
                  <div className="space-y-3">
                    {question.options.map((option, optionIndex) => (
                      <OptionEditor
                        key={`${question.key}-${option.value}`}
                        option={option}
                        onChange={(updatedOption) =>
                          updateOption(questionIndex, optionIndex, updatedOption)
                        }
                      />
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}

          {/* ADD NEW QUESTION FORM WITH CONDITIONAL INPUTS */}
          <div className="rounded-2xl border border-dashed border-slate-300 bg-slate-50 p-6 shadow-sm space-y-4">
            <h4 className="text-sm font-bold text-slate-900">Add New Question</h4>
            <div className="grid gap-4 md:grid-cols-3">
              <input
                placeholder="Question Label (e.g., Roof Type)"
                value={newQuestionLabel}
                onChange={(e) => setNewQuestionLabel(e.target.value)}
                className="w-full rounded-xl border border-slate-200 bg-white p-3 text-sm outline-none focus:border-brand-500"
              />
              <input
                placeholder="Unique Key (e.g., roof_type)"
                value={newQuestionKey}
                onChange={(e) => setNewQuestionKey(e.target.value)}
                className="w-full rounded-xl border border-slate-200 bg-white p-3 text-sm outline-none focus:border-brand-500"
              />
              <select
                value={newQuestionType}
                onChange={(e) => setNewQuestionType(e.target.value)}
                className="w-full rounded-xl border border-slate-200 bg-white p-3 text-sm outline-none focus:border-brand-500"
              >
                <option value="number">Number</option>
                <option value="text">Text</option>
                <option value="select">Select (Dropdown)</option>
              </select>
            </div>

            {/* Conditional Fields based on Type Selection */}
            {newQuestionType === 'select' ? (
              <div className="space-y-3 pt-2">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-500">Configure Initial Option</label>
                <div className="grid gap-3 md:grid-cols-3">
                  <input
                    placeholder="Option Label"
                    value={tempOptions[0].label}
                    onChange={(e) => {
                      const val = e.target.value;
                      setTempOptions([{ ...tempOptions[0], label: val, value: val.toLowerCase().replace(/\s+/g, '_') }]);
                    }}
                    className="w-full rounded-xl border border-slate-200 bg-white p-3 text-sm outline-none focus:border-brand-500"
                  />
                  <input
                    placeholder="Option Value"
                    value={tempOptions[0].value}
                    onChange={(e) => setTempOptions([{ ...tempOptions[0], value: e.target.value }])}
                    className="w-full rounded-xl border border-slate-200 bg-white p-3 text-sm outline-none focus:border-brand-500"
                  />
                  <input
                    type="number"
                    placeholder="Rate / sqft"
                    value={tempOptions[0].rate_per_sqft}
                    onChange={(e) => setTempOptions([{ ...tempOptions[0], rate_per_sqft: Number(e.target.value) }])}
                    className="w-full rounded-xl border border-slate-200 bg-white p-3 text-sm outline-none focus:border-brand-500"
                  />
                </div>
              </div>
            ) : (
              <div className="space-y-1 pt-2">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-500">Default Value / Placeholder</label>
                <input
                  placeholder={newQuestionType === 'number' ? "e.g. 1000" : "e.g. Enter details here"}
                  value={defaultValue}
                  onChange={(e) => setDefaultValue(e.target.value)}
                  className="w-full rounded-xl border border-slate-200 bg-white p-3 text-sm outline-none focus:border-brand-500"
                />
              </div>
            )}

            <button
              onClick={handleAddQuestion}
              className="mt-4 rounded-xl bg-slate-900 px-6 py-2.5 text-sm font-bold text-white hover:bg-slate-800 transition"
            >
              + Add Question to Wizard
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}