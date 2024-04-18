// assets
import { DownloadOutlined } from '@ant-design/icons';

// icons
const icons = {
  DownloadOutlined
};

// ==============================|| MENU ITEMS - UTILITIES ||============================== //

const utilities = {
  id: 'utilities',
  title: 'Utilities',
  type: 'group',
  children: [
    {
      id: 'util-download',
      title: 'Download Server',
      type: 'item',
      url: '/dashboard/',
      icon: icons.DownloadOutlined
    }
  ]
};

export default utilities;
