import './index.css'

const FiltersItem = props => {
  const {filterItem, isActive, changeActiveOption} = props
  const alterActiveOption = () => {
    changeActiveOption(filterItem.value)
  }
  return (
    <li>
      <button
        type="button"
        className={isActive ? 'list-item' : null}
        onClick={alterActiveOption}
      >
        {filterItem.label}
      </button>
    </li>
  )
}

export default FiltersItem
