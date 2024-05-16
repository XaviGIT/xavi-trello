import { Navbar } from "./_components/navbar";


interface Props {
    children: React.ReactNode;
}

const DashboadLayout = ({ children }: Props) => {
    return (
        <div className="h-full">
            <Navbar />
            {children}
        </div>
    )
}

export default DashboadLayout;