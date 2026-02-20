import { BoxLabel, type BoxLabelProps } from "@share/BoxLabel.tsx";
import ContentsContainer from "@share/ContentsContainer.tsx";

type InputBoxType = BoxLabelProps & {
  placeholder: string;
};

export default function InputBoxNormal({ text, htmlFor, placeholder, required }: InputBoxType) {
  return (
    <ContentsContainer>
      <BoxLabel text={text} htmlFor={htmlFor} required={required} />

      <input
        className="p-rd-16 text-rd-fs-hard rounded-rd-8 border-rd-surface-gray-100 focus:border-rd-surface-red-200 border-2 focus:outline-none"
        typeof={"text"}
        name={htmlFor}
        id={htmlFor}
        placeholder={placeholder}
        required={required}
      />
    </ContentsContainer>
  );
}
