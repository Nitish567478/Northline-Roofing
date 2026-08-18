import React from 'react';

export default function LeadDetailsModal({ lead, onClose }) {
  if (!lead) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 backdrop-blur-sm p-4">
      <div className="relative w-full max-w-2xl rounded-2xl bg-white shadow-xl overflow-hidden animate-in fade-in zoom-in duration-200">
        
        {/* Modal Header */}
        <div className="flex items-center justify-between border-b border-slate-100 px-6 py-4 bg-slate-50">
          <div>
            <h3 className="text-lg font-bold text-slate-900">Lead Details & Answers</h3>
            <p className="text-xs text-slate-500">Submitted on {new Date(lead.createdAt || Date.now()).toLocaleString()}</p>
          </div>
          <button
            onClick={onClose}
            className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-200 hover:text-slate-700 transition"
          >
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-6 max-h-[70vh] overflow-y-auto">
          
          {/* Customer Info Card */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 p-4 rounded-xl bg-brand-50/50 border border-brand-100">
            <div>
              <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Full Name</span>
              <p className="text-sm font-bold text-slate-800">{lead.name}</p>
            </div>
            <div>
              <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Phone Number</span>
              <p className="text-sm font-bold text-slate-800">{lead.phone}</p>
            </div>
            <div>
              <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Email Address</span>
              <p className="text-sm font-bold text-slate-800 truncate">{lead.email}</p>
            </div>
          </div>

          {/* Estimate Range Summary */}
          <div className="flex items-center justify-between p-4 rounded-xl bg-slate-900 text-white">
            <div>
              <span className="text-xs text-slate-400 uppercase tracking-wider">Calculated Estimate Range</span>
              <div className="text-xl font-extrabold text-amber-400 mt-0.5">
                ${lead.estimate_low?.toLocaleString()} — ${lead.estimate_high?.toLocaleString()}
              </div>
            </div>
            <span className={`px-3 py-1 rounded-full text-xs font-semibold uppercase ${
              lead.status === 'Complete' ? 'bg-emerald-500/20 text-emerald-300' :
              lead.status === 'Processing' ? 'bg-amber-500/20 text-amber-300' : 'bg-slate-700 text-slate-300'
            }`}>
              {lead.status || 'Pending'}
            </span>
          </div>

          {/* Exact Answers Breakdown */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-slate-900 uppercase tracking-wider">Customer Questionnaire Answers</h4>
            <div className="divide-y divide-slate-100 border border-slate-100 rounded-xl overflow-hidden bg-white">
              {lead.answers && Object.entries(lead.answers).map(([key, value], idx) => (
                <div key={idx} className="flex items-center justify-between px-4 py-3 text-sm hover:bg-slate-50">
                  <span className="font-medium text-slate-600 capitalize">{key.replace('_', ' ')}</span>
                  <span className="font-semibold text-slate-900 bg-slate-100 px-2.5 py-1 rounded-md">{String(value)}</span>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Modal Footer */}
        <div className="flex items-center justify-end gap-3 border-t border-slate-100 px-6 py-4 bg-slate-50">
          <button
            onClick={onClose}
            className="rounded-xl bg-slate-900 px-5 py-2 text-sm font-semibold text-white shadow-sm hover:bg-slate-800 transition"
          >
            Close
          </button>
        </div>

      </div>
    </div>
  );
}