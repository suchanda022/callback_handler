export type TransactionStatus =
|"SUCCESS"
|"FAILED"
|"PENDING";

const GATEEWAY_STATUS_MAP : Record<string,TransactionStatus> = {
    "00":"SUCCESS",
    "01":"FAILED",
    "02":"FAILED",
    "91":"PENDING",
    "99":"PENDING"
};

export function mapGatewatcodetoStatus(
    code:string
): TransactionStatus{
    return GATEEWAY_STATUS_MAP[code] ?? "FAILED";
}