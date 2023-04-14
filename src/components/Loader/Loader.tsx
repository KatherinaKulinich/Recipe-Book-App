import { Grid } from "react-loader-spinner"

export const Loader:React.FC = () => {
    return (
        <Grid
            height="80"
            width="80"
            color="#9f7928"
            ariaLabel="grid-loading"
            radius="12.5"
            wrapperStyle={{}}
            wrapperClass=""
            visible={true}
        />
    )
}