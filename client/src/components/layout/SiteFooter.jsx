export default function SiteFooter() { 
  return ( 
    <footer className="border-t border-slate-200 bg-brand-900 text-white"> 
      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-12 md:grid-cols-3"> 
        <div> 
          <div className="flex items-center gap-3"> 
            <img src="/images/logo.svg" alt="" className="h-10 w-10" /> 
            <div> 
              <p className="font-bold">Northline Roofing & Exteriors</p> 
              <p className="text-sm text-brand-100">Pacific Northwest</p> 
            </div> 
          </div> 
          <p className="mt-4 text-sm text-brand-100"> 
            Trusted residential and commercial roofing with transparent pricing and expert installation. 
          </p> 
        </div> 
        <div> 
          <p className="font-semibold">Quick Links</p> 
          <ul className="mt-3 space-y-2 text-sm text-brand-100"> 
            <li><a href="/estimate" className="hover:text-white">Cost Estimator</a></li> 
            <li><a href="/#services" className="hover:text-white">Roofing Services</a></li> 
            <li><a href="/#how-it-works" className="hover:text-white">How It Works</a></li> 
          </ul> 
        </div> 
        <div> 
          <p className="font-semibold">Contact</p> 
          <ul className="mt-3 space-y-2 text-sm text-brand-100"> 
            <li>(555) 482-ROOF</li> 
            <li>hello@northlineroofing.com</li> 
            <li>Mon–Sat: 7:00 AM – 6:00 PM</li> 
          </ul> 
        </div> 
      </div> 
      <div className="border-t border-white/10 py-4 text-center text-xs text-brand-200"> 
        © {new Date().getFullYear()} Northline Roofing & Exteriors. All rights reserved. 
      </div> 
    </footer> 
  ); 
} 
