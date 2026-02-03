import * as React from "react"
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { FormatIntoNumber } from "src/utils/utils";

type DecimalPrecision = {
  integerDigits: number
  decimalDigits: number
 // defaultValue: number
}

export interface CustomNumberInputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange'> {
    className?: string,
    decimalPrecision?: DecimalPrecision
    onChange?: (value: string | null) => void
}

const DEFAULT_PRECISION: DecimalPrecision = {
  integerDigits: 10,
  decimalDigits: 2,
  //defaultValue: 0.00
}

const DECIMAL_SEPARATOR = "."

const NumberInput = React.forwardRef<HTMLInputElement, CustomNumberInputProps>(
  ({
    className,
    decimalPrecision = DEFAULT_PRECISION,
    onChange,
    value, // we add this, so that the value syncs with the value from the component that uses it, say product price
    ...props
  }, ref) => {
    const [valueInput, setValueInput] = React.useState("")
    // const [displayValue, setDisplayValue] = React.useState("")
    // const [isFocus, setIsFocus] = React.useState(false)
   
    // Sync internal state with external value
    React.useEffect(() => {
      if (value !== undefined && value !== null) {
        setValueInput(String(value));
      } else {
        setValueInput('');
      }
    }, [value]);

    const formatValue = React.useCallback((input: string): string => {
      let formatted = input.replace(/[^\d-+,.]/, "")

      if (formatted.includes("-")) {
        formatted = formatted.replace(/-/g, "")
        formatted = formatted.startsWith("-") ? formatted : `-${formatted}`
      }

      if (formatted.includes("+")) {
        formatted = formatted.replace(/-/g, "")
        formatted = formatted.replace(/\+/g, "")
      }

      if (formatted.includes(".") || formatted.includes(",")) {
        formatted = formatted.replace(".", DECIMAL_SEPARATOR)
        formatted = formatted.replace(",", DECIMAL_SEPARATOR)

        const [intPart, ...rest] = formatted.split(DECIMAL_SEPARATOR)
        const decPart = rest.join("")
        
        const limitedDecPart = decPart.slice(0, decimalPrecision.decimalDigits)
        const formattedIntPart = !intPart || intPart === "-" ? `0${intPart}` : intPart

        formatted = `${formattedIntPart}${DECIMAL_SEPARATOR}${limitedDecPart}`
      } else {
        const isNegative = formatted.startsWith("-")
        const digits = isNegative ? formatted.slice(1) : formatted
        if (digits.length > decimalPrecision.integerDigits) {
          formatted = isNegative
            ? `-${digits.slice(0, decimalPrecision.integerDigits)}`
            : digits.slice(0, decimalPrecision.integerDigits)
        }
      }

      return formatted
    }, [decimalPrecision])

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
      const allowedKeys = [
        "Backspace", "Delete", "ArrowLeft", "ArrowRight",
        "Tab", "Home", "End", "-", "+", ".", ",", "0",
        "1", "2", "3", "4", "5", "6", "7", "8", "9"
      ]
        console.log("in the key down event.."+ e.key);
      if (!allowedKeys.includes(e.key)) {
        e.preventDefault()
      } else if (valueInput.includes(DECIMAL_SEPARATOR) && (e.key === "." || e.key === ",")) {
        e.preventDefault()
      }
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        console.log("handle change event..");
      const newValue = e.target.value; //formatValue(e.target.value)
      setValueInput(newValue)
      //onChange?.(newValue === '' ? null : newValue)
    }

    const handleBlur = () => {
      const formattedValue = formatValue(valueInput);

      console.log("custom blur")
      setValueInput(FormatIntoNumber(formattedValue));

      onChange?.(formattedValue === '' ? null : formattedValue);
    };

    const handleFocus = (e: React.ChangeEvent<HTMLInputElement>) => {
      e.target.select();
    };

    const cn = (...inputs: ClassValue[]) => {
      return twMerge(clsx(inputs));
    }

    return (
      <input
        type="text"
        className={cn(
          "flex h-10 w-full rounded-md border border-input border-gray-400 bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
        )}
        style={{ textAlign: 'right' }}
        value={valueInput}
        onKeyDown={handleKeyDown}
        onChange={handleChange}
        onBlur={handleBlur}
        onFocus={handleFocus}

        ref={ref}
        {...props}
      />
    )
  }
)

NumberInput.displayName = "CustomNumberInput"

export { NumberInput }