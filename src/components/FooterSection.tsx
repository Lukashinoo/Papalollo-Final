import { Instagram } from "lucide-react";
import ShimmerImage from "@/components/ShimmerImage";
import logoImg from "@/assets/logo.png";

const TikTokIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1v-3.5a6.37 6.37 0 00-.79-.05A6.34 6.34 0 003.15 15.2a6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.34-6.34V8.76a8.18 8.18 0 004.76 1.52v-3.4a4.85 4.85 0 01-1-.19z" />
  </svg>
);

const FooterSection = () => (
  <footer className="bg-foreground py-12 relative overflow-hidden">
    <div className="container relative z-10">
      <div className="flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-full border border-primary-foreground/20 overflow-hidden">
            <ShimmerImage 
              src={logoImg} 
              alt="Papa Lollo Logo" 
              className="h-full w-full"
            />
          </div>
          <div>
            <p className="font-display text-2xl font-bold text-primary-foreground">Papa Lollo</p>
            <p className="text-primary-foreground/50 font-body text-xs mt-0.5">Geschmack, den man sofort schmeckt!</p>
          </div>
        </div>

        <div className="flex items-center gap-5">
          <a href="tel:+4961239340889" className="text-primary-foreground/70 hover:text-primary-foreground font-body text-sm transition-colors">
            06123 9340889
          </a>
          <a href="/impressum" className="text-primary-foreground/70 hover:text-primary-foreground font-body text-sm transition-colors">
            Impressum
          </a>
          <a href="https://www.instagram.com/papalollowalluf" target="_blank" rel="noopener noreferrer" className="text-primary-foreground/70 hover:text-primary transition-colors hover:scale-110">
            <Instagram className="w-5 h-5" />
          </a>
          <a href="https://www.tiktok.com/@papalollowalluf" target="_blank" rel="noopener noreferrer" className="text-primary-foreground/70 hover:text-primary transition-colors hover:scale-110">
            <TikTokIcon className="w-5 h-5" />
          </a>
        </div>
      </div>

      <div className="border-t border-primary-foreground/10 mt-8 pt-8 text-center">
        <p className="text-primary-foreground/40 font-body text-xs">
          © {new Date().getFullYear()} Papa Lollo (zum Treppchen). Alle Rechte vorbehalten.
        </p>
      </div>
    </div>
  </footer>
);

export default FooterSection;
