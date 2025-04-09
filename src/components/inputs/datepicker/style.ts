import ReactDatePicker from "react-datepicker";
import styled from "styled-components";

export const Wrapper = styled.div`
  .react-datepicker-wrapper {
    width: 100%;
  }
`;

export const DatePickerContainer = styled<any>(ReactDatePicker)`
  border: 1px solid;
  border-color: inherit;
  border-radius: 0.375rem;

  height: 40px;
  width: inherit;
  padding-left: 16px;
  padding-right: 16px;

  &.invalid {
    border: 2px solid #e53e3e;
  }

  :focus-visible {
    outline: none;
    border-color: #3182ce;
    box-shadow: 0 0 0 1px #3182ce;
  }
`;
