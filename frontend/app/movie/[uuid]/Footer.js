export default function Footer(props) {
  return (
    <div className="d-flex justify-content-between footer">
      {/* left */}
      <div className="d-flex justify-content-start">
        <img className="movie-icon me-5" src="/movie-play.png" />
        <img className="movie-icon me-5" src="/movie-backward.png" />
        <img className="movie-icon me-5" src="/movie-forward.png" />
        <img className="movie-icon" src="/movie-volume.png" />
      </div>

      {/* middle */}
      <div className="text-white my-auto text-center fs-5">{props.judul}</div>

      {/* right */}
      <div className="d-flex justify-content-end">
        <img className="movie-icon me-5" src="/movie-subtitle.png" />
        <img className="movie-icon me-5" src="/movie-speed.png" />
        <img className="movie-icon" src="/movie-fullscreen.png" />
      </div>
    </div>
  );
}
