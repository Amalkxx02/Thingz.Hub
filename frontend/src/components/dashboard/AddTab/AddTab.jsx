import { MdOutlineMeetingRoom } from 'react-icons/md';
import { FaLaptopHouse } from 'react-icons/fa';
import { BsBoxes } from 'react-icons/bs';
import './AddTab.css'

const AddTab = ({setTab}) => {
  return (
<div>
        <div className="add-option" onClick={() => setTab('Add Room')}>
          <div className="add-option-icon">
            <MdOutlineMeetingRoom />
          </div>
          <span className="add-option-text">Add Room</span>
        </div>

        <div className="add-option" onClick={() => setTab('Add Device')}>
          <div className="add-option-icon">
            <FaLaptopHouse />
          </div>
          <span className="add-option-text">Add Device</span>
        </div>

        <div className="add-option" onClick={() => setTab('Add Thing Card')}>
          <div className="add-option-icon">
            <BsBoxes />
          </div>
          <span className="add-option-text">Add Thingz</span>
        </div>
      </div>
  );
};

export default AddTab;