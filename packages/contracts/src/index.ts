export type Currency = string;
export type Money = { amount_minor: number; currency: Currency; formatted?: string };
export type StatusProjection = {
  id: string;
  reference?: string;
  status: string;
  status_label: string;
  allowed_actions: string[];
  requires_user_action: boolean;
  next_action: string | null;
  updated_at: string;
};
export type ApiEnvelope<T> = { data: T; meta: { request_id: string } };
export type ApiError = { error: { code: string; message: string; field_errors: Array<{field:string;message:string}>; request_id: string } };
