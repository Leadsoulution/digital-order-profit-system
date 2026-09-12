export type UserRole = "Admin" | "Agent";
export type UserStatus = "Actif" | "Inactif";

export type Permissions = {
  suiviLivraison: boolean;
  importsExcel: boolean;
  creationProspects: boolean;
};

export type TeamMember = {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: UserRole;
  status: UserStatus;
  permissions: Permissions;
  leadsAssignes: number | null;
  confirmesAjd: number | null;
  tauxConv: number | null;
  derniereConnexion: string;
  avatarColor: string;
};

export const teamMembers: TeamMember[] = [
  {
    id: "mohamed-alaoui",
    name: "Mohamed Alaoui",
    email: "admin@lead2door.com",
    phone: "+212661245700",
    role: "Admin",
    status: "Actif",
    permissions: { suiviLivraison: true, importsExcel: true, creationProspects: true },
    leadsAssignes: null,
    confirmesAjd: null,
    tauxConv: null,
    derniereConnexion: "26 aout 2026, 16:02",
    avatarColor: "bg-gray-900",
  },
  {
    id: "fatima-zahra",
    name: "Fatima Zahra",
    email: "agent@lead2door.com",
    phone: "+212661245701",
    role: "Agent",
    status: "Actif",
    permissions: { suiviLivraison: true, importsExcel: true, creationProspects: false },
    leadsAssignes: 8252,
    confirmesAjd: 0,
    tauxConv: 79,
    derniereConnexion: "26 aout 2026, 15:36",
    avatarColor: "bg-emerald-500",
  },
  {
    id: "yassine-ouazzani",
    name: "Yassine Ouazzani",
    email: "agent2@lead2door.com",
    phone: "+212661245702",
    role: "Agent",
    status: "Actif",
    permissions: { suiviLivraison: true, importsExcel: false, creationProspects: false },
    leadsAssignes: 2940,
    confirmesAjd: 0,
    tauxConv: 66,
    derniereConnexion: "25 aout 2026, 18:02",
    avatarColor: "bg-teal-500",
  },
  {
    id: "salma-bennani",
    name: "Salma Bennani",
    email: "agent3@lead2door.com",
    phone: "+212661245703",
    role: "Agent",
    status: "Actif",
    permissions: { suiviLivraison: true, importsExcel: true, creationProspects: false },
    leadsAssignes: 4820,
    confirmesAjd: 0,
    tauxConv: 65,
    derniereConnexion: "26 aout 2026, 12:45",
    avatarColor: "bg-rose-500",
  },
  {
    id: "omar-tazi",
    name: "Omar Tazi",
    email: "agent4@lead2door.com",
    phone: "+212661245704",
    role: "Agent",
    status: "Actif",
    permissions: { suiviLivraison: true, importsExcel: true, creationProspects: false },
    leadsAssignes: 6406,
    confirmesAjd: 0,
    tauxConv: 78,
    derniereConnexion: "26 aout 2026, 13:26",
    avatarColor: "bg-cyan-500",
  },
  {
    id: "nadia-el-fassi",
    name: "Nadia El Fassi",
    email: "agent5@lead2door.com",
    phone: "+212661245705",
    role: "Agent",
    status: "Actif",
    permissions: { suiviLivraison: true, importsExcel: false, creationProspects: false },
    leadsAssignes: 3518,
    confirmesAjd: 0,
    tauxConv: 47,
    derniereConnexion: "26 aout 2026, 13:03",
    avatarColor: "bg-pink-500",
  },
  {
    id: "hamza-berrada",
    name: "Hamza Berrada",
    email: "agent6@lead2door.com",
    phone: "+212661245706",
    role: "Agent",
    status: "Actif",
    permissions: { suiviLivraison: true, importsExcel: true, creationProspects: false },
    leadsAssignes: 5490,
    confirmesAjd: 0,
    tauxConv: 74,
    derniereConnexion: "26 aout 2026, 13:28",
    avatarColor: "bg-blue-500",
  },
  {
    id: "imane-lahlou",
    name: "Imane Lahlou",
    email: "agent7@lead2door.com",
    phone: "+212661245707",
    role: "Agent",
    status: "Actif",
    permissions: { suiviLivraison: true, importsExcel: true, creationProspects: false },
    leadsAssignes: 5472,
    confirmesAjd: 0,
    tauxConv: 71,
    derniereConnexion: "26 aout 2026, 13:21",
    avatarColor: "bg-violet-500",
  },
  {
    id: "karim-el-mansouri",
    name: "Karim El Mansouri",
    email: "agent8@lead2door.com",
    phone: "+212661245708",
    role: "Agent",
    status: "Actif",
    permissions: { suiviLivraison: true, importsExcel: true, creationProspects: false },
    leadsAssignes: 3562,
    confirmesAjd: 0,
    tauxConv: 64,
    derniereConnexion: "26 aout 2026, 13:15",
    avatarColor: "bg-orange-500",
  },
];

export const roleOptions = ["Admin", "Agent"];

/** Couleurs d'avatar tirees au sort a la creation d'un compte. */
export const avatarColors = [
  "bg-gray-900",
  "bg-blue-600",
  "bg-emerald-500",
  "bg-violet-500",
  "bg-amber-500",
  "bg-rose-500",
  "bg-teal-500",
  "bg-indigo-500",
];
export const statusOptions = ["Actif", "Inactif"];
