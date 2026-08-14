/**
 * Smile Architects — Central site configuration.
 * All clinic data lives here. Update this file to propagate changes site-wide.
 */

export const CLINIC = {
  name: "Smile Architects",
  tagline: "Multispeciality Dental Clinic & Advanced Orthodontic Centre",
  fullName: "Smile Architects — Multispeciality Dental Clinic & Advanced Orthodontic Centre",
  address: {
    street: "Kattakkayam Road",
    city: "Pala",
    district: "Kottayam",
    state: "Kerala",
    pincode: "686575",
    country: "India",
    landmark: "Near Federal Bank, Pala Town",
    full: "Kattakkayam Road, Pala, Kottayam, Kerala – 686575",
  },
  contact: {
    phone: "+919446999333",
    phoneDisplay: "+91 9446 999 333",
    email: "drjeosmilearchitects@gmail.com",
    website: "https://smilearchitectspala.com",
  },
  hours: {
    weekdays: { label: "Monday – Saturday", open: "9:30 AM", close: "8:00 PM" },
    sunday: { label: "Sunday", status: "Closed" },
    note: "Appointments recommended. Walk-ins welcome subject to availability.",
  },
  // Platform listings — treat as configurable, not permanent claims
  platforms: {
    practo: {
      url: "https://www.practo.com/pala/clinic/smile-architects-palai",
      // NOTE: ratings/review counts are dynamic — update periodically from Practo dashboard
    },
    justdial: {
      url: "https://www.justdial.com",
    },
    googleMaps: {
      // [CLINIC TO VERIFY: Confirm exact Google Maps place ID and coordinates]
      placeId: "", // e.g. "ChIJ..."
      embedUrl: "https://maps.google.com/maps?q=Smile+Architects+Pala+Kottayam+Kerala&output=embed",
      directionsUrl: "https://maps.google.com/?q=Smile+Architects,+Kattakkayam+Road,+Pala,+Kottayam,+Kerala+686575",
    },
  },
  social: {
    // [CLINIC TO VERIFY: Provide verified social media profile URLs]
    facebook: "",
    instagram: "",
    youtube: "",
    whatsapp: "https://wa.me/919446999333",
  },
  seo: {
    siteName: "Smile Architects",
    defaultTitle: "Smile Architects | Dental Clinic in Pala, Kottayam",
    defaultDescription:
      "Smile Architects is a multispeciality dental clinic and advanced orthodontic centre in Pala, Kottayam, Kerala. General dentistry, orthodontics, implants, cosmetic dentistry and more. Call +91 9446 999 333.",
    siteUrl: "https://smilearchitectspala.com",
    // [CLINIC TO VERIFY: Replace with final production domain]
    ogImage: "/images/logo.png",
    twitterHandle: "", // [CLINIC TO VERIFY]
  },
} as const;

