export const  dashboardMenu =  {
    title: 'Dashboard',
    icon: 'dashboard',
    link: '/dashboard',
    pages: []
  };


export const adminMenu = {
    title: 'Yönetim',
    icon: 'settings',
    pages: [
      {
        title: 'Kullanıcıları Yönet++',
        link: '/admin/user/',
        icon: 'view_list'
      },
      {
        title: 'Ülkeleri_ Yönet',
        link: '/admin/country/',
          icon: 'public'
      }

    ]
  };

export const managerMenu = {
    title: 'Kullanıcı Menusu',
    icon: 'local_activity',
    pages: [
      {
        title: 'Yeni İşlemler',
        link: '/yen',
        icon: 'list'
      },
    ]
  };
