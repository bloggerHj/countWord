import { useState } from "react";
import Warning from "./Warning";

export default function Textarea({ text, setText }) {
  // 원래 여기 있었지만, Stats word count를 위해서 Lifiting state up
  // We need to lift the state up to the parent component, so we can use it in the stats section
  // const [text, setText] = useState("");
  // 이게 정말 필요한 지 생각할 필요가 있음.
  // const [showWarning, setShowWarning] = useState(false);
  const [warningText, setWarningText] = useState("");
  // numberOfCharacters를 useState로 만들고 싶겠지만, 필요가 없음

  // const numberOfCharacters = text.length;

  const handleChange = (e) => {
    let newText = e.target.value;
    if (newText.includes("<script>")) {
      setWarningText("No script tag allowed");
      newText = newText.replace("<script>", "");
    } else if (newText.includes("@")) {
      setWarningText("No @ symbol allowed");
      newText = newText.replace("@", "");
    } else {
      // 틀리고 나서 다시 적을 때 경고문구를 없애줌.
      setWarningText("");
    }
    setText(newText);
  };
  return (
    <div className="textarea">
      <textarea
        value={text}
        onChange={handleChange}
        placeholder="Enter your text"
        spellCheck="false"
      />
      {warningText ? <Warning warningText={warningText} /> : null}
    </div>
  );
}
