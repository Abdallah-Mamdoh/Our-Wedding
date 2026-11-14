import { useEffect, useRef, useState } from "react";

const FONTS =
  "https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,300;0,9..144,500;1,9..144,300;1,9..144,500&family=Aref+Ruqaa:wght@400;700&family=Figtree:wght@400;500;600&display=swap";

/* ── Event config (edit here) ── */
const SAIL_TIME = new Date("2026-12-25T20:30:00+02:00"); // Cairo time
const MAPS_LINK =
  "https://www.google.com/maps/search/?api=1&query=Liberty+The+Nile+Anchor+Cairo";
const WHATSAPP_LINK = "https://chat.whatsapp.com/He9otTZwvwkJzBne54H6xc";
const SCHEDULE = [
  {
    time: "8:00 PM",
    label: "Boarding begins",
    note: "Welcome drinks on the dock",
  },
  {
    time: "8:30 PM",
    label: "Liberty sets sail",
    note: "On time, and she will not wait",
    key: true,
  },
  {
    time: "9:00 PM",
    label: "Zaffa & first dance",
    note: "Our first moments as husband and wife",
  },
  {
    time: "10:00 PM",
    label: "Dinner on the water",
    note: "Feast, music & memories",
  },
  {
    time: "11:30 PM",
    label: "Back at the dock",
    note: "Photos, photobooth & guestbook",
  },
];

const C = {
  night: "#0c1b33",
  deep: "#12304d",
  teal: "#1f6f78",
  amber: "#ffb454",
  pearl: "#f6efe4",
  coral: "#ec7f8f",
};
const serif = "'Fraunces', serif";
const sans = "'Figtree', sans-serif";
const arabic = "'Aref Ruqaa', serif";

/* ── Hooks ── */
function useReveal() {
  const ref = useRef(null);
  const [on, setOn] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const o = new IntersectionObserver(
      ([e]) => e.isIntersecting && setOn(true),
      { threshold: 0.12 },
    );
    o.observe(el);
    return () => o.disconnect();
  }, []);
  return [ref, on];
}
function useTimeLeft() {
  const [d, setD] = useState(() => SAIL_TIME - new Date());
  useEffect(() => {
    const id = setInterval(() => setD(SAIL_TIME - new Date()), 1000);
    return () => clearInterval(id);
  }, []);
  return d;
}

/* ── Layout helpers ── */
function Block({ bg, color, children, pad = "52px 26px" }) {
  const [ref, on] = useReveal();
  return (
    <section
      ref={ref}
      style={{
        background: bg,
        color,
        padding: pad,
        textAlign: "center",
        opacity: on ? 1 : 0,
        transition: "opacity 1s ease",
      }}
    >
      {children}
    </section>
  );
}
function Wave({ from, to }) {
  return (
    <div style={{ background: from, lineHeight: 0 }}>
      <svg
        viewBox="0 0 520 36"
        preserveAspectRatio="none"
        style={{ width: "100%", height: 36, display: "block" }}
      >
        <path
          d="M0 18 Q32 0 65 18 T130 18 T195 18 T260 18 T325 18 T390 18 T455 18 T520 18 V36 H0Z"
          fill={to}
        />
      </svg>
    </div>
  );
}

