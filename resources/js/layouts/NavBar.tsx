import { AppHeader } from '@/components/app-header';
import { Link, router } from '@inertiajs/react';
import {
  BarChart2, Calendar, Home, LogOut,
  Menu, PenTool, Settings, X
} from 'lucide-react';
import { useState } from 'react';

export default function NavBar({ title, children }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navItems = [
    { name: 'Dashboard', href: '/dashboard', icon: Home },
    { name: 'Create Content', href: '/contents/create', icon: PenTool },
    { name: 'Publish Post', href: '/post/publish', icon: Calendar },
    { name: 'Analytics', href: '/analytics', icon: BarChart2 },
    { name: 'Settings', href: '/settings/profile', icon: Settings },
  ];

  const handleLogout = () => {
    router.post('/logout');
  };

  const renderNavItems = () =>
    navItems.map((item) => (
      <Link
        key={item.name}
        href={item.href}
        className="flex items-center rounded-md px-4 py-2 text-gray-700 hover:bg-gray-100"
      >
        <item.icon className="mr-3 h-5 w-5 text-gray-500" />
        {item.name}
      </Link>
    ));

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Desktop Sidebar */}
      <div className="hidden lg:fixed lg:inset-y-0 lg:flex lg:w-64 lg:flex-col lg:border-r lg:border-gray-200 lg:bg-white">
        <div className="flex h-16 items-center border-b border-gray-200 px-6">
        <a href='/' className="text-2xl font-bold text-purple-600">QuickPost</a>
        </div>
        <div className="flex flex-1 flex-col overflow-y-auto">
          <nav className="flex-1 space-y-1 px-4 py-4">
            {renderNavItems()}
          </nav>
          <div className="border-t border-gray-200 p-4">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <AppHeader />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Sidebar */}
      {isMobileMenuOpen && (
        <>
          <div
            className="fixed inset-0 z-40 bg-black bg-opacity-25"
            onClick={() => setIsMobileMenuOpen(false)}
          />
          <div className="fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg transition-transform duration-200 transform">
            <div className="flex h-16 items-center justify-between border-b border-gray-200 px-4">
              <span className="text-lg font-semibold text-gray-800">Quick Post</span>
              <button onClick={() => setIsMobileMenuOpen(false)}>
                <X className="h-6 w-6 text-gray-500" />
              </button>
            </div>
            <nav className="px-4 py-4 space-y-1">
              {renderNavItems()}
              <button
                onClick={handleLogout}
                className="flex items-center mt-4 w-full rounded-md px-4 py-2 text-red-600 hover:bg-red-100"
              >
                <LogOut className="mr-3 h-5 w-5" />
                Logout
              </button>
            </nav>
          </div>
        </>
      )}

      {/* Main Content */}
      <div className="lg:pl-64">
        {/* Top Navbar for Mobile */}
        <div className="sticky top-0 z-10 flex h-16 border-b border-gray-200 bg-white lg:hidden">
          <button
            onClick={() => setIsMobileMenuOpen(true)}
            className="px-4 text-gray-500 focus:outline-none"
          >
            <Menu size={24} />
          </button>
          <div className="flex flex-1 items-center justify-center px-4">
            <span className="text-lg font-semibold text-gray-800">{title}</span>
          </div>
        </div>

        {/* Page Content */}
        <main className="px-4 py-6 sm:px-6 lg:px-8">
          <div className="mb-6 hidden lg:block">
            <h1 className="text-2xl font-semibold text-gray-900">{title}</h1>
          </div>
          {children}
        </main>
      </div>
    </div>
  );
}
