import { MessageCircle, Smartphone, Globe } from "lucide-react";

const FlutterHero = () => {
  return (
    <section
      id="home"
      className="min-h-screen pt-28 bg-gray-50 flex items-center"
    >
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        
        {/* LEFT CONTENT */}
        <div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-black leading-tight">
            Flutter + React
            <br />
            <span className="text-gray-600">Real-Time Chat App</span>
          </h1>

          <p className="mt-6 text-gray-600 text-base md:text-lg max-w-xl">
            Build modern, fast and secure real-time chat applications using
            Flutter for mobile, React for web and Firebase as backend.
          </p>

          {/* Buttons */}
          <div className="mt-8 flex flex-wrap gap-4">
            <a
              href="#chat"
              className="px-6 py-3 rounded-full bg-black text-white font-medium hover:opacity-90 transition"
            >
              Start Chat
            </a>

            <a
              href="#features"
              className="px-6 py-3 rounded-full border border-black text-black font-medium hover:bg-black hover:text-white transition"
            >
              View Features
            </a>
          </div>

          {/* Tech icons */}
          <div className="mt-10 flex gap-6 text-gray-500">
            <div className="flex items-center gap-2">
              <Smartphone size={20} />
              <span className="text-sm">Flutter</span>
            </div>
            <div className="flex items-center gap-2">
              <Globe size={20} />
              <span className="text-sm">React</span>
            </div>
            <div className="flex items-center gap-2">
              <MessageCircle size={20} />
              <span className="text-sm">Firebase</span>
            </div>
          </div>
        </div>

        {/* RIGHT SIDE (CHAT PREVIEW) */}
        <div className="relative">
          <div className="bg-white rounded-3xl shadow-xl p-6 max-w-sm mx-auto">
            
            {/* Header */}
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full bg-black text-white flex items-center justify-center">
                <MessageCircle size={20} />
              </div>
              <div>
                <p className="font-semibold">Flutter Chat</p>
                <p className="text-xs text-green-500">Online</p>
              </div>
            </div>

            {/* Messages */}
            <div className="space-y-3 text-sm">
              <div className="bg-gray-100 p-3 rounded-xl w-fit">
                Hi 👋 Welcome to Flutter Chat!
              </div>
              <div className="bg-black text-white p-3 rounded-xl ml-auto w-fit">
                This UI looks awesome 🔥
              </div>
              <div className="bg-gray-100 p-3 rounded-xl w-fit">
                Built with Flutter + React 🚀
              </div>
            </div>

            {/* Input */}
            <div className="mt-4 flex items-center gap-2">
              <input
                disabled
                placeholder="Type a message..."
                className="flex-1 px-3 py-2 border rounded-full text-sm outline-none"
              />
              <button className="bg-black text-white px-4 py-2 rounded-full text-sm">
                Send
              </button>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default FlutterHero;
