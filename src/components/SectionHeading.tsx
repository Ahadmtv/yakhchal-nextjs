import type { ReactNode } from "react";

type Props = Readonly<{
  eyebrow?: string;
  title: ReactNode;
  description?: string;
  align?: "start" | "center";
  level?: 1 | 2;
}>;

export default function SectionHeading({
  eyebrow,
  title,
  description,
  align = "start",
  level = 2,
}: Props) {
  const Heading = level === 1 ? "h1" : "h2";

  return (
    <div className={`section-heading ${align === "center" ? "center" : ""}`}>
      {eyebrow && <p className="eyebrow">{eyebrow}</p>}
      <Heading>{title}</Heading>
      {description && <p className="section-description">{description}</p>}
    </div>
  );
}
