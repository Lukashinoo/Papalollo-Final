import { useState, useRef, useCallback } from "react";
import AnimatedSection from "@/components/AnimatedSection";
import ShimmerImage from "@/components/ShimmerImage";
import Shimmer from "@/components/Shimmer";
import pizzaImg from "@/assets/pizza-real.jpg";
import pizza2Img from "@/assets/pizza2.jpg";
import pizza3Img from "@/assets/pizza3.jpg";
import pizza4Img from "@/assets/pizza4.jpg";
import pizza5Img from "@/assets/pizza5.jpg";
import pizza6Img from "@/assets/pizza6.jpg";
import pastaImg from "@/assets/pasta-real.jpg";
import pasta2Img from "@/assets/pasta2.jpg";
import tiramisuImg from "@/assets/tiramisu.jpg";
import oreoTiramisuImg from "@/assets/oreo-tiramisu.jpg";
import saladImg from "@/assets/salad.jpg";
import salad2Img from "@/assets/salad2.jpg";
import cannelloniImg from "@/assets/cannelloni.jpg";

type MenuItem = { name: string; desc: string; price: string; price2?: string };

const menuData: Record<string, { note?: string; items: MenuItem[] }> = {
  Pizza: {
    note: "Alle Pizzen mit Käse & Tomatensoße · Extras: 28cm +1,00€ | 36cm +1,50€ je Zutat",
    items: [
      { name: "Pizza Margherita", desc: "Tomatensoße, Käse", price: "9,50", price2: "14,00" },
      { name: "Pizza Salami", desc: "Salami (Rind)", price: "10,00", price2: "15,00" },
      { name: "Pizza Tonno", desc: "Thunfisch, Zwiebeln", price: "10,50", price2: "15,50" },
      { name: "Pizza Gude", desc: "Peperoniwurst (Rind), milde Peperoni", price: "10,50", price2: "15,50" },
      { name: "Pizza Speciale", desc: "Schinken (Pute), Salami (Rind), Pilze", price: "11,00", price2: "16,00" },
      { name: "Pizza Rheinliebe", desc: "Schinken (Pute), Zwiebeln, Pilze, Oliven", price: "11,00", price2: "16,50" },
      { name: "Pizza Vegetaria", desc: "Pilze, Knoblauch, Paprika, Spinat, Brokkoli", price: "11,00", price2: "16,50" },
      { name: "Pizza Link", desc: "Salami (Rind), Spinat, Ei, Pilze, Knoblauch", price: "10,50", price2: "15,50" },
      { name: "Pizza Sorrentina", desc: "Tomatenscheiben, Mozzarella, Basilikum", price: "10,50", price2: "15,50" },
      { name: "Pizza Funky", desc: "Pilze, Knoblauch, Petersilie", price: "10,50", price2: "15,50" },
      { name: "Pizza Diavolo (scharf)", desc: "Peperoniwurst (Rind), Zwiebeln, milde Peperoni, Oliven, Knoblauch", price: "11,50", price2: "16,50" },
      { name: "Pizza Eltville", desc: "Hollandaiseboden, Hähnchen, Brokkoli, Mais, rote Zwiebeln", price: "13,00", price2: "17,50" },
    ],
  },
  Pasta: {
    note: "Alle Pastagerichte mit Parmesan · Mit Käse überbacken +3€",
    items: [
      { name: "Spaghetti Gamberetti", desc: "Garnelen, Cherrytomaten, Petersilie, Tomatensahnesauce", price: "15,50" },
      { name: "Spaghetti Carbonara", desc: "Ei, Schinken (Pute), Sahnesauce", price: "10,50" },
      { name: "Spaghetti Bolognese", desc: "Hausgemachte Bolognesesauce (Rind)", price: "11,00" },
      { name: "Penne Rocky", desc: "Sahnesauce, Pilze, Spinat, Knoblauch", price: "10,00" },
      { name: "Penne Nonna", desc: "Thunfisch, Tomatensauce, Oliven, Knoblauch, Petersilie", price: "11,50" },
      { name: "Penne Arrabbiata (scharf)", desc: "Tomatensauce, Zwiebeln, Knoblauch, milde Peperoni, Chili", price: "10,00" },
      { name: "Tagliatelle alla Samira", desc: "Tomatensahnesauce, Mozzarella, Basilikum", price: "10,00" },
      { name: "Tagliatelle Chicken Alfredo", desc: "Hähnchen, Sahne, Butter, Knoblauch, Petersilie, Parmesan", price: "12,50" },
      { name: "Tagliatelle Jäger", desc: "Hähnchen, Rahmsauce, Pilze, Knoblauch, Petersilie", price: "12,00" },
    ],
  },
  "Aus dem Ofen": {
    note: "Mit Käse überbacken",
    items: [
      { name: "Papas Lasagne (Hausgemacht)", desc: "Bolognese, Pastaschichten, Béchamelsauce", price: "10,50" },
      { name: "Papas Cannelloni (Hausgemacht)", desc: "Ricotta, Spinat, Tomatensahnesauce", price: "10,00" },
    ],
  },
  Salate: {
    note: "Mit Dressing nach Wahl: Thousand Island | Joghurt | Essig Öl",
    items: [
      { name: "Cäsar Salat", desc: "Römersalat, Hähnchen, Cherrytomaten, Gurken, Croutons, Parmesan", price: "13,00" },
      { name: "Nizza Salat", desc: "Mix-Salat, Thunfisch, Cherrytomaten, Gurken, Mais, Zwiebeln", price: "11,00" },
      { name: "Chef Salat", desc: "Mix-Salat, Gurken, Mais, Paprika, Karotten, Schinken (Pute), Käse", price: "10,50" },
      { name: "Gemischter Salat", desc: "Mix-Salat, Paprika, Cherrytomaten, Gurken, Mais, Zwiebeln, Karotten", price: "10,00" },
    ],
  },
  Kleinigkeiten: {
    items: [
      { name: "Chicken Nuggets", desc: "12 Stück mit Süß-Sauer Soße", price: "8,50" },
      { name: "Pommes Frites", desc: "mit Ketchup oder Mayo", price: "5,00" },
    ],
  },
  Desserts: {
    items: [
      { name: "Oreo Tiramisu (Hausgemacht)", desc: "", price: "6,50" },
      { name: "Schoko Soufflé", desc: "", price: "5,50" },
    ],
  },
  Getränke: {
    note: "Alle Getränke 1L · Nur für Lieferung und Abholung",
    items: [
      { name: "Cola", desc: "", price: "4,50" },
      { name: "Cola Zero", desc: "", price: "4,50" },
      { name: "Fanta", desc: "", price: "4,50" },
      { name: "Sprite", desc: "", price: "4,50" },
      { name: "Mezzo Mix", desc: "", price: "4,50" },
      { name: "Eistee Pfirsich", desc: "", price: "4,00" },
    ],
  },
};

