import Link from "next/link";
import SignupForm from "./SignupForm";

export const metadata = {
  title: "Sign Up • Optimus Prime Fan Club",
  description: "Join the Optimus Prime Fan Club and roll out with the Autobots.",
};

export default function SignupPage() {
  return (
    <section className="signup-page">
      <div className="signup-hero">
        <p className="eyebrow">Enlistment</p>
        <h1>Join the Fan Club</h1>
        <p className="tagline">
          Stand with Optimus Prime. Sign up to get your energon badge, fan-club
          dispatches, and early word on the next great battle.
        </p>
        <p className="back-link">
          <Link href="/">← Back to home</Link>
        </p>
      </div>

      <div className="signup-card">
        <SignupForm />
      </div>

      <ul className="perks">
        <li><strong>Energon badge</strong><span>Official member emblem</span></li>
        <li><strong>Battle dispatches</strong><span>Lore drops &amp; updates</span></li>
        <li><strong>Roll-out crew</strong><span>Join 50K+ members</span></li>
      </ul>
    </section>
  );
}