export const DOCTORS = [
  // ── CORE TEAM ──────────────────────────────────────────────────────────────
  {
    id: "dr-jeo-tom-charls",
    slug: "dr-jeo-tom-charls",
    name: "Dr. Jeo Tom Charls",
    photo: "/images/dr-jeo-tom-charls.jpg",
    qualifications: "MDS",
    specialty: "Orthodontics and Dentofacial Orthopaedics",
    roles: ["Consultant Orthodontist", "Certified Invisalign Provider", "Certified Spark Aligner Provider"],
    visiting: false,
    registrationBody: "Kerala State Dental Council",
    registrationNumber: "9451",
    registrationYear: "2015",
    memberships: ["Indian Orthodontic Society", "Indian Dental Association"],
    education: [
      { degree: "BDS", institution: "Sri Balaji Dental College, Chennai", year: "2010" },
      { degree: "MDS — Orthodontics and Dentofacial Orthopaedics", institution: "Sri Balaji Dental College, Chennai", year: "2015" },
    ],
    professionalExperience: [
      "Smile Architects, Pala",
      "Mar Sleeva Medicity, Palai",
      "Believer's Church Medical College & Hospital",
      "Raihan Institute of Medical Sciences",
      "V.V. Dental Clinic, Chennai",
    ],
    training: [
      "Certified Invisalign Provider",
      "Certified Spark Aligner Provider",
      "Lingual orthodontics training",
      "Lingual orthodontics CAD/CAM training",
      "ClearPath clear-aligner certification workshop",
      "TMJ considerations in functional orthodontics",
      "Miniscrews in orthodontics",
    ],
    areasOfExpertise: [
      "Conventional straight-wire appliances",
      "Damon / self-ligating brackets",
      "Ceramic brackets",
      "Lingual orthodontics / hidden braces",
      "Invisalign & Spark clear aligners",
      "Surgical orthodontics",
      "Orthognathic surgical planning",
      "Growth modification",
      "Fixed functional appliances",
      "Digital smile designing",
    ],
    bio: "Dr. Jeo Tom Charls is the principal orthodontist at Smile Architects, Pala. An MDS-qualified specialist in Orthodontics and Dentofacial Orthopaedics, he is a Certified Invisalign and Spark Aligner Provider with advanced training in lingual orthodontics and CAD/CAM bracket systems. His practice spans the full spectrum of orthodontic treatment — from conventional braces to completely hidden lingual systems and clear aligners.",
    seo: {
      title: "Dr. Jeo Tom Charls | Orthodontist in Pala, Kottayam | Smile Architects",
      description: "Dr. Jeo Tom Charls — MDS Orthodontics. Certified Invisalign & Spark Aligner Provider. Specialist in braces, lingual orthodontics and clear aligners at Smile Architects, Pala.",
    },
  },
  {
    id: "dr-jom-t-kizhakkel",
    slug: "dr-jom-t-kizhakkel",
    name: "Dr. Jom T. Kizhakkel",
    photo: "/images/team/dr-jom-t-kizhakkel.jpg",
    qualifications: "MDS",
    specialty: "Periodontics & Implantology",
    roles: ["Periodontist", "Implantologist"],
    visiting: false,
    registrationBody: "",
    registrationNumber: "",
    registrationYear: "",
    memberships: [],
    education: [
      { degree: "MDS — Periodontics & Implantology", institution: "", year: "" },
    ],
    professionalExperience: ["Smile Architects, Pala"],
    training: [],
    areasOfExpertise: [
      "Periodontal treatment",
      "Scaling and root planing",
      "Gum surgery",
      "Dental implants",
      "Implant-supported restorations",
      "Bone grafting",
    ],
    bio: "Dr. Jom T. Kizhakkel is an MDS specialist in Periodontics and Implantology at Smile Architects, Pala. He manages gum disease treatment and dental implant placement, offering patients a complete solution for tooth loss and periodontal health.",
    seo: {
      title: "Dr. Jom T. Kizhakkel | Periodontist & Implantologist in Pala | Smile Architects",
      description: "Dr. Jom T. Kizhakkel — MDS Periodontics & Implantology. Specialist in dental implants and gum treatment at Smile Architects, Pala, Kottayam, Kerala.",
    },
  },
  {
    id: "dr-mohamed-riyas",
    slug: "dr-mohamed-riyas",
    name: "Dr. Mohamed Riyas",
    photo: "/images/team/dr-mohamed-riyas.jpg",
    qualifications: "MDS",
    specialty: "Endodontics and Conservative Dentistry",
    roles: ["Endodontist", "Conservative Dentistry Specialist"],
    visiting: false,
    registrationBody: "",
    registrationNumber: "",
    registrationYear: "",
    memberships: [],
    education: [
      { degree: "MDS — Endodontics and Conservative Dentistry", institution: "", year: "" },
    ],
    professionalExperience: ["Smile Architects, Pala"],
    training: [],
    areasOfExpertise: [
      "Root canal treatment",
      "Re-treatment of root-filled teeth",
      "Single-visit endodontics",
      "Tooth-coloured composite restorations",
      "Ceramic inlays and onlays",
      "Dental crowns",
    ],
    bio: "Dr. Mohamed Riyas is an MDS specialist in Endodontics and Conservative Dentistry at Smile Architects, Pala. He manages root canal treatment and tooth restoration, focusing on saving natural teeth through precise, minimally invasive care.",
    seo: {
      title: "Dr. Mohamed Riyas | Endodontist in Pala, Kottayam | Smile Architects",
      description: "Dr. Mohamed Riyas — MDS Endodontics and Conservative Dentistry. Root canal specialist at Smile Architects, Pala, Kottayam, Kerala.",
    },
  },

  // ── VISITING CONSULTANTS ───────────────────────────────────────────────────
  {
    id: "dr-kishore-george",
    slug: "dr-kishore-george",
    name: "Dr. Kishore George",
    photo: "/images/team/dr-kishore-george.jpg",
    qualifications: "MDS",
    specialty: "Oral & Maxillofacial Surgery",
    roles: ["Visiting Consultant", "Oral & Maxillofacial Surgeon"],
    visiting: true,
    registrationBody: "",
    registrationNumber: "",
    registrationYear: "",
    memberships: [],
    education: [
      { degree: "MDS — Oral & Maxillofacial Surgery", institution: "", year: "" },
    ],
    professionalExperience: [],
    training: [],
    areasOfExpertise: [
      "Complex tooth extractions",
      "Impacted wisdom tooth surgery",
      "Oral cyst and lesion removal",
      "Jaw surgery",
      "Pre-implant surgery",
      "Orthognathic surgery",
    ],
    bio: "Dr. Kishore George is a visiting consultant Oral & Maxillofacial Surgeon at Smile Architects, Pala. He manages complex surgical cases including impacted wisdom teeth, jaw surgery and pre-implant procedures.",
    seo: {
      title: "Dr. Kishore George | Oral Surgeon — Visiting Consultant | Smile Architects Pala",
      description: "Dr. Kishore George — MDS Oral & Maxillofacial Surgery. Visiting consultant at Smile Architects, Pala, Kottayam, Kerala.",
    },
  },
  {
    id: "dr-renu-ann-mathew",
    slug: "dr-renu-ann-mathew",
    name: "Dr. Renu Ann Mathew",
    photo: "/images/team/dr-renu-ann-mathew.jpg",
    qualifications: "MDS",
    specialty: "Paediatric & Preventive Dentistry",
    roles: ["Visiting Consultant", "Paediatric Dentist"],
    visiting: true,
    registrationBody: "",
    registrationNumber: "",
    registrationYear: "",
    memberships: [],
    education: [
      { degree: "MDS — Paediatric & Preventive Dentistry", institution: "", year: "" },
    ],
    professionalExperience: [],
    training: [],
    areasOfExpertise: [
      "Children's dental checkups",
      "Milk teeth treatment",
      "Dental sealants and fluoride",
      "Space maintainers",
      "Behavioural management",
      "Early orthodontic assessment",
    ],
    bio: "Dr. Renu Ann Mathew is a visiting consultant specialist in Paediatric & Preventive Dentistry at Smile Architects, Pala. She provides specialised dental care for children, focusing on prevention and creating a positive dental experience from an early age.",
    seo: {
      title: "Dr. Renu Ann Mathew | Paediatric Dentist — Visiting Consultant | Smile Architects Pala",
      description: "Dr. Renu Ann Mathew — MDS Paediatric & Preventive Dentistry. Visiting consultant at Smile Architects, Pala, Kottayam, Kerala.",
    },
  },
  {
    id: "dr-akarsh-babu",
    slug: "dr-akarsh-babu",
    name: "Dr. Akarsh Babu",
    photo: "/images/team/dr-akarsh-babu.jpg",
    qualifications: "MDS",
    specialty: "Prosthodontics",
    roles: ["Visiting Consultant", "Prosthodontist"],
    visiting: true,
    registrationBody: "",
    registrationNumber: "",
    registrationYear: "",
    memberships: [],
    education: [
      { degree: "MDS — Prosthodontics", institution: "", year: "" },
    ],
    professionalExperience: [],
    training: [],
    areasOfExpertise: [
      "Dental crowns and bridges",
      "Complete and partial dentures",
      "Implant-supported prostheses",
      "Full-mouth rehabilitation",
      "Smile makeovers",
      "Ceramic and zirconia restorations",
    ],
    bio: "Dr. Akarsh Babu is a visiting consultant Prosthodontist at Smile Architects, Pala. He specialises in complex restorative and prosthetic work including implant-supported prostheses, full-mouth rehabilitation and smile design.",
    seo: {
      title: "Dr. Akarsh Babu | Prosthodontist — Visiting Consultant | Smile Architects Pala",
      description: "Dr. Akarsh Babu — MDS Prosthodontics. Visiting consultant at Smile Architects, Pala, Kottayam, Kerala.",
    },
  },
];

