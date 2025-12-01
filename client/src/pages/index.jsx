import Hero from "@/components/Hero";

export default function Layout({ children }) {
  return (
    <div className="-mx-4 md:mx-0">
      <Hero/>
      <main className="flex-1 container mx-auto px-4 py-6">
        {children}
      </main>
    </div>
  );
}