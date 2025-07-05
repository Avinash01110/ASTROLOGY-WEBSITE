"use client";

import React, { useState, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { Moon, Sun } from "lucide-react";
import AstrologerSidebar from "@/components/astrologer/Sidebar";

const AstrologerLayout = ({ children }: { children: React.ReactNode }) => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [checkingAuth, setCheckingAuth] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  const isAuthRoute =
    pathname?.includes("/astrologer/auth") ||
    pathname?.includes("/astrologer/register") ||
    pathname?.includes("/astrologer/reset-password") ||
    pathname?.includes("/astrologer/forgot-password");

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (
      savedTheme === "dark" ||
      (!savedTheme && window.matchMedia("(prefers-color-scheme: dark)").matches)
    ) {
      setIsDarkMode(true);
      document.documentElement.classList.add("dark");
    } else {
      setIsDarkMode(false);
      document.documentElement.classList.remove("dark");
    }
  }, []);

  // Auth check for dashboard routes
  useEffect(() => {
    if (!isAuthRoute) {
      setCheckingAuth(true);
      const token = localStorage.getItem("astrologerToken");
      if (!token) {
        router.replace("/astrologer/auth");
      }
      setCheckingAuth(false);
    }
  }, [pathname, isAuthRoute, router]);

  const toggleDarkMode = () => {
    const newMode = !isDarkMode;
    setIsDarkMode(newMode);
    if (newMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  };

  // 🔁 If it's an auth-related page, skip layout
  if (isAuthRoute) {
    return <main className="min-h-screen">{children}</main>;
  }

  // Show loading spinner while checking auth
  if (checkingAuth) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 dark:border-gray-100" />
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-white dark:bg-black text-gray-900 dark:text-gray-100">
      {/* Sidebar */}
      <AstrologerSidebar />
      {/* Main Content Area */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="bg-amber-new dark:bg-black border-b border-gray-200 dark:border-gray-700 px-4 py-3 flex justify-between items-center">
          <div className="text-lg font-semibold ml-10 md:ml-32 w-full text-center">
            Astrologer Dashboard
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={toggleDarkMode}
              className="hover:bg-gray-100 dark:hover:bg-gray-700 p-2 rounded-full"
              title="Toggle Theme"
            >
              {isDarkMode ? (
                <Sun className="text-gray-600 dark:text-gray-300" size={20} />
              ) : (
                <Moon className="text-gray-600" size={20} />
              )}
            </button>

            <button
              onClick={() => {
                localStorage.removeItem("astrologerToken");
                router.push("/astrologer/auth");
              }}
              className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-md text-sm"
            >
              Logout
            </button>
          </div>
        </header>
        {/* Page Content */}
        <main className="md:pl-72 flex-1 overflow-y-auto bg-amber-50 dark:bg-midnight-black p-4 sm:p-6">
          {children}
        </main>
      </div>
    </div>
  );
};

export default AstrologerLayout;
