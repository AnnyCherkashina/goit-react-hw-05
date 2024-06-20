import { Formik, Form, Field } from "formik";
import s from "./SearchBar.module.css";

const SearchBar = ({ setUseSearchParams }) => {
    const initialValues = {
        query: "",
    };
    const handleSubmit = (values) => {
        console.log(values);
        setUseSearchParams({ query: values.query });
    };
    return (
        <Formik initialValues={initialValues} onSubmit={handleSubmit}>
            <Form className={s.form}>
                <Field
                    className={s.input}
                    name="query"
                    placeholder="Search movie"
                    autocomplete="off"
                />
                <button className={s.searchButton} type="submit">
                    Search
                </button>
            </Form>
        </Formik>
    );
};
export default SearchBar;