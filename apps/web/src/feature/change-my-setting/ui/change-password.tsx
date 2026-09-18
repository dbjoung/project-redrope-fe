import { LabelBox } from "@/share/ui/LabelBox";
import { useRef } from "react";
import { useInfoes } from "@/feature/infoBoxes/model/useInfoes";
import { InfoBoxes } from "@/feature/infoBoxes/ui/InfoBoxes";
import { passwordValidation } from "@/share/lib/validation";
import ButtonBig from "@/share/ui/ButtonBig";
import { unWarp } from "@/share/lib/unWrap";
import { useMutation } from "@tanstack/react-query";
import { useClient } from "@/share/model/useClient";
import { CustomError } from "@/share/lib/CustomError";
import InputBox from "@/share/ui/InputBox";

type BoxResponse = {
  data: string;
};

export const ChangePassword = () => {
  const currentPasswordInputBox = useRef<HTMLInputElement>(null);
  const newPasswordInputBox = useRef<HTMLInputElement>(null);
  const newPasswordCheckInputBox = useRef<HTMLInputElement>(null);
  const { infoes, addInfo, clearInfo } = useInfoes();
  const { request } = useClient();

  const { mutate: changePassword, isPending: isPasswordChanging } = useMutation({
    mutationFn: async ({
      currentPassword,
      password,
    }: {
      currentPassword: string;
      password: string;
    }) => {
      const res = unWarp(
        await request<BoxResponse>("setting", "/v1/api/my/password", {
          method: "PATCH",
          body: JSON.stringify({
            currentPassword,
            password,
          }),
        }),
      );
      if (res) return res;
      throw new CustomError("비밀번호 변경", "비밀번호 변경에 문제가 생겼습니다.");
    },
    onSuccess: () => {
      if (currentPasswordInputBox.current) currentPasswordInputBox.current.value = "";
      if (newPasswordInputBox.current) newPasswordInputBox.current.value = "";
      if (newPasswordCheckInputBox.current) newPasswordCheckInputBox.current.value = "";
      clearInfo();
      addInfo("info", "비밀번호가 변경되었습니다.");
    },
    onError: () => {
      clearInfo();
      addInfo("warn", "비밀번호 변경에 실패했습니다.");
    },
  });

  const changePasswordHandler = () => {
    const currentPassword = currentPasswordInputBox.current?.value ?? "";
    const password = newPasswordInputBox.current?.value ?? "";
    const passwordCheck = newPasswordCheckInputBox.current?.value ?? "";
    const errors: string[] = [];

    if (!currentPassword) errors.push("현재 비밀번호를 입력해주세요.");
    if (!password) errors.push("새 비밀번호를 입력해주세요.");
    else if (!passwordValidation(password))
      errors.push("비밀번호는 알파벳과 숫자가 섞인 10자 이상 문자열을 사용해주세요.");
    if (!passwordCheck) errors.push("새 비밀번호를 한번 더 입력해주세요.");
    else if (password !== passwordCheck) errors.push("새 비밀번호 확인이 일치하지 않습니다.");

    clearInfo();
    if (errors.length > 0) {
      errors.forEach((error) => addInfo("warn", error));
      return;
    }

    changePassword({ currentPassword, password });
  };

  return (
    <div className="gap-rd-16 px-rd-20 py-rd-24 rounded-rd-8 bg-rd-white rd-box-shadow flex flex-col">
      <LabelBox
        iconInfo={{ name: "key-round", customize: { size: 24 } }}
        text={"비밀번호 변경"}
        textVariant="medium"
      />
      <div className="gap-rd-12 flex flex-col">
        <div className="gap-rd-4 flex flex-col">
          <LabelBox
            text={"현재 비밀번호"}
            required={true}
            labelProps={{ htmlFor: "current-password" }}
          />
          <InputBox
            id={"current-password"}
            name={"current-password"}
            ref={currentPasswordInputBox}
            type={"password"}
            placeholder={"현재 비밀번호를 입력해주세요."}
            className={"w-full"}
          />
        </div>
        <div className="gap-rd-4 flex flex-col">
          <LabelBox text={"새 비밀번호"} required={true} labelProps={{ htmlFor: "new-password" }} />
          <InputBox
            id={"new-password"}
            name={"new-password"}
            ref={newPasswordInputBox}
            type={"password"}
            placeholder={"새 비밀번호를 입력해주세요."}
            className={"w-full"}
          />
        </div>
        <div className="gap-rd-4 flex flex-col">
          <LabelBox
            text={"새 비밀번호 확인"}
            required={true}
            labelProps={{ htmlFor: "new-password-check" }}
          />
          <InputBox
            id={"new-password-check"}
            name={"new-password-check"}
            ref={newPasswordCheckInputBox}
            type={"password"}
            placeholder={"새 비밀번호를 한번 더 입력해주세요."}
            className={"w-full"}
          />
        </div>
      </div>
      <ButtonBig
        as="button"
        text={isPasswordChanging ? "변경 중" : "비밀번호 변경"}
        background
        rounded
        elementProps={{
          type: "button",
          className: "w-full justify-center",
          disabled: isPasswordChanging,
          onClick: changePasswordHandler,
        }}
      />
      <InfoBoxes infoes={infoes} />
    </div>
  );
};
