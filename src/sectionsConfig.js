import { getStoredSectionsConfig } from './storage';

const uid = () =>
  `${Math.round((Math.random() * Date.now()) / Math.PI ** Math.PI)}`;

const field = ({
  label,
  type = 'text',
  value = '',
  className = '',
  content = '',
  ...rest
} = {}) => ({
  id: uid(),
  type,
  label,
  value,
  className,
  content,
  ...rest
});

const base = ({
  type,
  headerText,
  fields = [],
  location = { id: 'base', index: 0 },
  ...rest
} = {}) => ({
  id: uid(),
  headerText,
  isSelected: false,
  fields,
  type,
  location,
  ...(type === 'structured' && { saved: [] }),
  ...rest
});

const config = {
  id: uid(),
  headerText: 'General',
  type: 'static',
  index: -1,
  isSelected: false,
  location: { id: 'base', index: 0 },
  selected: {
    accent: '#add8e6',
    font: 'atkinson-hyper-legible',
    layout: 'right'
  },
  accentColor: {
    id: uid(),
    type: 'color',
    label: 'Accent'
  },
  fonts: [
    field({
      type: 'visual',
      value: 'times-new-roman',
      label: 'Times New Roman',
      content: 'Ti'
    }),
    field({
      type: 'visual',
      value: 'atkinson-hyper-legible',
      label: 'Atkinson Hyper Legible',
      content: 'At'
    }),
    field({
      type: 'visual',
      value: 'arial',
      label: 'Arial',
      content: 'Ar'
    })
  ],
  layouts: [
    field({
      type: 'visual',
      value: 'right',
      label: 'Sidebar on right'
    }),
    field({
      type: 'visual',
      value: 'left',
      label: 'Sidebar on left'
    })
  ]
};

const header = base({
  headerText: 'Header',
  type: 'static',
  draggable: false,
  location: { id: 'header', index: 0 },
  fields: [
    field({ type: 'text', label: 'Name', ref: 'name' }),
    field({ type: 'text', label: 'Title', ref: 'title' }),
    field({ type: 'text', label: 'Other', ref: 'other' })
  ]
});

const profile = base({
  headerText: 'Profile',
  type: 'static',
  draggable: false,
  location: { id: 'profile', index: 0 },
  fields: [field({ type: 'text-area', label: 'Profile', ref: 'profile' })]
});

const contact = base({
  headerText: 'Contact',
  type: 'configurable',
  draggable: true,
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
  draggable: true,
  location: { id: 'primary', index: 1 },
  fields: [
    field({ type: 'text', label: 'University', ref: 'university' }),
    field({ type: 'text', label: 'GPA', ref: 'gpa' }),
    field({ type: 'text', label: 'Degree', ref: 'degree' }),
    field({ type: 'date', label: 'Start', ref: 'start' }),
    field({ type: 'date', label: 'End', ref: 'end' }),
    field({ type: 'text', label: 'Location', red: 'location' })
  ]
});

const experience = base({
  headerText: 'Experience',
  type: 'structured',
  draggable: true,
  location: { id: 'primary', index: 2 },
  fields: [
    field({ type: 'text', label: 'Position', ref: 'position' }),
    field({ type: 'date', label: 'Start', ref: 'start' }),
    field({ type: 'date', label: 'End', ref: 'end' })
  ]
});

const skills = base({
  headerText: 'Skills',
  draggable: true,
  location: { id: 'sidebar', index: 1 },
  type: 'configurable',
  fields: []
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