/* ── Illustrated couple ── */
function Couple() {
  const skin = "#e8b896";
  return (
    <img style={{ width: 300,paddingBottom: "60px", display: "block" }} src="wedding.jpeg"></img>
    // <svg viewBox="0 0 240 250" style={{ width: 230, display: "block" }} aria-label="Illustration of the groom and bride holding hands">
    //   <g className="sway">
    //     {/* groom */}
    //     <rect x="38" y="168" width="20" height="58" rx="4" fill="#1a2b4a" />
    //     <rect x="62" y="168" width="20" height="58" rx="4" fill="#1a2b4a" />
    //     <rect x="34" y="222" width="26" height="8" rx="4" fill="#0a1220" />
    //     <rect x="60" y="222" width="26" height="8" rx="4" fill="#0a1220" />
    //     <path d="M28 74 Q60 58 92 74 L98 174 H22Z" fill="#26406a" />
    //     <path d="M52 64 L60 104 L68 64Z" fill={C.pearl} />
    //     <path d="M52 66 L60 70 L52 74Z M68 66 L60 70 L68 74Z" fill={C.coral} />
    //     <rect x="55" y="52" width="10" height="12" fill={skin} />
    //     <circle cx="60" cy="40" r="18" fill={skin} />
    //     <path d="M42 38 Q42 16 60 16 Q78 16 78 38 Q70 27 60 27 Q50 27 42 38Z" fill="#2b1a12" />
    //     <path d="M92 80 Q108 120 118 150" stroke="#26406a" strokeWidth="10" strokeLinecap="round" fill="none" />
    //     {/* bride */}
    //     <path d="M160 40 Q148 150 156 218 L204 218 Q212 150 200 40Z" fill="#fff" opacity="0.22" />
    //     <path d="M166 106 H194 L226 230 H134Z" fill={C.pearl} />
    //     <path d="M162 74 Q180 64 198 74 L194 112 H166Z" fill="#fffaf1" />
    //     <rect x="175" y="54" width="10" height="12" fill={skin} />
    //     <circle cx="180" cy="42" r="17" fill={skin} />
    //     <path d="M163 40 Q163 20 180 20 Q197 20 197 40 Q190 30 180 30 Q170 30 163 40Z" fill="#3a2418" />
    //     <circle cx="180" cy="19" r="8" fill="#3a2418" />
    //     <path d="M166 84 Q142 120 122 150" stroke={skin} strokeWidth="7" strokeLinecap="round" fill="none" />
    //     <circle cx="121" cy="150" r="6" fill={skin} />
    //     <circle cx="196" cy="132" r="6" fill={C.coral} /><circle cx="203" cy="138" r="5" fill="#f4a3b0" /><circle cx="192" cy="140" r="5" fill="#f4a3b0" />
    //   </g>
    // </svg>
  );
}

/* ── Opening scene ── */
function Intro({ open, onOpen }) {

  const lanterns = [8, 22, 38, 56, 72, 88];

  const handleOpen = () => {
    const audio = new Audio("/sounds/Stephen Sanchez - Until I Found You (Official Video).mp3");
    audio.loop = true;
    audio.volume = 0.5;

    audio.play().catch((error) => {
      console.error("Audio playback failed:", error);
    });

    onOpen();
  };

  return (
    <div
      aria-hidden={open}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 100,
        height: "100dvh",
        touchAction: "none",
        overscrollBehavior: "none",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "100px 20px 0",
        textAlign: "center",
        color: C.pearl,
        background: `linear-gradient(180deg, ${C.night} 0%, #3b2a55 55%, #a8506f 100%)`,
        transform: open ? "translateY(-105%)" : "none",
        transition: "transform 1.4s cubic-bezier(.7,0,.2,1)",
        visibility: open ? "hidden" : "visible",
        transitionProperty: "transform, visibility",
        overflow: "hidden",
        marginTop: "30px",
      }}
    >
      {[
        [12, 10],
        [30, 22],
        [64, 8],
        [82, 18],
        [48, 30],
        [92, 34],
        [20, 40],
      ].map(([l, t], i) => (
        <span
          key={i}
          className="star"
          style={{
            position: "absolute",
            left: `${l}%`,
            top: `${t}%`,
            animationDelay: `${i * 0.4}s`,
          }}
        />
      ))}

      {lanterns.map((l, i) => (
        <span
          key={i}
          className="lantern"
          style={{
            left: `${l}%`,
            animationDelay: `${i * 1.3}s`,
            animationDuration: `${9 + (i % 3) * 2}s`,
          }}
        />
      ))}

      <div style={{ position: "relative" }}>
        <div
          style={{
            fontFamily: sans,
            fontSize: 13,
            letterSpacing: 1,
            opacity: 0.8,
          }}
        >
          You are invited to the wedding of
        </div>

        <div
          style={{
            fontFamily: serif,
            fontStyle: "italic",
            fontWeight: 300,
            fontSize: 46,
            lineHeight: 1.1,
            marginTop: 12,
          }}
        >
          Abdallah <span style={{ color: C.coral }}>&amp;</span> Sohaila
        </div>

        <div
          style={{
            fontFamily: arabic,
            fontSize: 26,
            color: C.amber,
            marginTop: 6,
          }}
        ></div>

        <button
          className="cta"
          onClick={handleOpen}
          style={{
            marginTop: 22,
            padding: "13px 30px",
            borderRadius: 40,
            border: "none",
            background: C.amber,
            color: C.night,
            fontFamily: sans,
            fontWeight: 600,
            fontSize: 15,
            cursor: "pointer",
          }}
        >
          Step aboard
        </button>
      </div>

      <div
        style={{
          position: "relative",
          width: "100%",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Couple />

        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            height: 22,
            background: "#0a1220",
          }}
        />
      </div>
    </div>
  );
}

