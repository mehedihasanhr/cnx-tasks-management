"use client";

import { AnimatePresence, motion } from "framer-motion";
import { usePathname, useRouter } from "next/navigation";
import React, { useEffect } from "react";

function TaskDetailsPageLayout({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = React.useState(true);
  const route = useRouter();
  const pathname = usePathname();
  const ref = React.useRef<HTMLDivElement>(null);

  // redirect to back
  const back = () => {
    setIsOpen(false);
    const timer = setTimeout(() => {
      route.back();
      clearTimeout(timer);
    }, 400);
  };

  useEffect(() => {
    setIsOpen(true);

    function handleOutsideClick(event: MouseEvent) {
      if (ref && ref.current && !ref.current.contains(event.target as Node)) {
        back();
      }
    }
    window.addEventListener("mousedown", handleOutsideClick);
    return () => window.removeEventListener("mousedown", handleOutsideClick);
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
          className="fixed right-0 top-0 h-screen w-full max-w-[600px] border-l border-base-400 bg-base-500"
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default TaskDetailsPageLayout;
