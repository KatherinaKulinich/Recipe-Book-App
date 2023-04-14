import { Tooltip } from "antd"
import { useContext } from "react";
import { ThemeContext } from "../../../ThemeProvider";

interface RoundedButtonProps {
    hoverTitle: string;
    buttonClassName: string;
    onClickHandle: React.MouseEventHandler<HTMLButtonElement>;
    children: React.ReactNode;
}



export const RoundedButton: React.FC<RoundedButtonProps> = ({hoverTitle, buttonClassName, onClickHandle, children}) => {
    const { theme } = useContext(ThemeContext);

    return (
        <Tooltip title={hoverTitle}>
            <button 
                type="button" 
                className={`roundedButton ${buttonClassName} ${
                    theme === 'dark' ? 'roundedButton--dark' : 'roundedButton--light'
                }`} 
                onClick={onClickHandle} 
            >
                {children}
            </button>
        </Tooltip>
    )
}