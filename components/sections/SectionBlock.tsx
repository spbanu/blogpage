import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { cn } from "@/lib/utils";

/** A titled content band on section pages. */
export function SectionBlock({
  id,
  eyebrow,
  title,
  description,
  action,
  children,
  className,
}: {
  id: string;
  eyebrow?: string;
  title: string;
  description?: string;
  action?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <section aria-labelledby={id} className={cn("py-14", className)}>
      <Container>
        <SectionHeading id={id} eyebrow={eyebrow} title={title} description={description} action={action} />
        {children}
      </Container>
    </section>
  );
}
