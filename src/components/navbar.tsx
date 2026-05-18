// "use client";

// import Link from "next/link";
// import { useState } from "react";
// import { Menu } from "lucide-react";
// import { Button } from "@/components/ui/button";
// import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
// import { ModeToggle } from "./theme-toggle-button";
// import { Logo } from "./logo";
// import { motion } from "motion/react";
// import { useIsMobile } from "@/hooks/use-mobile";

// const navigation = [
//   { name: "About me", href: "/" },
//   { name: "Projects", href: "#projects" },
//   { name: "Experience", href: "#experience" },
//   { name: "Contact", href: "#contact" },
// ];

// // The wrapper morphs from full-screen centered → header strip at top
// const WRAPPER_VARIANTS = {
//   center: {
//     position: "fixed" as const,
//     top: 0,
//     left: 0,
//     right: 0,
//     bottom: 0,
//     height: "100%",
//   },
//   topLeft: {
//     position: "sticky" as const,
//     top: 0,
//     left: 0,
//     right: 0,
//     bottom: "auto",
//     height: "auto",
//   },
// };

// export default function Navbar({ transition }: { transition: boolean }) {
//   const [isOpen, setIsOpen] = useState(false);
//   const isMobile = useIsMobile();

//   return (
//     <motion.div
//       variants={WRAPPER_VARIANTS}
//       initial="center"
//       animate={transition ? "topLeft" : "center"}
//       transition={{ type: "spring", stiffness: 200, damping: 30 }}
//       className="z-50 w-full"
//     >
//       {/* Background: only visible after transition */}
//       <motion.div
//         initial={{ opacity: 0 }}
//         animate={{ opacity: transition ? 1 : 0 }}
//         transition={{ duration: 0.3, delay: transition ? 0.1 : 0 }}
//         className="absolute inset-0 border-b border-border/40 bg-background/95 backdrop-blur-md supports-backdrop-filter:bg-background/60"
//         style={{ pointerEvents: "none" }}
//       />

//       <div className="relative max-w-7xl mx-auto w-full h-full">
//         {/* Logo: morphs from center to top-left */}
//         {transition ? (
//           <motion.div
//             layoutId="navbar-logo"
//             className="absolute z-10 left-5"
//             animate={{ top: 12 }}
//             transition={{ type: "spring", stiffness: 200, damping: 30 }}
//           >
//             <Link href="/">
//               <Logo size="sm" />
//             </Link>
//           </motion.div>
//         ) : (
//           <motion.div
//             layoutId="navbar-logo"
//             className="absolute z-10 left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
//           >
//             <Logo size={isMobile ? "lg" : "xl"} />
//           </motion.div>
//         )}

//         {/* Nav links + controls: slide in from the right */}
//         <motion.div
//           initial={{ top: 16, right: -60, opacity: 0 }}
//           animate={
//             transition
//               ? { top: 16, right: 16, opacity: 1 }
//               : { top: 16, right: -60, opacity: 0 }
//           }
//           transition={{ type: "spring", stiffness: 200, damping: 30 }}
//           className="absolute z-10 flex items-center gap-x-4"
//         >
//           {/* Desktop nav links */}
//           <nav className="hidden md:flex items-center space-x-6">
//             {navigation.map((link) => (
//               <Link
//                 key={link.name}
//                 href={link.href}
//                 className="text-foreground/80 hover:text-primary transition-colors font-medium text-sm hover:underline"
//               >
//                 {link.name}
//               </Link>
//             ))}
//           </nav>

//           {/* Mobile drawer */}
//           <Sheet open={isOpen} onOpenChange={setIsOpen}>
//             <SheetTrigger asChild>
//               <Button
//                 variant="ghost"
//                 className="mr-2 px-0 text-base hover:bg-transparent focus-visible:bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 md:hidden"
//               >
//                 <Menu className="h-6 w-6" />
//                 <span className="sr-only">Toggle Menu</span>
//               </Button>
//             </SheetTrigger>
//             <SheetContent side="right" className="pr-0">
//               <Link
//                 href="/"
//                 className="flex items-center space-x-2 mb-8 pl-4"
//                 onClick={() => setIsOpen(false)}
//               >
//                 <Logo size="xs" />
//               </Link>
//               <nav className="flex flex-col space-y-4 pl-4">
//                 {navigation.map((item) => (
//                   <Link
//                     key={item.name}
//                     href={item.href}
//                     onClick={() => setIsOpen(false)}
//                     className="text-lg font-medium transition-colors hover:text-primary"
//                   >
//                     {item.name}
//                   </Link>
//                 ))}
//               </nav>
//             </SheetContent>
//           </Sheet>

//           {/* Theme toggle */}
//           <ModeToggle />
//         </motion.div>

