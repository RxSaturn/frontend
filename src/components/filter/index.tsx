import { Badge, Flex } from "@chakra-ui/react";
import { useEffect, useState } from "react";

interface FilterOptions {
  id: number;
  key: string;
  label: string;
  colorScheme: string;
  value: string | null | undefined;
  active?: boolean;
}

interface FilterProps<T> {
  list: T[];
  config: FilterOptions[];
  setList: (e: T[]) => void;
  setUseFilter: (e: boolean) => void;
}

export const Filter = <T,>({ list, config, setList, setUseFilter }: FilterProps<T>) => {
  const [internalList, setInternalList] = useState(list);
  const [internalConfig, setInternalConfig] = useState(config);

  useEffect(() => {
    filterList();
  }, [list, internalConfig]);

  const handleBadge = (id: number) => {
    let updatedConfig: FilterOptions[];

    if (id === 1) {
      // Se a opção com valor null for selecionada
      updatedConfig = internalConfig.map((item) => ({
        ...item,
        active: item.id === id,
      }));
      setUseFilter(false);
    } else {
      // Se uma opção diferente de valor null for selecionada
      updatedConfig = internalConfig.map(function (objeto) {
        if (objeto.id === 1) {
          return { ...objeto, active: false };
        }
        if (objeto.id === id) {
          return { ...objeto, active: !objeto.active };
        }
        return objeto;
      });
      setUseFilter(true);
    }

    const activeOptions = updatedConfig.filter((item) => item.active);

    if (!activeOptions.length) {
      updatedConfig = updatedConfig.map(function (objeto) {
        if (objeto.id === 1) {
          return { ...objeto, active: true };
        }
        return objeto;
      });
    }
    setInternalConfig(updatedConfig);
  };

  const filterList = () => {
    const activeOptions = internalConfig.filter((item) => item.active);

    if (activeOptions.length === internalConfig.length) {
      // Se todas as opções estiverem selecionadas
      const updatedConfig = internalConfig.map((item) => ({
        ...item,
        active: item.id === 1,
      }));

      setInternalConfig(updatedConfig);
      setInternalList(list);
    } else if (activeOptions.length > 0) {
      // Se pelo menos uma opção estiver selecionada
      const filteredList = activeOptions[0].id !== 1
        ? list.filter((item) => {
            return activeOptions.some((option) =>
              option.id === 1 || option.value === "-1"
                ? option.value !== undefined && item[option.key as keyof typeof item] !== null
                : option.value !== undefined && item[option.key as keyof typeof item] === option.value,
            );
        })
        : list

      setInternalList(filteredList);
    } else {
      // Se nenhuma opção estiver selecionada
      setInternalList(list);
    }
  };

  const getTotalOption = (key: string, value: string | null | undefined, array: any[]) => {
    if (value === undefined) return array.length;

    if (value === "-1") {
      return array.filter((item) => item[key] !== null).length;
    }

    return array.filter((item) => item[key] === value).length;
  };

  useEffect(() => {
    setList(internalList);
  }, [internalList]);

  return (
    <Flex gridGap={5} flexWrap="wrap">
      {internalConfig.map((item) => (
        <Badge
          px={2}
          py={1}
          rounded="lg"
          key={item.id}
          cursor="pointer"
          colorScheme={item.colorScheme}
          onClick={() => handleBadge(item.id)}
          variant={item.active ? "solid" : "outline"}
        >
          {item.label} ({getTotalOption(item.key, item.value, list)})
        </Badge>
      ))}
    </Flex>
  );
};
