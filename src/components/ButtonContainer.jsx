import styled from "styled-components";

const StyledButtons = styled.section({
  display: "flex",
  justifyContent: "center",
  margin: "20px 0",
});

export default function ButtonContainer({ children }) {
  return <StyledButtons>{children}</StyledButtons>;
}
