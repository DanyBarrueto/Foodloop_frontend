const NavbarCss = `
/* Asegurar que todo el contenido del navbar esté por encima */
html, body {
  position: relative;
  z-index: 9999;
}

/* Navbar styles */
.navbar {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 9999;
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(20px);
  border-bottom: 1px solid rgba(255, 255, 255, 0.2);
  padding: 1rem 1.5rem;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.navbar-content {
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;
}

/* Brand section */
.brand {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  cursor: pointer;
  text-decoration: none;
}

.brand-icon {
  display: flex;
  height: 3rem;
  width: 3rem;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  background: linear-gradient(135deg, #4ade80, #16a34a);
  color: white;
  box-shadow: 0 4px 12px rgba(34, 197, 94, 0.3);
}

.brand-title {
  font-size: 1.5rem;
  font-weight: 700;
  background: linear-gradient(135deg, #16a34a, #0284c7);
  background-clip: text;
  -webkit-background-clip: text;
  color: transparent;
}

/* Navigation links */
.nav-links {
  display: flex;
  align-items: center;
  gap: 1.5rem;
}

.nav-link {
  color: #374151;
  font-weight: 500;
  text-decoration: none;
  transition: color 0.2s ease;
  cursor: pointer;
  background: none;
  border: none;
  font-family: inherit;
  font-size: inherit;
}

.nav-link:hover {
  color: #22c55e;
}

/* Dropdown styles */
.dropdown {
  position: relative;
  z-index: 99999;
}

.dropdown-trigger {
  display: flex;
  align-items: center;
  color: #374151;
  font-weight: 500;
  text-decoration: none;
  transition: color 0.2s ease;
  cursor: pointer;
  background: none;
  border: none;
  font-family: inherit;
  font-size: inherit;
  gap: 0.25rem;
}

.dropdown-trigger:hover {
  color: #22c55e;
}

.dropdown-icon {
  margin-left: 0.25rem;
  height: 1rem;
  width: 1rem;
  transform: rotate(0deg);
  transition: transform 0.2s ease;
}

.dropdown-icon.open {
  transform: rotate(180deg);
}

.dropdown-menu {
  position: absolute;
  right: 0;
  margin-top: 0.5rem;
  width: 12rem;
  background: white;
  border-radius: 0.5rem;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.15);
  border: 1px solid rgba(0, 0, 0, 0.05);
  z-index: 99999;
  opacity: 0;
  visibility: hidden;
  transform: translateY(-10px);
  transition: all 0.2s ease;
}

.dropdown-menu.show {
  opacity: 1;
  visibility: visible;
  transform: translateY(0);
}

.dropdown-item {
  display: block;
  width: 100%;
  text-align: left;
  padding: 0.75rem 1rem;
  font-size: 0.875rem;
  color: #374151;
  background: none;
  border: none;
  cursor: pointer;
  transition: all 0.2s ease;
  font-family: inherit;
}

.dropdown-item:hover {
  background: #f3f4f6;
  color: #22c55e;
}

.dropdown-item.logout:hover {
  color: #dc2626;
}

.dropdown-item:first-child {
  border-radius: 0.5rem 0.5rem 0 0;
}

.dropdown-item:last-child {
  border-radius: 0 0 0.5rem 0.5rem;
}

/* Mobile menu toggle */
.menu-toggle {
  display: none;
  background: none;
  border: none;
  font-size: 1.5rem;
  color: #374151;
  cursor: pointer;
  padding: 0.5rem;
}

.menu-toggle:hover {
  color: #22c55e;
}

/* Mobile menu */
.mobile-menu {
  display: none;
  background: rgba(255, 255, 255, 0.98);
  backdrop-filter: blur(20px);
  border-top: 1px solid rgba(0, 0, 0, 0.1);
  padding: 1rem 0;
}

.mobile-menu.show {
  display: block;
}

.mobile-menu-content {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.mobile-link {
  padding: 0.75rem 0;
  color: #374151;
  font-weight: 500;
  text-decoration: none;
  border-bottom: 1px solid rgba(0, 0, 0, 0.05);
  transition: color 0.2s ease;
  background: none;
  border: none;
  text-align: left;
  font-family: inherit;
  font-size: inherit;
  cursor: pointer;
}

.mobile-link:hover {
  color: #22c55e;
}

.mobile-link:last-child {
  border-bottom: none;
}

.mobile-account-section {
  border-top: 1px solid rgba(0, 0, 0, 0.1);
  padding-top: 0.75rem;
  margin-top: 0.5rem;
}

.mobile-account-title {
  font-size: 0.75rem;
  color: #6b7280;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  padding: 0 0 0.5rem 0;
  margin-bottom: 0.5rem;
}

.mobile-link.logout {
  color: #dc2626;
}

.mobile-link.logout:hover {
  color: #b91c1c;
}

/* Responsive design */
@media (max-width: 768px) {
  .nav-links {
    display: none;
  }
  
  .menu-toggle {
    display: block;
  }
  
  .brand-title {
    font-size: 1.25rem;
  }
  
  .brand-icon {
    height: 2.5rem;
    width: 2.5rem;
  }
  
  .navbar {
    padding: 0.75rem 1rem;
  }
}

/* Button styles for primary actions */
.btn-primary {
  background: linear-gradient(135deg, #22c55e, #16a34a);
  color: white;
  padding: 0.5rem 1.5rem;
  border-radius: 0.5rem;
  font-weight: 600;
  border: none;
  cursor: pointer;
  text-decoration: none;
  transition: all 0.2s ease;
  font-family: inherit;
}

.btn-primary:hover {
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(34, 197, 94, 0.3);
}

/* Icon styles */
.nav-icon {
  width: 1.5rem;
  height: 1.5rem;
  stroke: currentColor;
  fill: none;
  stroke-width: 2;
}
`;

export default NavbarCss;
