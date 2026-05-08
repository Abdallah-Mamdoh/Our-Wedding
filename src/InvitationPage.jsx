import { useEffect, useRef, useState } from "react";

const GOOGLE_FONTS =
  "https://fonts.googleapis.com/css2?family=Dancing+Script:wght@400;500;600;700&family=Cormorant+Garamond:ital,wght@0,300;0,400;1,300;1,400&family=Playfair+Display:ital,wght@0,400;0,600;1,400&display=swap";

/* ── Hook: reveal on scroll ── */
function useReveal() {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setVisible(true);
      },
      { threshold: 0.1 },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return [ref, visible];
}

/* ── Section wrapper with scroll reveal ── */
function Section({ children, style = {} }) {
  const [ref, visible] = useReveal();
  return (
    <div
      ref={ref}
      style={{
        padding: "56px 32px",
        textAlign: "center",
        background: "#fff",
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(36px)",
        transition: "opacity 0.85s ease, transform 0.85s ease",
        ...style,
      }}
    >
      {children}
    </div>
  );
}

/* ── Gold ornament divider ── */
function Divider() {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 12,
        padding: "0 32px",
        background: "#fff",
      }}
    >
      <div
        style={{ flex: 1, height: 0.5, background: "rgba(201,168,76,0.28)" }}
      />
      <div
        style={{
          width: 6,
          height: 6,
          background: "#c9a84c",
          transform: "rotate(45deg)",
          opacity: 0.55,
          flexShrink: 0,
        }}
      />
      <div
        style={{ flex: 1, height: 0.5, background: "rgba(201,168,76,0.28)" }}
      />
    </div>
  );
}