/* ── Porthole countdown ── */
function Portholes({ diff }) {
  const d = Math.max(0, diff);
  const pad = (n) => String(Math.floor(n)).padStart(2, "0");
  const items = [
    [pad(d / 86400000), "days"],
    [pad((d % 86400000) / 3600000), "hours"],
    [pad((d % 3600000) / 60000), "min"],
    [pad((d % 60000) / 1000), "sec"],
  ];
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        gap: 12,
        flexWrap: "wrap",
        marginTop: 26,
      }}
    >
      {items.map(([v, l]) => (
        <div
          key={l}
          style={{
            width: 70,
            height: 70,
            borderRadius: "50%",
            border: `3px solid ${C.amber}`,
            background: C.deep,
            boxShadow:
              "inset 0 0 14px rgba(0,0,0,0.6), 0 0 0 4px rgba(255,180,84,0.15)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div
            style={{
              fontFamily: serif,
              fontSize: 26,
              lineHeight: 1,
              color: C.pearl,
            }}
          >
            {v}
          </div>
          <div
            style={{
              fontFamily: sans,
              fontSize: 10,
              color: C.amber,
              marginTop: 3,
            }}
          >
            {l}
          </div>
        </div>
      ))}
    </div>
  );
}

/* ── Boat scene, framed in an arched window ── */
function BoatScene({ diff }) {
  const [preview, setPreview] = useState(false);
  const gone = diff <= 0 || preview;
  const replay = () => {
    if (diff <= 0) return;
    setPreview(true);
    setTimeout(() => setPreview(false), 9000);
  };
  const wave =
    "M-60 0 q15 -6 30 0 t30 0 t30 0 t30 0 t30 0 t30 0 t30 0 t30 0 t30 0 t30 0 t30 0 t30 0 t30 0 t30 0";
  return (
    <div>
      <div
        style={{
          borderRadius: "999px 999px 14px 14px",
          overflow: "hidden",
          border: `4px solid ${C.night}`,
          boxShadow: `0 0 0 3px ${C.amber}`,
        }}
      >
        <svg
          viewBox="0 0 360 250"
          style={{ width: "100%", display: "block" }}
          role="img"
          aria-label="The Liberty boat docked on the Nile, about to set sail"
        >
          <defs>
            <linearGradient id="sky" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor="#2b1d3f" />
              <stop offset="0.55" stopColor="#a8506f" />
              <stop offset="1" stopColor="#f0b27a" />
            </linearGradient>
            <linearGradient id="wtr" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor="#3b2a55" />
              <stop offset="1" stopColor="#1a1230" />
            </linearGradient>
          </defs>
          <rect width="360" height="250" fill="url(#sky)" />
          <circle cx="290" cy="130" r="22" fill="#ffe2b0" opacity="0.9" />
          <g fill="#fff" opacity="0.8">
            <circle cx="60" cy="40" r="1.2" />
            <circle cx="130" cy="70" r="1" />
            <circle cx="200" cy="30" r="1.3" />
            <circle cx="250" cy="60" r="1" />
          </g>
          <rect y="160" width="360" height="90" fill="url(#wtr)" />
          <rect
            x="280"
            y="162"
            width="16"
            height="3"
            rx="1.5"
            fill="#ffe2b0"
            opacity="0.5"
          />
          <rect x="0" y="154" width="48" height="8" fill="#5a3a22" />
          <rect x="8" y="162" width="4" height="26" fill="#3d2616" />
          <rect x="34" y="162" width="4" height="26" fill="#3d2616" />
          <rect x="14" y="124" width="3" height="30" fill="#3d2616" />
          <circle cx="15.5" cy="121" r="4" fill="#ffd98a" />
          <g
            style={{
              transform: gone ? "translateX(420px)" : "none",
              transition: gone
                ? "transform 8s cubic-bezier(.5,0,.9,.6)"
                : "transform .01s",
            }}
          >
            <g className="bob">
              <path d="M58 156 H236 L220 180 H76Z" fill={C.pearl} />
              <path d="M62 162 H232" stroke={C.amber} strokeWidth="1.5" />
              <text
                x="147"
                y="175"
                textAnchor="middle"
                fontFamily="'Fraunces', serif"
                fontStyle="italic"
                fontSize="12"
                fill={C.night}
              >
                Liberty
              </text>
              <rect x="74" y="138" width="140" height="18" fill="#fffaf0" />
              {[84, 104, 124, 144, 164, 184].map((x) => (
                <rect
                  key={x}
                  x={x}
                  y="142"
                  width="9"
                  height="9"
                  rx="4.5"
                  fill="#ffd98a"
                />
              ))}
              <rect x="96" y="120" width="96" height="18" fill="#fffaf0" />
              {[106, 124, 142, 160].map((x) => (
                <rect
                  key={x}
                  x={x}
                  y="124"
                  width="9"
                  height="9"
                  rx="4.5"
                  fill="#ffd98a"
                />
              ))}
              <rect x="90" y="116" width="108" height="4" fill={C.amber} />
              <rect x="143" y="96" width="1.5" height="20" fill={C.night} />
              <path d="M144.5 96 L166 101 L144.5 106Z" fill={C.coral} />
              <path
                d="M74 134 Q147 150 216 134"
                stroke="#ffe2b0"
                strokeWidth="0.8"
                fill="none"
                opacity="0.7"
              />
              {[0, 1, 2, 3, 4, 5, 6].map((i) => (
                <circle
                  key={i}
                  className="bulb"
                  style={{ animationDelay: `${i * 0.25}s` }}
                  cx={80 + i * 22}
                  cy={138 + Math.sin((i / 6) * Math.PI) * 6}
                  r="1.8"
                  fill="#ffe2b0"
                />
              ))}
              <path
                d="M48 154 L60 156"
                stroke="#5a3a22"
                strokeWidth="3"
                strokeLinecap="round"
                opacity={gone ? 0 : 1}
              />
            </g>
          </g>
          <g className="wave" opacity="0.5" transform="translate(0 182)">
            <path d={wave} stroke="#d8b4e8" strokeWidth="1.2" fill="none" />
          </g>
          <g className="wave slow" opacity="0.35" transform="translate(0 205)">
            <path d={wave} stroke="#d8b4e8" strokeWidth="1.2" fill="none" />
          </g>
          <g className="wave" opacity="0.25" transform="translate(0 228)">
            <path d={wave} stroke="#d8b4e8" strokeWidth="1.2" fill="none" />
          </g>
        </svg>
      </div>
      <div
        style={{ marginTop: 16, fontFamily: sans, fontSize: 14, opacity: 0.8 }}
      >
        {diff <= 0
          ? "Liberty has set sail."
          : "The gangway is open until 8:30 PM."}
      </div>
      {diff > 0 && (
        <button
          className="ghost"
          onClick={replay}
          disabled={preview}
          style={{
            marginTop: 12,
            padding: "10px 22px",
            borderRadius: 40,
            border: `1.5px solid ${C.night}`,
            background: "transparent",
            color: C.night,
            fontFamily: sans,
            fontWeight: 500,
            fontSize: 14,
            cursor: preview ? "default" : "pointer",
            opacity: preview ? 0.5 : 1,
          }}
        >
          {preview ? "Sailing…" : "See what happens if you're late"}
        </button>
      )}
    </div>
  );
}

