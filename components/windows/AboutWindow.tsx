"use client";

import { UserAvatarIcon } from "@/components/icons/AppIcons";

const TAGLINE = "uncool, sentimental, unserious, on purpose";

const ENTRIES: { title: string; body: string }[] = [
  {
    title: "who i am",
    body:
      "I'm a UX/product designer and HCI PhD candidate. I partner with AI startups on the messy bit, when the technology is impressive but somehow isn't translating into something humans actually want to use. My day job is figuring out why people pick up some AI tools and quietly drop others. So far that's 345 people across 46 countries and a stack of interface audits taller than I'd like to admit. Before this I was at Pattern Brands designing across seven e-commerce sites. This site is the opposite of all of that. A place where I get to be uncool, sentimental, and unserious on purpose.",
  },
  {
    title: "where i grew up",
    body:
      "Montenegro. Small country, long coastline, mountains in every window. As a teenager I collected magazines about technology and phones, not because I wanted the gadgets, but because I wanted to understand what people thought about them. (Some things don't change.) I studied architecture before I switched to interaction design; somewhere in between I made a digital art project called Emotional Maps and have been quietly asking the same question ever since: how does technology reflect who we are? The family computer ran Windows XP. I played DX-Ball after school. I dragged things into folders for fun. Most of my career started at that desk.",
  },
  {
    title: "what i'm into now",
    body:
      "Based in L'Aquila, Italy. Hiking the Montenegrin mountains whenever I can sneak away. Currently reading Empire of AI by Karen Hao, which is making me think harder about what I'm building. Cooking experiments that go either great or extremely poorly. Mumford and Sons on heavy rotation, as always. Counting the days until a Paul McCartney concert in Paris. Forty-plus countries down, plenty more on the list.",
  },
];

const SERIF = '"Georgia", "Times New Roman", Times, serif';
const PAPER = "#FBF6E8";
const INK = "#2A2620";
const RULE = "#D6C9A8";
const LINK = "#1A3A6B";
const MUTED = "#8B7355";

export default function AboutWindow() {
  return (
    <div
      style={{
        flex: 1,
        minHeight: 0,
        overflowY: "auto",
        background: "#7A98C8",
        padding: "12px 0",
      }}
    >
      <article
        style={{
          maxWidth: 540,
          margin: "0 auto",
          background: PAPER,
          border: "1px solid #B8A678",
          padding: "22px 28px 28px",
          fontFamily: SERIF,
          fontSize: 13,
          lineHeight: 1.65,
          color: INK,
        }}
      >
        {/* Blog header */}
        <header
          style={{
            display: "flex",
            alignItems: "center",
            gap: 14,
            paddingBottom: 14,
            borderBottom: `1px dashed ${RULE}`,
          }}
        >
          <div
            style={{
              width: 56,
              height: 56,
              padding: 2,
              background: "#FFFFFF",
              border: `1px solid ${RULE}`,
              flexShrink: 0,
            }}
          >
            <UserAvatarIcon size={50} />
          </div>
          <div>
            <h1
              style={{
                margin: 0,
                fontFamily: SERIF,
                fontStyle: "italic",
                fontWeight: "normal",
                fontSize: 24,
                color: LINK,
                lineHeight: 1.1,
              }}
            >
              tanja's blog
            </h1>
            <p
              style={{
                margin: "4px 0 0",
                fontSize: 11,
                fontStyle: "italic",
                color: MUTED,
              }}
            >
              {TAGLINE}
            </p>
          </div>
        </header>

        {ENTRIES.map((entry, i) => (
          <section
            key={entry.title}
            style={{
              paddingTop: 18,
              paddingBottom: i < ENTRIES.length - 1 ? 18 : 0,
              borderBottom:
                i < ENTRIES.length - 1 ? `1px dotted ${RULE}` : "none",
            }}
          >
            <h2
              style={{
                margin: 0,
                fontFamily: SERIF,
                fontStyle: "italic",
                fontWeight: "normal",
                fontSize: 17,
                color: LINK,
                textDecoration: "underline",
              }}
            >
              {entry.title}
            </h2>
            <p
              style={{
                margin: "2px 0 10px",
                fontSize: 10.5,
                fontStyle: "italic",
                color: MUTED,
                fontFamily: SERIF,
              }}
            >
              posted by tanja · filed under: about me
            </p>
            <p style={{ margin: 0 }}>{entry.body}</p>
          </section>
        ))}
      </article>
    </div>
  );
}
