
export type Family = "White" | "Pinkman" | "Wayne" | "Kent";

export interface Person {
  id: number;
  name: string;
  active: boolean;
  available: boolean;
  family: Family;
  blocked: number[];
}
