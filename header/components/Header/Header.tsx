import React from 'react';
import styled from 'styled-components';

function Header() {
  return <StyledHeader>Header</StyledHeader>;
}

export default Header;

const StyledHeader = styled.div`
  width: 100%;
  border: solid 1px red;
  background: blue;
`;
