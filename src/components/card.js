export default function Card({ value, ...rest }) {
  return (
    <div
      className="transition ease-in-out duration-200 cursor-pointer border-4 border-dashed border-indigo-200 rounded-lg flex items-center justify-center hover:border-indigo-500 hover:bg-indigo-400 hover:text-white"
      {...rest}
    >
      <p className="text-lg font-bold px-6 py-6">{value}</p>
    </div>
  );
}
