import type { TechIcon } from "../illustrations/techIcons";

// A brand logo from techIcons, drawn in its brand colour unless a fill class is passed.
export default function TechLogo({ icon, className = "h-5 w-5", fill }: { icon: TechIcon; className?: string; fill?: string }) {
  return (
    <svg viewBox="0 0 24 24" role="img" aria-label={icon.title} className={className} fill={fill ?? icon.color}>
      <title>{icon.title}</title>
      <path d={icon.path} fillRule={icon.evenodd ? "evenodd" : undefined} />
    </svg>
  );
}
