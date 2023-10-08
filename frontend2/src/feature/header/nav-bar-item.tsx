import { Link } from "react-router-dom";

export function NavBarItem(props: { link: string; text: string }) {
  let { link, text } = props;
  return (
    <>
      <li>
        <Link to={link} className="hover:text-slate-500">
          {text}
        </Link>
      </li>
    </>
  );
}
