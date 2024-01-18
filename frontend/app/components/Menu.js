import Link from "next/link";

export default function Menu(props) {
  return (
    <Link
      href={props.href}
      className={
        props.xclass + " my-auto text-white text-decoration-none me-3 menu_fs"
      }
    >
      {props.menu}
    </Link>
  );
}
