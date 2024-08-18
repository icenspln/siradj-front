import { StudentInfoTable } from "./studentInfoTable";
import { StudentPaymentTable } from "./studentPaymentTable";
import GroupList from "./groupList";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { getStudentByCardId } from "./core/_requests";
import { GetStudentByCardIdType } from "./core/_models";
import Notifications from "./notifications";

export default function StudentControlPanel() {
  const { id } = useParams();
  const [studentInfo, setStudentInfo] = useState<GetStudentByCardIdType>();

  const { data, isPending, error } = useQuery({
    queryKey: ["getStudentByCardId"],
    queryFn: () => getStudentByCardId(id!),
  });

  useEffect(() => {
    if (data) setStudentInfo(data);
  }, [data, isPending, error]);

  if (isPending)
    return (
      <div className="flex justify-center items-center h-screen">
        <h1 className="text-3xl my-auto">تحميل...</h1>
      </div>
    );
  if (error)
    return (
      <div className="flex justify-center items-center h-screen">
        <h1 className="text-3xl my-auto text-yellow-300">
          التلميذ لا ينتمي لأي فوج
        </h1>
      </div>
    );

  if (studentInfo && !error)
    return (
      <div className="flex  gap-[25px] p-4 py-8 min-h-screen">
        <div className="w-full min-h-full flex flex-col gap-3 items-stretch justify-start">
          <StudentInfoTable student={studentInfo.student} />
          <StudentPaymentTable studentInfo={studentInfo} />
          <GroupList studentInfo={studentInfo} />
          {/* <div className="flex justify-end text-xl py-1">
          <CardlessRegister />
        </div> */}
        </div>
        <div className="w-full min-h-full ">
          <Notifications />
        </div>
      </div>
    );
}