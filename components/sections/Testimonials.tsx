import { testimonials, testimonialsSection as copy } from "@/content";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { TestimonialStack } from "./TestimonialStack";
import s from "./Testimonials.module.css";

/** Client stories: stacked 3D carousel. Used on / and /about. */
export function Testimonials() {
  return (
    <section id="clients" className={s.section} aria-labelledby="clients-title">
      <TestimonialStack
        items={testimonials}
        intro={
          <>
            <SectionLabel>{copy.label}</SectionLabel>
            <h2 id="clients-title" data-rv="left" className={"disp " + s.title}>
              {copy.titleLines[0]}
              <br />
              {copy.titleLines[1]} <span className="fillhov">{copy.titleAccent}</span>
            </h2>
            <p data-rv="left" className={s.text}>
              {copy.text}
            </p>
          </>
        }
      />
    </section>
  );
}
