import * as React from 'react';
import { Button } from '@/components/ui/button';
import { Minus, Plus } from 'lucide-react';
import { RefCallBack } from 'react-hook-form';

interface TicketNumberInputProps {
  onChange: (value: number) => void;
  value: number;
  ref: RefCallBack;
}

const TicketNumberInput = ({ onChange, value, ref }: TicketNumberInputProps) => {
  const [inputValue, setInputValue] = React.useState<number>(
    value === undefined ? 0 : Number(value)
  );

  // I should probably call the onChange here.
  const addToValue = () => {
    const newValue = inputValue + 1;
    setInputValue(newValue);
    onChange?.(newValue);
  };

  const substractFromValue = () => {
    const newValue = inputValue - 1 <= 0 ? 0 : inputValue - 1;
    setInputValue(newValue);
    onChange?.(newValue);
  };

  return (
    <div className={'flex items-center'}>
      <Button variant={'ghost'} size={'icon'} onClick={substractFromValue}>
        <Minus />
      </Button>
      <input ref={ref} value={inputValue} type={'hidden'} />
      <span className={'text-xl'}>{inputValue}</span>
      <Button variant={'ghost'} size={'icon'} onClick={addToValue}>
        <Plus />
      </Button>
    </div>
  );
};
TicketNumberInput.displayName = 'Input';

export { TicketNumberInput };
