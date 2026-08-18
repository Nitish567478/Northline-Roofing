import {Link, Navigate, Route, Routes} from 'react-router-dom';

import {
  ArrowRight,
  CheckCircle,
  Star,
  ShieldCheck,
  Hammer,
  Home,
} from "lucide-react";

export default function HomePage() {
  const services = [
    {
      title: "Roof Replacement",
      desc: "Premium quality roof replacement with long-lasting materials.",
      icon: <Home className="w-10 h-10 text-blue-600" />,
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSHZQObX6GpH_rD24vTQsh-aS1H89VpH1ltT6zv1TZT-A&s=10",
    },
    {
      title: "Roof Repair",
      desc: "Fast and reliable repair services for damaged roofs.",
      icon: <Hammer className="w-10 h-10 text-blue-600" />,
      image:
        "https://5.imimg.com/data5/SELLER/Default/2024/8/441940877/JE/OL/SH/188726256/roof-leak-repair-service.png",
    },
    {
      title: "Roof Inspection",
      desc: "Professional inspection before buying or selling property.",
      icon: <ShieldCheck className="w-10 h-10 text-blue-600" />,
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQB1BQYjYADucQkgB-4w-o9t-D2bP1pIPIvDphKwXJy1HtseAjEwqUs1dkb&s=10",
    },
  ];

return (
    <main className="bg-gray-50">
      {/* HERO */}
      <section className="relative h-screen">
        <img
          src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=80"
          alt="Roof"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/60"></div>
        <div className="relative max-w-7xl mx-auto h-full flex items-center px-6">
          <div className="max-w-2xl">
            <h1 className="text-6xl font-extrabold text-white leading-tight">
              Professional Roofing
              <span className="text-blue-400"> Estimate </span>
              in Minutes
            </h1>

            <p className="text-gray-200 mt-6 text-lg">
              Get an accurate roofing estimate instantly. No waiting.
              No hidden charges. Just fast, transparent pricing.
            </p>

            <div className="flex gap-4 mt-10">
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-lg flex items-center gap-2">
                <Link to="/estimate"> Get Free Estimate</Link>
                <ArrowRight />
              </button>
              <button className="border border-white text-white px-8 py-4 rounded-lg">
                Learn More
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* STATS */}
      <section className="max-w-7xl mx-auto py-20 px-6">
        <div className="grid md:grid-cols-4 gap-8">
          {[
            ["1500+", "Projects"],
            ["20+", "Years"],
            ["98%", "Happy Clients"],
            ["24/7", "Support"],
          ].map((item) => (
            <div
              key={item[1]}
              className="bg-white rounded-xl shadow-lg p-8 text-center"
            >
              <h2 className="text-5xl font-bold text-blue-600">{item[0]}</h2>
              <p className="mt-3 text-gray-600">{item[1]}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ABOUT */}
      <section className="max-w-7xl mx-auto py-20 px-6">
        <div className="grid lg:grid-cols-2 gap-14 items-center">
          <img           src="https://bloximages.newyork1.vip.townnews.com/mymalonetelegram.com/content/tncms/assets/v3/editorial/3/bd/3bd38269-777d-5a9f-b7ab-58f634159122/6a2eb533c050a.image.jpg"
            alt=""
            className="rounded-2xl shadow-xl"
          />
          <div>
            <h2 className="text-4xl font-bold">
              Trusted Roofing Professionals
            </h2>
            <p className="text-gray-600 mt-6 leading-8">
              We provide premium roofing solutions with honest pricing,
              experienced contractors, and industry-leading materials.
            </p>
            <div className="mt-8 space-y-5">
              <div className="flex items-center gap-3">
                <CheckCircle className="text-green-600" />
                Licensed Contractors
              </div>
              <div className="flex items-center gap-3">
                <CheckCircle className="text-green-600" />
                Premium Materials
              </div>
              <div className="flex items-center gap-3">
                <CheckCircle className="text-green-600" />
                Free Inspection
              </div>
              <div className="flex items-center gap-3">
                <CheckCircle className="text-green-600" />
                10-Year Warranty
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-center text-4xl font-bold">
            Our Roofing Services
          </h2>
          <div className="grid lg:grid-cols-3 gap-8 mt-14">
            {services.map((service) => (
              <div
                key={service.title}
                className="bg-gray-50 rounded-2xl shadow hover:shadow-xl transition overflow-hidden"
              >
                <img
                  src={service.image}
                  alt=""
                  className="h-56 w-full object-cover"
                />
                <div className="p-8">
                  {service.icon}
                  <h3 className="text-2xl font-bold mt-6">
                    {service.title}
                  </h3>
                  <p className="text-gray-600 mt-4">
                    {service.desc}
                  </p>
                  <button className="mt-6 text-blue-600 font-semibold">
                    Learn More →
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WHY CHOOSE */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-4xl font-bold text-center">
            Why Choose Us
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mt-14">
            {[
              "Licensed Experts",
              "Premium Materials",
              "Affordable Pricing",
              "Fast Installation",
              "Emergency Services",
              "Free Estimates",
              "Warranty Included",
              "Customer Satisfaction",
            ].map((item) => (
              <div
                key={item}
                className="bg-white rounded-xl p-8 shadow"
              >
                <CheckCircle className="text-blue-600 w-10 h-10"/>
                <h3 className="mt-5 font-bold text-xl">
                  {item}
                </h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24">
        <div className="max-w-6xl mx-auto bg-blue-600 rounded-3xl p-16 text-center">
          <h2 className="text-5xl font-bold text-white">
            Ready To Replace Your Roof?
          </h2>
          <p className="text-blue-100 mt-6 text-lg">
            Get an instant estimate today.
          </p>
          <button className="bg-white text-blue-600 mt-10 px-10 py-4 rounded-lg font-bold">
            <Link to="/estimate"> Start Free Estimate</Link>
          </button>
        </div>
      </section>
    </main>
  );
}

