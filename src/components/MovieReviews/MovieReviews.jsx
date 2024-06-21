import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Loader from "../Loader/Loader";
import { fetchMovieReviews } from "../../api/getFilms";
import s from "./MovieReviews.module.css";

const MovieReviews = () => {
    const { movieId } = useParams();
    const [reviews, setReviews] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const getMovieReviews = async () => {
            setIsLoading(true);
            try {
                const data = await fetchMovieReviews(movieId);
                setReviews(data);
                setError(null);
            } catch (error) {
                setError("Failed to fetch reviews");
            } finally {
                setIsLoading(false);
            }
        };

        getMovieReviews();
    }, [movieId]);

    if (isLoading) {
        return <Loader />;
    }

    if (error) {
        return <p className={s.error}>{error}</p>;
    }

    if (reviews && reviews.results.length === 0) {
        return <h2>We do not have any reviews for this movie</h2>;
    }

    return (
        <div>
            {reviews && (
                <ul className={s.list}>
                    {reviews.results.map((review) => (
                        <li key={review.id}>
                            <h3>Author: {review.author}</h3>
                            <p>{review.content}</p>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default MovieReviews;
