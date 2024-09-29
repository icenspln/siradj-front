import { Toaster } from "react-hot-toast";
import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";

import {
  // createBrowserRouter,
  createHashRouter,
  redirect,
  RouterProvider,
} from "react-router-dom";
import Root from "./routes/root/Root.tsx";
import StudentManagement from "./routes/student-management/StudentManagement.tsx";
import GroupManagement from "./routes/group-management/GroupManagement.tsx";
import ParticularGroupManagement from "./routes/particular-group-management/ParticularGroupManagement.tsx";
import StudentRegister from "./routes/student-management/students-register/StudentRegister.tsx";
import GroupRegister from "./routes/group-management/groups-register/GroupRegister.tsx";
import ParticularGroupRegister from "./routes/particular-group-management/particular-groups-register/ParticularGroupRegister.tsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import TeacherManagement from "./routes/teacher-management/TeacherManagement.js";
import TeacherRegister from "./routes/teacher-management/teacher-register/TeacherRegister.tsx";
import EmployeeManagement from "./routes/employee-management/EmployeeManagement.tsx";
import EmployeeRegister from "./routes/employee-management/employees-register/EmployeeRegister.tsx";
import ParticularGroupsPresenceListsManagement from "./routes/presence-management/particular-groups-presence/ParticularGroupsPresenceManagement.tsx";
import GroupsPresenceListsManagement from "./routes/presence-management/groups-presence/GroupsPresenceManagement.tsx";
import StudentsPresenceListsManagement from "./routes/presence-management/students-presence/StudentsPresenceManagement.tsx";
import EmployeePresenceListsManagement from "./routes/presence-management/employee-presence/EmployeesPresenceManagement.tsx";
import PaymentManagement from "./routes/teacher-payment-management/PaymentManagement.tsx";
import StudentPaymentHistory from "./routes/student-payment-history/StudentPaymentHistory.tsx";
import AttendanceManagement from "./routes/attendance-register/AttendanceManagement.tsx";
import SettingManagement from "./routes/settings/SettingManagement.tsx";
import { StudentUpdateWrapper } from "./routes/student-management/student-update/StudentUpdate.tsx";

import LoadingScreen from "./components/LoadingScreen.tsx";
import { PdfViewTest } from "./routes/monthly-salary-statement/MonthlySalaryStatement.tsx";

import { TeacherUpdateWrapper } from "./routes/teacher-management/teacher-update/TeacherUpdate.tsx";
import { GroupUpdateWrapper } from "./routes/group-management/group-update/GroupUpdate.tsx";
import { SettingsProvider } from "./routes/settings/core/SettingsContext";
import TeacherPresenceManagement from "./routes/presence-management/teacher-presence/TeacherPresenceManagement.tsx";
import StudentControlPanel from "./routes/attendance-register/Attendance-table/StudentControlPanel.tsx";
import { GlobalContexProvider } from "./GlobalContext.tsx";
import ReceiptPrintManagement from "./routes/receipt-print-management/ReceiptPrintManagement.tsx";

const queryClient = new QueryClient();

const router = createHashRouter(
  [
    {
      path: "/",
      element: <Root />,
      children: [
        {
          path: "/",
          loader: () => redirect("/studentmanagement"),
        },
        {
          path: "/studentmanagement",
          element: <StudentManagement />,
        },
        {
          path: "/studentmanagement/new",
          element: <StudentRegister />,
        },
        {
          path: "/studentmanagement/edit/:id",
          element: <StudentUpdateWrapper />,
        },
        {
          path: "/teachermanagement",
          element: <TeacherManagement />,
        },
        {
          path: "/teachermanagement/new",
          element: <TeacherRegister />,
        },
        {
          path: "/teachermanagement/edit/:id",
          element: <TeacherUpdateWrapper />,
        },
        {
          path: "/teachermanagement/teacherpayment/:id",
          element: <TeacherPresenceManagement />,
        },
        {
          path: "/groupmanagement",
          element: <GroupManagement />,
        },
        {
          path: "/groupmanagement/new",
          element: <GroupRegister />,
        },
        {
          path: "/groupmanagement/edit/:id",
          element: <GroupUpdateWrapper />,
        },
        {
          path: "/particulargroupmanagement",
          element: <ParticularGroupManagement />,
        },
        {
          path: "/particulargroupmanagement/new",
          element: <ParticularGroupRegister />,
        },
        {
          path: "/employeemanagement",
          element: <EmployeeManagement />,
        },
        {
          path: "/employeemanagement/new",
          element: <EmployeeRegister />,
        },
        {
          path: "/particulargroupspresencemanagement",
          element: <ParticularGroupsPresenceListsManagement />,
        },
        {
          path: "/groupmanagement/groupspresencemanagement/:id",
          element: <GroupsPresenceListsManagement />,
        },
        {
          path: "/studentmanagement/studentspresencemanagement/:id",
          element: <StudentsPresenceListsManagement />,
        },
        {
          path: "/employeepresencemanagement/:id",
          element: <EmployeePresenceListsManagement />,
        },
        {
          path: "/paymentmanagement",
          element: <PaymentManagement />,
        },
        {
          path: "/studentspaymenthistory/:id/:fullName",
          element: <StudentPaymentHistory />,
        },
        {
          path: "/settings",
          element: <SettingManagement />,
        },
        {
          path: "/attendancemanagement",
          element: <AttendanceManagement />,
        },
        {
          path: "/attendancemanagement/:id",
          element: <StudentControlPanel />,
        },
        {
          path: "/monthlysalarystatement/:percentage",
          element: <PdfViewTest />,
        },
        {
          path: "/receiptprint",
          element: <ReceiptPrintManagement />,
        },
      ],
    },
  ],
  {}
);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <GlobalContexProvider>
      <SettingsProvider>
        <QueryClientProvider client={queryClient}>
          <RouterProvider router={router} />
          <ReactQueryDevtools
            position="bottom"
            buttonPosition="bottom-left"
            initialIsOpen={false}
          />
          <Toaster />
        </QueryClientProvider>
        <LoadingScreen />
      </SettingsProvider>
    </GlobalContexProvider>
  </React.StrictMode>
);
