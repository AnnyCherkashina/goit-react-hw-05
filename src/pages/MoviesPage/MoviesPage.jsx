import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import SearchBar from "../../components/SearchBar/SearchBar";
import MovieList from "../../components/MovieList/MovieList";
import Loader from "../../components/Loader/Loader";
import { fetchSearchMovies } from "../../api/getFilms";
import s from "./MoviesPage.module.css";

const MoviesPage = () => {
    const [movies, setMovies] = useState([]);
    const [searchParams, setUseSearchParams] = useSearchParams();
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleSearchMovies = async (query) => {
        setIsLoading(true);
        try {
            const response = await fetchSearchMovies(query);
            if (response.results.length === 0) {
                setError("No movies found");
                setMovies([]);
            } else {
                setMovies(response.results);
                setError(null);
            }
        } catch (error) {
            setError("Failed to fetch movies");
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        const query = searchParams.get("query");
        if (query) {
            handleSearchMovies(query);
        }
    }, [searchParams]);

    return (
        <div className={s.movies}>
            <SearchBar setUseSearchParams={setUseSearchParams} />
            {isLoading && <Loader />}
            {error && <p className={s.error}>{error}</p>}
            {!isLoading && !error && <MovieList movies={movies} />}
        </div>
    );
};

export default MoviesPage;
