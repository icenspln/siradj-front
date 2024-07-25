// This componenet for the buttons that are inside the overlay windows


type ConfirmButtonType = {
  text: string;
  textColor:string;
  color?: string;
  onClick?:() =>void;
  
}
export default function ConfirmButton ({ 
  text,
  textColor ='text-white',
   color,
    onClick,
   }:ConfirmButtonType)  {
  return (
    <button
      className={`${textColor} w-[91px] h-[38px] py-2 px-4 rounded-full ${color} hover:bg-opacity-80 transition-colors duration-300`}
      onClick={onClick}
    >
      {text}
    </button>
  );
};


