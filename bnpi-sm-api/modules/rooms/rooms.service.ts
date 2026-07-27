import { listConfirmedBookingsCoveringNow } from "../../db/repositories/bookings.repository";
import { getRoomById, listActiveRooms } from "../../db/repositories/rooms.repository";
import type { Room } from "../../db/schema/rooms";

export type RoomStatus = "occupied" | "vacant";

export type RoomSummary = Pick<Room, "id" | "name" | "type" | "isActive"> & {
  currentStatus: RoomStatus;
};

async function occupiedRoomIdsNow(): Promise<Set<number>> {
  const rows = await listConfirmedBookingsCoveringNow(new Date());
  return new Set(rows.map((r) => r.roomId));
}

function toSummary(row: Room, occupiedRoomIds: Set<number>): RoomSummary {
  return {
    id: row.id,
    name: row.name,
    type: row.type,
    isActive: row.isActive,
    currentStatus: occupiedRoomIds.has(row.id) ? "occupied" : "vacant",
  };
}

export async function listRooms(): Promise<RoomSummary[]> {
  const [rows, occupiedRoomIds] = await Promise.all([
    listActiveRooms(),
    occupiedRoomIdsNow(),
  ]);
  return rows.map((row) => toSummary(row, occupiedRoomIds));
}

export async function getRoom(id: number): Promise<RoomSummary> {
  const [row, occupiedRoomIds] = await Promise.all([
    getRoomById(id),
    occupiedRoomIdsNow(),
  ]);
  if (!row) {
    throw Object.assign(new Error("Room not found."), { status: 404 });
  }
  return toSummary(row, occupiedRoomIds);
}
