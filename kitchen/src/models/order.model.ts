export interface Order {
  id: number;
  receipe: string | null;
  status: "pending" | "completed" | "cancelled";
}
