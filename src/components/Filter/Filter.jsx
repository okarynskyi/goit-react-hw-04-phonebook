import { nanoid } from 'nanoid';
import PropTypes from 'prop-types';
import css from './Filter.module.css';

export const Filter = ({ filter, handleChange }) => {
    const filterId = nanoid();
    return (
        <label htmlFor={filterId} className={css.input}>Find contacts by name
            <input type="text" id = {filterId} name="filter" value={filter} onChange={handleChange} className={css.input_text}/>
        </label>
    )
}

Filter.propTypes = {
  filter: PropTypes.string.isRequired,
  handleChange: PropTypes.func.isRequired,
};