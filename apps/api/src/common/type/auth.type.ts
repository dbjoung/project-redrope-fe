import { AuthPayloadAfterType } from "@src/auth/common/auth.type";

export type AuthRequest = Request & { user: AuthPayloadAfterType };