//         {/* Height placeholder so sticky layout reserves the header height after transition */}
//         {transition && <div className="h-16" />}
//       </div>
//     </motion.div>
//   );
// }
"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { ModeToggle } from "./theme-toggle-button";
import { Logo } from "./logo";
import { motion } from "motion/react";
import { useIsMobile } from "@/hooks/use-mobile";

const navigation = [
  { name: "About me", href: "/" },
  { name: "Projects", href: "#projects" },
  { name: "Experience", href: "#experience" },
  { name: "Contact", href: "#contact" },
];

const NAV_CONTAINER_VARIANTS = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.07,
      delayChildren: 0.15,
    },
  },
  exit: {
    transition: {
      staggerChildren: 0.04,
      staggerDirection: -1,
    },
  },
};

const NAV_ITEM_VARIANTS = {
  hidden: { opacity: 0, y: -8 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring" as const, stiffness: 300, damping: 24 },
  },
  exit: {
    opacity: 0,
    y: -6,
    transition: { duration: 0.15 },
  },
};

// The wrapper morphs from full-screen centered → header strip at top
const WRAPPER_VARIANTS = {
  center: {
    position: "fixed" as const,
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    height: "100%",
  },
  topLeft: {
    position: "sticky" as const,
    top: 0,
    left: 0,
    right: 0,
    bottom: "auto",
    height: "auto",
  },
};

export default function Navbar({ transition }: { transition: boolean }) {
  const [isOpen, setIsOpen] = useState(false);
  const isMobile = useIsMobile();

  return (
    <motion.div
      variants={WRAPPER_VARIANTS}
      initial="center"
      animate={transition ? "topLeft" : "center"}
      transition={{ type: "spring", stiffness: 200, damping: 30 }}
      className="z-50 w-full"
    >
      {/* Background: only visible after transition */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: transition ? 1 : 0 }}
        transition={{ duration: 0.3, delay: transition ? 0.1 : 0 }}
        className="absolute inset-0 border-b border-border/40 bg-background/95 backdrop-blur-md supports-backdrop-filter:bg-background/60"
        style={{ pointerEvents: "none" }}
      />

      <div className="relative max-w-7xl mx-auto w-full h-full">
        {/* Logo: morphs from center to top-left */}
        {transition ? (
          <motion.div
            layoutId="navbar-logo"
            className="absolute z-10 left-5"
            animate={{ top: 12 }}
            transition={{ type: "spring", stiffness: 200, damping: 30 }}
          >
            <Link href="/">
              <Logo size="sm" />
            </Link>
          </motion.div>
        ) : (
          <motion.div
            layoutId="navbar-logo"
            className="absolute z-10 left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
          >
            <Logo size={isMobile ? "lg" : "xl"} />
          </motion.div>
        )}

        {/* Nav links + controls: slide in from the right */}
        <motion.div
          initial={{ top: 16, right: -60, opacity: 0 }}
          animate={
            transition
              ? { top: 16, right: 16, opacity: 1 }
              : { top: 16, right: -60, opacity: 0 }
          }
          transition={{ type: "spring", stiffness: 200, damping: 30 }}
          className="absolute z-10 flex items-center gap-x-4"
        >
          {/* Desktop nav links */}
          <motion.nav
            variants={NAV_CONTAINER_VARIANTS}
            initial="hidden"
            animate={transition ? "visible" : "exit"}
            className="hidden md:flex items-center space-x-6"
          >
            {navigation.map((link) => (
              <motion.div key={link.name} variants={NAV_ITEM_VARIANTS}>
                <Link
                  href={link.href}
                  className="text-foreground/80 hover:text-primary transition-colors font-medium text-sm hover:underline"
                >
                  {link.name}
                </Link>
              </motion.div>
            ))}
          </motion.nav>

          {/* Mobile drawer */}
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                className="mr-2 px-0 text-base hover:bg-transparent focus-visible:bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 md:hidden"
              >
                <Menu className="h-6 w-6" />
                <span className="sr-only">Toggle Menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="pr-0">
              <Link
                href="/"
                className="flex items-center space-x-2 mb-8 pl-4"
                onClick={() => setIsOpen(false)}
              >
                <Logo size="xs" />
              </Link>
              <nav className="flex flex-col space-y-4 pl-4">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    onClick={() => setIsOpen(false)}
                    className="text-lg font-medium transition-colors hover:text-primary"
                  >
                    {item.name}
                  </Link>
                ))}
              </nav>
            </SheetContent>
          </Sheet>

          {/* Theme toggle */}
          <motion.div
            variants={NAV_ITEM_VARIANTS}
            initial="hidden"
            animate={transition ? "visible" : "exit"}
            transition={{
              delay: transition ? navigation.length * 0.07 + 0.15 : 0,
            }}
          >
            <ModeToggle />
          </motion.div>
        </motion.div>

        {/* Height placeholder so sticky layout reserves the header height after transition */}
        {transition && <div className="h-16" />}
      </div>
    </motion.div>
  );
}
