/**
 * Small, consistent line-icon set (24x24, currentColor stroke) so the app
 * doesn't depend on an external icon package for a handful of glyphs.
 */
const base = {
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.75,
  strokeLinecap: "round",
  strokeLinejoin: "round",
};

export function WalletIcon(props) {
  return (
    <svg {...base} {...props}>
      <path d="M3 7a2 2 0 0 1 2-2h11a2 2 0 0 1 2 2v1H5a2 2 0 0 0-2 2v7a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-6a2 2 0 0 0-2-2h-4" />
      <path d="M16 14h.01" />
    </svg>
  );
}

export function BriefcaseIcon(props) {
  return (
    <svg {...base} {...props}>
      <rect x="3" y="7" width="18" height="13" rx="2" />
      <path d="M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
      <path d="M3 12h18" />
    </svg>
  );
}

export function PackageIcon(props) {
  return (
    <svg {...base} {...props}>
      <path d="M21 8 12 3 3 8v8l9 5 9-5Z" />
      <path d="M3 8l9 5 9-5" />
      <path d="M12 13v8" />
    </svg>
  );
}

export function ChartIcon(props) {
  return (
    <svg {...base} {...props}>
      <path d="M4 20V10" />
      <path d="M12 20V4" />
      <path d="M20 20v-6" />
      <path d="M3 20h18" />
    </svg>
  );
}

export function SlidersIcon(props) {
  return (
    <svg {...base} {...props}>
      <path d="M5 21V13" /><path d="M5 9V3" />
      <path d="M12 21v-4" /><path d="M12 13V3" />
      <path d="M19 21v-8" /><path d="M19 9V3" />
      <circle cx="5" cy="11" r="2" /><circle cx="12" cy="15" r="2" /><circle cx="19" cy="11" r="2" />
    </svg>
  );
}

export function PlusIcon(props) {
  return (
    <svg {...base} {...props}>
      <path d="M12 5v14" /><path d="M5 12h14" />
    </svg>
  );
}

export function CheckIcon(props) {
  return (
    <svg {...base} {...props}>
      <path d="M20 6 9 17l-5-5" />
    </svg>
  );
}

export function ArrowRightIcon(props) {
  return (
    <svg {...base} {...props}>
      <path d="M5 12h14" /><path d="m13 6 6 6-6 6" />
    </svg>
  );
}

export function ExternalLinkIcon(props) {
  return (
    <svg {...base} {...props}>
      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
      <path d="M15 3h6v6" />
      <path d="M10 14 21 3" />
    </svg>
  );
}

export function ShieldIcon(props) {
  return (
    <svg {...base} {...props}>
      <path d="M12 3 4 6v6c0 4.5 3.2 7.4 8 9 4.8-1.6 8-4.5 8-9V6Z" />
      <path d="m9 12 2 2 4-4" />
    </svg>
  );
}

export function ClockIcon(props) {
  return (
    <svg {...base} {...props}>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3 3" />
    </svg>
  );
}

export function UsersIcon(props) {
  return (
    <svg {...base} {...props}>
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  );
}

export function BoltIcon(props) {
  return (
    <svg {...base} {...props}>
      <path d="M13 3 4 14h6l-1 7 9-11h-6l1-7Z" />
    </svg>
  );
}

export function PhoneIcon(props) {
  return (
    <svg {...base} {...props}>
      <rect x="6" y="2" width="12" height="20" rx="2" />
      <path d="M11 18h2" />
    </svg>
  );
}

export function CarIcon(props) {
  return (
    <svg {...base} {...props}>
      <path d="M5 13 6.5 8h11L19 13" />
      <path d="M3 13h18v5H3z" />
      <circle cx="7.5" cy="18" r="1.5" /><circle cx="16.5" cy="18" r="1.5" />
    </svg>
  );
}

export function BikeIcon(props) {
  return (
    <svg {...base} {...props}>
      <circle cx="6" cy="17" r="3.5" /><circle cx="18" cy="17" r="3.5" />
      <path d="M6 17 10 8h4l3 5" /><path d="M10 8H8" /><path d="M13 13h5" />
    </svg>
  );
}

export function HeartIcon(props) {
  return (
    <svg {...base} {...props}>
      <path d="M12 20s-7-4.35-9.5-8.5C.7 8 2.3 4.5 6 4c2-.27 3.5.8 6 3 2.5-2.2 4-3.27 6-3 3.7.5 5.3 4 3.5 7.5C19 15.65 12 20 12 20Z" />
    </svg>
  );
}

export function AlertIcon(props) {
  return (
    <svg {...base} {...props}>
      <path d="m10.29 3.86-8.18 14.14A1.5 1.5 0 0 0 3.4 20.5h17.2a1.5 1.5 0 0 0 1.29-2.5L13.71 3.86a1.5 1.5 0 0 0-2.6 0Z" />
      <path d="M12 9v4" /><path d="M12 17h.01" />
    </svg>
  );
}
