export type Track = {
  id: string;
  title: string;
  artist: string;
  src: string;
  cover?: string;
};

export const TRACKS: Track[] = [
  {
    id: "complicated",
    title: "Complicated",
    artist: "Avril Lavigne",
    src: "/music/Avril Lavigne - Complicated (Lyrics).mp3",
  },
  {
    id: "since-u-been-gone",
    title: "Since U Been Gone",
    artist: "Kelly Clarkson",
    src: "/music/Kelly Clarkson - Since U Been Gone (Lyrics).mp3",
  },
  {
    id: "bring-me-to-life",
    title: "Bring Me To Life",
    artist: "Evanescence",
    src: "/music/Evanescence - Bring Me To Life.mp3",
  },
  {
    id: "mr-brightside",
    title: "Mr. Brightside",
    artist: "The Killers",
    src: "/music/The Killers - Mr. Brightside (Official Music Video).mp3",
  },
  {
    id: "all-the-things-she-said",
    title: "All The Things She Said",
    artist: "t.A.T.u.",
    src: "/music/Tatu - All The Things She Said (Lyrics)  Running through my head.mp3",
  },
  {
    id: "untouched",
    title: "Untouched",
    artist: "The Veronicas",
    src: "/music/The Veronicas - Untouched (Official Music Video).mp3",
  },
  {
    id: "this-aint-a-scene",
    title: "This Ain't a Scene, It's an Arms Race",
    artist: "Fall Out Boy",
    src: "/music/Fall Out Boy - This aint a scene Its an arms race - lyrics.mp3",
  },
];
