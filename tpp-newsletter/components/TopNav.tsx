import TPP_SVG from "@/public/images/TPP_SVG_RESPONSIVE.svg";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import profilePicTest from "@/public/images/ProfilePicTest.png";
import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

function TopNav() {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement | null>(null);

  const isLinkActive = (href: string) => {
    return pathname === href ? "font-bold" : "";
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        menuRef.current &&
        !(menuRef.current as HTMLDivElement).contains(event.target as Node)
      ) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="px-4 md:px-16 flex justify-between w-full items-center py-4 bg-tppBackground text-tppBlack">
      <div className="flex items-center">
        <Link href="/sandbox">
          <TPP_SVG width={45} height={45} className="text-tppBlack" />
        </Link>
      </div>
      <div className="md:hidden">
        <button onClick={toggleMenu} className="text-tppBlack">
          ☰
        </button>
      </div>
      <div className="hidden md:flex items-center space-x-6">
        {/* Desktop menu items */}
        <Link href="/browse-patterns">
          <h1
            className={`text-tppBlack hover:font-bold ${isLinkActive(
              "/browse-patterns"
            )} min-w-[80px]`}
          >
            Patterns
          </h1>
        </Link>
        <Link href="/seller-dashboard">
          <h1
            className={`text-tppBlack hover:font-bold ${isLinkActive(
              "/seller-dashboard"
            )} min-w-[50px]`}
          >
            Sell
          </h1>
        </Link>
        <h1 className="text-tppBlack">
          Pattern&apos;s Points:{" "}
          <span className="text-tppPink font-extrabold">15</span>
        </h1>
        <Image
          src={profilePicTest}
          alt="Profile Picture"
          className="w-10 h-10 rounded-full"
        />
      </div>
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            ref={menuRef}
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="fixed bottom-0 left-0 right-0 bg-tppBackground border-t border-tppBlack p-4 md:hidden"
          >
            <div className="flex flex-col items-end">
              <div className="mb-4">
                <Image
                  src={profilePicTest}
                  alt="Profile Picture"
                  className="w-12 h-12 rounded-full"
                />
              </div>
              <Link href="/browse-patterns" className="w-full text-right">
                <h1
                  className={`text-tppBlack hover:font-bold ${isLinkActive(
                    "/browse-patterns"
                  )} py-2`}
                >
                  Patterns
                </h1>
              </Link>
              <Link href="/seller-dashboard" className="w-full text-right">
                <h1
                  className={`text-tppBlack hover:font-bold ${isLinkActive(
                    "/seller-dashboard"
                  )} py-2`}
                >
                  Sell
                </h1>
              </Link>
              <h1 className="text-tppBlack py-2 text-right">
                Pattern&apos;s Points:{" "}
                <span className="text-tppPink font-extrabold">15</span>
              </h1>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default TopNav;
