import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import Loader from "../../components/Loader/Loader";

import { fetchTrendingMovies } from "../../api/getFilms";
import s from "./HomePage.module.css";

const HomePage = () => {
    const [movies, setMovies] = useState([]);
    useEffect(() => {
        fetchTrendingMovies().then((data) => setMovies(data.results));
    }, []);

    if (!movies) {
        return <Loader />;
    }

    return (
        <section className={s.section}>
            <h2 className={s.title}>Trending today</h2>
            <ul className={s.list}>
                {movies.map((movie) => (
                    <li key={movie.id} className={s.item}>
                        <Link className={s.link} to={"/movies/" + movie.id.toString()}>
                            {movie.title}
                        </Link>
                    </li>
                ))}
            </ul>
        </section>
    );
};

export default HomePage;