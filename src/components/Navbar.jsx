import { useState } from "react";
import { Menu, X, MessageCircle } from "lucide-react";

const Navbar = () => {
  const [open, setOpen] = useState(false);

  const links = [
    { name: "Home", href: "#home" },
    { name: "Features", href: "#features" },
    { name: "Tech Stack", href: "#tech" },
    { name: "Chat App", href: "#chat" },
    { name: "Contact", href: "#contact" },
  ];

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-white/80 backdrop-blur border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        
        {/* Logo */}
        <div className="flex items-center gap-2 font-bold text-xl">
          <MessageCircle className="text-black" />
          <span>FlutterChat</span>
        </div>

        {/* Desktop Menu */}
        <ul className="hidden md:flex gap-8 text-sm font-medium">
          {links.map((link, index) => (
            <li key={index}>
              <a
                href={link.href}
                className="text-gray-700 hover:text-black transition"
              >
                {link.name}
              </a>
            </li>
          ))}
        </ul>

        {/* CTA Button */}
        <div className="hidden md:block">
          <a
            href="#chat"
            className="px-5 py-2 rounded-full bg-black text-white text-sm hover:opacity-90 transition"
          >
            Start Chat
          </a>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden"
          onClick={() => setOpen(!open)}
        >
          {open ? <X size={26} /> : <Menu size={26} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div className="md:hidden bg-white border-t border-gray-200">
          <ul className="flex flex-col p-6 gap-5 text-sm font-medium">
            {links.map((link, index) => (
              <li key={index}>
                <a
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="block text-gray-700 hover:text-black"
                >
                  {link.name}
                </a>
              </li>
            ))}
            <a
              href="#chat"
              className="mt-4 text-center px-5 py-2 rounded-full bg-black text-white"
            >
              Start Chat
            </a>
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
