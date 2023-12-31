import propTypes from "prop-types";
import './item.css'

const Item = (props) => {
    const {title, amount} = props
    const status = amount < 0 ? "expense" : "income"
    const symbol = amount <0 ? "-" : "+"

    const formatNumber = (num) => {
        return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
    }

    return (
        <li className={status}>{title} <span>{symbol}{formatNumber(Math.abs(amount))}</span></li>
    )
}

// validate input data
Item.propTypes = {
    title:  propTypes.string.isRequired,
    amount: propTypes.number.isRequired
}

export default Item