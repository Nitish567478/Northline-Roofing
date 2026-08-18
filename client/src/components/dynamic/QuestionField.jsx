export default function QuestionField({ question, value, onChange }) {
  if (!question.active) return null;

  if (question.type === 'number') {
    return (
      <div className="flex flex-col gap-2">
        <label className="font-semibold text-slate-800">
          {question.label}
          {question.unit ? ` (${question.unit})` : ''}
        </label>
        <input
          type="number"
          min={question.min}
          max={question.max}
          value={value ?? ''}
          onChange={(event) => onChange(question.key, Number(event.target.value))}
          className="w-full rounded-lg border border-slate-300 p-3 focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-100"
          placeholder={
            question.min !== undefined && question.max !== undefined
              ? `Enter value between ${question.min} and ${question.max}`
              : 'Enter a value'
          }
          required={question.required}
        />
      </div>
    );
  }

  if (question.type === 'select') {
    return (
      <div className="flex flex-col gap-2">
        <label className="font-semibold text-slate-800">{question.label}</label>
        <div className="grid gap-2">
          {question.options.map((option) => (
            <label
              key={option.value}
              className={`flex cursor-pointer items-center justify-between rounded-lg border p-3 transition ${
                value === option.value
                  ? 'border-brand-600 bg-brand-50 font-medium'
                  : 'border-slate-300 hover:bg-slate-50'
              }`}
            >
              <span>{option.label}</span>
              <input
                type="radio"
                name={question.key}
                value={option.value}
                checked={value === option.value}
                onChange={() => onChange(question.key, option.value)}
                className="h-4 w-4 text-brand-600"
              />
            </label>
          ))}
        </div>
      </div>
    );
  }

  return null;
}
