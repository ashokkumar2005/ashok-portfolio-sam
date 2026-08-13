export default function AvatarPlaceholder({ className = "", style }) {
  // Stylized duotone silhouette standing in for a real portrait, in the
  // same editorial spirit as the reference (dark figure, cropped tight,
  // set against a solid color block). Swappable for a real photo later
  // without touching layout — see Hero.jsx.
  return (
    <svg
      viewBox="0 0 300 360"
      className={className}
      role="img"
      aria-label="Portrait placeholder for Ashokkumar T"
      preserveAspectRatio="xMidYMax slice"
      style={style}
    >
      <rect width="300" height="360" fill="transparent" />
      <g fill="#151510">
        {/* simplified bust silhouette */}
        <path d="M150 40c-28 0-48 22-48 52 0 21 10 38 25 47-38 12-63 38-70 78-2 12-3 24-3 36l192 0c0-12-1-24-3-36-7-40-32-66-70-78 15-9 25-26 25-47 0-30-20-52-48-52z" />
      </g>
      <g fill="#151510" opacity="0.85">
        <circle cx="150" cy="92" r="4" fill="#eeefe9" opacity="0.5" />
      </g>
    </svg>
  );
}
