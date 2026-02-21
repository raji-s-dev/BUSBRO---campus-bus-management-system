import { useEffect, useState } from "react";
import "./IntroAnimation.css"; // Import the CSS file
import locationIcon from "../../assets/components/introanimation/locaitonicon.svg"; // adjust path as needed

export default function IntroAnimation() {
  const [hide, setHide] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setHide(true); // hide animation after 5s
    }, 5000);
    return () => clearTimeout(timer);
  }, []);

  if (hide) return null; // don't render after vanish

  return (
    <div className="intro-container">
      <div className="logo-wrapper">
        <div className="logo">
          <div className="logo-text">
            <span>B</span><span>u</span><span>s</span><span>B</span><span>r</span>
          </div>
          <img src={locationIcon} alt="Location" className="icon" />
          <span className="dot">.</span>
        </div>
        <div className="slogan">WE TRACK YOU RELAX</div>
      </div>
    </div>
  );
}