/* ── Boarding pass ── */
function Ticket() {
  const notch = {
    position: "absolute",
    width: 26,
    height: 26,
    borderRadius: "50%",
    background: C.deep,
    top: -13,
  };
  const lab = { fontFamily: sans, fontSize: 11, color: "#6b7a8c" };
  const val = { fontFamily: serif, fontSize: 20, color: C.night, marginTop: 2 };
  return (
    <div
      style={{
        maxWidth: 360,
        margin: "0 auto",
        background: C.pearl,
        borderRadius: 18,
        textAlign: "left",
        color: C.night,
        overflow: "hidden",
        boxShadow: "0 18px 40px rgba(0,0,0,0.35)",
      }}
    >
      <div
        style={{
          background: C.coral,
          padding: "10px 22px",
          fontFamily: sans,
          fontWeight: 600,
          fontSize: 13,
          display: "flex",
          justifyContent: "space-between",
          color: C.night,
        }}
      >
        <span>Boarding pass</span>
        <span>Liberty · Nile</span>
      </div>
      <div style={{ padding: "22px 22px 24px" }}>
        <div style={lab}>Passengers</div>
        <div style={{ fontFamily: serif, fontStyle: "italic", fontSize: 26 }}>
          You &amp; your guest
        </div>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 18,
            marginTop: 20,
          }}
        >
          <div>
            <div style={lab}>Date</div>
            <div style={val}>Fri 25 Dec</div>
          </div>
          <div>
            <div style={lab}>Year</div>
            <div style={val}>2026</div>
          </div>
          <div>
            <div style={lab}>Boarding</div>
            <div style={val}>8:00 PM</div>
          </div>
          <div>
            <div style={lab}>Departs</div>
            <div style={{ ...val, color: "#b3364f" }}>8:30 PM sharp</div>
          </div>
        </div>
        <div style={{ marginTop: 20 }}>
          <div style={lab}>Port</div>
          <div style={val}>The Nile Anchor, Cairo</div>
        </div>
      </div>
      <div
        style={{
          position: "relative",
          borderTop: "2px dashed rgba(12,27,51,0.25)",
        }}
      >
        <span style={{ ...notch, left: -13 }} />
        <span style={{ ...notch, right: -13 }} />
        <div
          style={{
            padding: "18px 22px 20px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 14,
          }}
        >
          <div
            style={{
              fontFamily: sans,
              fontSize: 12,
              lineHeight: 1.5,
              maxWidth: 150,
            }}
          >
            The boat leaves on time. Late guests wave from the dock.
          </div>
          <div
            style={{
              width: 110,
              height: 40,
              background:
                "repeating-linear-gradient(90deg,#0c1b33 0 2px,transparent 2px 4px,#0c1b33 4px 5px,transparent 5px 8px,#0c1b33 8px 11px,transparent 11px 13px)",
            }}
          />
        </div>
      </div>
    </div>
  );
}

