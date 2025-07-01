"use client"
import dynamic from "next/dynamic";

const EmbedListener = dynamic(() => import("components/embed/EmbedListener"), {
    ssr: false
})

const EmbedLayout = ({ children }: React.PropsWithChildren<{}>) => (
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

export default EmbedLayout;