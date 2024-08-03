
import ExcelSvg from "../../../assets/icons/ExcelSvg";
import { StudentsPresenceListsTable } from "./students-presence-table/StudentsPresenceTable";
import { FilterButton } from "../../../components/ButtonFilter";


const MonthSelectionOptions = [
  { id: 1, label: 'جانفي' },
  { id: 2, label: 'فيفري' },
  { id: 3, label: 'مارس' },
  { id: 4, label: 'أفريل' },
  { id: 5, label: 'ماي' },
  { id: 6, label: 'جوان' },
  { id: 7, label: 'جويلية' },
  { id: 8, label: 'أوت' },
  { id: 9, label: 'سبتمبر' },
  { id: 10, label: 'أكتوبر' },
  { id: 11, label: 'نوفمبر' },
  { id: 12, label: 'ديسمبر' },
 
  
]
const YearSelectionOptions = [
  { id: 1, label: '2024' },
  { id: 2, label: '2025' },
]

export default function StudentsPresenceListsManagement() {
  
  return (
    <section className="w-full min-h-screen p-4 bg-mainBg">
     <div className="flex justify-between items-center mb-4">
      <div className=" flex gap-[12px]">
      
        <FilterButton  label="السنة" options={YearSelectionOptions} />
        <FilterButton  label="الشهر" options={MonthSelectionOptions} />
        
        
      </div>
      <nav className="flex items-center gap-[12px]">
        <ExcelSvg/>
       
      </nav>
      </div>
      <div>
        <StudentsPresenceListsTable  />
      </div>
    </section>
  );
}