import { cn } from "@/lib/utils";
import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { ThemeToggle } from "./ThemeToggle"; // adjust path if needed

const navItems = [
  { name: "Home", href: "#hero" },
  { name: "About", href: "#about" },
  { name: "Skills", href: "#skills" },
  { name: "Projects", href: "#projects" },
  { name: "Contact", href: "#contact" },
  { name: "Resume", href: "#resume", isResume: true }, // ✅ Added Resume item
];

export const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // ✅ Resume handler
  const handleResumeClick = (e) => {
    e.preventDefault();

    // Open Google Drive view link
    window.open(
      "https://drive.google.com/file/d/1jGwK09Z6kVYJa27IBuIk-qygzKv5Xkp7/view?usp=sharing",
      "_blank"
    );

    // Trigger download
    const downloadLink = document.createElement("a");
    downloadLink.href =
      "https://drive.google.com/uc?export=download&id=1jGwK09Z6kVYJa27IBuIk-qygzKv5Xkp7";
    downloadLink.download = "Sarthak_resume.pdf";
    downloadLink.style.display = "none";
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
  };

  return (
    <nav
      className={cn(
        "w-full z-40 transition-all duration-300",
        isScrolled ? "py-3 bg-background/80 backdrop-blur-md shadow-xs" : "py-5"
      )}
    >
      <div className="container flex items-center justify-between">
        {/* Logo */}
        <a
          className="text-xl font-bold text-primary flex items-center"
          href="#hero"
        >
          <span className="relative z-10">
            <span className="text-glow text-foreground"></span> Portfolio
          </span>
        </a>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center space-x-6">
          {navItems.map((item, key) =>
            item.isResume ? (
              <button
                key={key}
                onClick={handleResumeClick}
                className="text-foreground/80 hover:text-primary transition-colors duration-300"
              >
                {item.name}
              </button>
            ) : (
              <a
                key={key}
                href={item.href}
                className="text-foreground/80 hover:text-primary transition-colors duration-300"
              >
                {item.name}
              </a>
            )
          )}
          {/* Theme Toggle Button */}
          <ThemeToggle />
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsMenuOpen((prev) => !prev)}
          className="md:hidden p-2 text-foreground z-50"
          aria-label={isMenuOpen ? "Close Menu" : "Open Menu"}
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        {/* Mobile Nav */}
        <div
          className={cn(
            "fixed inset-0 bg-background/95 backdrop-blur-md z-40 flex flex-col items-center justify-center",
            "transition-all duration-300 md:hidden",
            isMenuOpen
              ? "opacity-100 pointer-events-auto"
              : "opacity-0 pointer-events-none"
          )}
        >
          <div className="flex flex-col space-y-8 text-xl items-center">
            {navItems.map((item, key) =>
              item.isResume ? (
                <button
                  key={key}
                  onClick={(e) => {
                    handleResumeClick(e);
                    setIsMenuOpen(false);
                  }}
                  className="text-foreground/80 hover:text-primary transition-colors duration-300"
                >
                  {item.name}
                </button>
              ) : (
                <a
                  key={key}
                  href={item.href}
                  className="text-foreground/80 hover:text-primary transition-colors duration-300"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </a>
              )
            )}
            {/* Theme Toggle in Mobile Menu */}
            <ThemeToggle />
          </div>
        </div>
      </div>
    </nav>
  );
};
