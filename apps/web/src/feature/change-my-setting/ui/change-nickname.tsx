import { CustomError } from "@/share/lib/CustomError";
import { unWarp } from "@/share/lib/unWrap";
import { useClient } from "@/share/model/useClient";
import ButtonBoxIcon from "@/share/ui/ButtonBoxIcon";
import InputBox from "@/share/ui/InputBox";
import { LabelBox } from "@/share/ui/LabelBox";
import type { UserType } from "@redrope/shared";
import { useMutation } from "@tanstack/react-query";
import { useRef, useState } from "react";

export const ChangeNickname = ({
  getUser,
  setUser,
}: {
  getUser: () => UserType | null;
  setUser: (user: UserType) => void;
}) => {
  const { request } = useClient();

  const emailInputBox = useRef<HTMLInputElement>(null);

  const [isEditing, setIsEditing] = useState(false);

  const { mutate: changeNickname } = useMutation({
    mutationFn: async () => {
      const res = unWarp(
        await request<UserType>("setting", "/v1/api/my/nickname", {
          method: "PATCH",
          body: JSON.stringify({
            nickname: "text",
          }),
        }),
      );
      if (res) return res;
      else throw new CustomError("설정 변경", "내 설정 변경에 문제가 생겼습니다.");
    },
    onSuccess: (user) => {
      const prevUser = getUser();
      if (prevUser) setUser(user);
    },
  });

  return (
    <div className="gap-rd-16 px-rd-20 py-rd-24 rounded-rd-8 bg-rd-white rd-box-shadow flex flex-col">
      <LabelBox
        iconInfo={{ name: "message-circle-more", customize: { size: 24 } }}
        text={"닉네임"}
        textVariant="medium"
        children={
          <ButtonBoxIcon
            iconName={isEditing ? "check-line" : "pencil-line"}
            onClick={() => {
              if (isEditing) changeNickname();
              setIsEditing((prev) => !prev);
            }}
          />
        }
      />
      {isEditing ? (
        <InputBox
          id={"user-email"}
          name={"user-email"}
          ref={emailInputBox}
          placeholder={"이메일을 입력해주세요."}
          defaultValue={getUser()?.nickname}
          className={"w-full"}
        />
      ) : (
        <p className="text-rd-fs-hard">{getUser()?.nickname}</p>
      )}
    </div>
  );
};
