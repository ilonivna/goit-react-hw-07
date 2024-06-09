import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { nanoid } from "nanoid";
import css from "./ContactForm.module.css";
import { addContact } from "../../redux/contactsSlice.js";
import { useDispatch } from "react-redux";
import { useId } from "react";




export default function ContactForm() {
    const dispatch = useDispatch();
const nameFieldId = useId();
    const numberFieldId = useId();
    
    const ValidationSchema = Yup.object().shape({
        name: Yup.string().min(3, "Too short!").max(50, "Too long!").required("Required!"),
        number: Yup.string().min(3, "Too short!").max(30, "Too long!").required("Required!"),
    });
    
    const handleSubmit = (values, actions) => {
        values.id = nanoid();   
        const { name, number } = values;
        dispatch(addContact(name, number))
        actions.resetForm();
    };

    return (
        <Formik
            initialValues={{
            name: "",
            number: "",
            }}
            onSubmit={handleSubmit}
            validationSchema={ValidationSchema}
            >
            <Form className={css.form}>
                <div className={css.labelContainer}>
                <label htmlFor={nameFieldId}>Name</label>
                <Field className={css.input} type="text" name="name" id={nameFieldId}></Field>
                    <ErrorMessage
                        className={css.error} name="name" component="span" />
                </div>

                <div className={css.labelContainer}>
                <label htmlFor={numberFieldId}>Number</label>
                <Field className={css.input} type="number" name="number" id={numberFieldId}></Field>
                <ErrorMessage className={css.error} name="number" component="span" />
                </div>
                
                <button className={css.formBtn} type="submit" >Add contact</button>
            </Form>
        </Formik>
    )
}