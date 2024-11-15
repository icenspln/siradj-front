import { NavLink, Outlet } from "react-router-dom";
import {
    Book,
    // Bookmark,
    Gear,
    Prof,
    Signal,
    Student,
} from "../../assets/icons";
import BriefCase from "../../assets/icons/BriefCaseSvg";
import ButtonPrimary from "../../components/ButtonPrimary";
import ButtonSecondary from "../../components/ButtonSecondary";
import { BLUE, DISABLEDGRAY } from "../../GLOBALS";
import "./root.css";
import { useSettings } from "../settings/core/SettingsContext";

export default function Root() {
    const { logoUrl, setLogoUrl } = useSettings();

    return (
        <>
            <main className="navbar flex">
                <div className="fixed w-fit md:w-[240px] ps-10">
                    <div className="hidden md:block w-full">
                        {logoUrl ? (
                            <img
                                src={logoUrl}
                                alt="LOGO"
                                onError={() => setLogoUrl("")}
                                className="max-w-12 my-auto mt-3"
                            />
                        ) : (
                            <h1 className="text-2xl font-bold my-3 mt-5">
                                DEMO
                            </h1>
                        )}
                    </div>
                    <section className="navbar--section fixed w-auto md:w-[240px] top-0 left-0 min-h-dvh max-w-md  min-w-md flex flex-col justify-between  p-3 ">
                        <ul className="navbar--ul flex flex-col gap-3 mt-[56px] ">
                            <li>
                                <NavLink to={`/students-management`}>
                                    {({ isActive }) => (
                                        <ButtonSecondary
                                            text="Students"
                                            isActive={isActive}
                                        >
                                            <Student
                                                fill={
                                                    isActive
                                                        ? BLUE
                                                        : DISABLEDGRAY
                                                }
                                            />
                                        </ButtonSecondary>
                                    )}
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to={`/teachers-management`}>
                                    {({ isActive }) => (
                                        <>
                                            <ButtonSecondary
                                                text="Teachers"
                                                isActive={isActive}
                                            >
                                                <Prof
                                                    fill={
                                                        isActive
                                                            ? BLUE
                                                            : DISABLEDGRAY
                                                    }
                                                />
                                            </ButtonSecondary>
                                        </>
                                    )}
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to={`/groups-management`}>
                                    {({ isActive }) => (
                                        <>
                                            <ButtonSecondary
                                                text="Groups"
                                                isActive={isActive}
                                            >
                                                <Book
                                                    fill={
                                                        isActive
                                                            ? BLUE
                                                            : DISABLEDGRAY
                                                    }
                                                />
                                            </ButtonSecondary>
                                        </>
                                    )}
                                </NavLink>
                            </li>
                            {/* <li>
                                <NavLink to={`/private-groups-management`}>
                                    {({ isActive }) => (
                                        <>
                                            <ButtonSecondary
                                                text="Private Groups"
                                                isActive={isActive}
                                            >
                                                <Bookmark
                                                    fill={
                                                        isActive
                                                            ? BLUE
                                                            : DISABLEDGRAY
                                                    }
                                                />
                                            </ButtonSecondary>
                                        </>
                                    )}
                                </NavLink>
                            </li> */}
                            <li>
                                <NavLink to={`/employees-management`}>
                                    {({ isActive }) => (
                                        <>
                                            <ButtonSecondary
                                                text="Employees"
                                                isActive={isActive}
                                            >
                                                <BriefCase
                                                    fill={
                                                        isActive
                                                            ? BLUE
                                                            : DISABLEDGRAY
                                                    }
                                                />
                                            </ButtonSecondary>
                                        </>
                                    )}
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to={`/settings`}>
                                    {({ isActive }) => (
                                        <>
                                            <ButtonSecondary
                                                text="Settings"
                                                isActive={isActive}
                                            >
                                                <Gear
                                                    fill={
                                                        isActive
                                                            ? BLUE
                                                            : DISABLEDGRAY
                                                    }
                                                />
                                            </ButtonSecondary>
                                        </>
                                    )}
                                </NavLink>
                            </li>
                        </ul>

                        <NavLink
                            className={`mt-auto`}
                            to={`/attendance-management`}
                        >
                            <ButtonPrimary text="Scan Card" active>
                                <Signal />
                            </ButtonPrimary>
                        </NavLink>
                    </section>
                </div>
                <section className="ml-16 md:ml-[240px] w-full outlet">
                    <Outlet />
                </section>
            </main>
        </>
    );
}
