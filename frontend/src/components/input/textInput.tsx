export default function FormInput({
  name,
  id,
  type = 'text',
  label = '',
  isTextarea = false,
  value,
}: {
  name: string;
  id: string;
  type?: string;
  label?: string;
  isTextarea?: boolean;
  value?: string;
}) {
  return (
    <div>
      <label htmlFor={id} className={type !== 'hidden' ? 'block py-2' : ''}>
        {label}
      </label>
      {isTextarea ? (
        <textarea
          name={name}
          id={id}
          className={type !== 'hidden' ? 'block w-full rounded-lg border p-2' : ''}
          defaultValue={value}
        />
      ) : (
        <input
          type={type}
          name={name}
          id={id}
          className="block w-full rounded-lg border p-2"
          defaultValue={value}
        />
      )}
    </div>
  );
}
