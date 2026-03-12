import { LabelBox } from "@share/LabelBox.tsx";
import FlexColContainer from "@share/FlexColContainer.tsx";
import InputBox from "@share/InputBox.tsx";
import ButtonBig from "@share/ButtonBig.tsx";
import { useActionState, useRef } from "react";
import HelperLink from "@share/HelperLink.tsx";

type LoginFormData = {
  id: string;
  password: string;
};

const defaultLoginFormData: LoginFormData = { id: "", password: "" };

export default function LoginBox() {
  const idInputBox = useRef<HTMLInputElement>(null);
  const passwordInputBox = useRef<HTMLInputElement>(null);

  const loginSubmitHandler = (preState: LoginFormData, formData: FormData) => {
    // Todo 로그인 API

    return {
      id: formData.get("user-id") as string,
      password: formData.get("user-password") as string,
    };
  };

  const [loginData, loginAction, _isPending] = useActionState(
    loginSubmitHandler,
    defaultLoginFormData,
  );

  return (
    <FlexColContainer className="gap-rd-24 rd-box-shadow p-rd-40 bg-rd-white" round="large">
      <form action={loginAction} className="gap-rd-24 flex flex-col">
        <div className="gap-rd-4 flex flex-col">
          <LabelBox text={"아이디"} required={true} labelProps={{ htmlFor: "user-id" }} />
          <InputBox
            id={"user-id"}
            name={"user-id"}
            ref={idInputBox}
            placeholder={"아이디를 입력해주세요."}
            required={true}
            defaultValue={loginData.id}
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
            required={true}
            defaultValue={loginData.password}
            className={"w-full"}
          />
        </div>
        <ButtonBig buttonProps={{ type: "submit", content: "로그인", className: "w-full" }} />
      </form>
      <div className="gap-rd-8 flex flex-col">
        <HelperLink label={"계정이 없으신가요?"} linkLabel={"회원가입"} href={"/#"} />
        <HelperLink label={"아이디를 잊어버리셨나요?"} linkLabel={"아이디 찾기"} href={"/#"} />
        <HelperLink label={"비밀번호를 잊어버리셨나요?"} linkLabel={"비밀번호 변경"} href={"/#"} />
      </div>
    </FlexColContainer>
  );
}
