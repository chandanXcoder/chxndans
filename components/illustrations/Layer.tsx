// A layer shifts with the pointer by `depth` px (parallax) and floats on its own.
export default function Layer({
  depth,
  className,
  float = { d: 6, delay: 0, r: 0 },
  children,
}: {
  depth: number;
  className: string;
  float?: { d: number; delay: number; r: number } | false;
  children: React.ReactNode;
}) {
  return (
    <div
      className={`absolute transition-transform duration-500 ease-out ${className}`}
      style={{ transform: `translate3d(calc(var(--mx) * ${depth}px), calc(var(--my) * ${depth}px), 0)` }}
    >
      {float ? (
        <div
          className="float"
          style={{ "--d": `${float.d}s`, "--delay": `${float.delay}s`, "--r": `${float.r}deg` } as React.CSSProperties}
        >
          {children}
        </div>
      ) : (
        children
      )}
    </div>
  );
}
