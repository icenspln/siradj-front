
import React from 'react';
import { Overlay } from '../../../../../../components/Overlay';
import ConfirmButton from './Popup-menu-component/confirmButton';
import SelectGroup from './Popup-menu-component/PresentStudentsList';

interface RegistredStudentsOverlayProps {
  onClose: () => void;
}

const RegistredStudentsOverlay: React.FC<RegistredStudentsOverlayProps> = ({ onClose }) => {
  return (
    <Overlay onClose={onClose}>
      <>
      <div className=' w-[553px] min-h-[324px] flex flex-col items-center gap-[15px]'>
        <h1 className="text-2xl">اختر الفوج</h1>
        <p>يرجى اختيار الفوج الذي تريد اضافة التلميذ اليه</p>

        <span className='flex flex-col gap-[12px]'>
        <SelectGroup id={1} label='الريضايات | السنة الأولى إبتادئي | علي رياد | الأحد-15:00'/>
        <SelectGroup id= {2} label= 'التاريخ | السنة الأولى ثانوي | جمال رياد | الأحد-15:00'/>
        </span>
        </div>

        
        <span className='flex justify-center gap-[12px]'>
        <ConfirmButton text='تسجيل التغييرات' color='bg-blue' textColor='text-white'/>
        <ConfirmButton text='إضافة طالب جديد' color='bg-grayBlue' textColor='text-blue'/>
        </span>
      </>
    </Overlay>
  );
};

export default RegistredStudentsOverlay;