import Select, {
  Props as SelectProps,
  GroupBase,
  StylesConfig,
  SingleValue,
} from "react-select";
import { OptionType } from "../types/select";

const customStyles: StylesConfig<OptionType, boolean> = {};

interface CustomSelectProps
  extends Omit<
    SelectProps<OptionType, false, GroupBase<OptionType>>,
    "isMulti"
  > {
  options: OptionType[];
  placeholder?: string;
  onChange?: (selected: SingleValue<OptionType>) => void;
}

const CustomSelect = ({
  options,
  placeholder,
  onChange,
  ...props
}: CustomSelectProps) => {
  return (
    <Select
      options={options}
      isMulti={false}
      placeholder={placeholder}
      styles={customStyles}
      onChange={onChange}
      {...props}
    />
  );
};

export default CustomSelect;
