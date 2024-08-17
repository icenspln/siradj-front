import {
  useReactTable,
  getCoreRowModel,
  flexRender,
} from "@tanstack/react-table";
import { defaultColumns } from "./core/columns/columns";
import { motion } from "framer-motion";
import { Group } from "./core/_models";
import { useContext, useMemo, useRef, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getGroups } from "./core/_requests";
import { GroupsTableContext } from "./core/GroupsTableContext";
import { GroupAddStudentModal } from "./group-add-studen-modal/GroupAddStudentModal";
import { GroupAddAdditionalDays } from "./group-add-additional-days/GroupAddAdditionalDays";
import { Pagination } from "../../../components/pagination";

export function GroupsTable() {
  const constraintsRef = useRef(null);
  const [groups, setGroups] = useState<Group[]>([]);
  const { filter, groupModal, additionalDayModal } =
    useContext(GroupsTableContext);

  const [page, setPage] = useState(1);
  //query functions
  const { data, isLoading } = useQuery({
    queryKey: ["getGroups", filter, page],
    queryFn: () => getGroups(filter, page),
  });

  useMemo(() => {
    if (data && !isLoading) {
      setGroups(data.data);
    }
  }, [data, isLoading]);

  // table functions
  const table = useReactTable({
    columns: defaultColumns,
    data: groups,
    // data : groupsData,
    getCoreRowModel: getCoreRowModel(),
  });
  return (
    <>
      <div
        ref={constraintsRef}
        className="overflow-x-clip border border-[#E2E8F0] rounded-xl"
      >
        <motion.table
          drag={"x"}
          dragConstraints={constraintsRef}
          dragElastic={0}
          dragMomentum={false}
          className="max-w-full bg-white rounded-xl"
        >
          <thead>
            {table.getHeaderGroups().map((headerGroup) => {
              return (
                <tr className="border-b border-b-light" key={headerGroup.id}>
                  {headerGroup.headers.map(
                    (
                      header // map over the headerGroup headers array
                    ) => (
                      <th
                        key={header.id}
                        className="text-textGray text-start p-3 font-normal w-full min-w-[180px]"
                        colSpan={header.colSpan}
                      >
                        {flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                      </th>
                    )
                  )}
                </tr>
              );
            })}
          </thead>
          <tbody>
            {table.getRowModel().rows.map((row) => (
              <tr
                className="border-b border-b-light last:border-none"
                key={row.id}
              >
                {row.getAllCells().map((cell) => {
                  return (
                    <td
                      className="text-darkGray text-start p-3 font-normal w-full min-w-[180px]"
                      key={cell.id}
                    >
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </motion.table>
        {groupModal && <GroupAddStudentModal />}
        {additionalDayModal && <GroupAddAdditionalDays />}
      </div>
      {data?.totalPages > 1 && (
        <Pagination
          page={page}
          setPage={setPage}
          totalPages={data.totalPages}
        />
      )}
    </>
  );
}
