import { InputBox } from "../primities/inputBox";

export function InputRow(props: any) {
  const { title } = props;
  return (
    <>
      <h2 className="text-xl mx-1">{title}</h2>
      <InputBox />
    </>
  );
}
