import { cn } from "@/lib/utils";
import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { ThemeToggle } from "./ThemeToggle";

const navItems = [
  { name: "Home", href: "#hero" },
  { name: "About", href: "#about" },
  { name: "Skills", href: "#skills" },
  { name: "Projects", href: "#projects" },
  { name: "Contact", href: "#contact" },
  { name: "Resume", href: "#resume", isResume: true },
];

export const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    
    // Cleanup on unmount
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isMenuOpen]);

  const handleResumeClick = (e) => {
    e.preventDefault();
    // Open Google Drive view link
    window.open(
      "https://drive.google.com/file/d/15-DD5XGNXVWT3ESsKOaLsNkncHfs3Sjo/view?usp=sharing",
      "_blank"
    );

    // Trigger download
    const downloadLink = document.createElement("a");
    downloadLink.href =
      "https://drive.google.com/uc?export=download&id=15-DD5XGNXVWT3ESsKOaLsNkncHfs3Sjo";
    downloadLink.download = "Sarthak_resume.pdf";
    downloadLink.style.display = "none";
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
  };

  return (
    <>
      <nav
        className={cn(
          "w-full fixed top-0 left-0 z-50 transition-all duration-300",
          isScrolled
            ? "py-3 bg-background/80 backdrop-blur-md shadow-sm"
            : "py-5 bg-transparent"
        )}
      >
        <div className="container mx-auto flex items-center justify-between">
          {/* Logo */}
          <a
            className="text-xl font-bold text-primary flex items-center"
            href="#hero"
          >
            <span className="relative z-10">Portfolio</span>
          </a>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            {navItems.map((item, idx) =>
              item.isResume ? (
                <button
                  key={idx}
                  onClick={handleResumeClick}
                  className="text-foreground/80 hover:text-primary transition-colors duration-300"
                >
                  {item.name}
                </button>
              ) : (
                <a
                  key={idx}
                  href={item.href}
                  className="text-foreground/80 hover:text-primary transition-colors duration-300"
                >
                  {item.name}
                </a>
              )
            )}
            <ThemeToggle />
          </div>

          {/* Mobile Controls */}
          <div className="flex md:hidden items-center space-x-4">
            <button
              onClick={handleResumeClick}
              className="text-foreground/80 hover:text-primary transition-colors duration-300"
            >
              Resume
            </button>
            <ThemeToggle />
            <button
              onClick={() => setIsMenuOpen((prev) => !prev)}
              className="p-2 text-foreground relative z-[9999]"
              aria-label={isMenuOpen ? "Close Menu" : "Open Menu"}
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Full Screen Menu - Rendered outside navbar */}
      {isMenuOpen && (
        <div className="fixed inset-0 z-[9999] md:hidden">
          {/* Full Screen Overlay */}
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-md"
            onClick={() => setIsMenuOpen(false)}
          />
          
          {/* Menu Content */}
          <div className="relative h-full w-full flex flex-col items-center justify-center bg-background/95 backdrop-blur-lg">
            {/* Close Button */}
            <div className="absolute top-6 right-6 z-[10000]">
              <button
                onClick={() => setIsMenuOpen(false)}
                className="p-3 text-foreground hover:text-primary transition-colors duration-300 rounded-full hover:bg-primary/10"
                aria-label="Close Menu"
              >
                <X size={28} />
              </button>
            </div>

            {/* Menu Items - Centered */}
            <div className="flex flex-col space-y-8 text-2xl items-center relative z-[10000]">
              {navItems
                .filter((item) => !item.isResume)
                .map((item, idx) => (
                  <a
                    key={idx}
                    href={item.href}
                    className="text-foreground/80 hover:text-primary transition-all duration-300 py-4 px-8 rounded-xl hover:bg-primary/10 text-center font-medium hover:scale-105"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.name}
                  </a>
                ))}
            </div>

            
          </div>
        </div>
      )}
    </>
  );
};
