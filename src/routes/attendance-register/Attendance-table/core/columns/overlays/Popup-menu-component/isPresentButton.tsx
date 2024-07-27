import { useState } from 'react';
import HandCursorSvg from '../../../../../../../assets/icons/HandCursorSvg';

const PresentButton = () => {
  const [isPresent, setIsPresent] = useState(true);

  const handleClick = () => {
    setIsPresent(!isPresent);
  };

  return (
    <button
      onClick={handleClick}
      className={
        `${ 
            isPresent ? 'bg-blue text-white' : 'bg-gray-100 text-gray-400'
        } 
         py-2 px-2 rounded-full cursor-pointer flex justify-between items-center max-w-full w-[117px] h-[26px]`
    }
    >
        <span className='flex-1 text-right'> {isPresent  ? 'حاضر' : 'غائب'}</span>
     
      <span className='ml-15'><HandCursorSvg/></span>
    </button>
  );
};

export default PresentButton;