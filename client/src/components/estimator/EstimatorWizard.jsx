import { useEffect, useMemo, useState } from 'react';
import QuestionField from '../dynamic/QuestionField.jsx';
import { fetchConfig, formatCurrency, submitEstimate } from '../../services/api.js';

export default function EstimatorWizard() {
  const [config, setConfig] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [stepIndex, setStepIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [contact, setContact] = useState({ name: '', phone: '', email: '' });
  const [submitting, setSubmitting] = useState(false);
  const [result, setResult] = useState(null);

  useEffect(() => {
    fetchConfig()
      .then(setConfig)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  const questions = useMemo(() => config?.questions ?? [], [config]);
  const totalSteps = questions.length + 1;
  const isContactStep = stepIndex === questions.length;
  const currentQuestion = questions[stepIndex];

  function handleAnswerChange(key, value) {
    setAnswers((prev) => ({ ...prev, [key]: value }));
  }

  function isCurrentStepValid() {
    if (isContactStep) {
      return contact.name.trim() && contact.phone.trim() && contact.email.trim();
    }

    const question = currentQuestion;
    const value = answers[question.key];

    if (question.required && (value === undefined || value === '' || Number.isNaN(value))) {
      return false;
    }

    if (question.type === 'number') {
      const numericValue = Number(value);
      if (Number.isNaN(numericValue)) return false;
      if (question.min !== undefined && numericValue < question.min) return false;
      if (question.max !== undefined && numericValue > question.max) return false;
    }

    return true;
  }

  async function handleSubmit() {
    setSubmitting(true);
    setError('');

    try {
      const response = await submitEstimate({
        ...contact,
        answers,
      });
      setResult(response);
    } catch (err) {
      setError(err.message);
    } finally {
      setSubmitting(false);
    }
  }

  const renderFormContent = () => {
    if (loading) {
      return (
        <div className="flex w-full flex-col items-center justify-center space-y-4 py-20">
          <div className="h-10 w-10 animate-spin rounded-full border-4 border-slate-100 border-t-brand-600"></div>
          <p className="animate-pulse font-medium text-slate-500">Loading estimator...</p>
        </div>
      );
    }

    if (!config) {
      return (
        <div className="w-full rounded-xl border border-red-100 bg-red-50 p-6 text-red-700 shadow-sm">
          <div className="flex items-center space-x-3">
            <svg className="h-6 w-6 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span className="font-semibold">{error || 'Unable to load config.'}</span>
          </div>
        </div>
      );
    }

    if (result) {
      return (
        <div className="w-full animate-in fade-in slide-in-from-bottom-4 duration-500">
          <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
            <svg className="h-8 w-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h2 className="text-center text-3xl font-bold text-slate-900">Estimate Complete</h2>
          <p className="mt-3 text-center text-lg text-slate-600">
            Thank you, <span className="font-semibold text-slate-900">{contact.name}</span>. Here is your projected range for {config.business.name}.
          </p>

          <div className="mt-8 w-full overflow-hidden rounded-2xl border border-brand-100 bg-brand-50/50 shadow-sm">
            <div className="bg-brand-600 py-4 text-center">
              <p className="text-xs font-bold uppercase tracking-widest text-brand-100">Estimated Range</p>
            </div>
            <div className="bg-white p-8 text-center">
              <p className="text-4xl font-extrabold text-brand-600">
                {formatCurrency(result.estimate_low, config.business.currency)}
                <span className="mx-3 font-light text-slate-300">–</span>
                {formatCurrency(result.estimate_high, config.business.currency)}
              </p>
            </div>
          </div>
          <p className="mt-8 rounded-xl bg-slate-50 p-4 text-center text-sm text-slate-500">
            A team member will follow up shortly to confirm details and schedule an on-site inspection.
          </p>
        </div>
      );
    }

    return (
      <div className="w-full animate-in fade-in duration-300">
        <div className="mb-8 w-full">
          <div className="mb-2 flex items-center justify-between">
            <p className="text-xs font-bold uppercase tracking-widest text-brand-600">
              {config.business.name}
            </p>
            <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-500">
              Step {stepIndex + 1} of {totalSteps}
            </span>
          </div>
          <h1 className="text-3xl font-extrabold tracking-tight text-slate-900">Roof Cost Estimator</h1>

          <div className="mt-6 h-1.5 w-full overflow-hidden rounded-full bg-slate-100">
            <div
              className="h-full rounded-full bg-brand-600 transition-all duration-500 ease-out"
              style={{ width: `${((stepIndex + 1) / totalSteps) * 100}%` }}
            />
          </div>
        </div>

        {error && (
          <div className="mb-6 flex items-center rounded-lg border border-red-100 bg-red-50 p-4 text-sm text-red-700">
            <svg className="mr-2 h-5 w-5 shrink-0" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" /></svg>
            {error}
          </div>
        )}

        <div className="min-h-[280px] w-full">
          {!isContactStep ? (
            <QuestionField
              question={currentQuestion}
              value={answers[currentQuestion.key]}
              onChange={handleAnswerChange}
            />
          ) : (
            <div className="w-full space-y-6">
              <div>
                <h2 className="text-2xl font-bold text-slate-900">Where should we send it?</h2>
                <p className="mt-1 text-sm text-slate-500">
                  Enter your details to reveal your personalized estimate immediately.
                </p>
              </div>
              <div className="space-y-4">
                <div className="space-y-1">
                  <label className="text-sm font-medium text-slate-700">Full Name</label>
                  <input
                    type="text"
                    placeholder="John Doe"
                    value={contact.name}
                    onChange={(e) => setContact((prev) => ({ ...prev, name: e.target.value }))}
                    className="w-full rounded-xl border border-slate-200 bg-slate-50/50 p-3.5 text-slate-900 outline-none transition-all placeholder:text-slate-400 focus:border-brand-500 focus:bg-white focus:ring-4 focus:ring-brand-500/10"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-sm font-medium text-slate-700">Phone Number</label>
                  <input
                    type="tel"
                    placeholder="(555) 000-0000"
                    value={contact.phone}
                    onChange={(e) => setContact((prev) => ({ ...prev, phone: e.target.value }))}
                    className="w-full rounded-xl border border-slate-200 bg-slate-50/50 p-3.5 text-slate-900 outline-none transition-all placeholder:text-slate-400 focus:border-brand-500 focus:bg-white focus:ring-4 focus:ring-brand-500/10"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-sm font-medium text-slate-700">Email Address</label>
                  <input
                    type="email"
                    placeholder="john@example.com"
                    value={contact.email}
                    onChange={(e) => setContact((prev) => ({ ...prev, email: e.target.value }))}
                    className="w-full rounded-xl border border-slate-200 bg-slate-50/50 p-3.5 text-slate-900 outline-none transition-all placeholder:text-slate-400 focus:border-brand-500 focus:bg-white focus:ring-4 focus:ring-brand-500/10"
                  />
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="mt-10 flex items-center justify-between border-t border-slate-100 pt-6">
          <button
            type="button"
            onClick={() => setStepIndex((prev) => Math.max(prev - 1, 0))}
            disabled={stepIndex === 0}
            className="group flex items-center rounded-xl px-5 py-2.5 text-sm font-semibold text-slate-600 transition-all hover:bg-slate-100 disabled:pointer-events-none disabled:opacity-40"
          >
            <svg className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back
          </button>

          {!isContactStep ? (
            <button
              type="button"
              onClick={() => setStepIndex((prev) => prev + 1)}
              disabled={!isCurrentStepValid()}
              className="flex items-center rounded-xl bg-brand-600 px-6 py-2.5 text-sm font-semibold text-white shadow-sm transition-all hover:bg-brand-700 hover:shadow disabled:pointer-events-none disabled:opacity-50"
            >
              Continue
              <svg className="ml-2 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          ) : (
            <button
              type="button"
              onClick={handleSubmit}
              disabled={!isCurrentStepValid() || submitting}
              className="flex items-center rounded-xl bg-brand-600 px-8 py-3 text-sm font-bold text-white shadow-lg shadow-brand-600/30 transition-all hover:-translate-y-0.5 hover:bg-brand-700 disabled:pointer-events-none disabled:opacity-50"
            >
              {submitting ? (
                <>
                  <svg className="mr-3 h-4 w-4 animate-spin text-white" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Calculating...
                </>
              ) : (
                'Get My Estimate'
              )}
            </button>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen w-full grid grid-cols-1 lg:grid-cols-2 bg-slate-900 m-0 p-0">
      <div className="relative hidden lg:flex lg:flex-col lg:justify-center lg:items-center h-full w-full overflow-hidden bg-slate-900 min-h-screen p-12 text-center">
        <img
          src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2070&auto=format&fit=crop" 
          alt="Roofing Exterior"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-slate-900/50 mix-blend-multiply" />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-slate-900/40 to-slate-900/20" />
        <div className="relative z-10 text-white space-y-4 max-w-lg">
          <span className="text-xs font-bold uppercase tracking-widest text-amber-400">Professional Roofing & Exteriors</span>
          <h2 className="text-4xl font-extrabold tracking-tight">Build with Confidence</h2>
          <p className="text-sm text-slate-300 leading-relaxed">
            Get transparent, precise pricing for your roofing project instantly with our interactive cost estimator tool.
          </p>
        </div>
      </div>
      <div className="w-full min-h-screen bg-white flex flex-col justify-center px-6 sm:px-12 lg:px-16 py-12 overflow-y-auto">
        <div className="w-full max-w-xl mx-auto">
          {renderFormContent()}
        </div>
      </div>

    </div>
  );
}