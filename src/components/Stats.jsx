export default function Stats({
  textCountWithSpace,
  textCountWithoutSpace,
  wordCount,
  sentenceCount,
}) {
  return (
    <section className="stats">
      <Stat number={textCountWithSpace} label="공백포함" />
      <Stat number={textCountWithoutSpace} label="공백제외" />
      <Stat number={wordCount} label="단어수" />
      <Stat number={sentenceCount} label="문장수" />
    </section>
  );
}

function Stat({ label, number }) {
  return (
    <section className="stat">
      <span
        className={`stat__number ${number < 0 ? "stat__number--limit" : ""}`}
      >
        {number}
      </span>
      <h2 className="second-heading">{label}</h2>
    </section>
  );
}
