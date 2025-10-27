const InputCheck = ({ value, onCheck, label }) => {
  return (
    <div className="flex flex-col gap-2 w-fit">
      {label}
      <div>
      <label className="relative inline-flex cursor-pointer items-center border-l-6 border-indigo-600 shadow">
        <input type="checkbox" className="peer sr-only" value={value} onClick={(e)=> onCheck(e.target.checked)}/>
        <div className="h-5 w-10" />
        <div className="transform-translate absolute h-5 w-2.5 bg-indigo-600 duration-200 ease-linear peer-checked:translate-x-5" />
      </label>
      </div>
    </div>
  );
};

export default InputCheck;
