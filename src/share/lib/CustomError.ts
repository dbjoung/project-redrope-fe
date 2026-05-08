export class CustomError extends Error {
  from: string;
  status?: number;
  statusText?: string;

  constructor(from: string, arg1: string | Response, arg2?: Response) {
    const isMessage = typeof arg1 === "string";

    super(isMessage ? arg1 : "API 요청에서 문제가 발생했습니다.");

    this.name = "CustomError";
    this.from = from;

    let res = null;

    if (!isMessage) res = arg1;
    else if (arg2) res = arg2;

    if (res) {
      this.status = res.status;
      this.statusText = res.statusText;
    }
  }
}