const categoryImages: Record<string, string[]> = {
  Pizza: [pizzaImg, pizza2Img, pizza3Img, pizza4Img, pizza5Img, pizza6Img],
  Pasta: [pastaImg, pasta2Img],
  "Aus dem Ofen": [cannelloniImg],
  Salate: [saladImg, salad2Img],
  Desserts: [tiramisuImg, oreoTiramisuImg],
};

const categories = Object.keys(menuData);

const MenuSection = () => {
  const [active, setActive] = useState("Pizza");
  const [fadeKey, setFadeKey] = useState(0);
  const menuRef = useRef<HTMLDivElement>(null);
  const current = menuData[active];
  const isPizza = active === "Pizza";
  const images = categoryImages[active];

  const switchCategory = useCallback((cat: string) => {
    if (cat === active) return;
    setFadeKey((k) => k + 1);
    setActive(cat);
    // Keep scroll position stable on the category buttons
    requestAnimationFrame(() => {
      menuRef.current?.scrollIntoView({ behavior: "smooth", block: "nearest" });
    });
  }, [active]);

  return (
    <section id="menu" className="py-20 md:py-28 bg-cream relative overflow-hidden">
      <div className="container relative z-10">
        <AnimatedSection>
          <div className="text-center mb-10">
            <p className="text-primary font-body text-sm uppercase tracking-[0.2em] mb-3">Unsere Küche</p>
            <h2 className="font-display text-5xl md:text-6xl font-bold text-foreground mb-4 italic tracking-tight">Speisekarte</h2>
            <p className="text-muted-foreground font-body max-w-lg mx-auto">
              Entdecken Sie unsere Auswahl an hausgemachten Gerichten – von klassischen Pizzen bis zu herzhaften Salaten.
            </p>
          </div>
        </AnimatedSection>

        <div ref={menuRef}>
          <AnimatedSection delay={200}>
            <div className="flex flex-wrap justify-center gap-2 mb-8">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => switchCategory(cat)}
                  className={`px-3 py-1.5 md:px-4 md:py-2 rounded-full text-xs md:text-sm font-body font-medium transition-all duration-300 ${
                    active === cat
                      ? "bg-primary text-primary-foreground scale-105 shadow-md"
                      : "bg-background text-muted-foreground hover:text-foreground border border-border hover:border-primary/30 hover:shadow-sm hover:-translate-y-0.5"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </AnimatedSection>
        </div>

        {/* Images with smooth transition */}
        <div
          className="transition-all duration-500 ease-in-out overflow-hidden"
          style={{
            maxHeight: images && images.length > 0 ? "400px" : "0px",
            opacity: images && images.length > 0 ? 1 : 0,
            marginBottom: images && images.length > 0 ? "2rem" : "0px",
          }}
        >
          {images && images.length > 0 && (
            <div
              key={`imgs-${fadeKey}`}
              className={`max-w-4xl mx-auto grid gap-3 animate-fade-in ${
                images.length === 1 ? "grid-cols-1 max-w-3xl" :
                images.length === 2 ? "grid-cols-2" :
                "grid-cols-2 md:grid-cols-3"
              }`}
            >
              {images.slice(0, 3).map((img, i) => (
                <div key={`${active}-${i}`} className="rounded-xl overflow-hidden shadow-lg">
                  <ShimmerImage src={img} alt={`${active} ${i + 1}`} className="h-40 md:h-56" />
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Menu content with fade transition */}
        <div key={`content-${fadeKey}`} className="animate-fade-in">
          {current.note && (
            <div className="flex justify-center mb-6">
              <Shimmer duration={1000} className="w-fit rounded-md">
                <p className="text-center text-xs md:text-sm text-muted-foreground font-body italic px-2 py-1">{current.note}</p>
              </Shimmer>
            </div>
          )}

          {isPizza && (
            <div className="flex justify-end gap-4 mb-2 px-4 max-w-3xl mx-auto">
              <Shimmer duration={1000} className="w-fit rounded-md">
                <span className="text-xs font-body font-semibold text-muted-foreground w-14 md:w-16 text-right block px-1 py-0.5">28cm</span>
              </Shimmer>
              <Shimmer duration={1000} className="w-fit rounded-md">
                <span className="text-xs font-body font-semibold text-muted-foreground w-14 md:w-16 text-right block px-1 py-0.5">36cm</span>
              </Shimmer>
            </div>
          )}

          <div className="max-w-3xl mx-auto space-y-0.5">
            {current.items.map((item, i) => (
              <AnimatedSection key={item.name} delay={100 + i * 50}>
                <Shimmer duration={800 + i * 100}>
                  <div className="flex items-baseline justify-between py-3 px-3 md:px-4 rounded-lg hover:bg-background transition-all duration-300 hover:shadow-md hover:-translate-y-0.5 group border border-transparent hover:border-border/50">
                    <div className="flex-1 min-w-0 mr-3">
                      <h3 className="font-body font-semibold text-foreground text-sm md:text-base group-hover:text-primary transition-colors">{item.name}</h3>
                      {item.desc && <p className="text-xs text-muted-foreground font-body mt-0.5">{item.desc}</p>}
                    </div>
                    <div className="flex gap-3 md:gap-4 shrink-0">
                      <span className="font-body font-semibold text-primary text-sm w-14 md:w-16 text-right">{item.price} €</span>
                      {isPizza && item.price2 && (
                        <span className="font-body font-semibold text-primary/70 text-sm w-14 md:w-16 text-right">{item.price2} €</span>
                      )}
                    </div>
                  </div>
                </Shimmer>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default MenuSection;
