import { LabelBox } from "@share/ui/LabelBox.tsx";
import FlexColContainer from "@share/ui/FlexColContainer.tsx";
import InputBox from "@share/ui/InputBox.tsx";
import ButtonBig from "@share/ui/ButtonBig.tsx";
import { useActionState, useRef } from "react";
import { emailValidation } from "@/share/lib/validation";
import { useInfoes } from "@/feature/infoBoxes/model/useInfoes";
import { InfoBoxes } from "@/feature/infoBoxes/ui/InfoBoxes";
import { useClient } from "@/share/model/useClient";

type FindPasswordFormData = {
  email: string;
};

const defaultFindPasswordFormData: FindPasswordFormData = {
  email: "",
};

export default function FindPasswordBox() {
  const emailInputBox = useRef<HTMLInputElement>(null);

  const { infoes, addInfo, clearInfo } = useInfoes();
  const client = useClient();

  const findPasswordSubmitHandler = async (preState: FindPasswordFormData, formData: FormData) => {
    const nextState = {
      email: formData.get("user-email") as string,
    };

    clearInfo();
    if (!nextState.email) addInfo("warn", "이메일을 입력해주세요.");
    else if (!emailValidation(nextState.email))
      addInfo("warn", "이메일을 형식을 지켜 입력해주세요.");

    if (infoes.length <= 0) {
      await client.request("findPassword", "/api/v1/auth/find-password", {
        method: "POST",
        body: JSON.stringify({
          email: nextState.email,
        }),
      });
    }

    return nextState;
  };

  const [findPasswordData, findPasswordAction, _isPending] = useActionState(
    findPasswordSubmitHandler,
    defaultFindPasswordFormData,
  );

  return (
    <FlexColContainer className="gap-rd-24 rd-box-shadow p-rd-40 bg-rd-white" round="large">
      <form action={findPasswordAction} className="gap-rd-24 flex flex-col">
        <div className="gap-rd-4 flex flex-col">
          <LabelBox text={"이메일"} required={true} labelProps={{ htmlFor: "user-email" }} />
          <InputBox
            id={"user-email"}
            name={"user-email"}
            ref={emailInputBox}
            placeholder={"이메일을 입력해주세요."}
            defaultValue={findPasswordData.email}
            className={"w-full"}
          />
        </div>
        <ButtonBig
          as="button"
          text={"비밀번호 찾기"}
          background
          rounded
          elementProps={{ type: "submit", className: "w-full" }}
        />
      </form>

      <InfoBoxes infoes={infoes} />
    </FlexColContainer>
  );
}
