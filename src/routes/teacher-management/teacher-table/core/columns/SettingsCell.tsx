import { useState } from "react";
import Popup from "reactjs-popup";
import DotsSvg from "../../../../../assets/icons/DotsSvg";
import DeleteFromListOverlay from "./overlays/deleteFromList";
import DownloadReceiptOverlay from "./overlays/downloadReceipt";

export default function SettingsCell() {
  const [activeOverlay, setActiveOverlay] = useState<string | null>(null)
  
  const options = [
    { label: "تعديل المعلومات", action: () => {} },
    { label: "حذف من القائمة", action: () => setActiveOverlay("deleteFromList") },
    { label: "تحميل قسيمة الدفع للشهر", action: () => setActiveOverlay("downloadReceipt") },
    
  ];
  const closeOverlay = () => setActiveOverlay(null);
  return (
    <div>
      <Popup
        trigger={
          <button>
            <DotsSvg/>
          </button>
        }
        arrow={false}
        position="bottom center"
      >
        <div className="grid gap-1">
          {options.map((option, index) => (
            <button
              key={index}
              className="w-full px-4 py-2 text-sm text-gray-700 bg-gray-100 rounded hover:bg-gray-200"
              onClick={option.action}
            >
              {option.label}
            </button>
          ))}
        </div>
        {activeOverlay === "deleteFromList" && <DeleteFromListOverlay onClose={closeOverlay} />}
        {activeOverlay === "downloadReceipt" && <DownloadReceiptOverlay onClose={closeOverlay} />}
       
      </Popup>
     
    </div>
  );
}