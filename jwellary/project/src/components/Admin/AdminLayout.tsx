import React, { useState } from 'react';
import { Link, Outlet, useLocation, Navigate } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Package, 
  ShoppingCart, 
  Users, 
  Settings,
  Menu,
  X,
  Crown,
  LogOut,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  ChevronUp,
  Plus,
  List,
  Sliders,
  Tag,
  FolderOpen
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const AdminLayout: React.FC = () => {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [expandedMenus, setExpandedMenus] = useState<string[]>(['products']);
  const location = useLocation();
  const { state, logout } = useAuth();

  // Redirect if not admin
  if (!state.isAuthenticated || state.user?.role !== 'admin') {
    return <Navigate to="/signin" replace />;
  }

  const toggleSubmenu = (menuKey: string) => {
    setExpandedMenus(prev => 
      prev.includes(menuKey) 
        ? prev.filter(key => key !== menuKey)
        : [...prev, menuKey]
    );
  };
  const menuItems = [
    { icon: LayoutDashboard, label: 'Dashboard', path: '/admin' },
    { 
      icon: Package, 
      label: 'Products', 
      path: '/admin/products',
      hasSubmenu: true,
      submenu: [
        { icon: List, label: 'Product List', path: '/admin/products' },
        { icon: Plus, label: 'Add Product', path: '/admin/products/add' },
        { icon: Sliders, label: 'Options', path: '/admin/products/options' },
        { icon: Tag, label: 'Attributes', path: '/admin/products/attributes' },
      ]
    },
    { icon: FolderOpen, label: 'Categories', path: '/admin/categories' },
    { icon: ShoppingCart, label: 'Orders', path: '/admin/orders' },
    { icon: Users, label: 'Customers', path: '/admin/customers' },
    { icon: Settings, label: 'Settings', path: '/admin/settings' },
  ];

  const handleLogout = () => {
    logout();
  };

  const isSubmenuActive = (submenu: any[]) => {
    return submenu.some(item => location.pathname === item.path);
  };
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Mobile Header */}
      <div className="lg:hidden bg-white shadow-sm border-b border-slate-200">
        <div className="flex items-center justify-between px-4 py-3">
          <div className="flex items-center space-x-3">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 rounded-xl text-slate-600 hover:text-primary-600 hover:bg-primary-50 transition-colors"
            >
              {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
            <div className="flex items-center space-x-2">
              <div className="bg-gradient-to-r from-rose-500 to-primary-500 p-2 rounded-xl">
                <Crown className="h-5 w-5 text-white" />
              </div>
              <span className="font-serif font-bold gradient-text">Admin Panel</span>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="p-2 rounded-xl text-slate-600 hover:text-red-600 hover:bg-red-50 transition-colors"
          >
            <LogOut size={20} />
          </button>
        </div>
      </div>

      <div className="flex">
        {/* Desktop Sidebar */}
        <div className={`hidden lg:flex flex-col bg-white shadow-xl border-r border-slate-200 transition-all duration-300 ${
          isSidebarCollapsed ? 'w-20' : 'w-64'
        }`}>
          {/* Sidebar Header */}
          <div className="flex items-center justify-between p-6 border-b border-slate-200">
            {!isSidebarCollapsed && (
              <div className="flex items-center space-x-3">
                <div className="bg-gradient-to-r from-rose-500 to-primary-500 p-2 rounded-xl">
                  <Crown className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h1 className="font-serif font-bold gradient-text text-lg">Lumière</h1>
                  <p className="text-xs text-slate-500">Admin Panel</p>
                </div>
              </div>
            )}
            <button
              onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
              className="p-2 rounded-xl text-slate-600 hover:text-primary-600 hover:bg-primary-50 transition-colors"
            >
              {isSidebarCollapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
            </button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-4 space-y-2">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = item.hasSubmenu 
                ? isSubmenuActive(item.submenu || [])
                : location.pathname === item.path;
              const isExpanded = expandedMenus.includes(item.label.toLowerCase());
              
              if (item.hasSubmenu) {
                return (
                  <div key={item.label}>
                    <button
                      onClick={() => !isSidebarCollapsed && toggleSubmenu(item.label.toLowerCase())}
                      className={`sidebar-item w-full ${isActive ? 'active' : ''}`}
                      title={isSidebarCollapsed ? item.label : ''}
                    >
                      <Icon size={20} className="flex-shrink-0" />
                      {!isSidebarCollapsed && (
                        <>
                          <span className="ml-3 font-medium flex-1 text-left">{item.label}</span>
                          {isExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                        </>
                      )}
                    </button>
                    
                    {!isSidebarCollapsed && isExpanded && (
                      <div className="ml-6 mt-2 space-y-1">
                        {item.submenu?.map((subItem) => {
                          const SubIcon = subItem.icon;
                          const isSubActive = location.pathname === subItem.path;
                          
                          return (
                            <Link
                              key={subItem.path}
                              to={subItem.path}
                              className={`flex items-center px-3 py-2 text-sm text-slate-600 hover:text-primary-600 hover:bg-primary-50 rounded-lg transition-all duration-300 ${
                                isSubActive ? 'text-primary-600 bg-primary-50' : ''
                              }`}
                            >
                              <SubIcon size={16} className="mr-2" />
                              {subItem.label}
                            </Link>
                          );
                        })}
                      </div>
                    )}
                  </div>
                );
              }
              
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`sidebar-item ${isActive ? 'active' : ''}`}
                  title={isSidebarCollapsed ? item.label : ''}
                >
                  <Icon size={20} className="flex-shrink-0" />
                  {!isSidebarCollapsed && (
                    <span className="ml-3 font-medium">{item.label}</span>
                  )}
                </Link>
              );
            })}
          </nav>

          {/* User Info & Logout */}
          <div className="p-4 border-t border-slate-200">
            {!isSidebarCollapsed && (
              <div className="mb-4 p-3 bg-slate-50 rounded-xl">
                <p className="font-medium text-slate-800 text-sm">{state.user?.firstName} {state.user?.lastName}</p>
                <p className="text-xs text-slate-500">{state.user?.email}</p>
              </div>
            )}
            <button
              onClick={handleLogout}
              className="sidebar-item w-full text-red-600 hover:text-red-700 hover:bg-red-50"
              title={isSidebarCollapsed ? 'Logout' : ''}
            >
              <LogOut size={20} className="flex-shrink-0" />
              {!isSidebarCollapsed && <span className="ml-3 font-medium">Logout</span>}
            </button>
          </div>
        </div>

        {/* Mobile Sidebar */}
        {isMobileMenuOpen && (
          <div className="lg:hidden fixed inset-0 z-50 flex">
            <div className="fixed inset-0 bg-black bg-opacity-50" onClick={() => setIsMobileMenuOpen(false)} />
            <div className="relative flex flex-col w-64 bg-white shadow-xl">
              <div className="p-6 border-b border-slate-200">
                <div className="flex items-center space-x-3">
                  <div className="bg-gradient-to-r from-rose-500 to-primary-500 p-2 rounded-xl">
                    <Crown className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h1 className="font-serif font-bold gradient-text text-lg">Lumière</h1>
                    <p className="text-xs text-slate-500">Admin Panel</p>
                  </div>
                </div>
              </div>

              <nav className="flex-1 p-4 space-y-2">
                {menuItems.map((item) => {
                  const Icon = item.icon;
                  const isActive = item.hasSubmenu 
                    ? isSubmenuActive(item.submenu || [])
                    : location.pathname === item.path;
                  const isExpanded = expandedMenus.includes(item.label.toLowerCase());
                  
                  if (item.hasSubmenu) {
                    return (
                      <div key={item.label}>
                        <button
                          onClick={() => toggleSubmenu(item.label.toLowerCase())}
                          className={`sidebar-item w-full ${isActive ? 'active' : ''}`}
                        >
                          <Icon size={20} />
                          <span className="ml-3 font-medium flex-1 text-left">{item.label}</span>
                          {isExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                        </button>
                        
                        {isExpanded && (
                          <div className="ml-6 mt-2 space-y-1">
                            {item.submenu?.map((subItem) => {
                              const SubIcon = subItem.icon;
                              const isSubActive = location.pathname === subItem.path;
                              
                              return (
                                <Link
                                  key={subItem.path}
                                  to={subItem.path}
                                  className={`flex items-center px-3 py-2 text-sm text-slate-600 hover:text-primary-600 hover:bg-primary-50 rounded-lg transition-all duration-300 ${
                                    isSubActive ? 'text-primary-600 bg-primary-50' : ''
                                  }`}
                                  onClick={() => setIsMobileMenuOpen(false)}
                                >
                                  <SubIcon size={16} className="mr-2" />
                                  {subItem.label}
                                </Link>
                              );
                            })}
                          </div>
                        )}
                      </div>
                    );
                  }
                  
                  return (
                    <Link
                      key={item.path}
                      to={item.path}
                      className={`sidebar-item ${isActive ? 'active' : ''}`}
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      <Icon size={20} />
                      <span className="ml-3 font-medium">{item.label}</span>
                    </Link>
                  );
                })}
              </nav>

              <div className="p-4 border-t border-slate-200">
                <div className="mb-4 p-3 bg-slate-50 rounded-xl">
                  <p className="font-medium text-slate-800 text-sm">{state.user?.firstName} {state.user?.lastName}</p>
                  <p className="text-xs text-slate-500">{state.user?.email}</p>
                </div>
                <button
                  onClick={handleLogout}
                  className="sidebar-item w-full text-red-600 hover:text-red-700 hover:bg-red-50"
                >
                  <LogOut size={20} />
                  <span className="ml-3 font-medium">Logout</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Main Content */}
        <div className="flex-1 overflow-hidden">
          <main className="h-full overflow-y-auto">
            <div className="p-6">
              <Outlet />
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;