import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Loader from "../Loader/Loader";
import { fetchMovieReviews } from "../../api/getFilms";
import s from "./MovieReviews.module.css";

const MovieReviews = () => {
    const { movieId } = useParams();
    const [reviews, setReviews] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchMovieReviews(movieId)
            .then((data) => {
                setReviews(data);
                setIsLoading(false);
            })
            .catch((error) => {
                setError(error.message);
                setIsLoading(false);
            });
    }, [movieId]);

    if (isLoading) {
        return <Loader />;
    }

    if (error) {
        return <p>Error: {error}</p>;
    }

    if (reviews && reviews.results.length === 0) {
        return <h2>We not have any reviews for this movie</h2>;
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
