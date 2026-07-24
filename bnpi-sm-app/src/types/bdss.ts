/** Shared BDSS API contract types — mirrors bnpi-sm-api's /api/v1 response shapes. */

export type UserRole = 'admin' | 'front_desk';

export interface AuthUser {
  id: number;
  email: string;
  displayName: string;
  role: UserRole;
  isActive: boolean;
}

export interface LoginResponse {
  token: string;
  user: AuthUser;
}

export type RoomType = 'meeting' | 'vip';
export type RoomStatus = 'occupied' | 'vacant';

export interface Room {
  id: number;
  name: string;
  type: RoomType;
  isActive: boolean;
  currentStatus: RoomStatus;
}

export type BookingStatus = 'confirmed' | 'cancelled';
export type CheckinMethod = 'manual';

export interface Booking {
  id: number;
  roomId: number;
  roomName: string;
  createdByUserId: number;
  title: string;
  startsAt: string;
  endsAt: string;
  status: BookingStatus;
  checkedInAt: string | null;
  checkedInByUserId: number | null;
  checkinMethod: CheckinMethod | null;
  cancelledAt: string | null;
  cancelledByUserId: number | null;
  createdAt: string;
  updatedAt: string;
}

export interface AvailabilityWindow {
  startsAt: string;
  endsAt: string;
}

export interface RoomAvailability {
  roomId: number;
  roomName: string;
  roomType: RoomType;
  bookings: AvailabilityWindow[];
}

export interface AvailabilityResponse {
  date: string;
  rooms: RoomAvailability[];
}
