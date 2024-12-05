import React from "react";

interface NumberInputProps {
  value: string | number;
  onChange: (value: string) => void;
  placeholder?: string;
  style?: React.CSSProperties;
}

const NumberInput: React.FC<NumberInputProps> = ({
  value,
  onChange,
  placeholder,
  style,
}) => {
  // Regex para números enteros y flotantes
  const numberRegex = /^\d*\.?\d*$/;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let inputValue = e.target.value;

    // Validar el valor usando el regex
    if (numberRegex.test(inputValue) || inputValue === "") {
      // Si el primer carácter es un punto, agrega "0" antes del punto
      if (inputValue.startsWith(".")) {
        inputValue = "0" + inputValue;
      }
      onChange(inputValue); // Pasar el valor al padre
    }
  };

  return (
    <input
      type="text"
      value={value || ""}
      onChange={handleChange}
      placeholder={placeholder || "Cantidad"}
      style={style}
    />
  );
};

export default NumberInput;
