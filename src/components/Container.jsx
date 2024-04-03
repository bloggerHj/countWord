import { useState, useEffect } from "react";
import Stats from "./Stats";
import Textarea from "./Textarea";
import ButtonContainer from "./ButtonContainer";
import Button from "./Button";
import { marked } from "marked";

export default function Container() {
  const [text, setText] = useState("");
  const [isCopied, setIsCopied] = useState(false);
  const [isReset, setIsReset] = useState(false);

  const countWords = (text) => {
    const words = text.match(/[\uAC00-\uD7A3a-zA-Z]+/g);
    return words ? words.length : 0;
  };

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
        <Button label="초기화" isClicked={isReset} handleClick={resetText} />
      </ButtonContainer>
    </>
  );
}
