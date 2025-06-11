import Navbar from '@/components/common/navbar';
// import AppLayoutTemplate from '@/layouts/app/app-sidebar-layout';
import { Head } from '@inertiajs/react';

interface AppLayoutProps {
    children: React.ReactNode;
}

const AppLayout: React.FC<AppLayoutProps> = ({ children }) => (
    <div>
        <Head title={"皆のVTB"}></Head>
        <Navbar/>
        {children}
    </div>
);
export default AppLayout;
