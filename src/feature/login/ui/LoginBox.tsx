import { BoxLabel, type BoxLabelProps } from "@share/BoxLabel.tsx";
import ContentsContainer from "@share/ContentsContainer.tsx";
import TypingBox, { type TypingBoxProps } from "@share/TypingBox.tsx";

type InputBoxType = BoxLabelProps & TypingBoxProps;

export default function LoginBox({ text, htmlFor, placeholder, required }: InputBoxType) {
  return (
    <ContentsContainer>
      <BoxLabel text={text} htmlFor={htmlFor} required={required} />

      <TypingBox htmlFor={htmlFor} placeholder={placeholder} required={required} />
    </ContentsContainer>
  );
}
