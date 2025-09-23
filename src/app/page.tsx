import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 flex items-center justify-center p-4">
      <div className="text-center">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-32 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-40 -left-32 w-80 h-80 bg-indigo-500/10 rounded-full blur-3xl"></div>
        </div>

        <div className="relative z-10">
          {/* Logo/Brand */}
          <div className="w-fit px-6 h-24 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-3xl flex items-center justify-center gap-3 mx-auto mb-8 shadow-2xl">
            <span style={{fontFamily:"fantasy"}} className="text-4xl font-bold text-white">MRS</span>
            <span style={{fontFamily:"fantasy"}} className="text-4xl font-bold text-white">SALMA</span>
          </div>

          <h1 className="text-6xl font-bold bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent mb-6">
            Welcome to Our Platform
          </h1>
          
          <p className="text-xl text-blue-100 mb-12 max-w-2xl mx-auto leading-relaxed">
            Experience the next generation of learning management. Access your personalized dashboard and unlock your potential.
          </p>
          
          <div className="flex gap-4 justify-center flex-wrap">
            <Link 
              href="/auth/login" 
              className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-8 py-4 rounded-2xl font-semibold shadow-2xl hover:shadow-3xl transform hover:-translate-y-1 transition-all duration-200"
            >
              Get Started
            </Link>
            {/* <Link 
              href="/features" 
              className="border border-white/20 text-white px-8 py-4 rounded-2xl font-semibold backdrop-blur-sm hover:bg-white/10 transition-all duration-200"
            >
              Learn More
            </Link> */}
          </div>

          {/* Stats/Features Preview */}
          {/* <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16 max-w-4xl mx-auto">
            {[
              { icon: "⚡", title: "Fast", desc: "Lightning fast performance" },
              { icon: "🔒", title: "Secure", desc: "Enterprise-grade security" },
              { icon: "🎯", title: "Smart", desc: "AI-powered insights" }
            ].map((item, index) => (
              <div key={index} className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
                <div className="text-3xl mb-3">{item.icon}</div>
                <h3 className="font-semibold text-white mb-2">{item.title}</h3>
                <p className="text-blue-200 text-sm">{item.desc}</p>
              </div>
            ))}
          </div> */}
        </div>
      </div>
    </main>
  );
}