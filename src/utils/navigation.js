const getNavigationItems = () => {
  
  const navLinkItems = [
    {id: 1, text: 'Home', href: '/'},
    {id: 2, text: 'Cars', href: '/cars'},
    {id: 3, text: 'Brands', href: '/brands'},
    {id: 4, text: 'Models', href: '/models'},
    {id: 5, text: 'Owners', href: '/owners'}
  ];

  return navLinkItems
}

export default getNavigationItems;