import Contact from "../Contact/Contact";
import css from './ContactList.module.css';
import { useSelector } from "react-redux";

import { selectContacts, selectNameFilter } from "../../redux/selectors";

export default function ContactList() {
    const contacts = useSelector(selectContacts);

    const filters = useSelector(selectNameFilter);

    const visibleContacts = contacts.filter((contact) => {
        return contact.name.toLowerCase()
        .includes(filters.toLowerCase())
    });

    return (
        <ul className={css.list}>
            {visibleContacts.map((contact) => (
                <li key={contact.id}>
                    <Contact id={contact.id} name={contact.name} number={contact.number} />
                </li>
            ))}
        </ul>
    )
}