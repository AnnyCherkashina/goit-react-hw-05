import { Suspense, useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import Loader from "../Loader/Loader";

import { fetchMovieReviews } from "../../api/getFilms";
import s from "./MovieReviews.module.css";

const MovieReviews = () => {
    const { movieId } = useParams();
    const [reviews, setReviews] = useState(null);

    useEffect(() => {
        fetchMovieReviews(movieId)
            .then((data) => setReviews(data))
            .catch((error) => console.log(error));
    }, [movieId]);

    if (reviews && reviews.results.length === 0) {
        return <h2>We not have any reviews for this movie</h2>;
    }

    return (
        <Suspense fallback={<Loader />}>
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
        </Suspense>
    );
};

export default MovieReviews;