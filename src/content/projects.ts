export type ProjectCategory =
  | "architecture"
  | "interior"
  | "bim"
  | "urban-design";

export type ProjectGalleryImage = {
  src: string;
  alt: string;
  width?: number;
  height?: number;
};

export type Project = {
  id: string;
  slug: string;
  title: string;
  category: ProjectCategory;
  subcategory?: string;
  location?: string;
  completionYear?: string;
  area?: string;
  client?: string;
  services?: string[];
  shortDescription?: string;
  description?: string | string[];
  coverImage: string;
  coverAlt?: string;
  coverWidth?: number;
  coverHeight?: number;
  coverPosition?: string;
  gallery: ProjectGalleryImage[];
  featured: boolean;
  displayOrder: number;
  cardAspect?: "portrait" | "square" | "landscape";
  sourceFolder?: string;
};

export const projectCategoryLabels: Record<ProjectCategory, string> = {
  architecture: "Architecture",
  interior: "Interior",
  bim: "BIM",
  "urban-design": "Urban Design",
};

export const projectCategories: ProjectCategory[] = [
  "architecture",
  "interior",
  "bim",
  "urban-design",
];

const projects: Project[] = [
  {
    id: "ashatapad-40x108",
    slug: "ashatapad-40x108",
    title: "Ashatapad 40×108",
    category: "architecture",
    sourceFolder: "project-source/architecture/ASHTAPAD 40X108",
    coverImage: "/projects/architecture/ashatapad-40x108/cover.webp",
    coverAlt: "Daytime exterior view of a multi-storey residential building",
    coverWidth: 1697,
    coverHeight: 2099,
    gallery: [
      {
        src: "/projects/architecture/ashatapad-40x108/01.webp",
        alt: "Evening exterior view of a multi-storey residential building",
        width: 1697,
        height: 2106,
      },
      {
        src: "/projects/architecture/ashatapad-40x108/02.webp",
        alt: "Isometric view of ground-level parking and site layout",
        width: 1697,
        height: 1840,
      },
      {
        src: "/projects/architecture/ashatapad-40x108/03.webp",
        alt: "Isometric apartment layout with living and bedroom spaces",
        width: 1697,
        height: 1840,
      },
      {
        src: "/projects/architecture/ashatapad-40x108/04.webp",
        alt: "Isometric apartment layout with rooms arranged around a central living area",
        width: 1697,
        height: 1900,
      },
      {
        src: "/projects/architecture/ashatapad-40x108/05.webp",
        alt: "Isometric terrace-level view with landscaped outdoor areas",
        width: 1697,
        height: 1653,
      },
      {
        src: "/projects/architecture/ashatapad-40x108/06.webp",
        alt: "Isometric typical floor layout with multiple apartments",
        width: 1697,
        height: 1768,
      },
    ],
    featured: true,
    displayOrder: 10,
    cardAspect: "portrait",
  },
  {
    id: "ashatapad-jineshwar",
    slug: "ashatapad-jineshwar",
    title: "Ashatapad Jineshwar",
    category: "architecture",
    sourceFolder: "project-source/architecture/ASHTAPAD JINESHWAR-completion 24-bengaluru-45000 sqft",
    location: "Bengaluru",
    completionYear: "2024",
    area: "45,000 sq. ft.",
    coverImage: "/projects/architecture/ashatapad-jineshwar/cover.webp",
    coverAlt: "Evening exterior view of a multi-storey residential building",
    coverWidth: 1800,
    coverHeight: 2400,
    gallery: [
      {
        src: "/projects/architecture/ashatapad-jineshwar/01.webp",
        alt: "Daytime exterior view of a multi-storey residential building",
        width: 1800,
        height: 2400,
      },
      {
        src: "/projects/architecture/ashatapad-jineshwar/02.webp",
        alt: "Isometric apartment interior layout with living and bedroom spaces",
        width: 2400,
        height: 1801,
      },
      {
        src: "/projects/architecture/ashatapad-jineshwar/03.webp",
        alt: "Isometric apartment layout with balcony and multiple rooms",
        width: 2400,
        height: 1800,
      },
      {
        src: "/projects/architecture/ashatapad-jineshwar/04.webp",
        alt: "Isometric outdoor terrace and recreation area",
        width: 2400,
        height: 1800,
      },
    ],
    featured: true,
    displayOrder: 11,
    cardAspect: "portrait",
  },
  {
    id: "dev-samar",
    slug: "dev-samar",
    title: "Dev Samar",
    category: "interior",
    sourceFolder: "project-source/interior/DEV SAMAR",
    coverImage: "/projects/interior/dev-samar/cover.webp",
    coverAlt: "Bedroom interior with bed, wall panels, and concealed ceiling lighting",
    coverWidth: 1280,
    coverHeight: 1280,
    gallery: [
      {
        src: "/projects/interior/dev-samar/01.webp",
        alt: "Bedroom interior with bed and warm textured feature wall",
        width: 1280,
        height: 960,
      },
      {
        src: "/projects/interior/dev-samar/02.webp",
        alt: "Bedroom interior with bed, wardrobe wall, and grey feature panel",
        width: 1280,
        height: 960,
      },
      {
        src: "/projects/interior/dev-samar/03.webp",
        alt: "Bedroom television wall with concealed lighting and bed foreground",
        width: 1280,
        height: 1280,
      },
      {
        src: "/projects/interior/dev-samar/04.webp",
        alt: "Kitchen interior with grey lower cabinets and yellow backsplash lighting",
        width: 1280,
        height: 960,
      },
      {
        src: "/projects/interior/dev-samar/05.webp",
        alt: "Kitchen interior with black stone backsplash and orange accent lighting",
        width: 1280,
        height: 960,
      },
      {
        src: "/projects/interior/dev-samar/06.webp",
        alt: "Study area with long desk, window, and display shelves",
        width: 1920,
        height: 1080,
      },
      {
        src: "/projects/interior/dev-samar/07.webp",
        alt: "Study room corner with desk, shelving, and display board",
        width: 1280,
        height: 1280,
      },
      {
        src: "/projects/interior/dev-samar/08.webp",
        alt: "Bedroom television wall with floating console and warm lighting",
        width: 1280,
        height: 960,
      },
    ],
    featured: false,
    displayOrder: 12,
    cardAspect: "portrait",
  },
  {
    id: "nihalji-chopra",
    slug: "nihalji-chopra",
    title: "Nihalji Chopra",
    category: "interior",
    sourceFolder: "project-source/interior/NIHALJI CHOPRA-ongoing - bengaluru - 4250 sq ft",
    location: "Bengaluru",
    area: "4,250 sq. ft.",
    coverImage: "/projects/interior/nihalji-chopra/cover.webp",
    coverAlt: "Living area with curved media wall and lounge seating",
    coverWidth: 929,
    coverHeight: 907,
    gallery: [
      {
        src: "/projects/interior/nihalji-chopra/01.webp",
        alt: "Living area with curved ceiling lighting and lounge seating",
        width: 921,
        height: 899,
      },
      {
        src: "/projects/interior/nihalji-chopra/02.webp",
        alt: "Bedroom interior with bed and curved wall detail",
        width: 944,
        height: 907,
      },
      {
        src: "/projects/interior/nihalji-chopra/03.webp",
        alt: "Bedroom interior with timber headboard and ceiling fan",
        width: 916,
        height: 907,
      },
      {
        src: "/projects/interior/nihalji-chopra/04.webp",
        alt: "Bedroom study area beside a window",
        width: 944,
        height: 907,
      },
      {
        src: "/projects/interior/nihalji-chopra/05.webp",
        alt: "Bathroom interior with vanity mirror and shower area",
        width: 726,
        height: 915,
      },
      {
        src: "/projects/interior/nihalji-chopra/06.webp",
        alt: "Walk-in wardrobe with glass-front storage",
        width: 813,
        height: 1280,
      },
      {
        src: "/projects/interior/nihalji-chopra/07.webp",
        alt: "Bedroom with a bunk bed and soft pink wall treatment",
        width: 767,
        height: 907,
      },
      {
        src: "/projects/interior/nihalji-chopra/08.webp",
        alt: "Kitchen interior with light cabinetry and a long window",
        width: 981,
        height: 899,
      },
    ],
    featured: false,
    displayOrder: 13,
    cardAspect: "square",
  },
  {
    id: "vijay-nagar",
    slug: "vijay-nagar",
    title: "Vijay Nagar",
    category: "urban-design",
    sourceFolder: "project-source/urban-design/VIJAY NAGAR-COMPLETED2023 -KALBURGI-43 ACRES",
    location: "Kalburgi",
    completionYear: "2023",
    area: "43 acres",
    coverImage: "/projects/urban-design/vijay-nagar/cover.webp",
    coverAlt: "Wide aerial view of a plotted urban development",
    coverWidth: 1500,
    coverHeight: 844,
    gallery: [
      {
        src: "/projects/urban-design/vijay-nagar/01.webp",
        alt: "Aerial view of a landscaped urban park within a plotted development",
        width: 867,
        height: 410,
      },
      {
        src: "/projects/urban-design/vijay-nagar/02.webp",
        alt: "Aerial view of green plots and internal roads",
        width: 623,
        height: 410,
      },
      {
        src: "/projects/urban-design/vijay-nagar/03.webp",
        alt: "Aerial view of play areas and surrounding plots",
        width: 770,
        height: 480,
      },
      {
        src: "/projects/urban-design/vijay-nagar/04.webp",
        alt: "Aerial view of plotted streets beside dense trees",
        width: 727,
        height: 480,
      },
      {
        src: "/projects/urban-design/vijay-nagar/05.webp",
        alt: "Exterior view of a low building with a broad roof canopy",
        width: 1144,
        height: 645,
      },
      {
        src: "/projects/urban-design/vijay-nagar/06.webp",
        alt: "Entrance gateway rendered at evening",
        width: 853,
        height: 480,
      },
      {
        src: "/projects/urban-design/vijay-nagar/07.webp",
        alt: "Decorative chessboard installation with chess pieces",
        width: 960,
        height: 549,
      },
    ],
    featured: false,
    displayOrder: 14,
    cardAspect: "landscape",
  },
  {
    id: "ashatapad-36x56",
    slug: "ashatapad-36x56",
    title: "Ashatapad 36×56",
    category: "architecture",
    sourceFolder: "project-source/architecture/ASHTAPAD 36X56",
    coverImage: "/projects/architecture/ashatapad-36x56/cover.webp",
    coverAlt: "Daytime exterior view of a multi-storey residential building",
    coverWidth: 1650,
    coverHeight: 2293,
    gallery: [
      {
        src: "/projects/architecture/ashatapad-36x56/01.webp",
        alt: "Night exterior view of a multi-storey residential building",
        width: 1650,
        height: 2293,
      },
      {
        src: "/projects/architecture/ashatapad-36x56/02.webp",
        alt: "Cut-section view of a residential building and site",
        width: 2400,
        height: 1500,
      },
      {
        src: "/projects/architecture/ashatapad-36x56/03.webp",
        alt: "Typical cut-section view of a residential building",
        width: 2400,
        height: 1500,
      },
      {
        src: "/projects/architecture/ashatapad-36x56/04.webp",
        alt: "Parking-level cut-section drawing",
        width: 1408,
        height: 792,
      },
      {
        src: "/projects/architecture/ashatapad-36x56/05.webp",
        alt: "Top view of parking-level layout",
        width: 1408,
        height: 792,
      },
      {
        src: "/projects/architecture/ashatapad-36x56/06.webp",
        alt: "Terrace-level cut-section drawing",
        width: 1408,
        height: 792,
      },
      {
        src: "/projects/architecture/ashatapad-36x56/07.webp",
        alt: "Top view of terrace-level layout",
        width: 1408,
        height: 792,
      },
    ],
    featured: false,
    displayOrder: 15,
    cardAspect: "portrait",
  },
  {
    id: "ashatapad-sankalp",
    slug: "ashatapad-sankalp",
    title: "Ashatapad Sankalp",
    category: "architecture",
    sourceFolder: "project-source/architecture/ASHTAPAD SANKALP",
    coverImage: "/projects/architecture/ashatapad-sankalp/cover.webp",
    coverAlt: "Night exterior view of a multi-storey residential building",
    coverWidth: 1440,
    coverHeight: 1920,
    gallery: [
      {
        src: "/projects/architecture/ashatapad-sankalp/01.webp",
        alt: "Isometric apartment layout with living and bedroom spaces",
        width: 2400,
        height: 1800,
      },
      {
        src: "/projects/architecture/ashatapad-sankalp/02.webp",
        alt: "Isometric apartment layout with multiple bedrooms",
        width: 2400,
        height: 1800,
      },
      {
        src: "/projects/architecture/ashatapad-sankalp/03.webp",
        alt: "Isometric apartment layout with kitchen and bedroom spaces",
        width: 2400,
        height: 1800,
      },
      {
        src: "/projects/architecture/ashatapad-sankalp/04.webp",
        alt: "Isometric apartment layout with dining and bedroom spaces",
        width: 2400,
        height: 1800,
      },
      {
        src: "/projects/architecture/ashatapad-sankalp/05.webp",
        alt: "Isometric apartment layout with balcony and living spaces",
        width: 2400,
        height: 1800,
      },
      {
        src: "/projects/architecture/ashatapad-sankalp/06.webp",
        alt: "Cut-section view of a residential building",
        width: 2400,
        height: 1800,
      },
    ],
    featured: false,
    displayOrder: 16,
    cardAspect: "portrait",
  },
  {
    id: "ashatapad-siddhasheela",
    slug: "ashatapad-siddhasheela",
    title: "Ashatapad Siddhasheela",
    category: "architecture",
    sourceFolder: "project-source/architecture/ASHTAPAD SIDDHASHEELA",
    coverImage: "/projects/architecture/ashatapad-siddhasheela/cover.webp",
    coverAlt: "Daytime exterior view of a tall residential building",
    coverWidth: 1350,
    coverHeight: 2400,
    gallery: [
      {
        src: "/projects/architecture/ashatapad-siddhasheela/01.webp",
        alt: "Night exterior view of a tall residential building",
        width: 1350,
        height: 2400,
      },
      {
        src: "/projects/architecture/ashatapad-siddhasheela/02.webp",
        alt: "Isometric residential building render with outdoor context",
        width: 2400,
        height: 1800,
      },
      {
        src: "/projects/architecture/ashatapad-siddhasheela/03.webp",
        alt: "Parking-level cut-section drawing",
        width: 1920,
        height: 1440,
      },
    ],
    featured: false,
    displayOrder: 17,
    cardAspect: "portrait",
  },
  {
    id: "ashatapad-sitara",
    slug: "ashatapad-sitara",
    title: "Ashatapad Sitara",
    category: "architecture",
    sourceFolder: "project-source/architecture/ASHTAPAD SITARA",
    coverImage: "/projects/architecture/ashatapad-sitara/cover.webp",
    coverAlt: "Daytime exterior view of a residential building with balconies",
    coverWidth: 1800,
    coverHeight: 2400,
    gallery: [
      {
        src: "/projects/architecture/ashatapad-sitara/01.webp",
        alt: "Night exterior view of a residential building with balconies",
        width: 1800,
        height: 2400,
      },
      {
        src: "/projects/architecture/ashatapad-sitara/02.webp",
        alt: "Isometric cut-section view of residential floors",
        width: 2400,
        height: 1801,
      },
      {
        src: "/projects/architecture/ashatapad-sitara/03.webp",
        alt: "Isometric site and parking-level layout",
        width: 2400,
        height: 1800,
      },
    ],
    featured: false,
    displayOrder: 18,
    cardAspect: "portrait",
  },
  {
    id: "jineshwar-height",
    slug: "jineshwar-height",
    title: "Jineshwar Height",
    category: "architecture",
    sourceFolder: "project-source/architecture/JINESHWAR HEIGHT",
    coverImage: "/projects/architecture/jineshwar-height/cover.webp",
    coverAlt: "Daytime exterior view of a residential tower",
    coverWidth: 1668,
    coverHeight: 2400,
    gallery: [
      {
        src: "/projects/architecture/jineshwar-height/01.webp",
        alt: "Isometric residential building view with outdoor context",
        width: 2400,
        height: 1800,
      },
      {
        src: "/projects/architecture/jineshwar-height/02.webp",
        alt: "Isometric apartment layout with living and bedroom spaces",
        width: 2400,
        height: 1800,
      },
      {
        src: "/projects/architecture/jineshwar-height/03.webp",
        alt: "Isometric apartment layout with multiple rooms and balconies",
        width: 2400,
        height: 1800,
      },
      {
        src: "/projects/architecture/jineshwar-height/04.webp",
        alt: "Night exterior view of a residential tower",
        width: 1644,
        height: 2400,
      },
    ],
    featured: false,
    displayOrder: 19,
    cardAspect: "portrait",
  },
  {
    id: "movan-marvel",
    slug: "movan-marvel",
    title: "Movan Marvel",
    category: "architecture",
    sourceFolder: "project-source/architecture/MOVAN MARVEL",
    coverImage: "/projects/architecture/movan-marvel/cover.webp",
    coverAlt: "Exterior view of a residential building with balconies",
    coverWidth: 2400,
    coverHeight: 2400,
    gallery: [
      {
        src: "/projects/architecture/movan-marvel/01.webp",
        alt: "Evening exterior view of a residential building with balconies",
        width: 2400,
        height: 2400,
      },
      {
        src: "/projects/architecture/movan-marvel/02.webp",
        alt: "Isometric ground-level layout with parking and open areas",
        width: 2080,
        height: 2080,
      },
      {
        src: "/projects/architecture/movan-marvel/03.webp",
        alt: "Isometric apartment layout with living and bedroom spaces",
        width: 2080,
        height: 2080,
      },
      {
        src: "/projects/architecture/movan-marvel/04.webp",
        alt: "Isometric apartment layout with multiple rooms",
        width: 2080,
        height: 2080,
      },
      {
        src: "/projects/architecture/movan-marvel/05.webp",
        alt: "Isometric apartment layout with balcony and bedroom spaces",
        width: 2080,
        height: 2080,
      },
      {
        src: "/projects/architecture/movan-marvel/06.webp",
        alt: "Isometric terrace-level layout",
        width: 2080,
        height: 2080,
      },
      {
        src: "/projects/architecture/movan-marvel/07.webp",
        alt: "Isometric typical-floor layout",
        width: 2080,
        height: 2080,
      },
    ],
    featured: false,
    displayOrder: 20,
    cardAspect: "square",
  },
  {
    id: "movan-meru-shikhar",
    slug: "movan-meru-shikhar",
    title: "Movan Meru Shikhar",
    category: "architecture",
    sourceFolder: "project-source/architecture/MOVAN MERU SHIKHAR",
    coverImage: "/projects/architecture/movan-meru-shikhar/cover.webp",
    coverAlt: "Daytime exterior view of a residential building",
    coverWidth: 1801,
    coverHeight: 2400,
    gallery: [
      {
        src: "/projects/architecture/movan-meru-shikhar/01.webp",
        alt: "Typical-floor plan drawing",
        width: 2400,
        height: 1600,
      },
      {
        src: "/projects/architecture/movan-meru-shikhar/02.webp",
        alt: "Isometric apartment layout with living and bedroom spaces",
        width: 2400,
        height: 1800,
      },
      {
        src: "/projects/architecture/movan-meru-shikhar/03.webp",
        alt: "Isometric apartment layout with multiple bedrooms",
        width: 2400,
        height: 1800,
      },
      {
        src: "/projects/architecture/movan-meru-shikhar/04.webp",
        alt: "Isometric apartment layout with balcony and bedroom spaces",
        width: 2400,
        height: 1800,
      },
      {
        src: "/projects/architecture/movan-meru-shikhar/05.webp",
        alt: "Night exterior view of a residential building",
        width: 1801,
        height: 2400,
      },
    ],
    featured: false,
    displayOrder: 21,
    cardAspect: "portrait",
  },
  {
    id: "movan-odd",
    slug: "movan-odd",
    title: "Movan ODD",
    category: "architecture",
    sourceFolder: "project-source/architecture/MOVAN ODD",
    coverImage: "/projects/architecture/movan-odd/cover.webp",
    coverAlt: "Daytime exterior view of a residential building",
    coverWidth: 1609,
    coverHeight: 2126,
    gallery: [
      {
        src: "/projects/architecture/movan-odd/01.webp",
        alt: "Isometric site layout with building and outdoor spaces",
        width: 2295,
        height: 2171,
      },
      {
        src: "/projects/architecture/movan-odd/02.webp",
        alt: "Isometric residential building render with surrounding context",
        width: 2400,
        height: 1788,
      },
      {
        src: "/projects/architecture/movan-odd/03.webp",
        alt: "Isometric apartment layout with living and bedroom spaces",
        width: 2400,
        height: 1790,
      },
      {
        src: "/projects/architecture/movan-odd/04.webp",
        alt: "Isometric terrace-level layout",
        width: 2066,
        height: 2161,
      },
      {
        src: "/projects/architecture/movan-odd/05.webp",
        alt: "Isometric floor layout with rooms and circulation",
        width: 2400,
        height: 1787,
      },
      {
        src: "/projects/architecture/movan-odd/06.webp",
        alt: "Isometric building and floor layout view",
        width: 2400,
        height: 1801,
      },
      {
        src: "/projects/architecture/movan-odd/07.webp",
        alt: "Night exterior view of a residential building",
        width: 1594,
        height: 2126,
      },
    ],
    featured: false,
    displayOrder: 22,
    cardAspect: "portrait",
  },
  {
    id: "movan-siddhasheela",
    slug: "movan-siddhasheela",
    title: "Movan Siddhasheela",
    category: "architecture",
    sourceFolder: "project-source/architecture/MOVAN SIDDHASHEELA",
    coverImage: "/projects/architecture/movan-siddhasheela/cover.webp",
    coverAlt: "Daytime exterior view of a residential building",
    coverWidth: 2400,
    coverHeight: 2215,
    gallery: [
      {
        src: "/projects/architecture/movan-siddhasheela/01.webp",
        alt: "Typical cut-section view of residential floors",
        width: 2400,
        height: 1800,
      },
      {
        src: "/projects/architecture/movan-siddhasheela/02.webp",
        alt: "Isometric apartment layout with living and bedroom spaces",
        width: 2400,
        height: 1800,
      },
      {
        src: "/projects/architecture/movan-siddhasheela/03.webp",
        alt: "Isometric apartment layout with multiple rooms",
        width: 2400,
        height: 1800,
      },
      {
        src: "/projects/architecture/movan-siddhasheela/04.webp",
        alt: "Isometric apartment layout with balcony and room divisions",
        width: 2400,
        height: 1800,
      },
      {
        src: "/projects/architecture/movan-siddhasheela/05.webp",
        alt: "Isometric apartment layout with bedrooms and circulation",
        width: 2400,
        height: 1800,
      },
      {
        src: "/projects/architecture/movan-siddhasheela/06.webp",
        alt: "Terrace-level cut-section view",
        width: 2371,
        height: 1523,
      },
      {
        src: "/projects/architecture/movan-siddhasheela/07.webp",
        alt: "Night exterior view of a residential building",
        width: 2400,
        height: 2215,
      },
    ],
    featured: false,
    displayOrder: 23,
    cardAspect: "square",
  },
  {
    id: "movan-sitara",
    slug: "movan-sitara",
    title: "Movan Sitara",
    category: "architecture",
    sourceFolder: "project-source/architecture/MOVAN SITARA",
    coverImage: "/projects/architecture/movan-sitara/cover.webp",
    coverAlt: "Daytime exterior view of a residential building",
    coverWidth: 1800,
    coverHeight: 2400,
    gallery: [
      {
        src: "/projects/architecture/movan-sitara/01.webp",
        alt: "Night exterior view of a residential building",
        width: 1800,
        height: 2400,
      },
      {
        src: "/projects/architecture/movan-sitara/02.webp",
        alt: "Isometric apartment layout with living and bedroom spaces",
        width: 2400,
        height: 1800,
      },
      {
        src: "/projects/architecture/movan-sitara/03.webp",
        alt: "Isometric apartment layout with multiple bedrooms",
        width: 2400,
        height: 1800,
      },
      {
        src: "/projects/architecture/movan-sitara/04.webp",
        alt: "Ground-floor plan drawing",
        width: 1800,
        height: 2400,
      },
      {
        src: "/projects/architecture/movan-sitara/05.webp",
        alt: "Terrace-floor plan drawing",
        width: 1800,
        height: 2400,
      },
      {
        src: "/projects/architecture/movan-sitara/06.webp",
        alt: "Typical-floor cut-section drawing",
        width: 2400,
        height: 1800,
      },
      {
        src: "/projects/architecture/movan-sitara/07.webp",
        alt: "Typical-floor plan drawing",
        width: 1800,
        height: 2400,
      },
    ],
    featured: false,
    displayOrder: 24,
    cardAspect: "portrait",
  },
  {
    id: "movan-vajra",
    slug: "movan-vajra",
    title: "Movan Vajra",
    category: "architecture",
    sourceFolder: "project-source/architecture/MOVAN VAJRA",
    coverImage: "/projects/architecture/movan-vajra/cover.webp",
    coverAlt: "Daytime exterior view of a residential building",
    coverWidth: 1706,
    coverHeight: 2400,
    gallery: [
      {
        src: "/projects/architecture/movan-vajra/01.webp",
        alt: "Isometric ground-level layout with parking and outdoor spaces",
        width: 2400,
        height: 1800,
      },
      {
        src: "/projects/architecture/movan-vajra/02.webp",
        alt: "Isometric apartment layout with living and bedroom spaces",
        width: 2400,
        height: 1800,
      },
      {
        src: "/projects/architecture/movan-vajra/03.webp",
        alt: "Isometric apartment layout with bedrooms and circulation",
        width: 2400,
        height: 1800,
      },
      {
        src: "/projects/architecture/movan-vajra/04.webp",
        alt: "Isometric apartment layout with multiple rooms",
        width: 2400,
        height: 1800,
      },
      {
        src: "/projects/architecture/movan-vajra/05.webp",
        alt: "Typical-floor plan drawing",
        width: 2400,
        height: 1800,
      },
      {
        src: "/projects/architecture/movan-vajra/06.webp",
        alt: "Vertical typical-floor plan drawing",
        width: 1800,
        height: 2400,
      },
      {
        src: "/projects/architecture/movan-vajra/07.webp",
        alt: "Night exterior view of a residential building",
        width: 1800,
        height: 2400,
      },
    ],
    featured: false,
    displayOrder: 25,
    cardAspect: "portrait",
  },
  {
    id: "m-square",
    slug: "m-square",
    title: "M Square",
    category: "architecture",
    sourceFolder: "project-source/architecture/M SQUARE-completed 2026 - bengaluru-65800 sq ft",
    location: "Bengaluru",
    completionYear: "2026",
    area: "65,800 sq. ft.",
    coverImage: "/projects/architecture/m-square/cover.webp",
    coverAlt: "Daytime exterior view of a multi-storey commercial building",
    coverWidth: 2400,
    coverHeight: 1406,
    gallery: [
      {
        src: "/projects/architecture/m-square/01.webp",
        alt: "Evening exterior view of a multi-storey commercial building",
        width: 2400,
        height: 1406,
      },
      {
        src: "/projects/architecture/m-square/02.webp",
        alt: "Isometric ground-floor layout with interior spaces",
        width: 2400,
        height: 1350,
      },
      {
        src: "/projects/architecture/m-square/03.webp",
        alt: "Isometric first-floor layout with interior spaces",
        width: 2400,
        height: 1350,
      },
      {
        src: "/projects/architecture/m-square/04.webp",
        alt: "Isometric basement-level parking layout",
        width: 2400,
        height: 1350,
      },
      {
        src: "/projects/architecture/m-square/05.webp",
        alt: "Isometric terrace-level sports and outdoor layout",
        width: 2400,
        height: 1350,
      },
      {
        src: "/projects/architecture/m-square/06.webp",
        alt: "Isometric cut-plan view of interior spaces",
        width: 2400,
        height: 1350,
      },
    ],
    featured: false,
    displayOrder: 26,
    cardAspect: "landscape",
  },
  {
    id: "movan-shaswat",
    slug: "movan-shaswat",
    title: "Movan Shaswat",
    category: "architecture",
    sourceFolder: "project-source/architecture/MOVAN SHASWAT-COMPLETED 2025-BENGALURU-115000 SQFT",
    location: "Bengaluru",
    completionYear: "2025",
    area: "115,000 sq. ft.",
    coverImage: "/projects/architecture/movan-shaswat/cover.webp",
    coverAlt: "Daytime exterior view of a multi-storey residential building",
    coverWidth: 2400,
    coverHeight: 1695,
    gallery: [
      {
        src: "/projects/architecture/movan-shaswat/01.webp",
        alt: "Night exterior view of a multi-storey residential building",
        width: 2400,
        height: 1695,
      },
      {
        src: "/projects/architecture/movan-shaswat/02.webp",
        alt: "Typical-floor plan drawing with apartment layouts",
        width: 2400,
        height: 1695,
      },
      {
        src: "/projects/architecture/movan-shaswat/03.webp",
        alt: "Isometric apartment layout with living and bedroom spaces",
        width: 2400,
        height: 1695,
      },
      {
        src: "/projects/architecture/movan-shaswat/04.webp",
        alt: "Isometric apartment cut-section layout",
        width: 2400,
        height: 1695,
      },
      {
        src: "/projects/architecture/movan-shaswat/05.webp",
        alt: "Isometric apartment layout with balcony and bedrooms",
        width: 2400,
        height: 1695,
      },
      {
        src: "/projects/architecture/movan-shaswat/06.webp",
        alt: "Terrace-floor plan drawing",
        width: 2400,
        height: 1695,
      },
    ],
    featured: false,
    displayOrder: 27,
    cardAspect: "landscape",
  },
  {
    id: "serinity",
    slug: "serinity",
    title: "Serinity",
    category: "architecture",
    sourceFolder: "project-source/architecture/SERINITY",
    coverImage: "/projects/architecture/serinity/cover.webp",
    coverAlt: "Daytime exterior view of a residential building",
    coverWidth: 1800,
    coverHeight: 2400,
    gallery: [
      {
        src: "/projects/architecture/serinity/01.webp",
        alt: "Night exterior view of a residential building",
        width: 1800,
        height: 2400,
      },
      {
        src: "/projects/architecture/serinity/02.webp",
        alt: "Isometric apartment layout with living and bedroom spaces",
        width: 2400,
        height: 1800,
      },
      {
        src: "/projects/architecture/serinity/03.webp",
        alt: "Isometric apartment layout with bedrooms and circulation",
        width: 2400,
        height: 1800,
      },
      {
        src: "/projects/architecture/serinity/04.webp",
        alt: "Isometric apartment layout with multiple rooms",
        width: 2400,
        height: 1800,
      },
      {
        src: "/projects/architecture/serinity/05.webp",
        alt: "Floor plan drawing with multiple apartment layouts",
        width: 2400,
        height: 1800,
      },
      {
        src: "/projects/architecture/serinity/06.webp",
        alt: "Typical cut-section view of residential floors",
        width: 2400,
        height: 1800,
      },
    ],
    featured: false,
    displayOrder: 28,
    cardAspect: "portrait",
  },
  {
    id: "upasriya",
    slug: "upasriya",
    title: "Upasriya",
    category: "architecture",
    sourceFolder: "project-source/architecture/UPASRIYA-VIJAYAPURA-ONGOING-9850 SQ FT",
    location: "Vijayapura",
    area: "9,850 sq. ft.",
    coverImage: "/projects/architecture/upasriya/cover.webp",
    coverAlt: "Daytime exterior view of a public building facade",
    coverWidth: 2400,
    coverHeight: 2400,
    gallery: [
      {
        src: "/projects/architecture/upasriya/01.webp",
        alt: "Evening exterior view of a public building facade",
        width: 2400,
        height: 2400,
      },
      {
        src: "/projects/architecture/upasriya/02.webp",
        alt: "Daytime exterior view of a public building with signage",
        width: 2080,
        height: 2080,
      },
      {
        src: "/projects/architecture/upasriya/03.webp",
        alt: "Isometric building layout drawing",
        width: 933,
        height: 770,
      },
      {
        src: "/projects/architecture/upasriya/04.webp",
        alt: "First-floor isometric layout drawing",
        width: 2400,
        height: 2400,
      },
      {
        src: "/projects/architecture/upasriya/05.webp",
        alt: "Typical-floor isometric layout drawing",
        width: 2400,
        height: 2400,
      },
    ],
    featured: false,
    displayOrder: 29,
    cardAspect: "square",
  },
  {
    id: "vastu-park",
    slug: "vastu-park",
    title: "Vastu Park",
    category: "architecture",
    sourceFolder: "project-source/architecture/VASTU PARK",
    coverImage: "/projects/architecture/vastu-park/cover.webp",
    coverAlt: "Daytime exterior view of a multi-storey residential building",
    coverWidth: 1470,
    coverHeight: 1679,
    gallery: [
      {
        src: "/projects/architecture/vastu-park/01.webp",
        alt: "Night exterior view of a multi-storey residential building",
        width: 747,
        height: 889,
      },
      {
        src: "/projects/architecture/vastu-park/02.webp",
        alt: "Evening exterior view of a multi-storey residential building",
        width: 1470,
        height: 1679,
      },
      {
        src: "/projects/architecture/vastu-park/03.webp",
        alt: "Typical cut-section view of residential floors",
        width: 2400,
        height: 1350,
      },
      {
        src: "/projects/architecture/vastu-park/04.webp",
        alt: "Isometric apartment layout with living and bedroom spaces",
        width: 1413,
        height: 794,
      },
      {
        src: "/projects/architecture/vastu-park/05.webp",
        alt: "Isometric apartment layout with multiple rooms",
        width: 2400,
        height: 1350,
      },
      {
        src: "/projects/architecture/vastu-park/06.webp",
        alt: "Ground-level cut-section drawing",
        width: 1413,
        height: 794,
      },
      {
        src: "/projects/architecture/vastu-park/07.webp",
        alt: "Terrace-level cut-section drawing",
        width: 2400,
        height: 1350,
      },
    ],
    featured: false,
    displayOrder: 30,
    cardAspect: "portrait",
  },
  {
    id: "alpaji",
    slug: "alpaji",
    title: "Alpaji",
    category: "interior",
    sourceFolder: "project-source/interior/ALPAJI-BENGALURU-COMPLETED 2026-1600 SQ FT",
    location: "Bengaluru",
    completionYear: "2026",
    area: "1,600 sq. ft.",
    coverImage: "/projects/interior/alpaji/cover.webp",
    coverAlt: "Reception area with desk, seating, and warm wall lighting",
    coverWidth: 786,
    coverHeight: 886,
    gallery: [
      {
        src: "/projects/interior/alpaji/01.webp",
        alt: "Reception seating area with sofa and textured wall",
        width: 786,
        height: 886,
      },
      {
        src: "/projects/interior/alpaji/02.webp",
        alt: "Reception desk with warm ceiling and wall lighting",
        width: 785,
        height: 890,
      },
      {
        src: "/projects/interior/alpaji/03.webp",
        alt: "Workspace with desks, chairs, and wall storage",
        width: 795,
        height: 892,
      },
      {
        src: "/projects/interior/alpaji/04.webp",
        alt: "Television wall with curved panel and plant",
        width: 786,
        height: 888,
      },
      {
        src: "/projects/interior/alpaji/05.webp",
        alt: "Close view of reception sofa and textured wall",
        width: 793,
        height: 887,
      },
      {
        src: "/projects/interior/alpaji/06.webp",
        alt: "Reception counter with vertical wall paneling",
        width: 793,
        height: 843,
      },
    ],
    featured: false,
    displayOrder: 31,
    cardAspect: "portrait",
  },
  {
    id: "amit-jain",
    slug: "amit-jain",
    title: "Amit Jain",
    category: "interior",
    sourceFolder: "project-source/interior/AMIT JAIN-ongoing-bengaluru-2000 sqft",
    location: "Bengaluru",
    area: "2,000 sq. ft.",
    coverImage: "/projects/interior/amit-jain/cover.webp",
    coverAlt: "Living room with sofa, television wall, and curtain backdrop",
    coverWidth: 976,
    coverHeight: 895,
    gallery: [
      {
        src: "/projects/interior/amit-jain/01.webp",
        alt: "Television wall with vertical paneling and concealed lighting",
        width: 1040,
        height: 886,
      },
      {
        src: "/projects/interior/amit-jain/02.webp",
        alt: "Bedroom with bed and curved headboard lighting",
        width: 1018,
        height: 878,
      },
      {
        src: "/projects/interior/amit-jain/03.webp",
        alt: "Bedroom with bed, side table, and window seating",
        width: 1045,
        height: 890,
      },
      {
        src: "/projects/interior/amit-jain/04.webp",
        alt: "Bedroom corner with bed and window",
        width: 882,
        height: 891,
      },
      {
        src: "/projects/interior/amit-jain/05.webp",
        alt: "Bedroom with bed and long wardrobe wall",
        width: 883,
        height: 880,
      },
      {
        src: "/projects/interior/amit-jain/06.webp",
        alt: "Bedroom wardrobe and dressing area",
        width: 932,
        height: 898,
      },
      {
        src: "/projects/interior/amit-jain/07.webp",
        alt: "Bedroom with bed, wall lighting, and curtains",
        width: 926,
        height: 894,
      },
      {
        src: "/projects/interior/amit-jain/08.webp",
        alt: "Bedroom study area with desk and wall storage",
        width: 932,
        height: 888,
      },
    ],
    featured: false,
    displayOrder: 32,
    cardAspect: "square",
  },
  {
    id: "arihant-medical",
    slug: "arihant-medical",
    title: "Arihant Medical",
    category: "interior",
    sourceFolder: "project-source/interior/ARIHANT MEDICAL",
    coverImage: "/projects/interior/arihant-medical/cover.webp",
    coverAlt: "Pharmacy interior with counter and wall shelving",
    coverWidth: 1400,
    coverHeight: 1050,
    gallery: [
      {
        src: "/projects/interior/arihant-medical/01.webp",
        alt: "Pharmacy interior with shelving and work counter",
        width: 1200,
        height: 1400,
      },
      {
        src: "/projects/interior/arihant-medical/02.webp",
        alt: "Exterior storefront view of a pharmacy",
        width: 1200,
        height: 1400,
      },
      {
        src: "/projects/interior/arihant-medical/03.webp",
        alt: "Exterior pharmacy facade with display window",
        width: 1400,
        height: 1050,
      },
      {
        src: "/projects/interior/arihant-medical/04.webp",
        alt: "Pharmacy counter and illuminated product shelving",
        width: 1200,
        height: 1400,
      },
      {
        src: "/projects/interior/arihant-medical/05.webp",
        alt: "Pharmacy counter with shelving and display lighting",
        width: 1200,
        height: 1400,
      },
      {
        src: "/projects/interior/arihant-medical/06.webp",
        alt: "Pharmacy facade with signage and glass storefront",
        width: 1600,
        height: 1200,
      },
    ],
    featured: false,
    displayOrder: 33,
    cardAspect: "landscape",
  },
  {
    id: "bheru-nagori",
    slug: "bheru-nagori",
    title: "Bheru Nagori",
    category: "interior",
    sourceFolder: "project-source/interior/BHERU NAGORI",
    coverImage: "/projects/interior/bheru-nagori/cover.webp",
    coverAlt: "Living room with sofa, artwork, and track lighting",
    coverWidth: 1262,
    coverHeight: 960,
    gallery: [
      {
        src: "/projects/interior/bheru-nagori/01.webp",
        alt: "Living room with sofa and feature wall",
        width: 1280,
        height: 960,
      },
      {
        src: "/projects/interior/bheru-nagori/02.webp",
        alt: "Bedroom with bed, shelving, and soft curtains",
        width: 1920,
        height: 1440,
      },
      {
        src: "/projects/interior/bheru-nagori/03.webp",
        alt: "Bedroom with bed and curved headboard",
        width: 1280,
        height: 960,
      },
      {
        src: "/projects/interior/bheru-nagori/04.webp",
        alt: "Bedroom with bed, study desk, and wall shelving",
        width: 1280,
        height: 960,
      },
      {
        src: "/projects/interior/bheru-nagori/05.webp",
        alt: "Wardrobe wall with timber doors",
        width: 1280,
        height: 960,
      },
      {
        src: "/projects/interior/bheru-nagori/06.webp",
        alt: "Kitchen interior with grey cabinetry and dark backsplash",
        width: 1920,
        height: 1440,
      },
      {
        src: "/projects/interior/bheru-nagori/07.webp",
        alt: "Kitchen interior with tall storage and appliances",
        width: 1280,
        height: 960,
      },
    ],
    featured: false,
    displayOrder: 34,
    cardAspect: "landscape",
  },
  {
    id: "delta-laminates",
    slug: "delta-laminates",
    title: "Delta Laminates",
    category: "interior",
    sourceFolder: "project-source/interior/DELTA LAMINATES,BANGALORE-completed-2022 - 1750 sq ft",
    location: "Bangalore",
    completionYear: "2022",
    area: "1,750 sq. ft.",
    coverImage: "/projects/interior/delta-laminates/cover.webp",
    coverAlt: "Interior reception area with Delta Laminates branding",
    coverWidth: 1280,
    coverHeight: 960,
    gallery: [
      {
        src: "/projects/interior/delta-laminates/01.webp",
        alt: "Material display area with table and wall panels",
        width: 1280,
        height: 960,
      },
      {
        src: "/projects/interior/delta-laminates/02.webp",
        alt: "Exterior facade with Delta signage and arched display windows",
        width: 1280,
        height: 960,
      },
      {
        src: "/projects/interior/delta-laminates/03.webp",
        alt: "Material display area with table and vertical panels",
        width: 1440,
        height: 1080,
      },
      {
        src: "/projects/interior/delta-laminates/04.webp",
        alt: "Interior display area with wall panels and sample shelving",
        width: 1440,
        height: 1080,
      },
      {
        src: "/projects/interior/delta-laminates/05.webp",
        alt: "Exterior facade with Delta Laminates Experience Centre signage",
        width: 1440,
        height: 1080,
      },
    ],
    featured: false,
    displayOrder: 35,
    cardAspect: "landscape",
  },
  {
    id: "jyotiji",
    slug: "jyotiji",
    title: "Jyotiji",
    category: "interior",
    sourceFolder: "project-source/interior/JYOTIJI-ONGOING-BENGALURU-1250 SQ FT",
    location: "Bengaluru",
    area: "1,250 sq. ft.",
    coverImage: "/projects/interior/jyotiji/cover.webp",
    coverAlt: "Interior display space with seating and decorative wall backdrop",
    coverWidth: 1138,
    coverHeight: 899,
    gallery: [
      {
        src: "/projects/interior/jyotiji/01.webp",
        alt: "Curved retail counter with shelving and pendant lighting",
        width: 1474,
        height: 1440,
      },
      {
        src: "/projects/interior/jyotiji/02.webp",
        alt: "Retail counter with chairs and ceiling lighting",
        width: 1665,
        height: 1440,
      },
      {
        src: "/projects/interior/jyotiji/03.webp",
        alt: "Retail cash counter with shelving behind it",
        width: 1358,
        height: 1440,
      },
      {
        src: "/projects/interior/jyotiji/04.webp",
        alt: "Display shelving with curved counter in foreground",
        width: 993,
        height: 899,
      },
      {
        src: "/projects/interior/jyotiji/05.webp",
        alt: "Cash counter with illuminated wall panel",
        width: 877,
        height: 899,
      },
      {
        src: "/projects/interior/jyotiji/06.webp",
        alt: "Cash counter with red front panel",
        width: 877,
        height: 899,
      },
      {
        src: "/projects/interior/jyotiji/07.webp",
        alt: "Storefront with arched display window and entrance",
        width: 1134,
        height: 889,
      },
    ],
    featured: false,
    displayOrder: 36,
    cardAspect: "landscape",
  },
  {
    id: "manish-mehta",
    slug: "manish-mehta",
    title: "Manish Mehta",
    category: "interior",
    sourceFolder: "project-source/interior/MANISH MEHTA",
    coverImage: "/projects/interior/manish-mehta/cover.webp",
    coverAlt: "Living room with television wall and recessed lighting",
    coverWidth: 1080,
    coverHeight: 608,
    gallery: [
      {
        src: "/projects/interior/manish-mehta/01.webp",
        alt: "Bedroom with study desk, bed, and wall panels",
        width: 2400,
        height: 1350,
      },
      {
        src: "/projects/interior/manish-mehta/02.webp",
        alt: "Bedroom with bed, desk, and window",
        width: 2400,
        height: 1350,
      },
      {
        src: "/projects/interior/manish-mehta/03.webp",
        alt: "Bedroom with bed and decorative wall lighting",
        width: 1920,
        height: 1080,
      },
      {
        src: "/projects/interior/manish-mehta/04.webp",
        alt: "Bedroom with wardrobe and dressing mirror",
        width: 1920,
        height: 1080,
      },
      {
        src: "/projects/interior/manish-mehta/05.webp",
        alt: "Close view of living room wall panel detail",
        width: 1080,
        height: 608,
      },
    ],
    featured: false,
    displayOrder: 37,
    cardAspect: "landscape",
  },
  {
    id: "mokshit-jain",
    slug: "mokshit-jain",
    title: "Mokshit Jain",
    category: "interior",
    sourceFolder: "project-source/interior/MOKSHIT JAIN",
    coverImage: "/projects/interior/mokshit-jain/cover.webp",
    coverAlt: "Living room with sofa, accent chairs, and wall art",
    coverWidth: 1280,
    coverHeight: 720,
    gallery: [
      {
        src: "/projects/interior/mokshit-jain/01.webp",
        alt: "Living room television wall with display shelving",
        width: 1002,
        height: 707,
      },
      {
        src: "/projects/interior/mokshit-jain/02.webp",
        alt: "Kitchen with grey cabinetry and black backsplash",
        width: 1280,
        height: 960,
      },
      {
        src: "/projects/interior/mokshit-jain/03.webp",
        alt: "Dining area with table, chairs, and curtain wall",
        width: 1280,
        height: 720,
      },
      {
        src: "/projects/interior/mokshit-jain/04.webp",
        alt: "Guest bedroom with bed and wall paneling",
        width: 1280,
        height: 720,
      },
      {
        src: "/projects/interior/mokshit-jain/05.webp",
        alt: "Bedroom with bed and green accent wall",
        width: 1280,
        height: 720,
      },
      {
        src: "/projects/interior/mokshit-jain/06.webp",
        alt: "Bedroom with bed and timber wall panels",
        width: 1280,
        height: 720,
      },
      {
        src: "/projects/interior/mokshit-jain/07.webp",
        alt: "Bedroom with wardrobe wall and bed foreground",
        width: 1280,
        height: 720,
      },
    ],
    featured: false,
    displayOrder: 38,
    cardAspect: "landscape",
  },
  {
    id: "mukul-jain",
    slug: "mukul-jain",
    title: "Mukul Jain",
    category: "interior",
    sourceFolder: "project-source/interior/MUKUL JAIN",
    coverImage: "/projects/interior/mukul-jain/cover.webp",
    coverAlt: "Living room with sofa, television wall, and curtains",
    coverWidth: 1080,
    coverHeight: 1080,
    gallery: [
      {
        src: "/projects/interior/mukul-jain/01.webp",
        alt: "Bedroom with bed and marble-textured feature wall",
        width: 1080,
        height: 1080,
      },
      {
        src: "/projects/interior/mukul-jain/02.webp",
        alt: "Bedroom with timber wall panels and bed",
        width: 1080,
        height: 1080,
      },
      {
        src: "/projects/interior/mukul-jain/03.webp",
        alt: "Pooja niche with illuminated shrine",
        width: 1080,
        height: 1080,
      },
      {
        src: "/projects/interior/mukul-jain/04.webp",
        alt: "Kitchen with white cabinets and timber lower panels",
        width: 1080,
        height: 1080,
      },
      {
        src: "/projects/interior/mukul-jain/05.webp",
        alt: "Entry wall with console and vertical wood paneling",
        width: 1080,
        height: 1080,
      },
      {
        src: "/projects/interior/mukul-jain/06.webp",
        alt: "Dining area with table and chairs",
        width: 1080,
        height: 1080,
      },
      {
        src: "/projects/interior/mukul-jain/07.webp",
        alt: "Close view of sofa and timber armrest",
        width: 1080,
        height: 1080,
      },
    ],
    featured: false,
    displayOrder: 39,
    cardAspect: "square",
  },
  {
    id: "rakesh-jain",
    slug: "rakesh-jain",
    title: "Rakesh Jain",
    category: "interior",
    sourceFolder: "project-source/interior/RAKESH JAIN",
    coverImage: "/projects/interior/rakesh-jain/cover.webp",
    coverAlt: "Living and dining area with sofa, table, and ceiling detail",
    coverWidth: 1280,
    coverHeight: 719,
    gallery: [
      {
        src: "/projects/interior/rakesh-jain/01.webp",
        alt: "Living area with television wall and dining table",
        width: 1280,
        height: 719,
      },
      {
        src: "/projects/interior/rakesh-jain/02.webp",
        alt: "Kitchen with grey cabinetry and long counter",
        width: 1280,
        height: 719,
      },
      {
        src: "/projects/interior/rakesh-jain/03.webp",
        alt: "Bedroom with bed, study desk, and decorative ceiling lighting",
        width: 1280,
        height: 719,
      },
      {
        src: "/projects/interior/rakesh-jain/04.webp",
        alt: "Bedroom with bed and glass-front wardrobe",
        width: 1280,
        height: 719,
      },
    ],
    featured: false,
    displayOrder: 40,
    cardAspect: "landscape",
  },
  {
    id: "shirish-svasa",
    slug: "shirish-svasa",
    title: "Shirish Svasa",
    category: "interior",
    sourceFolder: "project-source/interior/SHIRISH SVASA",
    coverImage: "/projects/interior/shirish-svasa/cover.webp",
    coverAlt: "Living and dining room with sofa, table, and wall lighting",
    coverWidth: 780,
    coverHeight: 439,
    gallery: [
      {
        src: "/projects/interior/shirish-svasa/01.webp",
        alt: "Walk-in wardrobe with timber shelving and hanging rails",
        width: 720,
        height: 1280,
      },
      {
        src: "/projects/interior/shirish-svasa/02.webp",
        alt: "Wardrobe wall with timber doors",
        width: 960,
        height: 1280,
      },
      {
        src: "/projects/interior/shirish-svasa/03.webp",
        alt: "Kitchen with white cabinetry and light backsplash",
        width: 780,
        height: 439,
      },
      {
        src: "/projects/interior/shirish-svasa/04.webp",
        alt: "Kitchen with tall storage and refrigerator",
        width: 780,
        height: 439,
      },
      {
        src: "/projects/interior/shirish-svasa/05.webp",
        alt: "Living room television wall with sofa in foreground",
        width: 760,
        height: 427,
      },
      {
        src: "/projects/interior/shirish-svasa/06.webp",
        alt: "Living room with seating and swing",
        width: 780,
        height: 439,
      },
      {
        src: "/projects/interior/shirish-svasa/07.webp",
        alt: "Living and dining room with table setting",
        width: 780,
        height: 439,
      },
      {
        src: "/projects/interior/shirish-svasa/08.webp",
        alt: "Pooja room entry with timber surround",
        width: 780,
        height: 439,
      },
      {
        src: "/projects/interior/shirish-svasa/09.webp",
        alt: "Bedroom with bed and curtain wall",
        width: 760,
        height: 427,
      },
    ],
    featured: false,
    displayOrder: 41,
    cardAspect: "landscape",
  },
  {
    id: "shobraj-jain",
    slug: "shobraj-jain",
    title: "Shobraj Jain",
    category: "interior",
    sourceFolder: "project-source/interior/SHOBRAJ JAIN",
    coverImage: "/projects/interior/shobraj-jain/cover.webp",
    coverAlt: "Living room with sofa and television wall",
    coverWidth: 1280,
    coverHeight: 720,
    gallery: [
      {
        src: "/projects/interior/shobraj-jain/01.webp",
        alt: "Bedroom with bed and television wall",
        width: 1280,
        height: 720,
      },
      {
        src: "/projects/interior/shobraj-jain/02.webp",
        alt: "Bedroom with bed, wardrobe wall, and dressing mirror",
        width: 1280,
        height: 720,
      },
      {
        src: "/projects/interior/shobraj-jain/03.webp",
        alt: "Bedroom with bunk bed and wall panels",
        width: 1280,
        height: 720,
      },
      {
        src: "/projects/interior/shobraj-jain/04.webp",
        alt: "Foyer wall with patterned panel detail",
        width: 708,
        height: 719,
      },
      {
        src: "/projects/interior/shobraj-jain/05.webp",
        alt: "Kitchen with timber lower cabinets and dark backsplash",
        width: 1280,
        height: 720,
      },
      {
        src: "/projects/interior/shobraj-jain/06.webp",
        alt: "Entry niche with small console and wall cabinets",
        width: 559,
        height: 720,
      },
    ],
    featured: false,
    displayOrder: 42,
    cardAspect: "landscape",
  },
  {
    id: "sonal-parekh",
    slug: "sonal-parekh",
    title: "Sonal Parekh",
    category: "interior",
    sourceFolder: "project-source/interior/SONAL PAREKH",
    coverImage: "/projects/interior/sonal-parekh/cover.webp",
    coverAlt: "Bedroom with bed, side chair, and wall decor",
    coverWidth: 1280,
    coverHeight: 720,
    gallery: [
      {
        src: "/projects/interior/sonal-parekh/01.webp",
        alt: "Bedroom with bed, chair, and framed wall art",
        width: 1280,
        height: 720,
      },
      {
        src: "/projects/interior/sonal-parekh/02.webp",
        alt: "Bedroom with bed, chair, and window",
        width: 1280,
        height: 720,
      },
      {
        src: "/projects/interior/sonal-parekh/03.webp",
        alt: "Bedroom with bed and wall paneling",
        width: 1280,
        height: 720,
      },
      {
        src: "/projects/interior/sonal-parekh/04.webp",
        alt: "Living room with sofa and television wall",
        width: 1219,
        height: 710,
      },
      {
        src: "/projects/interior/sonal-parekh/05.webp",
        alt: "Close view of bedroom side table and window",
        width: 1219,
        height: 963,
      },
      {
        src: "/projects/interior/sonal-parekh/06.webp",
        alt: "Wall-mounted shelving beside a window",
        width: 1800,
        height: 2400,
      },
    ],
    featured: false,
    displayOrder: 43,
    cardAspect: "landscape",
  },
  {
    id: "veerji",
    slug: "veerji",
    title: "Veerji",
    category: "interior",
    sourceFolder: "project-source/interior/VEERJI",
    coverImage: "/projects/interior/veerji/cover.webp",
    coverAlt: "Bedroom with bed and decorative wall art",
    coverWidth: 2400,
    coverHeight: 2400,
    gallery: [
      {
        src: "/projects/interior/veerji/01.webp",
        alt: "Bedroom with bed and vertical wall paneling",
        width: 2080,
        height: 2080,
      },
      {
        src: "/projects/interior/veerji/02.webp",
        alt: "Dining area with round table and wall mural",
        width: 986,
        height: 986,
      },
      {
        src: "/projects/interior/veerji/03.webp",
        alt: "Foyer with vertical wall panels and console",
        width: 2080,
        height: 2080,
      },
      {
        src: "/projects/interior/veerji/04.webp",
        alt: "Living room with television wall and seating",
        width: 986,
        height: 986,
      },
      {
        src: "/projects/interior/veerji/05.webp",
        alt: "Bedroom with bed and wall lighting",
        width: 2080,
        height: 2080,
      },
      {
        src: "/projects/interior/veerji/06.webp",
        alt: "Bedroom with bed and angled wall panel detail",
        width: 2080,
        height: 2080,
      },
      {
        src: "/projects/interior/veerji/07.webp",
        alt: "Bedroom with bed, window, and wall panels",
        width: 2080,
        height: 2080,
      },
    ],
    featured: false,
    displayOrder: 44,
    cardAspect: "square",
  },
  {
    id: "vinod-jain",
    slug: "vinod-jain",
    title: "Vinod Jain",
    category: "interior",
    sourceFolder: "project-source/interior/VINOD JAIN",
    coverImage: "/projects/interior/vinod-jain/cover.webp",
    coverAlt: "Living area with sofa and marble-textured feature wall",
    coverWidth: 1280,
    coverHeight: 720,
    gallery: [
      {
        src: "/projects/interior/vinod-jain/01.webp",
        alt: "Dining area with table and wall niche",
        width: 990,
        height: 720,
      },
      {
        src: "/projects/interior/vinod-jain/02.webp",
        alt: "Bedroom with bed and timber wardrobe wall",
        width: 1280,
        height: 720,
      },
      {
        src: "/projects/interior/vinod-jain/03.webp",
        alt: "Bedroom with bed and television wall",
        width: 1280,
        height: 720,
      },
      {
        src: "/projects/interior/vinod-jain/04.webp",
        alt: "Bedroom television wall with timber paneling",
        width: 1280,
        height: 720,
      },
      {
        src: "/projects/interior/vinod-jain/05.webp",
        alt: "Bedroom with bed and side table",
        width: 1280,
        height: 720,
      },
      {
        src: "/projects/interior/vinod-jain/06.webp",
        alt: "Wardrobe wall and bed foreground",
        width: 1280,
        height: 720,
      },
      {
        src: "/projects/interior/vinod-jain/07.webp",
        alt: "Entry area with wall niche and door",
        width: 1054,
        height: 720,
      },
      {
        src: "/projects/interior/vinod-jain/08.webp",
        alt: "Wall niche with plant and warm lighting",
        width: 765,
        height: 720,
      },
    ],
    featured: false,
    displayOrder: 45,
    cardAspect: "landscape",
  },
  {
    id: "ameena-residency",
    slug: "ameena-residency",
    title: "Ameena Residency",
    category: "urban-design",
    sourceFolder: "project-source/urban-design/AMEENA RESIDENCY-52 acres-vijayapura-completed-2018",
    location: "Vijayapura",
    completionYear: "2018",
    area: "52 acres",
    coverImage: "/projects/urban-design/ameena-residency/cover.webp",
    coverAlt: "Masterplan view of a plotted urban development",
    coverWidth: 1502,
    coverHeight: 703,
    gallery: [
      {
        src: "/projects/urban-design/ameena-residency/01.webp",
        alt: "Entrance gateway with roadway and palm trees",
        width: 798,
        height: 410,
      },
      {
        src: "/projects/urban-design/ameena-residency/02.webp",
        alt: "Aerial view of landscape spaces and site features",
        width: 1465,
        height: 677,
      },
      {
        src: "/projects/urban-design/ameena-residency/03.webp",
        alt: "Evening aerial view of a landscaped circular pavilion",
        width: 949,
        height: 444,
      },
    ],
    featured: false,
    displayOrder: 46,
    cardAspect: "landscape",
  },
];