/* ── Live countdown ── */
function Countdown() {
  const [time, setTime] = useState({ d: "--", h: "--", m: "--", s: "--" });
  useEffect(() => {
    const target = new Date("2026-06-10T21:00:00");
    const pad = (n) => String(Math.floor(n)).padStart(2, "0");
    const tick = () => {
      const diff = target - new Date();
      if (diff <= 0) {
        setTime({ d: "00", h: "00", m: "00", s: "00" });
        return;
      }
      setTime({
        d: pad(diff / 86400000),
        h: pad((diff % 86400000) / 3600000),
        m: pad((diff % 3600000) / 60000),
        s: pad((diff % 60000) / 1000),
      });
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  const blocks = [
    { val: time.d, label: "Days" },
    { val: time.h, label: "Hours" },
    { val: time.m, label: "Minutes" },
    { val: time.s, label: "Seconds" },
  ];

  return (
    <div
      style={{
        display: "flex",
        gap: 10,
        justifyContent: "center",
        flexWrap: "wrap",
        marginTop: 26,
      }}
    >
      {blocks.map((b, i) => (
        <div
          key={b.label}
          style={{ display: "flex", alignItems: "center", gap: 10 }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              minWidth: 60,
            }}
          >
            <div
              style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: 40,
                color: "#2a1a06",
                fontWeight: 400,
                lineHeight: 1,
              }}
            >
              {b.val}
            </div>
            <div
              style={{
                fontSize: 10,
                letterSpacing: 3,
                color: "#8a7050",
                textTransform: "uppercase",
                marginTop: 4,
                fontFamily: "'Cormorant Garamond', serif",
              }}
            >
              {b.label}
            </div>
          </div>
          {i < blocks.length - 1 && (
            <div
              style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: 30,
                color: "#c9a84c",
                paddingTop: 4,
              }}
            >
              ·
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

/* ── Entrance Time Section ── */
function EntranceTimeSection() {
  const [ref, visible] = useReveal();

  // const schedule = [
  //   {
  //     time: "08:00 PM",
  //     label: "Doors Open",
  //     icon: "✦",
  //     note: "Guests are welcomed & seated",
  //   },
  //   {
  //     time: "09:00 PM",
  //     label: "Ceremony Begins",
  //     icon: "◆",
  //     note: "The celebration commences",
  //   },
  //   {
  //     time: "10:00 PM",
  //     label: "Dinner & Celebration",
  //     icon: "✦",
  //     note: "Feast, music & memories",
  //   },
  // ];

  const schedule = [
    {
      time: "08:00 PM",
      label: "Doors Open",
      icon: "✦",
      note: "Guests are welcomed & seated",
    },
    {
      time: "09:00 PM",
      label: "Ceremony Begins",
      icon: "◆",
      note: "The celebration commences",
    },
    {
      time: "09:30 PM",
      label: "Ring Exchange",
      icon: "✦",
      note: "Exchanging our rings ",
    },
    {
      time: "10:15 PM",
      label: "Dinner Time",
      icon: "✦",
      note: "Feast, music & memories",
    },
    {
      time: "10:30 PM",
      label: "A Letter for Our Future",
      icon: "◆",
      note: "A heartfelt message for the future",
    },
    {
      time: "All Night",
      label: "Photo Moments",
      icon: "✦",
      note: "Photographer, Photobooth and Guestbook are available throughout the evening",
    },
  ];

  return (
    <div
      ref={ref}
      style={{
        padding: "56px 32px",
        textAlign: "center",
        background: "#fff",
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(36px)",
        transition: "opacity 0.85s ease, transform 0.85s ease",
      }}
    >
      <span style={t.ornament}>✦</span>
      <div style={t.msgTitle}>Evening Schedule</div>
      <div style={t.secTitle}>Your guide to our night</div>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 0,
          marginTop: 18,
        }}
      >
        {schedule.map((item, i) => (
          <div
            key={item.label}
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              width: "100%",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 20,
                width: "100%",
                maxWidth: 340,
                padding: "20px 0",
              }}
            >
              {/* Time */}
              <div style={{ textAlign: "right", minWidth: 90 }}>
                <div
                  style={{
                    fontFamily: "'Playfair Display', serif",
                    fontSize: 20,
                    color: "#c9a84c",
                    fontWeight: 400,
                    letterSpacing: 1,
                  }}
                >
                  {item.time}
                </div>
              </div>

              {/* Icon + vertical line */}
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  position: "relative",
                }}
              >
                <div
                  style={{
                    width: 36,
                    height: 36,
                    borderRadius: "50%",
                    border: "1px solid rgba(201,168,76,0.5)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "#c9a84c",
                    fontSize: 10,
                    flexShrink: 0,
                    background: "#fffcf5",
                  }}
                >
                  {item.icon}
                </div>
              </div>

              {/* Label + note */}
              <div style={{ textAlign: "left", flex: 1 }}>
                <div
                  style={{
                    fontFamily: "'Playfair Display', serif",
                    fontSize: 16,
                    color: "#2a1a06",
                    fontWeight: 400,
                  }}
                >
                  {item.label}
                </div>
                <div
                  style={{
                    fontSize: 12,
                    color: "#8a7050",
                    fontStyle: "italic",
                    marginTop: 3,
                    lineHeight: 1.4,
                  }}
                >
                  {item.note}
                </div>
              </div>
            </div>

            {/* Connector line between items */}
            {i < schedule.length - 1 && (
              <div
                style={{
                  width: 0.5,
                  height: 24,
                  background: "rgba(201,168,76,0.3)",
                  marginLeft: "calc(90px + 20px + 18px)", // align with center of circle
                  alignSelf: "flex-start",
                  marginTop: -4,
                  marginBottom: -4,
                }}
              />
            )}
          </div>
        ))}
      </div>

      <div
        style={{
          marginTop: 28,
          fontSize: 13,
          color: "#8a7050",
          fontStyle: "italic",
          lineHeight: 1.8,
          borderTop: "0.5px solid rgba(201,168,76,0.2)",
          paddingTop: 20,
        }}
      >
        We kindly ask guests to arrive no later than
        <br />
        <span
          style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: 17,
            color: "#c9a84c",
            display: "block",
            marginTop: 4,
          }}
        >
          8:30 PM
        </span>
        to be comfortably seated before the ceremony begins
      </div>
    </div>
  );
}

/* ── Pink colour palette circles ── */
const PINK_PALETTE = [
  { color: "#DB9AAD", name: "Petal Cloud" },
  { color: "#D6879F", name: "Blush Nectar" },
  { color: "#C0567B", name: "Rosy Dusk" },
  { color: "#892245", name: "Crimson Velvet" },
];

