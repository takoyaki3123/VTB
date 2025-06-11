import Navbar from '@/components/common/navbar';
// import AppLayoutTemplate from '@/layouts/app/app-sidebar-layout';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';

interface AppLayoutProps {
    children: React.ReactNode;
    breadcrumbs?: BreadcrumbItem[];
}

const AppLayout: React.FC<AppLayoutProps> = ({ children, title }) => (
    <div>
        <Head title={"X皆のVTB"}></Head>
        <Navbar/>
        {children}
    </div>
);
export default AppLayout;
