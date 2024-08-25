import React, { useContext, useEffect, useState } from "react"
import SelectGroup from "./Popup-menu-component/PresentStudentsList"
import { Overlay } from "../../../../../../components/Overlay"
import AsyncSelect from "react-select/async"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import {
    assignStudentToGroup,
    deleteStudentFromGroup,
    getFilteredGroups,
} from "../../../student-group-modal/core/_requests"
import toast from "react-hot-toast"
import { StudentsTableContext } from "../../../core/StudentsTableContext"
import ButtonRoundedPrimary from "../../../../../../components/ButtonRoundedPrimary"
import { returnGroupLabel } from "../../../../../../handlers/returnInArabic"
import { Group } from "../../../student-group-modal/core/_model"
import { FilterButton } from "../../../../../../components/ButtonFilter"
import { levelFilterOptions } from "../../../../../group-management/groups-table/core/_models"
import { institutionFilterOptions } from "../../_models"

interface RegistredStudentsOverlayProps {
    onClose: () => void
}

const RegistredStudentsOverlay: React.FC<RegistredStudentsOverlayProps> = ({
    onClose,
}) => {
    const queryClient = useQueryClient()
    const [filter, setFilter] = useState("")
    const [filter2, setFilter2] = useState("")
    const { selectedStudent } = useContext(StudentsTableContext)
    const [selectedOption, setSelectedOption] = useState<{
        label: string
        value: string
    }>()
    const [reactSelectOptions, setReactSelectOptions] = useState<
        {
            value: string
            label: string
        }[]
    >([{ label: "loading", value: "" }])
    const [filterState, setFilterState] = useState<{
        institution: string[]
        level: string[]
    }>({
        institution: [""],
        level: [],
    })
    useEffect(() => {
        const institution = `institution=${filterState.institution.join(",")}`
        const level = `level=${filterState.level.join(",")}`
        let url = ""
        if (filterState.institution.length > 0) url += "&" + institution
        if (filterState.level.length > 0) url += "&" + level
        setFilter2(url)
    }, [filterState])

    const { isPending, error, data } = useQuery({
        queryKey: ["getFilteredGroups", filter, filter2],
        queryFn: () => getFilteredGroups(filter, filter2),
    })

    const [groups, setGroups] = useState<Group[]>([])

    useEffect(() => {
        if (data && !error && !isPending) {
            const arr = data.data.map((group: Group) => {
                return {
                    value: `${group._id}`,
                    label: returnGroupLabel(group),
                }
            })
            setReactSelectOptions(arr)
        }
        if (error) setReactSelectOptions([{ label: "خطأ", value: "" }])
    }, [data, isPending, error, selectedStudent, groups])

    const onSubmitGroups = () => {
        const group = selectedOption
        mutation.mutate({
            groupId: group?.value,
            studentId: selectedStudent?._id,
        })
    }

    //mutation for signing up a student for a group
    const mutation = useMutation({
        mutationFn: ({ groupId, studentId }: any) =>
            assignStudentToGroup(groupId, studentId),
        onSuccess: (res) => {
            toast.success("تم تسجيل الطالب بنجاح")
            // onClose();
            queryClient.invalidateQueries({ queryKey: ["getStudents"] })
            setGroups((prev) => [...prev, res])
        },
        onError: (err: any) => {
            const message = err.response.data.message
            if (message == "Student already in the group") {
                toast.error("الطالب مسجل في الفوج مسبقا")
            } else if (
                message ==
                "Cannot add student: group is already at maximum capacity."
            ) {
                toast.error("وصل الفوج الى الحد الأقصى")
            } else {
                toast.error("حدث خطأ ما")
            }
            // onClose();
            queryClient.invalidateQueries({ queryKey: ["getStudents"] })
        },
    })

    //mutation for removing a student for a group

    const removeMutation = useMutation({
        mutationFn: ({ groupId, studentId }: any) =>
            deleteStudentFromGroup(groupId, studentId),
        onSuccess: (res) => {
            toast.success("تمت إزالة الطالب بنجاح")
            // onClose();
            queryClient.invalidateQueries({ queryKey: ["getStudents"] })
            setGroups((prev) => [...prev].filter((grp) => grp._id != res._id))
        },
        onError: () => {
            toast.error("حدث خطأ ما")
            // onClose();
            queryClient.invalidateQueries({ queryKey: ["getStudents"] })
        },
    })
    const deleteGroup = (groupId: string, studentId: string) => {
        removeMutation.mutate({ groupId, studentId })
    }

    useEffect(() => {
        setGroups(selectedStudent?.groups || [])
    }, [selectedStudent])

    const filterStudents = (inputValue: string) => {
        setFilter(inputValue)

        if (data && !isPending && !error) {
            return data.data.map((group: any) => {
                return {
                    label: returnGroupLabel(group),
                    value: group._id,
                }
            })
        } else {
            return []
        }
    }

    const loadOptions = (inputValue: string) =>
        new Promise<any>((resolve) => {
            // setTimeout(() => {
            resolve(filterStudents(inputValue))
            // }, 1000);
        })

    const updateLevelFilter = (selectedOptions: any) => {
        setFilterState((prev: any) => ({
            ...prev,
            level: selectedOptions.map((opt: any) => opt.id),
        }))
    }
    const updateInstitutionFilter = (selectedOptions: any) => {
        setFilterState((prev: any) => ({
            ...prev,
            institution: selectedOptions.map((opt: any) => opt.id),
        }))
    }

    return (
        <Overlay onClose={onClose} isVisible>
            <>
                <div className=" w-[553px]  flex flex-col items-center gap-[15px]">
                    <h1 className="text-2xl">اختر الفوج</h1>
                    <p>يرجى اختيار الفوج الذي تريد اضافة التلميذ اليه</p>

                    <div className="flex w-full flex-col gap-[12px]">
                        {groups && selectedStudent && (
                            <>
                                {groups.map((group, i) => (
                                    <SelectGroup
                                        id={i}
                                        key={i}
                                        onDelete={() =>
                                            deleteGroup(
                                                group._id,
                                                selectedStudent._id
                                            )
                                        }
                                        label={returnGroupLabel(group)}
                                    />
                                ))}
                            </>
                        )}
                        {error && <span>خطأ</span>}
                    </div>
                </div>

                <div className="my-10 flex items-center justify-between gap-1">
                    <div className="basis-full">
                        <AsyncSelect
                            defaultOptions={reactSelectOptions}
                            className="max-w-[553px]"
                            loadOptions={loadOptions}
                            onInputChange={loadOptions}
                            // defaultValue={SelectedOption}
                            onChange={setSelectedOption as any}
                        />
                    </div>
                    <div className="flex flex-col gap-2">
                        <FilterButton
                            label="السنة"
                            options={levelFilterOptions}
                            setFilterState={updateLevelFilter}
                        />
                        <FilterButton
                            label="المستوى"
                            options={institutionFilterOptions}
                            setFilterState={updateInstitutionFilter}
                        />
                    </div>
                </div>
                <span className="flex justify-center gap-[12px]">
                    <ButtonRoundedPrimary
                        text="تسجيل التغييرات"
                        onClick={onSubmitGroups}
                    />
                </span>
            </>
        </Overlay>
    )
}

export default RegistredStudentsOverlay
