import * as React from 'react';
import { Button } from '@/components/ui/button';
import { Minus, Plus } from 'lucide-react';

const TicketNumberInput = React.forwardRef<HTMLInputElement, React.ComponentProps<'input'>>(
  ({ className, type, onChange, value, ...props }, ref) => {
    const [inputValue, setInputValue] = React.useState<number>(
      value === undefined ? 0 : Number(value)
    );

    const inputRef = React.useRef<HTMLInputElement>(null);

    const getInputValue = () => {
      return inputValue.toString();
    };

    // I should probably call the onChange here.
    const addToValue = () => {
      const newValue = inputValue + 1;
      setInputValue(newValue);
    };

    const substractFromValue = () => {
      const newValue = inputValue - 1 <= 0 ? 0 : inputValue - 1;
      setInputValue(newValue);
    };

    if (inputRef.current !== null) {
      onChange?.(getInputValue());
    }

    return (
      <div className={'flex items-center'}>
        <Button variant={'ghost'} size={'icon'} onClick={substractFromValue}>
          <Minus />
        </Button>
        <input
          ref={(e) => {
            ref(e);
            inputRef.current = e;
          }}
          value={inputValue}
          {...props}
          type={'hidden'}
        />
        <span className={'text-xl'}>{inputValue}</span>
        <Button variant={'ghost'} size={'icon'} onClick={addToValue}>
          <Plus />
        </Button>
      </div>
    );
  }
);
TicketNumberInput.displayName = 'Input';

export { TicketNumberInput };
