import { DNA } from "react-loader-spinner";

export default function PortfolioLoader() {
  return (
    <div className="portfolio-loading" role="status" aria-live="polite">
      <DNA
        visible
        height="88"
        width="88"
        ariaLabel="Loading portfolio"
        dnaColor="#1f8f68"
        secondaryColor="#c1705f"
      />
      <span>Loading portfolio</span>
    </div>
  );
}