function PinkPalette() {
  const [ref, visible] = useReveal();
  return (
    <div
      ref={ref}
      style={{
        padding: "40px 32px 56px",
        textAlign: "center",
        background: "#fff",
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(36px)",
        transition: "opacity 0.85s ease, transform 0.85s ease",
      }}
    >
      <span style={t.ornament}>✦</span>
      <div
        style={{
          fontFamily: "'Playfair Display', serif",
          fontSize: 12,
          letterSpacing: 6,
          color: "#8a7050",
          textTransform: "uppercase",
          marginBottom: 28,
          fontStyle: "italic",
        }}
      >
        Girls Colour Palette
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          gap: 16,
          flexWrap: "wrap",
        }}
      >
        {PINK_PALETTE.map((p) => (
          <div
            key={p.name}
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 10,
            }}
          >
            <div
              style={{
                width: 62,
                height: 62,
                borderRadius: "50%",
                background: p.color,
                border: "1px solid rgba(201,168,76,0.25)",
                boxShadow: `0 2px 12px ${p.color}55`,
              }}
            />
            <div
              style={{
                fontSize: 11,
                letterSpacing: 1.5,
                color: "#8a7050",
                fontFamily: "'Cormorant Garamond', serif",
                fontStyle: "italic",
              }}
            >
              {p.name}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ── Garden background ── */
function GardenBackground() {
  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 0,
      }}
    >
      <img
        src="/venue.png"
        alt="venue"
        style={{
          width: "90%",
          height: "100%",
          objectFit: "cover",
          borderRadius: "6px",
        }}
      />
    </div>
  );
}

/* ── Monogram with uppercase A & S using Dancing Script ── */
function Monogram({ size = 78, color = "#b8860b" }) {
  const letterStyle = {
    fontFamily: "'Dancing Script', cursive",
    fontSize: size,
    color,
    lineHeight: 1,
    display: "inline-block",
    textTransform: "uppercase",
    fontWeight: 700,
  };
  const ampStyle = {
    fontFamily: "'Dancing Script', cursive",
    fontSize: size * 0.55,
    color,
    lineHeight: 1,
    display: "inline-block",
    verticalAlign: "middle",
    margin: "0 6px",
    fontWeight: 500,
  };

  return (
    <div
      style={{
        lineHeight: 1,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: 0,
        textShadow: "1px 2px 0 rgba(180,120,0,0.15)",
      }}
    >
      <span style={letterStyle}>A</span>
      <span style={ampStyle}>&amp;</span>
      <span style={letterStyle}>S</span>
    </div>
  );
}

