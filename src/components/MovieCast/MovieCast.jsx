import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import Loader from "../Loader/Loader";

import { fetchMovieCast } from "../../api/getFilms";
import s from "./MovieCast.module.css";

const MovieCast = () => {
    const { movieId } = useParams();
    const [cast, setCast] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        setLoading(true);
        fetchMovieCast(movieId)
            .then((data) => setCast(data))
            .catch((error) => setError(error))
            .finally(() => setLoading(false));
    }, [movieId]);

    if (loading) {
        return <Loader />;
    }

    if (error) {
        return <div>Error: {error.message}</div>;
    }

    return (
        <div className={s.cast}>
            {cast && (
                <ul className={s.list}>
                    {cast.cast.map((actor) => (
                        <li key={actor.id} className={s.item}>
                            <img
                                className={s.poster}
                                src={`https://image.tmdb.org/t/p/w500${actor.profile_path}`}
                                alt={actor.name}
                            />
                            <p className={s.name}>{actor.name}</p>
                            <p className={s.character}>Character: {actor.character}</p>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default MovieCast;
