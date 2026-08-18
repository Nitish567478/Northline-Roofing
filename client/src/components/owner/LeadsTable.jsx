import { Fragment, useEffect, useState } from 'react';
import { fetchLeads, formatCurrency, updateLeadStatus, deleteLead } from '../../services/api.js';

export default function LeadsTable() {
  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [expandedId, setExpandedId] = useState(null);
  const [actionLoading, setActionLoading] = useState(null);

  useEffect(() => {
    loadLeads();
  }, []);

  async function loadLeads() {
    try {
      const data = await fetchLeads();
      const leadsArray = Array.isArray(data) ? data : data.leads || [];
      const initializedLeads = leadsArray.map(lead => ({
        ...lead,
        status: lead.status || 'pending'
      }));
      setLeads(initializedLeads);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  async function handleStatusChange(leadId, newStatus) {
    setActionLoading(leadId);
    try {
      if (typeof updateLeadStatus === 'function') {
        await updateLeadStatus(leadId, newStatus);
      }
      setLeads((prev) =>
        prev.map((lead) => (lead.id === leadId ? { ...lead, status: newStatus } : lead))
      );
    } catch (err) {
      alert('Failed to update status: ' + err.message);
    } finally {
      setActionLoading(null);
    }
  }

  async function handleDelete(leadId) {
    if (!window.confirm('Are you sure you want to delete this lead?')) return;
    
    setActionLoading(leadId);
    try {
      if (typeof deleteLead === 'function') {
        await deleteLead(leadId);
      }
      setLeads((prev) => prev.filter((lead) => lead.id !== leadId));
    } catch (err) {
      alert('Failed to delete lead: ' + err.message);
    } finally {
      setActionLoading(null);
    }
  }

  // CSV Export Functionality
  function handleExportCSV() {
    if (leads.length === 0) {
      alert('No leads available to export.');
      return;
    }

    const headers = ['ID', 'Name', 'Phone', 'Email', 'Submitted At', 'Estimate Low', 'Estimate High', 'Status'];
    
    const rows = leads.map(lead => [
      lead.id || '',
      `"${(lead.name || '').replace(/"/g, '""')}"`,
      `"${(lead.phone || '').replace(/"/g, '""')}"`,
      `"${(lead.email || '').replace(/"/g, '""')}"`,
      `"${new Date(lead.created_at || Date.now()).toLocaleString()}"`,
      lead.estimate_low || 0,
      lead.estimate_high || 0,
      lead.status || 'pending'
    ]);

    const csvContent = [headers.join(','), ...rows.map(row => row.join(','))].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `customer_leads_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center space-y-3 py-12">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-slate-200 border-t-brand-600"></div>
        <p className="text-sm font-medium text-slate-500">Loading captured leads...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="rounded-xl border border-red-100 bg-red-50 p-6 text-red-700 shadow-sm">
        <span className="font-semibold">{error}</span>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h3 className="text-base font-bold text-slate-900">Captured Leads Pipeline</h3>
          <p className="text-xs text-slate-500">Manage prospect inquiries, change pipeline statuses, or remove leads.</p>
        </div>
        
        <div className="flex items-center gap-3">
          <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-600">
            {leads.length} Total Submissions
          </span>
          <button
            type="button"
            onClick={handleExportCSV}
            className="flex items-center gap-2 rounded-xl bg-slate-900 hover:bg-slate-800 px-4 py-2 text-xs font-semibold text-white shadow-sm transition"
          >
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
            </svg>
            Export to CSV
          </button>
        </div>
      </div>

      <div className="overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-sm">
        <div className="overflow-x-auto">
          <table className="min-w-full text-left text-sm">
            <thead className="border-b border-slate-200 bg-slate-50/70 text-xs font-bold uppercase tracking-wider text-slate-500">
              <tr>
                <th className="px-4 py-3.5">Client Info</th>
                <th className="px-4 py-3.5">Contact</th>
                <th className="px-4 py-3.5">Submitted</th>
                <th className="px-4 py-3.5">Estimate Range</th>
                <th className="px-4 py-3.5">Status</th>
                <th className="px-4 py-3.5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {leads.map((lead) => {
                const isExpanded = expandedId === lead.id;
                const isBusy = actionLoading === lead.id;
                const isComplete = lead.status === 'complete';

                return (
                  <Fragment key={lead.id}>
                    <tr className={`transition-colors hover:bg-slate-50/50 ${isExpanded ? 'bg-slate-50/80' : ''}`}>
                      <td className="px-4 py-4">
                        <p className="font-bold text-slate-900">{lead.name}</p>
                        <p className="text-xs text-slate-400">ID: #{lead.id}</p>
                      </td>
                      <td className="px-4 py-4">
                        <p className="font-medium text-slate-700">{lead.phone}</p>
                        <p className="text-xs text-slate-500">{lead.email}</p>
                      </td>
                      <td className="px-4 py-4 text-slate-600 text-xs font-medium">
                        {new Date(lead.created_at).toLocaleString()}
                      </td>
                      <td className="px-4 py-4 font-bold text-brand-700">
                        {formatCurrency(lead.estimate_low)} – {formatCurrency(lead.estimate_high)}
                      </td>
                      <td className="px-4 py-4">
                        <select
                          value={lead.status || 'pending'}
                          onChange={(e) => handleStatusChange(lead.id, e.target.value)}
                          disabled={isComplete || isBusy}
                          className={`rounded-lg border px-2.5 py-1 text-xs font-semibold outline-none transition cursor-pointer disabled:opacity-70 disabled:cursor-not-allowed ${
                            lead.status === 'complete'
                              ? 'bg-emerald-50 text-emerald-700 border-emerald-300'
                              : lead.status === 'processing'
                              ? 'bg-amber-50 text-amber-700 border-amber-300'
                              : 'bg-red-50 text-red-700 border-red-300'
                          }`}
                        >
                          <option value="pending" className="bg-white text-slate-700">Pending</option>
                          <option value="processing" className="bg-white text-slate-700">Processing</option>
                          <option value="complete" className="bg-white text-slate-700">Complete</option>
                        </select>
                      </td>
                      <td className="px-4 py-4 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            type="button"
                            onClick={() => setExpandedId((prev) => (prev === lead.id ? null : lead.id))}
                            className="rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs font-semibold text-slate-700 transition hover:bg-slate-50 hover:text-slate-900"
                          >
                            {isExpanded ? 'Hide Details' : 'View Details'}
                          </button>
                          <button
                            type="button"
                            onClick={() => handleDelete(lead.id)}
                            disabled={isBusy}
                            title="Delete Lead"
                            className="rounded-lg border border-red-100 bg-red-50/50 p-1.5 text-red-600 transition hover:bg-red-100 disabled:opacity-50"
                          >
                            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                          </button>
                        </div>
                      </td>
                    </tr>

                    {isExpanded && (
                      <tr className="bg-slate-50/80">
                        <td colSpan={6} className="px-6 py-4">
                          <div className="rounded-xl border border-slate-200/80 bg-white p-5 shadow-inner space-y-3">
                            <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500">Estimator Wizard Question Answers</h4>
                              <span className="text-xs text-slate-400">Detailed Breakdown</span>
                            </div>
                            <div className="grid gap-3 sm:grid-cols-2 md:grid-cols-3">
                              {lead.answers && Object.entries(lead.answers).map(([key, value]) => (
                                <div key={key} className="rounded-xl border border-slate-100 bg-slate-50/50 p-3">
                                  <span className="block text-xs font-semibold uppercase tracking-wider text-slate-400">{key}</span>
                                  <span className="mt-0.5 block text-sm font-medium text-slate-800">{String(value)}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                        </td>
                      </tr>
                    )}
                  </Fragment>
                );
              })}
            </tbody>
          </table>
        </div>

        {leads.length === 0 && (
          <div className="py-12 text-center text-slate-500">
            <svg className="mx-auto h-10 w-10 text-slate-300 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
            </svg>
            <p className="text-sm font-medium text-slate-600">No leads captured yet.</p>
          </div>
        )}
      </div>
    </div>
  );
}