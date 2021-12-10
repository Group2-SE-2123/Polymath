import React from "react";
import { createPopper } from "@popperjs/core";
import { FaChevronDown } from "react-icons/fa";

const Dropdown = () => {
	// dropdown props
	const [dropdownPopoverShow, setDropdownPopoverShow] = React.useState(false);
	const btnDropdownRef = React.createRef();
	const popoverDropdownRef = React.createRef();
	const openDropdownPopover = () => {
		createPopper(btnDropdownRef.current, popoverDropdownRef.current, {
			placement: "bottom-start",
		});
		setDropdownPopoverShow(true);
	};
	const closeDropdownPopover = () => {
		setDropdownPopoverShow(false);
	};
	return (
		<>
			<div className="flex flex-wrap">
				<div className="w-full sm:w-6/12 md:w-4/12 px-4">
					<div className="relative inline-flex align-middle w-full">
						<button
							type="button"
							ref={btnDropdownRef}
							onClick={() => {
								return dropdownPopoverShow ? closeDropdownPopover() : openDropdownPopover();
							}}
						>
							<FaChevronDown color="#FCC822" />
						</button>
						<div
							ref={popoverDropdownRef}
							className={`${
								dropdownPopoverShow ? "block " : "hidden "
							}bg-white text-base z-50 float-left py-2 list-none text-left rounded shadow-lg mt-1 min-w-48`}
						>
							<a
								href="#pablo"
								className="text-sm py-2 px-4 font-normal block w-full whitespace-no-wrap bg-transparent text-gray-800"
								onClick={(e) => e.preventDefault()}
							>
								Action
							</a>
							<a
								href="#pablo"
								className="text-sm py-2 px-4 font-normal block w-full whitespace-no-wrap bg-transparent text-gray-800"
								onClick={(e) => e.preventDefault()}
							>
								Another action
							</a>
							<a
								href="#pablo"
								className="text-sm py-2 px-4 font-normal block w-full whitespace-no-wrap bg-transparent text-gray-800"
								onClick={(e) => e.preventDefault()}
							>
								Something else here
							</a>
							<div className="h-0 my-2 border border-solid border-t-0 border-blueGray-800 opacity-25" />
							<a
								href="#pablo"
								className="text-sm py-2 px-4 font-normal block w-full whitespace-no-wrap bg-transparent text-gray-800"
								onClick={(e) => e.preventDefault()}
							>
								Seprated link
							</a>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default Dropdown;
