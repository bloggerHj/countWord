import styled from "styled-components";

const StyledButton = styled.button((props) => ({
  display: "flex",
  alignItems: "center",
  margin: "10px",
  padding: "15px 40px",
  borderRadius: "10px",
  backgroundColor: "#f1f6f8",
  color: "#747a7c",
  fontSize: "18px",
  letterSpacing: "2px",
  fontWeight: "500",
  cursor: "pointer",
  border: `2px solid ${props.isClicked ? "#4CAF50" : "none"}`,
}));

export default function Button({ label, isClicked, handleClick }) {
  return (
    <StyledButton onClick={handleClick} isClicked={isClicked}>
      <span>{label}</span>
    </StyledButton>
  );
}
