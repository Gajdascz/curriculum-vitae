import { getStoredSectionsConfig } from './storage';

const uid = () =>
  `${Math.round((Math.random() * Date.now()) / Math.PI ** Math.PI)}`;

const field = ({
  label,
  type = 'text',
  value = '',
  className = '',
  content = ''
} = {}) => ({
  id: uid(),
  type,
  label,
  value,
  className,
  content
});

const base = ({ headerText, fields = [], type } = {}) => ({
  id: uid(),
  headerText,
  isSelected: false,
  fields,
  type,
  ...(type === 'structured' && { saved: [] })
});

const config = {
  id: uid(),
  headerText: 'General',
  type: 'static',
  index: -1,
  isSelected: false,
  fields: [
    field({
      type: 'color',
      label: 'Accent',
      value: '#add8e6'
    }),
    [
      uid(),
      'Font',
      [
        field({
          type: 'visual',
          value: 'times-new-roman',
          label: 'Times New Roman',
          content: 'font'
        }),
        field({
          type: 'visual',
          value: 'atkinson',
          label: 'Atkinson Hyper-legible',
          content: 'font'
        }),
        field({
          type: 'visual',
          value: 'arial',
          label: 'Arial',
          content: 'font'
        })
      ]
    ],
    [
      uid(),
      'Layout',
      [
        field({
          type: 'visual',
          value: 'top-right',
          label: 'Header and right sidebar',
          content: 'layout'
        }),
        field({
          type: 'visual',
          value: 'top-left',
          label: 'Header and left sidebar',
          content: 'layout'
        }),
        field({
          type: 'visual',
          value: 'top',
          label: 'Just header',
          content: 'layout'
        }),
        field({
          type: 'visual',
          value: 'right',
          label: 'Just right sidebar',
          content: 'layout'
        }),
        field({
          type: 'visual',
          value: 'left',
          label: 'Just left sidebar',
          content: 'layout'
        })
      ]
    ]
  ]
};

const header = base({
  headerText: 'Header',
  type: 'static',
  fields: [
    field({ type: 'text', label: 'Name' }),
    field({ type: 'text', label: 'Title' }),
    field({ type: 'text', label: 'Other' })
  ]
});
const contact = base({
  headerText: 'Contact',
  type: 'expandable',
  fields: [
    field({ type: 'email', label: 'Email' }),
    field({ type: 'tel', label: 'Phone' }),
    field({ type: 'text', label: 'Area' })
  ]
});

const profile = base({
  headerText: 'Profile',
  type: 'static',
  fields: [field({ type: 'text-area', label: 'Profile' })]
});

const education = base({
  headerText: 'Education',
  type: 'structured',
  fields: [
    field({ type: 'text', label: 'University' }),
    field({ type: 'number', label: 'GPA' }),
    field({ type: 'text', label: 'Degree' }),
    field({ type: 'date', label: 'Start' }),
    field({ type: 'date', label: 'End' }),
    field({ type: 'text', label: 'Location' }),
    field({ type: 'text-area', label: 'Courses' }),
    field({ type: 'text-area', label: 'Achievements' })
  ]
});

const experience = base({
  headerText: 'Experience',
  type: 'structured',
  fields: [
    field({ type: 'text', label: 'Position' }),
    field({ type: 'date', label: 'Start' }),
    field({ type: 'date', label: 'End' }),
    field({ type: 'text-area', label: 'Description' })
  ]
});

const skills = base({
  headerText: 'Skills',
  type: 'list',
  fields: [field({ type: 'text' })]
});

const getDefaultConfig = () =>
  [config, header, contact, profile, education, experience, skills].map(
    (section, index) => ({ ...section, index })
  );

const getInitialSections = () =>
  localStorage.length === 0 ? getDefaultConfig() : getStoredSectionsConfig();

export { getInitialSections, uid };
