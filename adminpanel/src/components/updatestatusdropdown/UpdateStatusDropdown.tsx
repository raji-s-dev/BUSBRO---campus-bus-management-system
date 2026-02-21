import React, { useState, useRef, useEffect } from "react";
import ActionButton from "../../components/button/Buttonforupdate"; // Adjust the import path as needed
import changeIcon from "../../assets/components/button/changeicon.png"; // Replace with your icon path

interface UpdateStatusDropdownProps {
  currentStatus: string;
  onChange: (status: string) => void;
}

const UpdateStatusDropdown: React.FC<UpdateStatusDropdownProps> = ({
  currentStatus,
  onChange
}) => {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const statuses = ["In Progress", "Resolved"];

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative inline-block" ref={dropdownRef}>
      <ActionButton
        iconSrc={changeIcon}
        label="Update Status"
        onClick={() => setOpen((prev) => !prev)}
      />

      {open && (
        <div className="absolute z-10 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg overflow-hidden">
          {statuses.map((status) => (
            <div
              key={status}
              onClick={() => {
                onChange(status);
                setOpen(false);
              }}
              className="px-4 py-2 text-gray-700 hover:bg-gray-100 cursor-pointer"
            >
              {status}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default UpdateStatusDropdown;
