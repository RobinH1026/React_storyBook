import React, { useState, useRef, useEffect } from "react";
import styled from "@emotion/styled";
import { css, keyframes } from "@emotion/react";
import SearchIcon from "@mui/icons-material/Search";

interface ContainerProps {
  hover: boolean;
}

interface InputProps {
  showSearchInput: boolean;
}

export const Wrapper = styled.div`
  width: 320px;
  display: flex;
  justify-content: flex-end;
`;

export const Container = styled.div<ContainerProps>`
  position: relative;
  width: 50px;
  height: 50px;
  box-sizing: border-box;
  border-radius: 10000px;
  padding: 5px;
  background: #eeeeee;
  transition: all 0.5s;

  display: flex;
  justify-content: flex-start;
  align-items: center;
  flex-direction: row;

  ${({ hover }) =>
    hover &&
    css`
      width: 50%;
      @media (min-width: 768px) {
        width: 80%;
      }
    `}
`;

export const SearchInput = styled.input<InputProps>`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 50px;
  line-height: 48px;
  outline: 0;
  border: 0;
  font-size: 15px;
  border-radius: 10000px;
  padding-left: 3rem;
  margin: 0;
  -moz-appearance: none;
  -webkit-appearance: none;
  appearance: none;
  background: #eeeeee;
  color: #9e9e9e;

  display: ${(props) => (props.showSearchInput ? "block" : "none")};
`;

const fadeIn = keyframes`
  from {
    opacity: 0;
  }

  to {
    opacity: 1;
  }
`;

const IconCommonCss = css`
  height: 1.25rem;
  width: 1.25rem;
  fill: #9e9e9e;
  z-index: 10;
  animation: ${fadeIn} 1s linear;
`;

export const IconWrapper = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: row;
  width: 50px;
`;

export const IconMagnifyingGlass = styled(SearchIcon)`
  ${IconCommonCss}
`;

export const IconRightArrow = styled(SearchIcon)`
  ${IconCommonCss}
  align-self: flex-end;
  cursor: pointer;
  &:hover {
    fill: #393e46;
  }
`;

const StyledSearchBar = ({
  handleSearchChange,
  defaultValue,
  hiddenSearchBar = true,
}) => {
  const targetRef = useRef() as React.MutableRefObject<HTMLInputElement>;
  const [isHovered, setIsHovered] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const showSearchInput = hiddenSearchBar ? isHovered || isFocused : true;

  useEffect(() => {
    targetRef.current.value = "";
  }, [showSearchInput]);

  return (
    <Wrapper>
      <Container
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        hover={showSearchInput}
      >
        <SearchInput
          ref={targetRef}
          showSearchInput={showSearchInput}
          placeholder="Search"
          defaultValue={defaultValue}
          onChange={handleSearchChange}
        />
        <IconWrapper>
          <IconMagnifyingGlass />
        </IconWrapper>
      </Container>
    </Wrapper>
  );
};

export default StyledSearchBar;
