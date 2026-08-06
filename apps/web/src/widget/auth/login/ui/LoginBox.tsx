import { LabelBox } from "@share/ui/LabelBox.tsx";
import FlexColContainer from "@share/ui/FlexColContainer.tsx";
import InputBox from "@share/ui/InputBox.tsx";
import ButtonBig from "@share/ui/ButtonBig.tsx";
import { useActionState, useEffect, useRef } from "react";
import HelperLink from "@share/ui/HelperLink.tsx";
import { InfoBoxes } from "@/feature/infoBoxes/ui/InfoBoxes";
import { useInfoes } from "@/feature/infoBoxes/model/useInfoes";
import { emailValidation } from "@/share/lib/validation";
import { useAuth } from "@/share/model/useAuth";

type LoginFormData = {
  email: string;
  password: string;
};

const defaultLoginFormData: LoginFormData = { email: "", password: "" };

export default function LoginBox() {
  const emailInputBox = useRef<HTMLInputElement>(null);
  const passwordInputBox = useRef<HTMLInputElement>(null);

  const { infoes, addInfo, clearInfo } = useInfoes();
  const { login, isPending, isError } = useAuth().loginMutate;

  useEffect(() => {
    if (!isError) return;
    clearInfo();
    addInfo("warn", "아이디와 비밀번호를 다시한번 확인해주세요.");
  }, [addInfo, clearInfo, isError]);

  const loginSubmitHandler = async (preState: LoginFormData, formData: FormData) => {
    const email = formData.get("user-email") as string;
    const password = formData.get("user-password") as string;
    const errors: string[] = [];

    if (!email) errors.push("이메일을 입력해주세요.");
    else if (!emailValidation(email)) errors.push("이메일이 맞는지 확인해주세요.");

    if (!password) errors.push("비밀번호를 입력해주세요.");

    if (errors.length > 0) {
      errors.forEach((message) => addInfo("warn", message));
    } else {
      login({ email, password });
    }

    return { email, password };
  };

  const [loginData, loginAction, _isPending] = useActionState(
    loginSubmitHandler,
    defaultLoginFormData,
  );

  return (
    <FlexColContainer className="gap-rd-24 rd-box-shadow p-rd-40 bg-rd-white" round="large">
      <form action={loginAction} className="gap-rd-24 flex flex-col">
        <div className="gap-rd-4 flex flex-col">
          <LabelBox text={"이메일"} required={true} labelProps={{ htmlFor: "user-email" }} />
          <InputBox
            id={"user-email"}
            name={"user-email"}
            ref={emailInputBox}
            placeholder={"이메일을 입력해주세요."}
            defaultValue={loginData.email}
            className={"w-full"}
          />
        </div>
        <div className="gap-rd-4 flex flex-col">
          <LabelBox text={"비밀번호"} required={true} labelProps={{ htmlFor: "user-password" }} />
          <InputBox
            id={"user-password"}
            name={"user-password"}
            ref={passwordInputBox}
            placeholder={"비밀번호를 입력해주세요."}
            defaultValue={loginData.password}
            className={"w-full"}
          />
        </div>
        <ButtonBig
          as="button"
          text={isPending ? "로그인 중..." : "로그인"}
          background
          rounded
          elementProps={{ type: "submit", className: "w-full", disabled: isPending }}
        />
      </form>
      <InfoBoxes infoes={infoes} />
      <div className="gap-rd-8 flex flex-col">
        <HelperLink label={"아직 계정이 없으신가요?"} linkLabel={"회원가입"} href={"/join"} />
        <HelperLink
          label={"비밀번호를 잃어버리셨나요?"}
          linkLabel={"비밀번호 찾기"}
          href={"/find-password"}
        />
      </div>
    </FlexColContainer>
  );
}
