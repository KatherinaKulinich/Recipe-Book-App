import { Select } from "antd"
import { IconContext } from "react-icons"
import { FaFilter } from "react-icons/Fa"
import { RoundedButton } from "../RoundedButton/RoundedButton"



interface FilterButtonProps {
    onClickHandle: React.MouseEventHandler<HTMLButtonElement>;
    openFilter: boolean;
    onSelectValue: (value: string) => void;
    rate: boolean;
    currentFilterValue: string;
}



export const FilterButton: React.FC<FilterButtonProps> = ({onClickHandle, openFilter, onSelectValue, rate, currentFilterValue}) => {
   

    return (
        <div className="filter">
            <RoundedButton 
                hoverTitle="Filter recipes" 
                onClickHandle={onClickHandle} 
                buttonClassName='filter__button'
            >
                <span>
                    <IconContext.Provider value={{ color: "#DCCA87", size: "26" }}>
                        <FaFilter/>
                    </IconContext.Provider>
                </span>
            </RoundedButton>
            <Select
                defaultValue="without filter"
                value={currentFilterValue !== '' ? currentFilterValue : "without filter"}
                style={{ width: 200 }}
                onChange={onSelectValue}
                className={`filter__select ${
                    openFilter ? 'filter__select--open' : 'filter__select--close'
                }`}
                options={rate ? [
                    {value: 'none', label: 'without filter'},
                    {value: 'new', label: 'from new recipes'},
                    {value: 'old', label: 'from old recipes'},
                    {value: 'rate', label: 'from hight rated recipes'},
                ] : [
                        {value: 'none', label: 'without filter'},
                        {value: 'new', label: 'from new recipes'},
                        {value: 'old', label: 'from old recipes'},
                        {value: 'rate', label: 'from hight rated recipes', disabled: true},
                    ]
                }
            />
        </div>
    )
}