import Sidebar from "@/components/sidebar";
import { useMenu } from "@/core/hooks/use-menu";

interface MenuPanelProps {
  children: React.ReactNode;
}

const MenuPanel: React.FC<MenuPanelProps> = ({ children }) => {
  const MenuItems = useMenu();

  return <Sidebar linkItems={MenuItems}>{children}</Sidebar>;
};

export default MenuPanel;
