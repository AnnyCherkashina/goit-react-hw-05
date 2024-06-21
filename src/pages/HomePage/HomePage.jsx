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
        const getTrendingMovies = async () => {
            try {
                const data = await fetchTrendingMovies();
                setMovies(data.results);
                setError(null);
            } catch (error) {
                setError("Failed to fetch trending movies");
            } finally {
                setIsLoading(false);
            }
        };

        getTrendingMovies();
    }, []);

    if (isLoading) {
        return <Loader />;
    }

    if (error) {
        return <p className={s.error}>{error}</p>;
    }

    return (
        <section className={s.section}>
            <h2 className={s.title}>Trending today</h2>
            <MovieList movies={movies} />
        </section>
    );
};

export default HomePage;
