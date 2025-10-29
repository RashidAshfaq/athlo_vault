// lib/season-stats-api.ts
import { API_BASE_URL } from "./api";

export type Sport =
  | "Baseball" | "Basketball" | "Football" | "Golf"
  | "Soccer" | "Swimming" | "Tennis" | "Track & Field";

export type SeasonStatsPayload = Record<string, number>;

type SeasonStatsRequest = {
  sport: Sport;                // you can keep this for your UI flow
  stats: SeasonStatsPayload;   // we'll flatten it below
};

export const updateSeasonStats = async (
  req: SeasonStatsRequest,
  token: string
): Promise<{ success: boolean; message: string }> => {
  // server expects a flat body with stat keys only
  const body = { ...req.stats };
  console.log(body)

  const res = await fetch(`${API_BASE_URL}/athlete/season-stats/update_stats`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
      "x-api-key": "1234abcd-5678-efgh-9101-ijklmnopqrst",
    },
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    throw new Error(errorData.message || "Season stats update failed");
  }

  return res.json();
};
