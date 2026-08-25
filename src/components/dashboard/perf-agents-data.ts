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
  contactes: 0,
  conversion: 0,
}));

export const globalStats = {
  agentsActifs: `${liveAgentStats.filter((a) => a.active).length} / ${liveAgentStats.length}`,
  commandesAssignees: liveAgentStats.reduce((sum, a) => sum + a.assignes, 0),
  enCours: liveAgentStats.reduce((sum, a) => sum + a.enCours, 0),
  confirmes: liveAgentStats.reduce((sum, a) => sum + a.confirmes, 0),
  rappels: liveAgentStats.reduce((sum, a) => sum + a.rappels, 0),
  sansReponse: 0,
  leadsContactes: 0,
  tauxConversion: "0.0%",
};
