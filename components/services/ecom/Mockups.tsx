import { servicePageExtras } from "@/content";
import s from "./ecom.module.css";

const copy = servicePageExtras.ecommerce.copy.channels;

const bar = (h: number, w: string, bg: string) => <span className={s.bar} style={{ height: h, width: w, background: bg }} />;

/** Light storefront mockup (Shopify / WooCommerce panels). Decorative. */
export function StoreMock() {
  const cards = [
    { img: "#E2DED6", w1: "80%", w2: "40%", c2: "#141418" },
    { img: "#E9D9C0", w1: "70%", w2: "45%", c2: "#141418" },
    { img: "#E2DED6", w1: "85%", w2: "35%", c2: "#141418" },
    { img: "#F2D6D9", w1: "75%", w2: "50%", c2: "var(--red)" },
  ];
  return (
    <div className={`${s.sf} ${s.store}`}>
      <div className={s.storeBar}>
        <span className="disp">{copy.storeName}</span>
        <div className={s.storeNav}>
          {copy.storeNav.map((n) => (
            <span key={n}>{n}</span>
          ))}
        </div>
      </div>
      <div className={s.banner}>
        <span className="disp">{copy.storeBanner}</span>
        <span />
      </div>
      <div className={s.shelf}>
        {cards.map((c, i) => (
          <div key={i} className={s.prodCard}>
            <span style={{ background: c.img }} />
            {bar(8, c.w1, "#CFCAC0")}
            {bar(8, c.w2, c.c2)}
          </div>
        ))}
      </div>
    </div>
  );
}

/** Light marketplace product-page mockup (Amazon / eBay / Walmart panels). Decorative. */
export function ProductMock() {
  return (
    <div className={`${s.sf} ${s.product}`}>
      <div className={s.gallery}>
        <span className={s.photo}>
          <span />
        </span>
        <div className={s.thumbs}>
          <span />
          <span />
          <span />
        </div>
      </div>
      <div className={s.details}>
        {bar(12, "92%", "#141418")}
        {bar(12, "70%", "#141418")}
        <span className={s.stars}>★★★★★</span>
        <span className={"disp " + s.price}>{copy.price}</span>
        {bar(7, "86%", "#CFCAC0")}
        {bar(7, "78%", "#CFCAC0")}
        {bar(7, "82%", "#CFCAC0")}
        <div className={s.grow} />
        <span className={s.btnA} />
        <span className={s.btnB} />
      </div>
    </div>
  );
}
