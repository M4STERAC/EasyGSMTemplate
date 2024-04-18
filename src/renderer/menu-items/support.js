// assets
import { BugOutlined, QuestionOutlined } from '@ant-design/icons';

// icons
const icons = {
  BugOutlined,
  QuestionOutlined
};

// ==============================|| MENU ITEMS - SAMPLE PAGE & DOCUMENTATION ||============================== //

const support = {
  id: 'support',
  title: 'Support',
  type: 'group',
  children: [
    {
      id: 'issue',
      title: 'Report an Issue',
      type: 'item',
      url: 'https://github.com/M4STERAC/EasyGSM/issues/new',
      icon: icons.BugOutlined,
      external: true,
      target: true
    },
    {
      id: 'documentation',
      title: 'How To',
      type: 'item',
      url: 'https://github.com/M4STERAC/EasyGSM/wiki/How-to-use-EasyGSM',
      icon: icons.QuestionOutlined,
      external: true,
      target: true
    }
  ]
};

export default support;
