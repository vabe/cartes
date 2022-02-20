export default function Button({ children, onClick, light, disabled }) {
  const buttonStyle =
    "group relative h-fit w-44 flex justify-center self-center py-2 px-4 border border-transparent text-sm font-medium rounded-md focus:ring-2 focus:ring-offset-2 focus:outline-none focus:ring-indigo-500";
  const defaultColor = "text-white bg-indigo-500 hover:bg-indigo-600";
  const lightColor = "text-indigo-500 bg-slate-50 hover:bg-slate-100";
  const disabledColor =
    "text-indigo-500 bg-slate-50 hover:bg-slate-100 cursor-not-allowed";

  return (
    <button
      className={`${buttonStyle} ${
        disabled ? disabledColor : light ? lightColor : defaultColor
      }`}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
}
