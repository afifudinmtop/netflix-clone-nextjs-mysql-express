import Link from "next/link";

export default function Header() {
  return (
    <div className="d-flex justify-content-between header">
      <Link href="/">
        <img className="movie-icon" src="/movie-back.png" />
      </Link>
      <img className="movie-icon" src="/movie-flag.png" />
    </div>
  );
}
