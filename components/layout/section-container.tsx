import { cn } from "@/lib/utils";

type SectionContainerProps = {
  id?: string;
  className?: string;
  children: React.ReactNode;
};

export function SectionContainer({
  id,
  className,
  children
}: SectionContainerProps) {
  return (
    <section
      id={id}
      className={cn("relative scroll-mt-24 py-16 md:py-24", className)}
    >
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">{children}</div>
    </section>
  );
}
