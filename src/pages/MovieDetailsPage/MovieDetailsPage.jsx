import { Suspense, useEffect, useRef, useState } from "react";
import { Link, Outlet, useParams, useLocation } from "react-router-dom";

import Loader from "../../components/Loader/Loader";
import { fetchMovieById } from "../../api/getFilms";

import s from "./MovieDetailsPage.module.css";


const MovieDetailsPage = () => {
    const location = useLocation();
    const goBackRef = useRef(location.state?.from || "/");

    const { movieId } = useParams();

    const [movie, setMovie] = useState(null);
    useEffect(() => {
        fetchMovieById(movieId).then((data) => setMovie(data));
    }, [movieId]);

    if (!movie) {
        return <Loader />;
    }

    const { poster_path, title, vote_average, overview, genres } = movie;

    return (
        <section className={s.section}>
            <Link className={s.linkGoBack} to={goBackRef.current || "/"}>
                Go back
            </Link>
            <div className={s.infoCard}>
                <div className={s.posterContainer}>
                    <img
                        className={s.poster}
                        src={`https://image.tmdb.org/t/p/w500${poster_path}`}
                        alt="Film Poster"
                    />
                </div>
                <div className={s.info}>
                    <h2>{title}</h2>
                    <p>User score: {Math.round(vote_average * 10)}%</p>
                    <h3>Overview</h3>
                    <p>{overview}</p>
                    <h4>Genres</h4>
                    <ul className={s.genresList}>
                        {genres.map((genre) => (
                            <li key={genre.id}>{genre.name}</li>
                        ))}
                    </ul>
                </div>
            </div>
            <div>
                <h3 className={s.title}>Additional information</h3>
                <ul className={s.list}>
                    <li className={s.item}>
                        <Link className={s.link} to="cast">
                            Cast
                        </Link>
                    </li>
                    <li className={s.item}>
                        <Link className={s.link} to="reviews">
                            Reviews
                        </Link>
                    </li>
                </ul>
            </div>

            <Suspense fallback={<Loader />}>
                <Outlet />
            </Suspense>
        </section>
    );
};

export default MovieDetailsPage;