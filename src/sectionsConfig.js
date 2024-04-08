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

const base = ({
  type,
  headerText,
  fields = [],
  location = { id: 'base', index: 0 }
} = {}) => ({
  id: uid(),
  headerText,
  isSelected: false,
  fields,
  type,
  location,
  ...(type === 'structured' && { saved: [] })
});

const config = {
  id: uid(),
  headerText: 'General',
  type: 'static',
  index: -1,
  isSelected: false,
  location: { id: 'base', index: 0 },
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
        })
      ]
    ]
  ]
};

const header = base({
  headerText: 'Header',
  type: 'static',
  location: { id: 'header', index: 0 },
  fields: [
    field({ type: 'text', label: 'Name' }),
    field({ type: 'text', label: 'Title' }),
    field({ type: 'text', label: 'Other' })
  ]
});

const profile = base({
  headerText: 'Profile',
  type: 'static',
  location: { id: 'primary', index: 0 },
  fields: [field({ type: 'text-area', label: 'Profile' })]
});

const contact = base({
  headerText: 'Contact',
  type: 'configurable',
  location: { id: 'sidebar', index: 0 },
  fields: [
    field({ type: 'email', label: 'Email' }),
    field({ type: 'tel', label: 'Phone' }),
    field({ type: 'text', label: 'Area' })
  ]
});

const education = base({
  headerText: 'Education',
  type: 'structured',
  location: { id: 'primary', index: 1 },
  fields: [
    field({ type: 'text', label: 'University' }),
    field({ type: 'number', label: 'GPA' }),
    field({ type: 'text', label: 'Degree' }),
    field({ type: 'date', label: 'Start' }),
    field({ type: 'date', label: 'End' }),
    field({ type: 'text', label: 'Location' })
  ]
});

const experience = base({
  headerText: 'Experience',
  type: 'structured',
  location: { id: 'primary', index: 2 },
  fields: [
    field({ type: 'text', label: 'Position' }),
    field({ type: 'date', label: 'Start' }),
    field({ type: 'date', label: 'End' })
  ]
});

const skills = base({
  headerText: 'Skills',
  location: { id: 'sidebar', index: 1 },
  type: 'configurable',
  fields: [field({ type: 'text' })]
});

const getDefaultConfig = () => [
  config,
  header,
  profile,
  contact,
  education,
  experience,
  skills
];

const getInitialSections = () =>
  localStorage.length === 0 ? getDefaultConfig() : getStoredSectionsConfig();

const sortSections = (sections) => {
  const normalizeIndices = (sections) => {
    const max = sections.length - 1;
    return sections.map((section) => ({
      ...section,
      location: {
        ...section.location,
        index: Math.min(section.location.index, max)
      }
    }));
  };

  const primary = normalizeIndices(
    sections.filter((section) => section.location.id === 'primary')
  );
  const sidebar = normalizeIndices(
    sections.filter((section) => section.location.id === 'sidebar')
  );
  const other = sections.filter(
    (section) =>
      section.location.id !== 'primary' && section.location.id !== 'sidebar'
  );

  primary.sort((a, b) => a.location.index - b.location.index);
  sidebar.sort((a, b) => a.location.index - b.location.index);
  return [...primary, ...sidebar, ...other];
};

export { getInitialSections, sortSections, uid };