export function sortProjectsByDisplayOrder(projectList: Project[]): Project[] {
  return [...projectList].sort((a, b) => a.displayOrder - b.displayOrder);
}

export function getAllProjects(): Project[] {
  return sortProjectsByDisplayOrder(projects);
}

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((project) => project.slug === slug);
}

export function getProjectsByCategory(category: ProjectCategory): Project[] {
  return sortProjectsByDisplayOrder(
    projects.filter((project) => project.category === category)
  );
}

export function getFeaturedProjects(): Project[] {
  return sortProjectsByDisplayOrder(
    projects.filter((project) => project.featured)
  );
}

export function getNextProject(slug: string): Project | undefined {
  const sortedProjects = getAllProjects();
  const currentIndex = sortedProjects.findIndex((project) => project.slug === slug);

  if (currentIndex < 0 || sortedProjects.length === 0) {
    return undefined;
  }

  return sortedProjects[(currentIndex + 1) % sortedProjects.length];
}

function validateProjectRegistry(projectList: Project[]) {
  const supportedCategories = new Set<ProjectCategory>(projectCategories);
  const seenIds = new Set<string>();
  const seenSlugs = new Set<string>();
  const seenDisplayOrders = new Set<number>();

  projectList.forEach((project) => {
    if (seenIds.has(project.id)) {
      console.warn(`[projects] Duplicate project id: ${project.id}`);
    }
    seenIds.add(project.id);

    if (seenSlugs.has(project.slug)) {
      console.warn(`[projects] Duplicate project slug: ${project.slug}`);
    }
    seenSlugs.add(project.slug);

    if (seenDisplayOrders.has(project.displayOrder)) {
      console.warn(`[projects] Duplicate displayOrder: ${project.displayOrder}`);
    }
    seenDisplayOrders.add(project.displayOrder);

    if (!supportedCategories.has(project.category)) {
      console.warn(`[projects] Unsupported category for ${project.slug}: ${project.category}`);
    }

    if (!project.coverImage) {
      console.warn(`[projects] Missing coverImage for ${project.slug}`);
    }

    if (project.gallery.length === 0) {
      console.warn(`[projects] Empty gallery for ${project.slug}`);
    }

    const seenGallerySources = new Set<string>();
    project.gallery.forEach((image) => {
      if (seenGallerySources.has(image.src)) {
        console.warn(`[projects] Duplicate gallery image for ${project.slug}: ${image.src}`);
      }
      seenGallerySources.add(image.src);
    });

    [project.coverImage, ...project.gallery.map((image) => image.src)].forEach((src) => {
      if (!src.startsWith("/") && !src.startsWith("http://") && !src.startsWith("https://")) {
        console.warn(`[projects] Invalid image path for ${project.slug}: ${src}`);
      }
    });
  });
}

if (process.env.NODE_ENV !== "production") {
  validateProjectRegistry(projects);
}
