// import { BLUE } from "../../GLOBALS";

export default function SignalSvg({ fill = "white" }: any) {
  return (
    <>
      <svg
        width="20"
        height="14"
        viewBox="0 0 20 14"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M1.69386 5.34062C3.85048 3.27187 6.776 2 10.0016 2C13.2271 2 16.1526 3.27187 18.3093 5.34062C18.7093 5.72187 19.3407 5.70937 19.722 5.3125C20.1033 4.91562 20.0908 4.28125 19.6939 3.9C17.1809 1.48438 13.7647 0 10.0016 0C6.2384 0 2.82218 1.48438 0.306112 3.89687C-0.0908327 4.28125 -0.103335 4.9125 0.277982 5.3125C0.659299 5.7125 1.29379 5.725 1.69073 5.34062H1.69386ZM10.0016 7C11.7769 7 13.3959 7.65938 14.6336 8.75C15.0493 9.11563 15.6807 9.075 16.0464 8.6625C16.4121 8.25 16.3714 7.61562 15.9589 7.25C14.3711 5.85 12.2832 5 10.0016 5C7.71991 5 5.63205 5.85 4.04739 7.25C3.6317 7.61562 3.59419 8.24687 3.95988 8.6625C4.32557 9.07812 4.95693 9.11563 5.37263 8.75C6.60722 7.65938 8.22625 7 10.0047 7H10.0016ZM12.0019 12C12.0019 11.4696 11.7912 10.9609 11.416 10.5858C11.0409 10.2107 10.5321 10 10.0016 10C9.47104 10 8.96224 10.2107 8.5871 10.5858C8.21196 10.9609 8.00121 11.4696 8.00121 12C8.00121 12.5304 8.21196 13.0391 8.5871 13.4142C8.96224 13.7893 9.47104 14 10.0016 14C10.5321 14 11.0409 13.7893 11.416 13.4142C11.7912 13.0391 12.0019 12.5304 12.0019 12Z"
          fill={fill}
        />
      </svg>
    </>
  );
}
