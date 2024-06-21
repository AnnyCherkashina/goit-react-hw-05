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
            setMovies(response.results);
        } catch (error) {
            setError(error.message);
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
            {error && <p>Error: {error}</p>}
            <MovieList movies={movies} />
        </div>
    );
};

export default MoviesPage;
