import { Link, useLocation } from "react-router-dom";
import s from "./MovieList.module.css";

const MovieList = ({ movies }) => {
    const location = useLocation();
    return (
        <div className={s.movieList}>
            <ul className={s.list}>
                {movies &&
                    movies.map((movie) => (
                        <li key={movie.id} className={s.item}>
                            <Link
                                className={s.link}
                                state={{ from: location }}
                                to={`/movies/${movie.id}`}
                            >
                                {movie.title}
                            </Link>
                        </li>
                    ))}
            </ul>
        </div>
    );
};

export default MovieList;