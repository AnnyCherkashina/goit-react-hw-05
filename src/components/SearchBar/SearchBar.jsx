import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import s from "./SearchBar.module.css";

const SearchBar = ({ setUseSearchParams }) => {
    const initialValues = { query: "" };

    const validationSchema = Yup.object({
        query: Yup.string().required("Search query is required"),
    });

    const handleSubmit = (values) => {
        setUseSearchParams({ query: values.query });
    };

    return (
        <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
        >
            <Form className={s.form}>
                <Field
                    className={s.input}
                    name="query"
                    placeholder="Search movie"
                    autoComplete="off"
                />
                <button className={s.searchButton} type="submit">
                    Search
                </button>
                <ErrorMessage className={s.error} name="query" component="div" />
            </Form>
        </Formik>
    );
};

export default SearchBar;
