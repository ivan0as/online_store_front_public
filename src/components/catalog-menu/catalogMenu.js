import { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from '../../context';
import { GENERAL_TYPE_TYPES, TYPE_TYPES } from '../../config';
import css from './catalogMenu.module.css';

function CatalogMenu() {
    const [formVisible, setFormVisible] = useState(false)
    const [idGeneralTypes, setIdGeneralTypes] = useState([])

    const {generalTypes, types} = useContext(UserContext)

    const tabType = (id) => {
        setIdGeneralTypes(id)
        setFormVisible(true)
    }
    return (
        <div className={css.catalog_menu}>
            <div className={css.generals_type}>
                {generalTypes.data.map( generalType => {
                    return(
                        <button className={css.general_type} key={generalType[GENERAL_TYPE_TYPES.ID]} onClick={() => tabType(generalType[GENERAL_TYPE_TYPES.ID])}>{generalType[GENERAL_TYPE_TYPES.NAME]}</button>
                    )
                })}
            </div>
            <div className={css.types}>
                {formVisible && (
                    <>
                        {types.data.map( type => {
                            if (type[TYPE_TYPES.GENERALTYPEID] === idGeneralTypes) {
                                return(
                                    <Link key={type[TYPE_TYPES.ID]} to={`/${type[TYPE_TYPES.ID]}`}>
                                        <button className={css.type}>{type[TYPE_TYPES.NAME]}</button>
                                    </Link>
                                )
                            }
                        })}
                    </>
                )}
            </div>
        </div>
    );
}

export default CatalogMenu;