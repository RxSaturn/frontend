import { Flex, IconButton, Input, InputGroup, InputRightElement } from "@chakra-ui/react";
import { ChangeEvent, useRef } from "react";
import { FiSearch } from "react-icons/fi";

interface SearchInputProps<T> {
  list: T[];
  setList: (list: T[]) => void;
  getKey: (item: T) => string;
}

export const SearchInput = <T,>({ list, setList, getKey }: SearchInputProps<T>) => {
  const inputRef = useRef(null);

  const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.toLowerCase();

    setList(list.filter((item) => getKey(item).toLowerCase().includes(value)));
  };

  return (
    <Flex rounded="xl" boxShadow="lg" border="1px solid #EDF2F7" p={3} width="100%">
      <InputGroup size="md">
        <Input
          ref={inputRef}
          border="none"
          placeholder="Buscar..."
          onChange={(e: ChangeEvent<HTMLInputElement>) => handleOnChange(e)}
        />
        <InputRightElement>
          <IconButton aria-label="" size="sm" icon={<FiSearch />} />
        </InputRightElement>
      </InputGroup>
    </Flex>
  );
};
