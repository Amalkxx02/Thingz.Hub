import { MdSettings, MdAdd } from "react-icons/md";
import Button from "../../../../../shared/components/Button/Button";
import CreationMenu from "../../AddTab/CreationMenu";
import useSidebar from "./useSidebar";

const Sidebar = () => {
  const { addMenu } = useSidebar();
  return (
    <aside className="flex h-full w-1/6 flex-col justify-between">
      <div
        className={`w-full cursor-pointer py-2 text-center text-lg font-semibold hover:bg-amber-100`}
        /* onClick={() => setSelected("all_device")} */
      >
        HOME
      </div>

      <div className="flex h-1/6 flex-col gap-2">
        <Button onClick={() => addMenu()}>
          <div className="flex w-full items-center gap-4">
            <MdAdd />
            <span>Add</span>
          </div>
        </Button>
        <Button>
          <div className="flex w-full items-center gap-4">
            <MdSettings />
            <span>Settings</span>
          </div>
        </Button>
      </div>
    </aside>
  );
};

export default Sidebar;
