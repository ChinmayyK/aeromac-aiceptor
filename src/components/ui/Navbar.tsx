"use client";

import { motion } from "framer-motion";

export function Navbar() {
  return (
    <header>
      <motion.nav
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.4, delay: 0.2, ease: [0.76, 0, 0.24, 1] }}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 100,
          width: "100%",
          padding: "clamp(1rem, 2.2vw, 1.8rem) clamp(1.2rem, 2.8vw, 3rem)",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          flexWrap: "wrap",
          rowGap: "0.8rem",
          background: "transparent",
          boxShadow: "none",
          backdropFilter: "none",
        }}
      >
      {/* Logo */}
      <div style={{ display: "flex", alignItems: "center" }}>
        <img
          src="/Logo.png"
          alt="AEROMAC DYNAMICS"
          style={{
            height: "clamp(2.25rem, 3.4vw, 3rem)",
            width: "auto",
            display: "block",
            opacity: 0.98,
            filter: "brightness(0) invert(1)",
          }}
        />
      </div>

      {/* Nav links */}
      <ul
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "clamp(0.3rem, 1vw, 1rem)",
          listStyle: "none",
          alignItems: "center",
          justifyContent: "flex-end",
          padding: 0,
          margin: 0,
        }}
      >
        {["Technology", "Engineering", "Contact"].map((label) => (
          <li key={label}>
            <a
              href={`#${label.toLowerCase()}`}
              data-magnetic
              style={{
                fontFamily: "var(--font-inter), Inter, sans-serif",
                fontSize: "clamp(0.72rem, 0.85vw, 0.9rem)",
                fontWeight: 500,
                letterSpacing: "0.16em",
                color: "#E7EDF5",
                textDecoration: "none",
                textTransform: "uppercase",
                transition: "color 0.3s ease",
                display: "inline-block",
                padding: "0.7rem 0.95rem",
              }}
              onMouseEnter={(e) => {
                (e.target as HTMLAnchorElement).style.color = "#F8FAFC";
              }}
              onMouseLeave={(e) => {
                (e.target as HTMLAnchorElement).style.color = "#E7EDF5";
              }}
            >
              <span className="magnetic-inner" style={{ display: "inline-block" }}>
                {label}
              </span>
            </a>
          </li>
        ))}
      </ul>
    </motion.nav>
    </header>
  );
}
