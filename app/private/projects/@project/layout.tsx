"use client";

import { AnimatePresence, motion } from "framer-motion";
import { usePathname, useRouter } from "next/navigation";
import React, { useEffect } from "react";

function ProjectDetailsPageLayout({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = React.useState(true);
  const route = useRouter();
  const pathname = usePathname();
  const ref = React.useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (pathname === "/projects/list") {
      setIsOpen(false);
    } else {
      setIsOpen(true);
    }
  }, [ref, route, pathname]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ x: "100%", right: 0 }}
          animate={{ x: 0, right: 0 }}
          exit={{ x: "100%", right: 0 }}
          transition={{ ease: "linear", duration: 0.2 }}
          ref={ref}
          className="fixed right-0 top-0 z-10 h-screen w-full max-w-[600px] border-l border-base-400 bg-base-500"
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default ProjectDetailsPageLayout;
