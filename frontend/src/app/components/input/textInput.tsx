export default function FormInput({
  name,
  id,
  type = "text",
  label,
  isTextarea = false,
}: {
  name: string,
  id: string,
  type?: string,
  label: string,
  isTextarea?: boolean,
}) {
  return (
    <div>
      <label htmlFor={id} className="block py-2">{label}</label>
      {isTextarea ? <textarea name={name} id={id} className="border w-full block rounded-lg p-2"/> : 
        <input type={type} name={name} id={id} className="border w-full block rounded-lg p-2"/>}
    </div>
  );
}