import type { Request, Response } from "express";
import { sendSuccess } from "../../lib/apiResponse";
import type { RoomIdParam } from "../../schema/rooms";
import { getRoom, listRooms } from "./rooms.service";

export async function handleListRooms(_req: Request, res: Response) {
  const rooms = await listRooms();
  return sendSuccess(res, rooms);
}

export async function handleGetRoom(req: Request, res: Response) {
  const { id } = (req.validatedParams ?? req.params) as unknown as RoomIdParam;
  const room = await getRoom(id);
  return sendSuccess(res, room);
}
