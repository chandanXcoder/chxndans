import {
    Smartphone,
    Zap,
    Cloud,
    ShieldCheck,
    Code2,
    Palette,
  } from "lucide-react";
  
  const features = [
    {
      icon: <Smartphone size={32} />,
      title: "Cross Platform",
      desc: "Single codebase se Android, iOS aur Web apps build karo.",
    },
    {
      icon: <Zap size={32} />,
      title: "Fast Performance",
      desc: "Flutter ka Skia engine ultra-smooth animations deta hai.",
    },
    {
      icon: <Cloud size={32} />,
      title: "Firebase Ready",
      desc: "Realtime database, auth aur cloud storage support.",
    },
    {
      icon: <ShieldCheck size={32} />,
      title: "Secure",
      desc: "Built-in security + Firebase rules for safe apps.",
    },
    {
      icon: <Code2 size={32} />,
      title: "Clean Code",
      desc: "Readable, scalable aur maintainable architecture.",
    },
    {
      icon: <Palette size={32} />,
      title: "Beautiful UI",
      desc: "Material + Cupertino widgets for stunning design.",
    },
  ];
  
  const FlutterFeatures = () => {
    return (
      <section className="py-20 bg-white">
        {/* Heading */}
        <div className="text-center mb-14">
          <h2 className="text-4xl font-bold text-black">
            Flutter Features
          </h2>
          <p className="mt-4 text-gray-600 max-w-xl mx-auto">
            Flutter + React ke combination se powerful, fast aur modern
            applications banaye ja sakte hain.
          </p>
        </div>
  
        {/* Features Grid */}
        <div className="max-w-6xl mx-auto px-6 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((item, index) => (
            <div
              key={index}
              className="p-6 rounded-2xl border border-gray-200 hover:shadow-xl transition duration-300 group"
            >
              <div className="w-14 h-14 flex items-center justify-center rounded-xl bg-black text-white mb-5 group-hover:scale-110 transition">
                {item.icon}
              </div>
  
              <h3 className="text-xl font-semibold mb-2">
                {item.title}
              </h3>
  
              <p className="text-gray-600 text-sm">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </section>
    );
  };
  
  export default FlutterFeatures;
  