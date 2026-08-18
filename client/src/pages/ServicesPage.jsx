import { Link } from 'react-router-dom';

export default function ServicesPage() {
  const servicesList = [
    {
      id: 1,
      title: 'Custom Price Estimator Integration',
      description: 'Embed dynamic, real-time pricing calculators directly into your website to convert visitors into qualified leads instantly.',
      icon: (
        <svg className="h-6 w-6 text-brand-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round5" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
        </svg>
      ),
      features: ['Real-time calculations', 'Mobile-friendly widget', 'Custom formula adjustments'],
    },
    {
      id: 2,
      title: 'Lead Management & Tracking',
      description: 'Centralize all customer inquiries, estimate submissions, and prospect data in one secure, easy-to-use control center.',
      icon: (
        <svg className="h-6 w-6 text-brand-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      ),
      features: ['Instant lead notifications', 'Export data options', 'Status tracking & filtering'],
    },
    {
      id: 3,
      title: 'Business Configuration & Rules',
      description: 'Take full control of your global multipliers, waste factors, permit fees, and interactive wizard questionnaire options.',
      icon: (
        <svg className="h-6 w-6 text-brand-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      ),
      features: ['Dynamic question builder', 'Adjustable fee parameters', 'Instant live updates'],
    },
  ];

  return (
    <div className="min-h-[calc(100vh-80px)] bg-slate-50/50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl space-y-12">
        
        {/* Header Section */}
        <div className="text-center space-y-4 max-w-3xl mx-auto">
          <span className="rounded-full bg-brand-50 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-brand-600">
            Our Offerings
          </span>
          <h1 className="text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl">
            Powerful Services to Grow Your Business
          </h1>
          <p className="text-lg text-slate-500">
            Streamline your pricing, capture high-quality leads, and manage your operational configurations effortlessly from one centralized platform.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {servicesList.map((service) => (
            <div
              key={service.id}
              className="rounded-2xl border border-slate-100 bg-white p-8 shadow-sm hover:shadow-md transition-all flex flex-col justify-between space-y-6"
            >
              <div className="space-y-4">
                <div className="h-12 w-12 rounded-xl bg-brand-50 flex items-center justify-center">
                  {service.icon}
                </div>
                <h3 className="text-xl font-bold text-slate-900">{service.title}</h3>
                <p className="text-sm text-slate-500 leading-relaxed">{service.description}</p>
              </div>

              <div className="space-y-4 pt-4 border-t border-slate-100">
                <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-400">Key Features</h4>
                <ul className="space-y-2">
                  {service.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center gap-2 text-sm text-slate-600">
                      <svg className="h-4 w-4 text-brand-600 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                      </svg>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>

        {/* Call to Action Banner */}
        <div className="rounded-2xl bg-brand-600 p-8 sm:p-12 text-white flex flex-col sm:flex-row items-center justify-between gap-6 shadow-lg shadow-brand-500/20">
          <div className="space-y-2 text-center sm:text-left">
            <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">Ready to optimize your workflow?</h2>
            <p className="text-brand-100 text-sm max-w-xl">
              Log in to your owner panel to configure your estimator settings or check your latest customer inquiries.
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