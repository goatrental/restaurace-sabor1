import Image from "next/image";

export default function Footer() {
  return (
    <footer className="bg-primary text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <Image
                src="/logo.jpeg"
                alt="Elite Vet logo"
                width={45}
                height={45}
                className="rounded-lg"
              />
              <span className="text-xl font-bold">
                Elite <span className="text-accent">Vet</span>
              </span>
            </div>
            <p className="text-white/60 max-w-sm leading-relaxed">
              Veterinární klinika s odbornou a laskavou péčí o vaše domácí mazlíčky.
              Vaše zvířata jsou u nás v těch nejlepších rukou.
            </p>
          </div>

          {/* Quick links */}
          <div>
            <h3 className="font-semibold mb-4 text-white/90">Navigace</h3>
            <div className="space-y-3">
              {[
                { href: "#sluzby", label: "Služby" },
                { href: "#o-nas", label: "O nás" },
                { href: "#recenze", label: "Recenze" },
                { href: "#kontakt", label: "Kontakt" },
                { href: "#kariera", label: "Kariéra" },
              ].map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="block text-white/50 hover:text-accent transition-colors text-sm"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-semibold mb-4 text-white/90">Kontakt</h3>
            <div className="space-y-3 text-sm text-white/50">
              <p>Hybešova 167/18, Rybáře</p>
              <p>360 05 Karlovy Vary</p>
              <a
                href="tel:+420774633950"
                className="block hover:text-accent transition-colors"
              >
                +420 774 633 950
              </a>
              <a
                href="mailto:veterinaKV@seznam.cz"
                className="block hover:text-accent transition-colors"
              >
                veterinaKV@seznam.cz
              </a>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-12 pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-white/40 text-sm">
            &copy; {new Date().getFullYear()} Elite Vet. Všechna práva vyhrazena.
          </p>
          <div className="flex gap-4">
            <a href="#" className="text-white/40 hover:text-white transition-colors text-sm">
              Ochrana osobních údajů
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
