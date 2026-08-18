import { Link } from 'react-router-dom';

export default function HowItWorksPage() {
  const ownerSteps = [
    {
      step: '01',
      title: 'Configure Pricing & Parameters',
      description: 'Log in to the Owner Panel to set your global multipliers, waste factors, flat rates, and custom permit fees according to your business needs.',
      icon: (
        <svg className="h-6 w-6 text-brand-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      ),
    },
    {
      step: '02',
      title: 'Customize Questionnaire Wizard',
      description: 'Define and modify interactive questions and choices to gather exact specifications from your prospects before generating estimates.',
      icon: (
        <svg className="h-6 w-6 text-brand-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
    },
    {
      step: '03',
      title: 'Track & Manage Leads',
      description: 'Review incoming customer submissions in real-time, update pipeline statuses (Pending, Processing, Complete), and close deals faster.',
      icon: (
        <svg className="h-6 w-6 text-brand-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
        </svg>
      ),
    },
  ];

  const customerSteps = [
    {
      step: 'A',
      title: 'Answer Interactive Questions',
      description: 'Visitors go through a simple, engaging multi-step questionnaire on your website to specify their project requirements.',
    },
    {
      step: 'B',
      title: 'Instant Cost Estimation',
      description: 'The built-in calculation engine instantly processes parameters and outputs a clear low-to-high estimate range.',
    },
    {
      step: 'C',
      title: 'Submit Inquiry & Connect',
      description: 'Prospects submit their contact info to finalize their request, creating an instant lead entry in your dashboard.',
    },
  ];

  return (
    <div className="min-h-[calc(100vh-80px)] bg-slate-50/50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl space-y-16">
        
        {/* Header Section */}
        <div className="text-center space-y-4 max-w-3xl mx-auto">
          <span className="rounded-full bg-brand-50 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-brand-600">
            Workflow Process
          </span>
          <h1 className="text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl">
            How It Works
          </h1>
          <p className="text-lg text-slate-500">
            Discover how our automated pricing calculator and lead management pipeline seamlessly connect your business with high-intent customers.
          </p>
        </div>

        {/* Section 1: For Business Owners */}
        <div className="space-y-8">
          <div className="border-b border-slate-200 pb-4">
            <h2 className="text-2xl font-bold text-slate-900">For Business Owners & Administrators</h2>
            <p className="text-sm text-slate-500">Control your entire estimation workflow in 3 simple steps.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {ownerSteps.map((item, idx) => (
              <div
                key={idx}
                className="relative rounded-2xl border border-slate-100 bg-white p-8 shadow-sm space-y-4 flex flex-col justify-between"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="h-12 w-12 rounded-xl bg-brand-50 flex items-center justify-center">
                      {item.icon}
                    </div>
                    <span className="text-2xl font-black text-slate-200">{item.step}</span>
                  </div>
                  <h3 className="text-xl font-bold text-slate-900">{item.title}</h3>
                  <p className="text-sm text-slate-500 leading-relaxed">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Section 2: For Customers / End Users */}
        <div className="space-y-8 pt-8">
          <div className="border-b border-slate-200 pb-4">
            <h2 className="text-2xl font-bold text-slate-900">For Your Customers (The Estimator Experience)</h2>
            <p className="text-sm text-slate-500">What your website visitors experience when requesting a quote.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {customerSteps.map((item, idx) => (
              <div
                key={idx}
                className="rounded-2xl border border-slate-100 bg-white p-8 shadow-sm space-y-4 flex flex-col justify-between"
              >
                <div className="space-y-4">
                  <div className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-slate-900 text-white font-bold text-sm">
                    {item.step}
                  </div>
                  <h3 className="text-xl font-bold text-slate-900">{item.title}</h3>
                  <p className="text-sm text-slate-500 leading-relaxed">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Call to Action Banner */}
        <div className="rounded-2xl bg-brand-600 p-8 sm:p-12 text-white flex flex-col sm:flex-row items-center justify-between gap-6 shadow-lg shadow-brand-500/20">
          <div className="space-y-2 text-center sm:text-left">
            <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">Get started with your control panel today</h2>
            <p className="text-brand-100 text-sm max-w-xl">
              Log in now to test your custom calculator configuration and manage your customer pipeline.
            </p>
          </div>
          <div className="flex items-center gap-4 shrink-0">
            <Link
              to="/admin/login"
              className="rounded-xl bg-white px-6 py-3 text-sm font-semibold text-brand-600 shadow-sm transition-all hover:bg-brand-50"
            >
              Owner Login
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
}