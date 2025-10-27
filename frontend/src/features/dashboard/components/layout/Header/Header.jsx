import InputText from "../../../../../shared/components/Input/InputText";
const Header = () => {
  return (
    <header className="flex w-full items-center justify-between">
      <div className="px-4 py-3 text-left text-2xl font-extrabold text-blue-600">
          Thingz.<span className=" text-gray-600">Hub</span>
        </div>
      <div className="w-1/4 p-2">
        <InputText placeholder="Search devices..." />
      </div>
    </header>
  );
};
export default Header;
