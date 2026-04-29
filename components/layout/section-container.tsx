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
      className={cn("relative scroll-mt-24 py-10 md:py-[60px] xl:py-20", className)}
    >
      <div className="mx-auto w-full max-w-[1400px] px-5 md:px-8 xl:px-12">{children}</div>
    </section>
  );
}