/* ── Main component ── */
export default function InvitationPage() {
  const [footerRef, footerVisible] = useReveal();

  return (
    <>
      <link rel="stylesheet" href={GOOGLE_FONTS} />
      <style>{`
        * { box-sizing: border-box; }
        html, body { margin: 0; padding: 0; overflow-x: hidden; }
        .rsvp-btn:hover { background: rgba(201,168,76,0.08) !important; }
      `}</style>

      <div
        style={{
          width: "100%",
          background: "#fff",
          fontFamily: "'Cormorant Garamond', serif",
        }}
      >
        <div
          style={{
            width: "100%",
            maxWidth: 520,
            margin: "0 auto",
            background: "#fff",
            paddingBottom: 60,
          }}
        >
          {/* ── HERO ── */}
          <div style={s.hero}>
            {[
              { top: 18, left: 18, borderWidth: "1px 0 0 1px" },
              { top: 18, right: 18, borderWidth: "1px 1px 0 0" },
              { bottom: 18, left: 18, borderWidth: "0 0 1px 1px" },
              { bottom: 18, right: 18, borderWidth: "0 1px 1px 0" },
            ].map((style, i) => (
              <div
                key={i}
                style={{
                  position: "absolute",
                  width: 36,
                  height: 36,
                  borderColor: "#c9a84c",
                  borderStyle: "solid",
                  zIndex: 3,
                  ...style,
                }}
              />
            ))}
            <GardenBackground />
            <div
              style={{
                position: "absolute",
                inset: 0,
                background: "rgba(255,252,245,0.62)",
                zIndex: 1,
              }}
            />
            <div
              style={{
                position: "relative",
                zIndex: 2,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                width: "100%",
              }}
            >
              {/* Uppercase A & S monogram */}
              <div style={{ marginBottom: 4 }}>
                <Monogram size={78} color="#b8860b" />
              </div>
              <div style={s.monoLine} />
              <div style={s.heroNames}>
                Abdallah
                <span style={s.heroAmp}>&amp;</span>
                Sohaila
              </div>
              <div style={s.heroDiv} />
              <div style={s.heroTagline}>
                request the pleasure of your company
              </div>
            </div>
          </div>

          {/* ── 1. DATE + COUNTDOWN — most important, sets the event ── */}
          <Section>
            <span style={t.ornament}>✦ &nbsp; ✦ &nbsp; ✦</span>
            <div style={t.dateDay}>Wednesday</div>
            <div style={t.dateNum}>10</div>
            <div style={t.dateMonth}>June</div>
            <div style={t.dateYear}>2026</div>
            <div style={t.dateNote}>
              We kindly invite you to join us early
              <br />
              to enjoy every beautiful moment together.
            </div>
            <Countdown />
          </Section>

          <Divider />

          {/* ── 2. ENTRANCE TIME — practical info right after the date ── */}
          <EntranceTimeSection />

          <Divider />

          {/* ── 3. VENUE + MAP — where to go ── */}
          <Section>
            <span style={t.ornament}>✦</span>
            <div style={t.secTitle}>The celebration will be held at</div>
            <div style={t.venueName}>Rustic Garden Venue</div>
            <div style={t.venueAddr}>Cairo, Egypt</div>
            <div style={t.mapFrame}>
              <iframe
                title="Rustic Garden Venue"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3447.32708323104!2d31.532122574432236!3d30.227747809864614!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x145805005be4bc6f%3A0xe260fc319e872e15!2srustic%20Garden!5e0!3m2!1sen!2seg!4v1776070616519!5m2!1sen!2seg"
                style={{ width: "100%", height: "100%", border: "none" }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
            <a
              href="https://maps.app.goo.gl/GnY9ujeKYXnW3rcN9"
              target="_blank"
              rel="noopener noreferrer"
              style={t.dirLink}
            >
              Open in Google Maps
            </a>
          </Section>

          <Divider />

          {/* ── 4. RSVP — action item ── */}
          <Section>
            <span style={t.ornament}>✦</span>
            <div style={t.rsvpTitle}>Will you join us?</div>
            <div style={t.rsvpSub}>
              Kindly confirm your attendance by reaching out to us
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: 12,
                alignItems: "center",
              }}
            >
              <a
                href="https://chat.whatsapp.com/He9otTZwvwkJzBne54H6xc"
                style={{
                  padding: "12px 24px",
                  borderRadius: "30px",
                  background: "#111",
                  color: "#fff",
                  textDecoration: "none",
                  fontSize: "16px",
                  fontWeight: "500",
                  letterSpacing: "1px",
                  display: "inline-block",
                  transition: "0.3s ease",
                }}
                onMouseOver={(e) => (e.target.style.opacity = 0.8)}
                onMouseOut={(e) => (e.target.style.opacity = 1)}
              >
                Join Our WhatsApp Group
              </a>
            </div>
          </Section>

          <Divider />

          {/* ── 5. PINK PALETTE — dress code / aesthetic ── */}
          <PinkPalette />

          <Divider />

          {/* ── 6. MESSAGE — emotional close ── */}
          <Section>
            <span style={t.ornament}>✦</span>
            <div style={t.msgTitle}>A note from our hearts</div>
            <div style={t.msgBody}>
              To our dearest family and friends,
              <br />
              <br />
              We are overflowing with joy as we prepare to share this milestone
              with the people we love most. This engagement is not simply a
              promise between two hearts — it is a moment we have dreamed of
              celebrating surrounded by all of you.
              <br />
              <br />
              Your presence would mean everything to us. We hope you feel the
              warmth of our love the moment you arrive, and we hope this evening
              becomes a memory you carry with you just as tenderly as we will.
              <br />
              <br />
              We are so grateful for the love and support that has always
              surrounded us, and we truly cannot imagine this moment without you
              by our side.
              <br />
              <br />
              Please come, celebrate, and let us create something beautiful
              together.
            </div>
            <div style={t.msgSig}>
              With all our love,
              <br />
              Abdallah &amp; Sohaila
            </div>
            <div style={t.msgSigSub}>We cannot wait to see you</div>
          </Section>

          <Divider />

          {/* ── FOOTER ── */}
          <div
            ref={footerRef}
            style={{
              textAlign: "center",
              padding: "22px 24px 48px",
              background: "#fff",
              opacity: footerVisible ? 1 : 0,
              transform: footerVisible ? "translateY(0)" : "translateY(18px)",
              transition: "opacity 0.85s ease, transform 0.85s ease",
            }}
          >
            <Monogram size={72} color="#b8860b" />
            <div
              style={{
                fontSize: 11,
                letterSpacing: 4,
                color: "#c9a84c",
                opacity: 0.55,
                textTransform: "uppercase",
                marginTop: 8,
              }}
            >
              10 · 06 · 2026
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

/* ── Styles ── */
const s = {
  hero: {
    width: "100%",
    minHeight: "80vh",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    padding: "48px 28px",
    position: "relative",
    overflow: "hidden",
    background: "#fdf8ef",
  },
  monoLine: {
    width: 70,
    height: 0.5,
    background: "#c9a84c",
    opacity: 0.6,
    margin: "6px auto 28px",
  },
  heroNames: {
    fontFamily: "'Dancing Script', cursive",
    fontSize: 50,
    color: "#2a1a06",
    lineHeight: 1.2,
    textAlign: "center",
  },
  heroAmp: {
    fontFamily: "'Dancing Script', cursive",
    fontSize: 34,
    color: "#b8860b",
    display: "block",
    margin: "2px 0",
  },
  heroDiv: {
    width: 55,
    height: 0.5,
    background: "#c9a84c",
    opacity: 0.5,
    margin: "18px auto",
  },
  heroTagline: {
    fontFamily: "'Cormorant Garamond', serif",
    fontStyle: "italic",
    fontSize: 15,
    color: "#6a5030",
    letterSpacing: 1,
    textAlign: "center",
  },
};

const t = {
  ornament: {
    color: "#c9a84c",
    fontSize: 13,
    letterSpacing: 6,
    marginBottom: 18,
    display: "block",
  },
  secTitle: {
    fontFamily: "'Playfair Display', serif",
    fontSize: 12,
    letterSpacing: 6,
    color: "#8a7050",
    textTransform: "uppercase",
    marginBottom: 22,
    fontWeight: 400,
    fontStyle: "italic",
  },
  dateDay: {
    fontFamily: "'Dancing Script', cursive",
    fontSize: 30,
    color: "#8a7050",
    marginBottom: 2,
  },
  dateNum: {
    fontFamily: "'Playfair Display', serif",
    fontSize: 84,
    color: "#c9a84c",
    lineHeight: 1,
    fontWeight: 400,
  },
  dateMonth: {
    fontFamily: "'Playfair Display', serif",
    fontSize: 22,
    color: "#2a1a06",
    letterSpacing: 8,
    textTransform: "uppercase",
    marginBottom: 4,
  },
  dateYear: {
    fontSize: 14,
    letterSpacing: 4,
    color: "#8a7050",
    fontStyle: "italic",
  },
  dateNote: {
    marginTop: 18,
    fontSize: 15,
    color: "#8a7050",
    fontStyle: "italic",
    lineHeight: 1.9,
  },
  venueName: {
    fontFamily: "'Dancing Script', cursive",
    fontSize: 38,
    color: "#2a1a06",
    marginBottom: 6,
  },
  venueAddr: {
    fontSize: 13,
    letterSpacing: 2,
    color: "#8a7050",
    textTransform: "uppercase",
    marginBottom: 18,
    fontStyle: "italic",
  },
  mapFrame: {
    width: "100%",
    height: 230,
    border: "0.5px solid rgba(201,168,76,0.4)",
    borderRadius: 2,
    overflow: "hidden",
    marginTop: 10,
  },
  dirLink: {
    display: "inline-block",
    marginTop: 13,
    fontSize: 12,
    letterSpacing: 3,
    color: "#c9a84c",
    textTransform: "uppercase",
    textDecoration: "none",
    borderBottom: "0.5px solid rgba(201,168,76,0.4)",
    paddingBottom: 2,
  },
  rsvpTitle: {
    fontFamily: "'Dancing Script', cursive",
    fontSize: 38,
    color: "#2a1a06",
    marginBottom: 8,
  },
  rsvpSub: {
    fontSize: 14,
    color: "#8a7050",
    fontStyle: "italic",
    marginBottom: 22,
  },
  rsvpBtn: {
    display: "inline-flex",
    alignItems: "center",
    gap: 8,
    padding: "13px 30px",
    border: "1px solid #c9a84c",
    color: "#2a1a06",
    fontFamily: "'Cormorant Garamond', serif",
    fontSize: 14,
    letterSpacing: 2,
    cursor: "pointer",
    background: "transparent",
    borderRadius: 1,
    transition: "background 0.3s",
    textDecoration: "none",
    fontStyle: "italic",
  },
  msgTitle: {
    fontFamily: "'Dancing Script', cursive",
    fontSize: 42,
    color: "#2a1a06",
    marginBottom: 22,
  },
  msgBody: {
    fontSize: 16,
    lineHeight: 2,
    color: "#5a4030",
    fontStyle: "italic",
    textAlign: "center",
  },
  msgSig: {
    marginTop: 30,
    fontFamily: "'Dancing Script', cursive",
    fontSize: 40,
    color: "#c9a84c",
    lineHeight: 1.3,
  },
  msgSigSub: {
    fontSize: 11,
    letterSpacing: 3,
    color: "#8a7050",
    textTransform: "uppercase",
    marginTop: 6,
    fontStyle: "italic",
  },
};
