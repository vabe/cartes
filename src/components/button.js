export default function Button({ children, onClick, light, disabled }) {
  const buttonStyle =
    "group relative h-fit flex justify-center self-center py-2 px-4 border border-transparent text-sm font-medium rounded-md focus:ring-2 focus:ring-offset-2 focus:outline-none focus:ring-indigo-500";
  const defaultColor = "text-white bg-indigo-500 hover:bg-indigo-600";
  const lightColor =
    "border-2 border-solid border-indigo-200 text-indigo-500 bg-slate-50 hover:bg-slate-100";
  const disabledColor =
    "border-2 border-solid border-indigo-200 text-indigo-200 bg-slate-50 hover:bg-slate-100 cursor-not-allowed";

  const color = light ? lightColor : defaultColor;

  return (
    <button
      className={`${buttonStyle} ${disabled ? disabledColor : color}`}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
}
