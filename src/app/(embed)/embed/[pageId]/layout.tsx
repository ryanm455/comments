import EmbedListener from "components/embed/EmbedListener";

const EmbedLayout = ({ children }: React.PropsWithChildren<{}>) => {
    return (
        <>
            {children}
            <EmbedListener />
            <style>
                {`
                body::-webkit-scrollbar {
                    display: none;
                }`}
            </style>
        </>
    )
}

export default EmbedLayout;