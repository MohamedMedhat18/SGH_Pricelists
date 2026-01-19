import { ReactNode } from "react";
import { Header } from "./Header";

interface MainLayoutProps {
  children: ReactNode;
}

export function MainLayout({ children }: MainLayoutProps) {
  return (
    <div className="min-h-screen bg-background w-full">
      <Header />
      <main className="w-full px-4 py-6 md:px-8 md:py-10">
        {children}
      </main>
    </div>
  );
}
