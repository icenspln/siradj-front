import { useContext, useState, useEffect } from "react";
import { Overlay } from "../../../../components/Overlay";
import { RegistrationContext } from "../core/RegistrationContext";
import { Check } from "../../../../assets/icons/Check";
import { Link } from "react-router-dom";
import ButtonRoundedPrimary from "../../../../components/ButtonRoundedPrimary";
import { AnimatePresence } from "framer-motion";
import { motion } from "framer-motion";
import { updateCard } from "../core/_requests"; // Import the updateCard function

interface EmployeeCardProps {
  employeeId: string;
}

export default function EmployeeCard({ employeeId }: EmployeeCardProps) {
  const { screen } = useContext(RegistrationContext);

  const [modal, setModal] = useState<number>(1);
  const [rfid, setRfid] = useState<string>(""); // State to store RFID scan value

  const handleRfidScan = async (scannedRfid: string) => {
    try {
      setRfid(scannedRfid);
      await updateCard(employeeId, scannedRfid);
      setModal(2); // Move to the next modal on success
    } catch (error) {
      console.error("Error updating card:", error);
    }
  };

  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      if (event.key === "Enter") {
        // When Enter is pressed, use the scanned RFID value
        console.log(rfid);

        handleRfidScan(rfid);
        setRfid(""); // Clear the input after processing
      } else {
        // Accumulate RFID characters as they are typed
        setRfid((prevRfid) => prevRfid + event.key);
      }
    };

    if (screen) {
      window.addEventListener("keydown", handleKeyPress);
    }

    // Cleanup on component unmount
    return () => {
      window.removeEventListener("keydown", handleKeyPress);
    };
  }, [screen, rfid]);

  if (screen)
    return (
      <>
        <Overlay>
          <article className="overflow-hidden h-[435px] w-[391px] absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 bg-white px-[20px] py-[27px] rounded-3xl">
            <AnimatePresence mode="wait">
              {modal == 1 && <CardModal setModal={setModal} />}

              {modal == 2 && (
                <motion.div
                  transition={{ duration: 0.2, type: "just" }}
                  initial={{ x: 400 }}
                  animate={{ x: 0 }}
                  key={2}
                  className="flex flex-col gap-1 items-center h-full"
                >
                  <h2 className="text-lg text-center mb-3 font-bold text-blueDark">
                    تم تسجيل الموظف بنجاح
                  </h2>
                  <p className="w-full text- text-textGray2 text-center ">
                    يمكن الآن للموظف الدخول للمؤسسة
                  </p>
                  <div className="my-auto">
                    <Check />
                  </div>

                  <Link
                    to={`/employeemanagement`}
                    className="w-[70%] flex justify-center items-center"
                  >
                    <ButtonRoundedPrimary
                      color="blue"
                      text={`العودة إلى قائمة المسجلين`}
                    />
                  </Link>
                </motion.div>
              )}
            </AnimatePresence>
          </article>
        </Overlay>
      </>
    );
}

const CardModal = ({ setModal }: { setModal: any }) => {
  return (
    <motion.div
      key={1}
      transition={{ duration: 0.2 }}
      initial={{ x: 0, opacity: 1 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: -200, opacity: 0 }}
      className="flex flex-col gap-1 items-center h-full"
    >
      <h2 className="text-lg text-center mb-3 font-bold text-blueDark">
        تسجيل البطاقة الذكية
      </h2>

      <p className="w-full text- text-textGray2 text-center ">
        يرجى تمرير البطاقة الذكية على الآلة لإنهاء تسجيل الموظف
      </p>
      <div className="my-auto basis-1"></div>
      <div className="my-3">
        <button onClick={() => setModal(2)} className="text-blue underline">
          تخطي هذه المرحلة و التسجيل بدون بطاقة
        </button>
      </div>
    </motion.div>
  );
};
