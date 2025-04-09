export const SelectStyles = {
  control: (provided: any, { isDisabled, isFocused }: any) => ({
    ...provided,
    minHeight: "40px",
    borderRadius: "6px",
    borderColor: isDisabled ? "#EDF1F7" : "#E2E7F0",
    backgroundColor: isDisabled ? "#f4f7fa" : "#fff",
    boxShadow: isFocused ? "0 0 0 2px #3182ce" : "none",

    "&:hover": {
      cursor: "pointer",
    },
  }),

  indicatorSeparator: (provided: any) => ({
    ...provided,
    display: "none",
  }),

  clearIndicator: (provided: any) => ({
    ...provided,
    paddingRight: "0",
  }),

  dropdownIndicator: (provided: any) => ({
    ...provided,
    paddingLeft: "4px",
  }),
};
