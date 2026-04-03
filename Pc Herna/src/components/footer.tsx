export default function Footer() {
  return (
    <footer className="border-t border-card-border py-8">
      <div className="mx-auto max-w-7xl px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        <img src="/elite-arena-logo.png" alt="Elite Arena" className="h-14 w-auto" />
        <p className="text-xs text-zinc-600 uppercase tracking-wider">
          &copy; {new Date().getFullYear()} Elite Arena. Všechna práva
          vyhrazena.
        </p>
      </div>
    </footer>
  );
}
