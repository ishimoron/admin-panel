import { Link } from '@tanstack/react-router';
import { Button } from 'primereact/button';
import { Sidebar as SidebarComponent } from 'primereact/sidebar';
import { useState } from 'react';

const Sidebar = () => {
  const [visible, setVisible] = useState(false);
  return (
    <div>
      <SidebarComponent visible={visible} onHide={() => setVisible(false)}>
        <Link to="/dashboard">
          <Button rounded outlined>
            Dashboard
          </Button>
        </Link>
        <Link to="/categories">
          <Button rounded outlined>
            Categories
          </Button>
        </Link>
        <Button rounded outlined>
          Products
        </Button>
        <Button rounded outlined>
          Logout
        </Button>
      </SidebarComponent>
      <Button icon="pi pi-bars" onClick={() => setVisible(true)} />
    </div>
  );
};

export default Sidebar;
