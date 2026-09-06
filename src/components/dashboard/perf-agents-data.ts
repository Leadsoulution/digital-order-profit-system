import { agentPerformance } from "./confirmation-data";

export type LiveAgentStat = {
  name: string;
  email: string;
  avatarColor: string;
  active: boolean;
  assignes: number;
  enCours: number;
  rappels: number;
  confirmes: number;
  contactes: number;
  conversion: number;
};

export const liveAgentStats: LiveAgentStat[] = agentPerformance.map((agent) => ({
  name: agent.name,
  email: agent.email,
  avatarColor: agent.avatarColor,
  active: agent.active,
  assignes: agent.assigned,
  enCours: agent.pending,
  rappels: Math.round(agent.assigned * 0.02),
  confirmes: agent.confirmed,
  contactes: agent.contacted,
  conversion: agent.assigned > 0 ? (agent.confirmed / agent.assigned) * 100 : 0,
}));

const totalAssignes = liveAgentStats.reduce((sum, a) => sum + a.assignes, 0);
const totalConfirmes = liveAgentStats.reduce((sum, a) => sum + a.confirmes, 0);
const totalContactes = liveAgentStats.reduce((sum, a) => sum + a.contactes, 0);

export const globalStats = {
  agentsActifs: `${liveAgentStats.filter((a) => a.active).length} / ${liveAgentStats.length}`,
  commandesAssignees: totalAssignes,
  enCours: liveAgentStats.reduce((sum, a) => sum + a.enCours, 0),
  confirmes: totalConfirmes,
  rappels: liveAgentStats.reduce((sum, a) => sum + a.rappels, 0),
  sansReponse: 0,
  leadsContactes: totalContactes,
  tauxConversion:
    totalAssignes > 0 ? `${((totalConfirmes / totalAssignes) * 100).toFixed(1)}%` : "0.0%",
};
