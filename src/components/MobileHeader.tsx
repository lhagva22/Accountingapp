import { Bell, Menu, Building2 } from 'lucide-react';
import { Avatar, AvatarFallback } from './ui/avatar';

interface MobileHeaderProps {
  title: string;
  showMenu?: boolean;
  onMenuClick?: () => void;
}

export function MobileHeader({ title, showMenu = false, onMenuClick }: MobileHeaderProps) {
  return (
    <header className="bg-white border-b border-gray-200 px-4 py-3 sticky top-0 z-10">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          {showMenu && (
            <button onClick={onMenuClick} className="p-2 -ml-2">
              <Menu className="w-6 h-6 text-gray-700" />
            </button>
          )}
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <Building2 className="w-5 h-5 text-white" />
            </div>
            <div>
              <div className="text-gray-900">{title}</div>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button className="relative p-2">
            <Bell className="w-6 h-6 text-gray-600" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full"></span>
          </button>
          <Avatar className="w-8 h-8">
            <AvatarFallback className="bg-blue-100 text-blue-600">JD</AvatarFallback>
          </Avatar>
        </div>
      </div>
    </header>
  );
}
