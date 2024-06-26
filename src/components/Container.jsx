import { useState, useEffect } from "react";
import Stats from "./Stats";
import Textarea from "./Textarea";
import ButtonContainer from "./ButtonContainer";
import Button from "./Button";
import { marked } from "marked";

export default function Container() {
  const textFromLocalStorage = JSON.parse(localStorage.getItem("text") || '""');
  const [text, setText] = useState(textFromLocalStorage);
  const [isCopied, setIsCopied] = useState(false);
  const [isReset, setIsReset] = useState(false);

  const countWords = (text) => {
    const words = text.match(/[\uAC00-\uD7A3a-zA-Z]+/g);
    return words ? words.length : 0;
  };

  useEffect(() => {
    localStorage.setItem("text", JSON.stringify(text));
  }, [text]);

  useEffect(() => {
    setTimeout(() => {
      setIsCopied(false);
    }, 500);
  }, [isCopied]);

  useEffect(() => {
    setTimeout(() => {
      setIsReset(false);
    }, 500);
  }, [isReset]);

  const copyToClipboard = () => {
    if (text) {
      const htmlText = marked(text);
      navigator.clipboard.writeText(htmlText);
      setIsCopied(true);
    }
    return;
  };

  const resetText = () => {
    if (text) {
      setText("");
      setIsReset(true);
    }
    return;
  };

  const downloadAsMd = () => {
    if (text) {
      const lines = text.split("\n").filter((line) => line.trim() !== "");
      const title = lines[0].trim() || "content";
      const blob = new Blob([text], { type: "text/markdown" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `${title}.md`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    }
    return;
  };

  const stats = {
    textCountWithSpace: text.replace(/#/g, "").length,
    textCountWithoutSpace: text.replace(/[\s#]+/g, "").length,
    wordCount: countWords(text),
    sentenceCount: text.split(/[.?!]+/).filter(Boolean).length,
  };

  return (
    <>
      <main className="container">
        <Textarea text={text} setText={setText} />
      </main>
      <Stats {...stats} />

      <ButtonContainer>
        <Button
          label="복사하기"
          isClicked={isCopied}
          handleClick={copyToClipboard}
        />
        <Button label="다운로드" handleClick={downloadAsMd} />
        <Button label="초기화" isClicked={isReset} handleClick={resetText} />
      </ButtonContainer>
    </>
  );
}
