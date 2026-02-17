import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface SplitRatio {
    nlo: bigint;
    ulo: bigint;
}
export interface LeaseRequest {
    id: string;
    status: Variant_cancelled_pending_rejected_accepted;
    listingId: string;
    info: string;
    tenant: Principal;
    requestDate: Time;
}
export type Time = bigint;
export interface UserProfile {
    name: string;
}
export interface LeaseListing {
    id: string;
    status: LeaseStatus;
    owner: Principal;
    area?: bigint;
    code: string;
    splitRatio: SplitRatio;
    capacity?: bigint;
    location?: string;
}
export enum LeaseStatus {
    active = "active",
    archived = "archived"
}
export enum UserRole {
    admin = "admin",
    user = "user",
    guest = "guest"
}
export enum Variant_cancelled_pending_rejected_accepted {
    cancelled = "cancelled",
    pending = "pending",
    rejected = "rejected",
    accepted = "accepted"
}
export enum Variant_rejected_accepted {
    rejected = "rejected",
    accepted = "accepted"
}
export interface backendInterface {
    archiveLeaseListing(id: string): Promise<void>;
    assignCallerUserRole(user: Principal, role: UserRole): Promise<void>;
    createLeaseListing(id: string, code: string, splitRatio: SplitRatio, location: string | null, area: bigint | null, capacity: bigint | null): Promise<string>;
    getActiveListings(): Promise<Array<LeaseListing>>;
    getCallerUserProfile(): Promise<UserProfile | null>;
    getCallerUserRole(): Promise<UserRole>;
    getOwnerListings(): Promise<Array<LeaseListing>>;
    getRequestsForListing(listingId: string): Promise<Array<LeaseRequest>>;
    getRequestsForOwner(): Promise<Array<LeaseRequest>>;
    getTenantRequests(): Promise<Array<LeaseRequest>>;
    getUserProfile(user: Principal): Promise<UserProfile | null>;
    isCallerAdmin(): Promise<boolean>;
    saveCallerUserProfile(profile: UserProfile): Promise<void>;
    submitLeaseRequest(listingId: string, info: string): Promise<string>;
    updateLeaseListing(id: string, code: string, splitRatio: SplitRatio, location: string | null, area: bigint | null, capacity: bigint | null): Promise<void>;
    updateRequestStatus(requestId: string, newStatus: Variant_rejected_accepted): Promise<void>;
}