/* ── Voyage log ── */
function Voyage() {
  return (
    <div style={{ maxWidth: 340, margin: "10px auto 0", textAlign: "left" }}>
      {SCHEDULE.map((it, i) => (
        <div key={it.label} style={{ display: "flex", gap: 16 }}>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <div
              style={{
                width: 20,
                height: 20,
                borderRadius: "50%",
                border: `2px solid ${C.amber}`,
                marginTop: 2,
                background: it.key ? C.amber : "transparent",
                boxShadow: it.key ? "0 0 14px rgba(255,180,84,0.7)" : "none",
              }}
            />
            {i < SCHEDULE.length - 1 && (
              <div
                style={{
                  flex: 1,
                  borderLeft: "2px dashed rgba(255,180,84,0.4)",
                  minHeight: 42,
                }}
              />
            )}
          </div>
          <div style={{ paddingBottom: 18 }}>
            <div
              style={{
                fontFamily: sans,
                fontSize: 13,
                color: C.amber,
                fontWeight: 600,
              }}
            >
              {it.time}
            </div>
            <div style={{ fontFamily: serif, fontSize: 20, marginTop: 1 }}>
              {it.label}
            </div>
            <div
              style={{
                fontFamily: sans,
                fontSize: 13,
                opacity: 0.7,
                marginTop: 2,
              }}
            >
              {it.note}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

/* ── Page ── */
export default function WeddingInvitation() {
  const diff = useTimeLeft();
  const [open, setOpen] = useState(false);

  useEffect(() => {
  const lock = open ? "" : "hidden";
  document.documentElement.style.overflow = lock;
  document.body.style.overflow = lock;
  if (open) window.scrollTo(0, 0);
  return () => {
    document.documentElement.style.overflow = "";
    document.body.style.overflow = "";
  };
}, [open]);
  return (
    <>
      <link rel="stylesheet" href={FONTS} />
      <style>{`
        * { box-sizing: border-box; }
        html, body { margin: 0; padding: 0; overflow-x: hidden; background: ${C.night}; }
        .sway { animation: sway 5s ease-in-out infinite; transform-origin: 120px 230px; }
        @keyframes sway { 0%,100% { transform: rotate(-0.8deg); } 50% { transform: rotate(0.8deg); } }
        .star { width: 3px; height: 3px; border-radius: 50%; background: #fff; animation: tw 2.4s ease-in-out infinite; }
        @keyframes tw { 0%,100% { opacity: .9; } 50% { opacity: .2; } }
        .lantern { position: absolute; bottom: -30px; width: 14px; height: 20px; border-radius: 6px 6px 8px 8px;
          background: ${C.amber}; box-shadow: 0 0 18px 6px rgba(255,180,84,.55); animation: rise 11s linear infinite; opacity: 0; }
        @keyframes rise { 0% { transform: translateY(0); opacity: 0; } 10% { opacity: .9; } 100% { transform: translateY(-105vh) translateX(18px); opacity: 0; } }
        .bob { animation: bob 4s ease-in-out infinite; transform-origin: 147px 180px; }
        @keyframes bob { 0%,100% { transform: translateY(0) rotate(-.4deg); } 50% { transform: translateY(2.5px) rotate(.4deg); } }
        .wave { animation: drift 7s linear infinite; } .wave.slow { animation-duration: 11s; animation-direction: reverse; }
        @keyframes drift { to { margin-left: 60px; } }
        .bulb { animation: tw 2s ease-in-out infinite; }
        .names-in { animation: rise-in 1.4s .9s both cubic-bezier(.2,.7,.2,1); }
        @keyframes rise-in { from { opacity: 0; transform: translateY(24px); } to { opacity: 1; transform: none; } }
        .cta { transition: transform .2s; } .cta:hover { transform: scale(1.04); }
        .ghost:hover:not(:disabled) { background: rgba(12,27,51,.08) !important; }
        button:focus-visible, a:focus-visible { outline: 3px solid ${C.coral}; outline-offset: 3px; }
        @media (prefers-reduced-motion: reduce) { .sway,.bob,.wave,.bulb,.star,.lantern,.names-in { animation: none; } .lantern { display: none; } .names-in { opacity: 1; } }
      `}</style>

      <Intro open={open} onOpen={() => setOpen(true)} />

      <div style={{ maxWidth: 520, margin: "0 auto", background: C.night }}>
        {/* HERO + COUNTDOWN */}
        <Block bg={C.night} color={C.pearl} pad="70px 26px 56px">
          <div
            className={open ? "names-in" : ""}
            style={{ opacity: open ? undefined : 0 }}
          >
            <div
              style={{
                fontFamily: sans,
                fontSize: 13,
                letterSpacing: 1,
                opacity: 0.75,
              }}
            >
              Friday · 25 December 2026 · 8:30 PM
            </div>
            <div
              style={{
                fontFamily: serif,
                fontStyle: "italic",
                fontWeight: 300,
                fontSize: 54,
                lineHeight: 1.05,
                marginTop: 16,
              }}
            >
              Abdallah
              <br />
              <span style={{ color: C.coral, fontSize: 36 }}>&amp;</span>
              <br />
              Sohaila
            </div>
            <div
              style={{
                fontFamily: arabic,
                fontSize: 28,
                color: C.amber,
                marginTop: 10,
              }}
            ></div>
            <div
              style={{
                fontFamily: sans,
                fontSize: 15,
                opacity: 0.85,
                marginTop: 22,
              }}
            >
              Liberty leaves the dock in
            </div>
            <Portholes diff={diff} />
          </div>
        </Block>

        <Wave from={C.night} to={C.pearl} />

        {/* BOAT */}
        <Block bg={C.pearl} color={C.night} pad="28px 26px 56px">
          <h2
            style={{
              fontFamily: serif,
              fontStyle: "italic",
              fontWeight: 500,
              fontSize: 34,
              margin: "0 0 10px",
            }}
          >
            The boat will not wait
          </h2>
          <p
            style={{
              fontFamily: sans,
              fontSize: 15,
              lineHeight: 1.7,
              maxWidth: 340,
              margin: "0 auto 24px",
            }}
          >
            Our wedding is on a boat, and it leaves the dock at exactly{" "}
            <b>8:30 PM</b>. Please be on board by <b>8:00 PM</b> so you don't
            miss the start.
          </p>
          <BoatScene diff={diff} />
        </Block>

        <Wave from={C.pearl} to={C.deep} />

        {/* BOARDING PASS */}
        <Block bg={C.deep} color={C.pearl} pad="24px 22px 56px">
          <h2
            style={{
              fontFamily: serif,
              fontStyle: "italic",
              fontWeight: 500,
              fontSize: 32,
              margin: "0 0 22px",
            }}
          >
            Your boarding pass
          </h2>
          <Ticket />
        </Block>

        <Wave from={C.deep} to={C.night} />

        {/* VOYAGE LOG */}
        <Block bg={C.night} color={C.pearl} pad="24px 26px 56px">
          <h2
            style={{
              fontFamily: serif,
              fontStyle: "italic",
              fontWeight: 500,
              fontSize: 32,
              margin: "0 0 22px",
            }}
          >
            Our evening
          </h2>
          <Voyage />
        </Block>

        <Wave from={C.night} to={C.pearl} />

        {/* VENUE + RSVP */}
        <Block bg={C.pearl} color={C.night} pad="24px 26px 56px">
          <div style={{ fontFamily: sans, fontSize: 13, opacity: 0.7 }}>
            Find us at
          </div>
          <div
            style={{
              fontFamily: serif,
              fontStyle: "italic",
              fontWeight: 500,
              fontSize: 40,
              margin: "4px 0",
            }}
          >
            Liberty
          </div>
          <div style={{ fontFamily: sans, fontSize: 15 }}>
            The Nile Anchor, Cairo
          </div>
          <a
            href={MAPS_LINK}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: "inline-block",
              marginTop: 16,
              padding: "11px 24px",
              borderRadius: 40,
              border: `1.5px solid ${C.night}`,
              color: C.night,
              textDecoration: "none",
              fontFamily: sans,
              fontWeight: 500,
              fontSize: 14,
            }}
          >
            Open in Google Maps
          </a>

          <div
            style={{
              width: 40,
              height: 3,
              borderRadius: 2,
              background: C.coral,
              margin: "40px auto 28px",
            }}
          />

          <h2
            style={{
              fontFamily: serif,
              fontStyle: "italic",
              fontWeight: 500,
              fontSize: 32,
              margin: "0 0 8px",
            }}
          >
            Will you join us?
          </h2>
          <p
            style={{
              fontFamily: sans,
              fontSize: 14,
              opacity: 0.75,
              margin: "0 0 20px",
            }}
          >
            Confirm your attendance so we can save you a seat on board.
          </p>
          <a
            href={WHATSAPP_LINK}
            style={{
              display: "inline-block",
              padding: "13px 28px",
              borderRadius: 40,
              background: C.night,
              color: C.pearl,
              textDecoration: "none",
              fontFamily: sans,
              fontWeight: 600,
              fontSize: 15,
            }}
          >
            Join our WhatsApp group
          </a>
        </Block>

        <Wave from={C.pearl} to={C.deep} />

        {/* NOTE + FOOTER */}
        <Block bg={C.deep} color={C.pearl} pad="24px 30px 64px">
          <h2
            style={{
              fontFamily: serif,
              fontStyle: "italic",
              fontWeight: 500,
              fontSize: 32,
              margin: "0 0 18px",
            }}
          >
            A note from us
          </h2>
          <p
            style={{
              fontFamily: serif,
              fontWeight: 300,
              fontSize: 17,
              lineHeight: 1.85,
              margin: 0,
              opacity: 0.92,
            }}
          >
            To our dearest family and friends,
            <br />
            <br />
            After the engagement, we could not wait for this night. We want to
            begin our life together surrounded by the people who made us who we
            are, with the Nile beneath us and all of you beside us.
            <br />
            <br />
            Come early, dress for a night on the water, and help us make a
            memory we will never forget.
          </p>
          <div
            style={{
              fontFamily: serif,
              fontStyle: "italic",
              fontSize: 26,
              color: C.amber,
              marginTop: 28,
            }}
          >
            With all our love,
            <br />
            Abdallah &amp; Sohaila
          </div>
          <div
            style={{
              fontFamily: sans,
              fontSize: 12,
              opacity: 0.6,
              marginTop: 28,
            }}
          >
            25 · 12 · 2026
          </div>
        </Block>
      </div>
    </>
  );
}
