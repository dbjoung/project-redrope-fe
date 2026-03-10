export type TypingBoxProps = {
  htmlFor: string;
  placeholder: string;
  required: boolean;
};

export default function TypingBox({ htmlFor, placeholder, required }: TypingBoxProps) {
  return (
    <input
      className="p-rd-16 text-rd-fs-hard rounded-rd-8 border-rd-surface-gray-100 focus:border-rd-surface-red-200 border-2 focus:outline-none"
      typeof={"text"}
      name={htmlFor}
      id={htmlFor}
      placeholder={placeholder}
      required={required}
    />
  );
}
