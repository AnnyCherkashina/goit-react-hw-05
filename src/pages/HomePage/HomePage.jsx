import { useEffect, useState } from "react";
import Loader from "../../components/Loader/Loader";
import MovieList from "../../components/MovieList/MovieList";
import { fetchTrendingMovies } from "../../api/getFilms";
import s from "./HomePage.module.css";

const HomePage = () => {
    const [movies, setMovies] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchTrendingMovies()
            .then((data) => {
                setMovies(data.results);
                setIsLoading(false);
            })
            .catch((error) => {
                setError(error.message);
                setIsLoading(false);
            });
    }, []);

    if (isLoading) {
        return <Loader />;
    }

    if (error) {
        return <p>Error: {error}</p>;
    }

    return (
        <section className={s.section}>
            <h2 className={s.title}>Trending today</h2>
            <MovieList movies={movies} />
        </section>
    );
};

export default HomePage;
