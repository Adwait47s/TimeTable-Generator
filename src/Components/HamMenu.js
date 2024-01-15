import './Menu.css';

import { RxDashboard } from "react-icons/rx";
import { MdOutlinePersonAddAlt } from "react-icons/md";
import { FaRegEdit } from "react-icons/fa";
import { RiAiGenerate } from "react-icons/ri";

const HamMenu = ({ toggleState, toggleTab }) => {
    return (
        <div className="HamMenu">
            <ul>
                <li><button onClick={() => toggleTab(1)} className={toggleState === 1 ? "tab active-tab" : "tab"}>
                    <a><RxDashboard /></a>
                    <span>Dashboard</span>
                </button>
                </li>
                <li><button onClick={() => toggleTab(2)} className={toggleState === 2 ? "tab active-tab" : "tab"}>
                    <a><MdOutlinePersonAddAlt /></a>
                    <span>Add Info</span>
                </button></li>
                <li><button onClick={() => toggleTab(3)} className={toggleState === 3 ? "tab active-tab" : "tab"}>
                    <a><FaRegEdit /></a>
                    <span>Edit Info</span>
                </button></li>
                <li><button onClick={() => toggleTab(4)} className={toggleState === 4 ? "tab active-tab" : "tab"}>
                    <a><RiAiGenerate /></a>
                    <span>Generate</span>
                </button></li>
            </ul>
        </div>
    );
}

export default HamMenu;