import React, { useEffect, useState } from "react";
import SendMessageSvg from "../../../assets/icons/SendMessageSvg";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getNotesForStudent, postNoteForStudent } from "./core/_requests";
import { useParams } from "react-router-dom";
import { NoteType } from "./core/_models";
import toast from "react-hot-toast";

// interface Notification {
//   id: number;
//   message: string;
//   timestamp: string;
// }

export default function Notifications() {
  const queryClient = useQueryClient();
  // const [notifications, setNotifications] = useState<Notification[]>([]);
  const [inputValue, setInputValue] = useState("");

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSend();
    }
  };

  const [notes, setNotes] = useState<NoteType[]>();
  const { id } = useParams();

  const { data, isPending, error } = useQuery({
    queryKey: ["getNotesForStudent"],
    queryFn: () => getNotesForStudent(id!),
  });

  useEffect(() => {
    if (data && !error) {
      setNotes(data);
    }
  }, [data, isPending, error]);

  const mutation = useMutation({
    mutationFn: (data: { studentId: string; text: string }) =>
      postNoteForStudent(data.studentId, data.text),
    mutationKey: ["postNote"],
    onSuccess: () => {
      toast.success("تم الحفض");
      queryClient.invalidateQueries({ queryKey: ["getNotesForStudent"] });
    },
    onError: () => {
      toast.error("حدث خطأ ما");
      queryClient.invalidateQueries({ queryKey: ["getNotesForStudent"] });
    },
  });

  const handleSend = () => {
    if (inputValue.trim() === "") return;
    // const newNotification: Notification = {
    //   id: Date.now(),
    //   message: inputValue,
    //   timestamp: new Date().toLocaleString(),
    // };

    // setNotifications([...notifications, newNotification]);
    const data = {
      studentId: id!,
      text: inputValue,
    };
    mutation.mutate(data);
    setInputValue("");
  };

  if (notes)
    return (
      <div className="h-full border border-gray-200 rounded-lg shadow-sm p-4 flex flex-col justify-between">
        <div className="flex flex-col gap-2 overflow-y-auto h-auto max-h-[807px]">
          {notes.map((notification) => (
            <div key={notification._id}>
              <div className="text-sm text-center text-gray-300">
                {new Date(notification.date).toLocaleDateString()}
              </div>
              <div className="bg-blue text-white p-2 rounded-lg">
                <div>{notification.text}</div>
              </div>
            </div>
          ))}
        </div>
        <div className="flex items-center gap-2 mt-2">
          <input
            type="text"
            placeholder="اكتب ملاحضتك هنا"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKeyDown}
            className="outline-none rounded-full w-full h-[41px] p-2 border border-gray-300"
          />
          <button onClick={handleSend}>
            <SendMessageSvg />
          </button>
        </div>
      </div>
    );
}
