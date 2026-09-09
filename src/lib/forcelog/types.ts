export type ForceLogResult = "SUCCESS" | "ERROR";

export type ForceLogResponse<T> = {
  RESULT: ForceLogResult;
  MESSAGE?: string;
} & Partial<T>;

export type ForceLogParcelStatus =
  | "NEW_PARCEL"
  | "WAITING_PICKUP"
  | "IN_PROGRESS"
  | "DELIVERED"
  | "RETURNED"
  | "CANCELLED";

export type ForceLogCity = {
  CODE: string;
  NAME: string;
  D_FEES: number;
  D_FEES_SAME_CITY: number;
};

export type ForceLogCities = Record<string, ForceLogCity>;

export type AddParcelParams = {
  ORDER_NUM: string;
  RECEIVER: string;
  PHONE: string;
  CITY: string;
  ADDRESS: string;
  COMMENT?: string;
  PRODUCT_NATURE?: string;
  COD?: number;
  CAN_OPEN?: boolean;
  STOCK?: string;
  FRAGILE?: boolean;
  CARTON?: string;
};

export type ForceLogParcel = {
  CODE: string;
  TRACKING_NUMBER: string;
  ORDER_NUM?: string;
  STATUS?: ForceLogParcelStatus;
  COD?: number;
  DELIVERY_FEES?: number;
  RECEIVER?: string;
  PHONE?: string;
  CITY?: string;
  ADDRESS?: string;
};

export type ForceLogTrackingEvent = {
  STATUS_CODE: string;
  STATUS_NAME: string;
  CITY_NAME?: string;
  TIME: string;
  TIMESTAMP: number;
};

export type RelaunchParams = {
  CODE: string;
  RECEIVER: string;
  PHONE: string;
  ADDRESS: string;
  COD?: number;
  COMMENT?: string;
};

export type RelaunchZoneParams = RelaunchParams & {
  CITY: string;
};

export class ForceLogApiError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "ForceLogApiError";
  }
}