export const TREATMENTS = [
  {
    id: "general-dentistry",
    slug: "general-dentistry",
    title: "General Dentistry",
    shortDescription: "Preventive care, check-ups and routine dental treatment.",
    icon: "tooth",
    featured: true,
  },
  {
    id: "pediatric-dentistry",
    slug: "pediatric-dentistry",
    title: "Paediatric Dentistry",
    shortDescription: "Dental care tailored for children.",
    icon: "child",
    featured: true,
  },
  {
    id: "dental-implants",
    slug: "dental-implants",
    title: "Dental Implants",
    shortDescription: "A permanent solution for missing teeth.",
    icon: "implant",
    featured: true,
  },
  {
    id: "cosmetic-dentistry",
    slug: "cosmetic-dentistry",
    title: "Cosmetic Dentistry",
    shortDescription: "Improving the appearance of teeth and smile.",
    icon: "sparkle",
    featured: true,
  },
  {
    id: "smile-design",
    slug: "smile-design",
    title: "Smile Design",
    shortDescription: "Digital smile design for complete smile transformation.",
    icon: "smile",
    featured: true,
  },
  {
    id: "root-canal-treatment",
    slug: "root-canal-treatment",
    title: "Root Canal Treatment",
    shortDescription: "Saving infected or damaged teeth.",
    icon: "canal",
    featured: true,
  },
  {
    id: "restorative-dentistry",
    slug: "restorative-dentistry",
    title: "Restorative Dentistry",
    shortDescription: "Restoring teeth damaged by decay or injury.",
    icon: "restore",
    featured: false,
  },
  {
    id: "oral-surgery",
    slug: "oral-surgery",
    title: "Oral & Maxillofacial Surgery",
    shortDescription: "Surgical care for the mouth, jaws and related structures.",
    icon: "surgery",
    featured: false,
  },
  {
    id: "orthodontics",
    slug: "orthodontics",
    title: "Orthodontics",
    shortDescription: "Correcting misaligned teeth and jaw relationships.",
    icon: "braces",
    featured: true,
  },
  {
    id: "braces",
    slug: "braces",
    title: "Dental Braces",
    shortDescription: "Metal, ceramic and self-ligating brace systems.",
    icon: "braces",
    featured: true,
  },
  {
    id: "clear-aligners",
    slug: "clear-aligners",
    title: "Clear Aligners",
    shortDescription: "Transparent removable aligners for discreet treatment.",
    icon: "aligner",
    featured: true,
  },
  {
    id: "lingual-braces",
    slug: "lingual-braces",
    title: "Lingual Braces",
    shortDescription: "Hidden braces fitted to the inner surface of teeth.",
    icon: "lingual",
    featured: true,
  },
  {
    id: "periodontal-treatment",
    slug: "periodontal-treatment",
    title: "Periodontal Treatment",
    shortDescription: "Treatment for gum disease and supporting structures.",
    icon: "gum",
    featured: false,
  },
  {
    id: "prosthodontics",
    slug: "prosthodontics",
    title: "Prosthodontics",
    shortDescription: "Replacing and restoring missing or damaged teeth.",
    icon: "prosthetic",
    featured: false,
  },
  {
    id: "crowns",
    slug: "crowns",
    title: "Dental Crowns",
    shortDescription: "Caps that restore and protect damaged teeth.",
    icon: "crown",
    featured: false,
  },
  {
    id: "bridges",
    slug: "bridges",
    title: "Dental Bridges",
    shortDescription: "Fixed replacement for one or more missing teeth.",
    icon: "bridge",
    featured: false,
  },
  {
    id: "dentures",
    slug: "dentures",
    title: "Dentures",
    shortDescription: "Removable replacements for missing teeth.",
    icon: "denture",
    featured: false,
  },
  {
    id: "veneers",
    slug: "veneers",
    title: "Dental Veneers",
    shortDescription: "Thin porcelain or composite shells for smile improvement.",
    icon: "veneer",
    featured: false,
  },
] as const;

