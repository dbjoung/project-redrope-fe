import { useRouteError } from "react-router";
import { useEffect } from "react";
import { CustomError } from "./CustomError";
import ErrorPage from "../ui/ErrorPage";

function errorToLog(message: string) {
  console.log(message);
}

export function RouteErrorBoundary() {
  const error = useRouteError();

  useEffect(() => {
    const message = [];

    if (error instanceof CustomError) {
      message.push(`${error.from} 에서 발생한 문제입니다.\n`);
      if (error.status || error.statusText) message.push(`${error.status} : ${error.statusText}`);
      else message.push(`${error.message}`);
    } else message.push("알 수 없는 오류가 발생했습니다.");

    errorToLog(message.join("\n"));
  }, [error]);

  return <ErrorPage />;
}
