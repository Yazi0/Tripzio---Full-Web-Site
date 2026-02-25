import React, { useEffect, useState } from 'react';
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import {
    LayoutDashboard,
    BookOpen,
    Image as ImageIcon,
    Settings,
    LogOut,
    Menu,
    X,
    Shield,
    Bell,
    ChevronRight,
    ChevronLeft,
    Search,
    Calendar as CalendarIcon
} from 'lucide-react';
import { cn } from '../../lib/utils';
import { logout, getMe } from '../../api/auth';
import { User } from '../../types';

export const AdminLayout = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const [user, setUser] = useState<User | null>(null);
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const me = await getMe();
                if (me.role !== 'ADMIN') {
                    navigate('/');
                }
                setUser(me);
            } catch {
                navigate('/adminlogin');
            }
        };
        fetchUser();
    }, [navigate]);

    const menuItems = [
        { name: 'Dashboard', href: '/admin/dashboard', icon: LayoutDashboard },
        { name: 'Bookings', href: '/admin/bookings', icon: BookOpen },
        { name: 'Calendar', href: '/admin/calendar', icon: CalendarIcon },
        { name: 'Listings', href: '/admin/listings', icon: ImageIcon },
        { name: 'Settings', href: '/admin/settings', icon: Settings },
    ];

    if (!user) return null;

    return (
        <div className="h-screen bg-gray-50 flex overflow-hidden">
            {/* Sidebar */}
            <aside
                className={cn(
                    "fixed inset-y-0 left-0 z-50 bg-white border-r border-gray-200 transition-all duration-300 lg:sticky lg:top-0 lg:h-screen",
                    isSidebarOpen ? "w-64 translate-x-0" : "w-20 -translate-x-full lg:translate-x-0"
                )}
            >
                <div className="h-full flex flex-col">
                    <div className={cn(
                        "p-6 border-b border-gray-100 flex items-center transition-all duration-300",
                        isSidebarOpen ? "gap-3" : "justify-center"
                    )}>
                        <div className="bg-primary-600 p-2 rounded-lg text-white shrink-0">
                            <Shield className="h-6 w-6" />
                        </div>
                        {isSidebarOpen && (
                            <span className="text-xl font-bold bg-gradient-to-r from-primary-600 to-primary-900 bg-clip-text text-transparent truncate whitespace-nowrap">
                                Tripzio Admin
                            </span>
                        )}
                    </div>

                    <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
                        {menuItems.map((item) => {
                            const isActive = location.pathname === item.href;
                            return (
                                <Link
                                    key={item.name}
                                    to={item.href}
                                    title={!isSidebarOpen ? item.name : ''}
                                    className={cn(
                                        "flex items-center rounded-xl transition-all duration-200",
                                        isSidebarOpen ? "px-4 py-3 gap-3" : "p-3 justify-center",
                                        isActive
                                            ? "bg-primary-50 text-primary-600 shadow-sm shadow-primary-100"
                                            : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                                    )}
                                >
                                    <item.icon className={cn("h-5 w-5 shrink-0", isActive ? "text-primary-600" : "text-gray-400")} />
                                    {isSidebarOpen && <span className="font-medium truncate">{item.name}</span>}
                                    {isSidebarOpen && isActive && <ChevronRight className="ml-auto h-4 w-4" />}
                                </Link>
                            );
                        })}
                    </nav>

                    <div className="p-4 border-t border-gray-100">
                        <button
                            onClick={logout}
                            title={!isSidebarOpen ? 'Sign Out' : ''}
                            className={cn(
                                "flex items-center w-full text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-xl transition-all",
                                isSidebarOpen ? "px-4 py-3 gap-3" : "p-3 justify-center"
                            )}
                        >
                            <LogOut className="h-5 w-5 shrink-0" />
                            {isSidebarOpen && <span className="font-medium">Sign Out</span>}
                        </button>
                    </div>
                </div>
            </aside>

            {/* Main Content */}
            <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
                {/* Header */}
                <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-6 sticky top-0 z-40">
                    <button
                        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                        className="p-2 text-gray-500 hover:bg-gray-100 rounded-lg transition-colors"
                        title={isSidebarOpen ? 'Collapse Sidebar' : 'Expand Sidebar'}
                    >
                        {isSidebarOpen ? <ChevronLeft className="h-6 w-6" /> : <ChevronRight className="h-6 w-6" />}
                    </button>

                    <div className="flex-1 max-w-md hidden md:block px-4">
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                            <input
                                type="text"
                                placeholder="Search everything..."
                                className="w-full pl-10 pr-4 py-2 bg-gray-50 border-none rounded-lg text-sm focus:ring-2 focus:ring-primary-500 transition-all outline-none"
                            />
                        </div>
                    </div>

                    <div className="flex items-center gap-4">
                        <button className="p-2 text-gray-400 hover:bg-gray-100 rounded-lg relative">
                            <Bell className="h-5 w-5" />
                            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
                        </button>
                        <div className="h-8 w-px bg-gray-200 mx-2"></div>
                        <div className="flex items-center gap-3">
                            <div className="text-right hidden sm:block">
                                <p className="text-sm font-bold text-gray-900">{user.firstName} {user.lastName}</p>
                                <p className="text-xs text-primary-600 font-medium">Administrator</p>
                            </div>
                            <img
                                src={user.avatar || "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"}
                                alt="Admin"
                                className="h-10 w-10 rounded-xl object-cover ring-2 ring-primary-50 ring-offset-2"
                            />
                        </div>
                    </div>
                </header>

                {/* Page Content */}
                <main className="flex-1 overflow-y-auto p-6 lg:p-10">
                    <Outlet />
                </main>
            </div>
        </div>
    );
};
