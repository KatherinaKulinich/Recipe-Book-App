interface ImageBackgroundProps {
    children: React.ReactNode;
}

export const ImageBackground:React.FC<ImageBackgroundProps> = ({children}) => {
    return (
        <div className="background">
            {children}
        </div>
    )
}