export function openSidebar() {
  if (typeof window !== 'undefined') {
    // document.body.style.overflow = 'hidden';
    document.documentElement.style.setProperty('--SideNavigation-slideIn', '1');
  }
}

export function closeSidebar() {
  if (typeof window !== 'undefined') {
    document.documentElement.style.removeProperty('--SideNavigation-slideIn');
    // document.body.style.removeProperty('overflow');
  }
}

export function toggleSidebar() {
  if (typeof window !== 'undefined' && typeof document !== 'undefined') {
    const rootStyle = window.getComputedStyle(document.documentElement);
    const slideIn = rootStyle
      .getPropertyValue('--SideNavigation-slideIn')
      .trim();
    if (slideIn === '0') {
      openSidebar();
    } else {
      closeSidebar();
    }
  }
}
