/** The red heart from every Big Wiss lid. One drawn shape, used as the site's signature mark. */
export function Heart({ className, color = "var(--bw-heart)", title }: { className?: string; color?: string; title?: string }) {
  return (
    <svg viewBox="0 0 24 22" className={className} role={title ? "img" : undefined} aria-hidden={title ? undefined : true}>
      {title ? <title>{title}</title> : null}
      <path
        fill={color}
        d="M12 21.2c-.4 0-.8-.15-1.1-.42C5.2 15.9 1.2 12.4 1.2 7.6 1.2 4.1 3.9 1.4 7.2 1.4c2 0 3.7 1 4.8 2.6 1.1-1.6 2.8-2.6 4.8-2.6 3.3 0 6 2.7 6 6.2 0 4.8-4 8.3-9.7 13.18-.3.27-.7.42-1.1.42z"
      />
    </svg>
  );
}
