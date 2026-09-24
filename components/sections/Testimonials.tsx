import { Fragment } from "react";
import { testimonials, testimonialsSection as copy } from "@/content";
import { Icon } from "@/components/ui/Icon";
import { Marquee } from "@/components/ui/Marquee";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { TestimonialStack } from "./TestimonialStack";
import s from "./Testimonials.module.css";

const names = testimonials.map((t) => t.company.toUpperCase());

/** Two passes of the client list, alternating filled / outlined names (as in the design). */
function ClientRow({ list, sepColor, startOutlined }: { list: string[]; sepColor: string; startOutlined: boolean }) {
  const seq = [...list, ...list];
  return seq.map((n, i) => (
    <Fragment key={i}>
      <span className={"cl-name" + ((i % 2 === 0) === startOutlined ? " o" : "")}>{n}</span>
      <Icon name="spark" size={24} strokeWidth={2} style={{ color: sepColor, flex: "0 0 auto" }} />
    </Fragment>
  ));
}

/** Client stories: stacked 3D carousel + two opposite-direction client marquees. Used on / and /about. */
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
      <div className={s.marquees}>
        {/* Each group holds the full 10-name pattern, so durations are doubled to keep the design's speed. */}
        <Marquee duration={76}>
          <ClientRow list={names} sepColor="var(--red)" startOutlined={false} />
        </Marquee>
        <Marquee reverse duration={88}>
          <ClientRow list={[...names].reverse()} sepColor="var(--cyan)" startOutlined />
        </Marquee>
      </div>
    </section>
  );
}
