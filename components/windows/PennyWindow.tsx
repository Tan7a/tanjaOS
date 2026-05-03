"use client";

const SERIF = '"Georgia", "Times New Roman", Times, serif';
const PAPER = "#FBF6E8";
const INK = "#2A2620";
const RULE = "#D6C9A8";
const LINK = "#1A3A6B";
const MUTED = "#8B7355";

interface Polaroid {
  src: string;
  alt: string;
  caption: string;
  /** Tilt in degrees. Alternates left/right naturally. */
  tilt: number;
  /** Render at a larger size — used for the grandma photo. */
  feature?: boolean;
}

const PHOTOS: Polaroid[] = [
  {
    src: "/Penny/frog-toy.jpg",
    alt: "Penny on her bed with her green frog toy",
    caption: "her frog, her bed, her kingdom",
    tilt: -2.5,
  },
  {
    src: "/Penny/passport.jpg",
    alt: "Penny with her Montenegro pet passport",
    caption: "ready for adventures ❤",
    tilt: 2,
  },
  {
    src: "/Penny/with-grandma.jpg",
    alt: "Penny with grandma in the kitchen",
    caption: "with grandma",
    tilt: -1.5,
    feature: true,
  },
  {
    src: "/Penny/flowers.jpg",
    alt: "Penny running through a flowery field",
    caption: "stop and smell the flowers",
    tilt: 2.5,
  },
  {
    src: "/Penny/lustica.jpg",
    alt: "Penny by the sea at sunset, Luštica peninsula, Montenegro",
    caption: "back home, watching the sea",
    tilt: -2,
  },
];

export default function PennyWindow() {
  return (
    <div
      style={{
        flex: 1,
        minHeight: 0,
        overflowY: "auto",
        background: "#7A98C8",
        padding: "12px 0 24px",
      }}
    >
      <article
        style={{
          maxWidth: 540,
          margin: "0 auto",
          background: PAPER,
          border: "1px solid #B8A678",
          padding: "22px 28px 32px",
          fontFamily: SERIF,
          fontSize: 13,
          lineHeight: 1.65,
          color: INK,
        }}
      >
        {/* Blog header */}
        <header
          style={{
            paddingBottom: 14,
            borderBottom: `1px dashed ${RULE}`,
          }}
        >
          <h1
            style={{
              margin: 0,
              fontFamily: SERIF,
              fontStyle: "italic",
              fontWeight: "normal",
              fontSize: 28,
              color: LINK,
              lineHeight: 1.1,
            }}
          >
            Penny
          </h1>
          <p
            style={{
              margin: "4px 0 0",
              fontSize: 11,
              fontStyle: "italic",
              color: MUTED,
            }}
          >
            my dog · adopted me in 2022 · named after Penny Lane
          </p>
        </header>

        {/* Adoring intro */}
        <section style={{ paddingTop: 18 }}>
          <p style={{ margin: 0 }}>
            This is Penny, named after the Beatles song. She found me in 2022,
            in front of my apartment building in Montenegro. She followed me
            home, sat down at my door, and decided she was staying. I'd been
            thinking about adopting a dog for a while. She made the decision
            for me.
          </p>
          <p style={{ margin: "12px 0 0" }}>
            The next day at the vet I learned she was healthy, but that she'd
            been chipped to a previous owner. We called him. He shouted that
            he'd thrown her on the street and didn't care what I did with her.
            We worked out she'd been on her own for around nine months. She
            still limps on one leg sometimes; I'll never know why.
          </p>
          <p style={{ margin: "12px 0 0" }}>
            She's lived like a queen ever since. We've taken her to Albania,
            Italy, France, and Spain. We've gone back to Montenegro too, where
            she sat on the rocks at sunset and looked at the sea like she'd
            never seen anything more peaceful. She's the happiest, kindest dog
            I've ever met. After everything that happened to her, she still
            loves people. She teaches me gratitude and kindness every day.
          </p>
        </section>

        {/* Photo album */}
        <section
          style={{
            marginTop: 24,
            paddingTop: 18,
            borderTop: `1px dotted ${RULE}`,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 28,
          }}
        >
          {PHOTOS.map((p) => (
            <Polaroid key={p.src} photo={p} />
          ))}
        </section>
      </article>
    </div>
  );
}

function Polaroid({ photo }: { photo: Polaroid }) {
  const width = photo.feature ? 360 : 300;
  return (
    <figure
      style={{
        margin: 0,
        width,
        background: "#FFFFFF",
        padding: "10px 10px 0",
        boxShadow: "2px 3px 8px rgba(0, 0, 0, 0.25)",
        transform: `rotate(${photo.tilt}deg)`,
      }}
    >
      <img
        src={photo.src}
        alt={photo.alt}
        style={{
          display: "block",
          width: "100%",
          height: "auto",
          background: "#E8E4D8",
        }}
      />
      <figcaption
        style={{
          fontFamily: SERIF,
          fontStyle: "italic",
          fontSize: 13,
          color: "#3A3A3A",
          textAlign: "center",
          padding: "10px 6px 14px",
        }}
      >
        {photo.caption}
      </figcaption>
    </figure>
  );
}
