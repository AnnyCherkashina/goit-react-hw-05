import { Suspense, useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import Loader from "../Loader/Loader";

import { fetchMovieCast } from "../../api/getFilms";
import s from "./MovieCast.module.css";

const MovieCast = () => {
    const { movieId } = useParams();
    const [cast, setCast] = useState(null);

    useEffect(() => {
        fetchMovieCast(movieId)
            .then((data) => setCast(data))
            .catch((error) => console.log(error));
    }, [movieId]);

    return (
        <Suspense fallback={<Loader />}>
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
        </Suspense>
    );
};

export default MovieCast;