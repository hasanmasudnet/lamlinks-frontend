import { Menu, Bell, User } from "lucide-react";
import logoIcon from "../assets/images/lamlinks-logo-icon.png";

interface HeaderProps {
  onToggleSidebar: () => void;
}

export function Header({ onToggleSidebar }: HeaderProps) {
  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6"
      style={{
        height: "var(--header-height)",
        backgroundColor: "var(--color-primary)",
        color: "var(--color-text-on-primary)",
      }}
    >
      <div className="flex items-center gap-4">
        <button
          onClick={onToggleSidebar}
          className="lg:hidden p-2 rounded hover:bg-white/10 transition-colors"
          aria-label="Toggle sidebar"
        >
          <Menu className="w-5 h-5" />
        </button>
        <div className="flex items-center gap-2">
          <a href="/" className="flex items-center">
            <img src={logoIcon} alt="" />
            <h2
              className="inline-block font-medium leading-px"
              style={{
                fontFamily: "var(--font-montserrat)",
                fontSize: "28px",
                lineHeight: "1.2",
                letterSpacing: "1px",
                paddingLeft: "10px",
              }}
            >
              Lamlinks
            </h2>
          </a>
        </div>
      </div>

      <nav className="hidden md:flex items-center gap-6">
        <a
          href="#"
          className="text-sm font-medium hover:opacity-80 transition-opacity"
        >
          Dashboard
        </a>
        <a
          href="#"
          className="text-sm font-medium hover:opacity-80 transition-opacity"
        >
          Online Library
        </a>
        <a
          href="#"
          className="text-sm font-medium hover:opacity-80 transition-opacity"
        >
          Quoting
        </a>
        <a
          href="#"
          className="text-sm font-medium hover:opacity-80 transition-opacity"
        >
          Services
        </a>
      </nav>

      <div className="flex items-center gap-3">
        <button
          className="p-2 rounded hover:bg-white/10 transition-colors relative"
          aria-label="Notifications"
        >
          <Bell className="w-5 h-5" />
          <span
            className="absolute top-1 right-1 w-2 h-2 rounded-full"
            style={{ backgroundColor: "var(--color-accent)" }}
          ></span>
        </button>
        <button
          className="flex items-center gap-2 px-4 py-2 rounded hover:bg-white/10 transition-colors"
          style={{
            height: "40px",
            borderRadius: "var(--radius-md)",
          }}
        >
          <User className="w-5 h-5" />
          <span className="hidden sm:inline text-sm font-medium">Account</span>
        </button>
      </div>
    </header>
  );
}
