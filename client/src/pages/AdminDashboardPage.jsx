import { useEffect, useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import ConfigEditor from '../components/owner/ConfigEditor.jsx';
import LeadsTable from '../components/owner/LeadsTable.jsx';
import { fetchSession, logout, fetchLeads, fetchConfig } from '../services/api.js';

export default function AdminDashboardPage() {
  const navigate = useNavigate();
  const [authenticated, setAuthenticated] = useState(null);
  const [activeTab, setActiveTab] = useState('config');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [totalLeadsCount, setTotalLeadsCount] = useState(0);
  const [versionCount, setVersionCount] = useState(0);

  useEffect(() => {
    fetchSession()
      .then(() => {
        setAuthenticated(true);
        // Fetch leads and config metadata for quick metrics
        fetchLeads()
          .then((data) => {
            const leads = Array.isArray(data) ? data : data.leads || [];
            setTotalLeadsCount(leads.length);
          })
          .catch(() => {});

        fetchConfig()
          .then((config) => {
            if (config && config.version_history) {
              setVersionCount(config.version_history.length);
            }
          })
          .catch(() => {});
      })
      .catch(() => setAuthenticated(false));
  }, []);

  async function handleLogout() {
    try {
      await logout();
    } catch (e) {
      // Ignore network error on forced logout cleanup
    }
    localStorage.removeItem('isAdminAuthenticated');
    navigate('/admin/login');
  }

  if (authenticated === null) {
    return (
      <div className="flex min-h-[calc(100vh-80px)] w-full flex-col items-center justify-center space-y-4 bg-slate-50">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-slate-200 border-t-brand-600"></div>
        <p className="animate-pulse font-medium text-slate-500">Verifying session...</p>
      </div>
    );
  }

  if (!authenticated) {
    return <Navigate to="/admin/login" replace />;
  }

  return (
    <div className="max-h-[calc(100vh-80px)] bg-slate-50/50 flex flex-col md:flex-row relative">
      
      {/* Mobile Top Header */}
      <div className="flex md:hidden items-center justify-between bg-white border-b border-slate-200 px-4 py-3 sticky top-0 z-20 shadow-sm">
        <div className="flex items-center gap-2">
          <span className="rounded-full bg-brand-50 px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-brand-600">
            Admin
          </span>
          <h1 className="text-lg font-bold text-slate-900">Owner Panel</h1>
        </div>
        <button
          type="button"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="p-2 rounded-xl text-slate-600 hover:bg-slate-100 focus:outline-none"
          aria-label="Toggle Menu"
        >
          <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            {isMobileMenuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {/* Sidebar Navigation */}
      <aside
        className={`w-full md:w-72 bg-white border-r border-slate-200 p-6 flex flex-col justify-between shrink-0 shadow-sm md:sticky md:top-0 md:h-[calc(100vh-80px)] transition-all z-10 ${
          isMobileMenuOpen ? 'translate-x-0 min-h-[calc(100vh-130px)]' : '-translate-x-full md:translate-x-0 hidden md:flex'
        }`}
      >
        <div className="space-y-6">
          <div className="space-y-1 hidden md:block">
            <span className="rounded-full bg-brand-50 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-brand-600">
              Admin Control Center
            </span>
            <h1 className="text-2xl font-extrabold tracking-tight text-slate-900 mt-2">Owner Panel</h1>
            <p className="text-xs text-slate-500">Manage configurations & incoming customer leads.</p>
          </div>

          <nav className="space-y-2 mt-4 md:mt-0">
            <button
              type="button"
              onClick={() => {
                setActiveTab('config');
                setIsMobileMenuOpen(false);
              }}
              className={`w-full flex items-center justify-between px-4 py-3 rounded-xl text-sm font-semibold transition-all ${
                activeTab === 'config'
                  ? 'bg-brand-600 text-white shadow-md shadow-brand-500/25'
                  : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
              }`}
            >
              <div className="flex items-center gap-3">
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span>Estimator Config</span>
              </div>
              {versionCount > 0 && (
                <span className={`px-2 py-0.5 text-[10px] rounded-full font-bold ${activeTab === 'config' ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-600'}`}>
                  v{versionCount}
                </span>
              )}
            </button>

            <button
              type="button"
              onClick={() => {
                setActiveTab('leads');
                setIsMobileMenuOpen(false);
              }}
              className={`w-full flex items-center justify-between px-4 py-3 rounded-xl text-sm font-semibold transition-all ${
                activeTab === 'leads'
                  ? 'bg-brand-600 text-white shadow-md shadow-brand-500/25'
                  : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
              }`}
            >
              <div className="flex items-center gap-3">
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span>Customer Leads</span>
              </div>
              {totalLeadsCount > 0 && (
                <span className={`px-2 py-0.5 text-xs rounded-full font-bold ${activeTab === 'leads' ? 'bg-white/20 text-white' : 'bg-brand-100 text-brand-700'}`}>
                  {totalLeadsCount}
                </span>
              )}
            </button>
          </nav>
        </div>

        <div className="pt-4 border-t border-slate-100 mt-6 md:mt-0 space-y-3">
          <div className="flex items-center justify-between text-xs text-slate-400 px-1">
            <span>System Status</span>
            <span className="flex items-center gap-1.5 text-emerald-600 font-medium">
              <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse"></span>
              Online
            </span>
          </div>
          <button
            type="button"
            onClick={handleLogout}
            className="w-full flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-red-500 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition-all hover:bg-red-400"
          >
            <svg className="h-4 w-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
            Log Out
          </button>
        </div>
      </aside>

      {/* Right Content Area */}
      <main className="flex-1 p-4 md:p-8 overflow-y-auto">
        <div className="mx-auto max-w-6xl space-y-6">
          
          {/* Quick Metrics Bar */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm flex items-center justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">Total Captured Leads</p>
                <h3 className="text-2xl font-black text-slate-900 mt-1">{totalLeadsCount}</h3>
              </div>
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-50 text-brand-600">
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
            </div>

            <div className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm flex items-center justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">Config Versions</p>
                <h3 className="text-2xl font-black text-slate-900 mt-1">{versionCount || 1} Saved</h3>
              </div>
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-amber-50 text-amber-600">
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>
          </div>

          {/* Main Tab Content */}
          {activeTab === 'config' ? (
            <div className="rounded-2xl border border-slate-100 bg-white p-4 md:p-8 shadow-sm space-y-6">
              <div className="border-b border-slate-100 pb-4">
                <h2 className="text-xl font-bold text-slate-900">Estimator Configuration</h2>
                <p className="text-sm text-slate-500">Update calculation parameters, pricing rates, webhooks, and add custom questions.</p>
              </div>
              <ConfigEditor />
            </div>
          ) : (
            <div className="rounded-2xl border border-slate-100 bg-white p-4 md:p-8 shadow-sm space-y-6">
              <div className="border-b border-slate-100 pb-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                  <h2 className="text-xl font-bold text-slate-900">Customer Leads</h2>
                  <p className="text-sm text-slate-500">View, manage, and export all prospect form inquiries to CSV.</p>
                </div>
              </div>
              <LeadsTable />
            </div>
          )}
        </div>
      </main>
    </div>
  );
}