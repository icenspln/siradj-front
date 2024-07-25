
import React from 'react';
import { Overlay } from '../../../../../../components/Overlay';
import ConfirmButton from './Popup-menu-component/confirmButton';

interface DeleteFromListOverlayProps {
  onClose: () => void;
}

const DeleteFromListOverlay: React.FC<DeleteFromListOverlayProps> = ({ onClose }) => {
  return (
    <Overlay onClose={onClose}>
      <>
      <div className=" bg-white w-[379px] h-[158px] rounded  gap-[10px]  flex flex-col text-center">
        <h1 className="text-xl "> هل أنت متأكد من أنك تريد حذف هذا المستخدم </h1>
        <p className='text-gray-500'>لا يمكنك استعادة حساب هذا المستخدم بعد الحذف</p>
        <span className='flex justify-center '>
            <ConfirmButton text="تأكيد الحذف" color="bg-red-400" textColor='text-white'/>
        </span>
        </div>
        
      </>
    </Overlay>
  );
};

export default DeleteFromListOverlay;
