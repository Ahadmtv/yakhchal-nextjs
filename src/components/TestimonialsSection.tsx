"use client";

import { useRef, useState } from "react";
import Icon from "@/components/Icon";
import SectionHeading from "@/components/SectionHeading";
import { verifiedTestimonials } from "@/data/appStats";

export default function TestimonialsSection() {
  const testimonialsRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const dragState = useRef({ startX: 0, startScrollLeft: 0 });

  function handlePointerDown(event: React.PointerEvent<HTMLDivElement>) {
    if (event.pointerType === "mouse" && event.button !== 0) return;
    const container = testimonialsRef.current;
    if (!container) return;
    dragState.current = { startX: event.clientX, startScrollLeft: container.scrollLeft };
    container.setPointerCapture(event.pointerId);
    setIsDragging(true);
  }

  function handlePointerMove(event: React.PointerEvent<HTMLDivElement>) {
    const container = testimonialsRef.current;
    if (!isDragging || !container) return;
    container.scrollLeft = dragState.current.startScrollLeft - (event.clientX - dragState.current.startX);
  }

  function stopDragging() {
    setIsDragging(false);
  }

  return (
    <section className="testimonials-section deferred-section" aria-labelledby="testimonials-title">
      <div className="container container-narrow">
        <SectionHeading
          eyebrow="نظر کاربران فروشگاه"
          title={<span id="testimonials-title">تجربه‌هایی که واقعاً منتشر شده‌اند</span>}
          description="تجربه‌هایی از کاربرانی که یخچال را برای برنامه‌ریزی غذا و خرید روزانه انتخاب کرده‌اند."
          align="center"
        />
        <div
          ref={testimonialsRef}
          className={`testimonials-grid${isDragging ? " is-dragging" : ""}`}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={stopDragging}
          onPointerCancel={stopDragging}
          onDragStart={(event) => event.preventDefault()}
        >
          {verifiedTestimonials.map((item) => (
            <figure className="testimonial-card" key={`${item.store}-${item.author}-${item.publishedAt ?? ""}`}>
              <Icon name="sparkle" />
              <blockquote>{item.quote}</blockquote>
              <figcaption>
                <span><strong>{item.author}</strong>{item.rating ? <small>{item.rating}</small> : null}{item.publishedAt ? <time>{item.publishedAt}</time> : null}</span>
                <a href={item.sourceUrl} target="_blank" rel="noopener noreferrer">مشاهده در {item.store}<span className="sr-only"> (در پنجره جدید)</span></a>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