export const FACILITIES = [
  { name: "Individual Treatment Rooms", description: "Private, dedicated treatment rooms for patient comfort and dignity." },
  { name: "Sterilisation", description: "Strict sterilisation protocols maintained throughout the clinic." },
  { name: "Digital X-Ray", description: "Modern digital radiography for accurate diagnosis with reduced radiation." },
  { name: "Ample Car Parking", description: "Convenient parking available for patients." },
  { name: "Online & Telephone Booking", description: "Book appointments online or by calling +91 9446 999 333." },
] as const;

export const FAQS_GENERAL = [
  {
    question: "Where is Smile Architects located?",
    answer:
      "Smile Architects is located on Kattakkayam Road, Pala, Kottayam, Kerala – 686575, near Federal Bank in Pala Town.",
  },
  {
    question: "What are the clinic's opening hours?",
    answer: "The clinic is open Monday to Saturday, 9:30 AM to 8:00 PM. The clinic is closed on Sundays.",
  },
  {
    question: "How do I book an appointment?",
    answer:
      "You can book an appointment by calling +91 9446 999 333, sending a WhatsApp message, or using the online appointment form on this website.",
  },
  {
    question: "Which dentists are available at Smile Architects?",
    answer:
      "Smile Architects is led by Dr. Jeo Tom Charls (MDS – Orthodontics and Dentofacial Orthopaedics), supported by Dr. Jintu Joan Jose and Dr. Ann Tresa T. Srambickal (both BDS – Aesthetic & General Dentistry).",
  },
  {
    question: "Does the clinic offer parking?",
    answer: "Yes, ample car parking is available for patients visiting the clinic.",
  },
  {
    question: "Can I walk in without an appointment?",
    answer:
      "Walk-ins are welcome, though appointments are recommended to avoid waiting times. Call ahead to check availability.",
  },
];

export type DoctorId = typeof DOCTORS[number]["id"];
export type TreatmentId = typeof TREATMENTS[number]["id"];
