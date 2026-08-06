import { LabelBox } from "@share/ui/LabelBox.tsx";
import FlexColContainer from "@share/ui/FlexColContainer.tsx";
import InputBox from "@share/ui/InputBox.tsx";
import ButtonBig from "@share/ui/ButtonBig.tsx";
import { useActionState, useRef } from "react";
import { useInfoes } from "@/feature/infoBoxes/model/useInfoes";
import { InfoBoxes } from "@/feature/infoBoxes/ui/InfoBoxes";
import { emailValidation, passwordValidation } from "@/share/lib/validation";
import { useClient } from "@/share/model/useClient";
import { useNavigate } from "react-router";
import type { UserType } from "@redrope/shared";

type JoinFormData = {
  email: string;
  nickname: string;
  password: string;
  passwordCheck: string;
};

const defaultJoinFormData: JoinFormData = {
  email: "",
  nickname: "",
  password: "",
  passwordCheck: "",
};

export default function JoinBox() {
  const emailInputBox = useRef<HTMLInputElement>(null);
  const nicknameInputBox = useRef<HTMLInputElement>(null);
  const passwordInputBox = useRef<HTMLInputElement>(null);
  const passwordCheckInputBox = useRef<HTMLInputElement>(null);
  const client = useClient<UserType>();
  const naviate = useNavigate();

  const { infoes, addInfo, clearInfo } = useInfoes();

  const joinSubmitHandler = async (preState: JoinFormData, formData: FormData) => {
    const nextState = {
      email: formData.get("user-email") as string,
      nickname: formData.get("user-nickname") as string,
      password: formData.get("user-password") as string,
      passwordCheck: formData.get("user-passwordCheck") as string,
    };
    const errors: string[] = [];

    if (!nextState.email) errors.push("이메일을 입력해주세요.");
    else if (!emailValidation(nextState.email)) errors.push("이메일을 형식을 지켜 입력해주세요.");
    if (!nextState.nickname) errors.push("닉네임을 입력해주세요.");
    if (!nextState.password) errors.push("비밀번호를 입력해주세요.");
    else if (!passwordValidation(nextState.password))
      errors.push("비밀번호는 알파벳과 숫자가 섞인 10자 이상 문자열을 사용해주세요.");
    else if (!nextState.passwordCheck) errors.push("비밀번호를 다시한번 입력해주세요.");
    else if (nextState.password !== nextState.passwordCheck)
      errors.push("비밀번호 확인이 일치하지 않습니다.");

    if (errors.length <= 0) {
      const req = await client.request("join", "/api/v1/auth/join", {
        method: "POST",
        body: JSON.stringify({
          nickname: nextState.nickname,
          email: nextState.email,
          password: nextState.password,
        }),
      });
      if (req) naviate("/login");
      else errors.push("회원가입이 완료되지 못했습니다.");
    }
    clearInfo();
    errors.forEach((error) => addInfo("warn", error));

    return nextState;
  };

  const [joinData, joinAction, _isPending] = useActionState(joinSubmitHandler, defaultJoinFormData);

  return (
    <FlexColContainer className="gap-rd-24 rd-box-shadow p-rd-40 bg-rd-white" round="large">
      <form action={joinAction} className="gap-rd-24 flex flex-col">
        <div className="gap-rd-4 flex flex-col">
          <LabelBox text={"이메일"} required={true} labelProps={{ htmlFor: "user-email" }} />
          <InputBox
            id={"user-email"}
            name={"user-email"}
            ref={emailInputBox}
            placeholder={"이메일을 입력해주세요."}
            defaultValue={joinData.email}
            className={"w-full"}
          />
        </div>
        <div className="gap-rd-4 flex flex-col">
          <LabelBox text={"닉네임"} required={true} labelProps={{ htmlFor: "user-nickname" }} />
          <InputBox
            id={"user-nickname"}
            name={"user-nickname"}
            ref={nicknameInputBox}
            placeholder={"닉네임을 입력해주세요."}
            defaultValue={joinData.nickname}
            className={"w-full"}
          />
        </div>
        <div className="gap-rd-4 flex flex-col">
          <LabelBox text={"비밀번호"} required={true} labelProps={{ htmlFor: "user-password" }} />
          <InputBox
            id={"user-password"}
            name={"user-password"}
            ref={passwordInputBox}
            placeholder={"사용하실 비밀번호를 입력해주세요."}
            defaultValue={joinData.password}
            className={"w-full"}
          />
        </div>
        <div className="gap-rd-4 flex flex-col">
          <LabelBox
            text={"비밀번호 확인"}
            required={true}
            labelProps={{ htmlFor: "user-passwordCheck" }}
          />
          <InputBox
            id={"user-passwordCheck"}
            name={"user-passwordCheck"}
            ref={passwordCheckInputBox}
            placeholder={"비밀번호를 한번 더 입력해주세요."}
            defaultValue={joinData.passwordCheck}
            className={"w-full"}
          />
        </div>
        <ButtonBig
          as="button"
          text={"Join"}
          background
          rounded
          elementProps={{ type: "submit", className: "w-full" }}
        />
      </form>
      <InfoBoxes infoes={infoes} />
    </FlexColContainer>
  );
}
