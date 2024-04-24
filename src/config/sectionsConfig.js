import { getStoredSectionsConfig } from '../storage';
import { templateData } from './templateData';
const uid = () =>
  `${Math.round((Math.random() * Date.now()) / Math.PI ** Math.PI)}`;

const field = ({
  label,
  type = 'text',
  value = '',
  className = '',
  content = '',
  hideLabel = false,
  removable = true,
  ...rest
} = {}) => ({
  id: uid(),
  type,
  label,
  value,
  className,
  content,
  hideLabel,
  removable,
  ...rest
});

const base = ({
  type,
  headerText,
  fields = [],
  location = { id: 'base', index: 0 },
  removable = true,
  ...rest
} = {}) => ({
  id: uid(),
  headerText,
  isSelected: false,
  fields,
  type,
  location,
  removable,
  ...(type === 'structured' && { saved: [] }),
  ...rest
});

const config = {
  id: uid(),
  headerText: 'General',
  type: 'static',
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
  fields: [
    field({
      type: 'text-area',
      label: 'Profile',
      hideLabel: true,
      ref: 'profile'
    })
  ]
});

const education = base({
  headerText: 'Education',
  type: 'structured',
  draggable: true,
  location: { id: 'primary', index: 0 },
  ref: 'edu',
  removable: false,
  fields: [
    field({
      type: 'text',
      label: 'Degree',
      ref: 'degree',
      inHeader: 'primary'
    }),
    field({
      type: 'text',
      label: 'Degree Secondary',
      ref: 'degreeSecondary',
      inHeader: 'secondary'
    }),
    field({ type: 'text', label: 'Date', ref: 'date', inHeader: 'date' }),
    field({
      type: 'text',
      label: 'University',
      ref: 'university',
      hideViewLabel: true,
      bold: true
    })
  ]
});

const experience = base({
  headerText: 'Experience',
  type: 'structured',
  draggable: true,
  location: { id: 'primary', index: 1 },
  ref: 'exp',
  removable: false,
  fields: [
    field({
      type: 'text',
      label: 'Position',
      ref: 'position',
      inHeader: 'primary'
    }),
    field({
      type: 'text',
      label: 'Employer',
      ref: 'employer',
      inHeader: 'secondary'
    }),
    field({ type: 'text', label: 'Date', ref: 'date', inHeader: 'date' })
  ]
});

const contact = base({
  headerText: 'Contact',
  type: 'configurable',
  draggable: true,
  location: { id: 'sidebar', index: 0 },
  removable: false,
  fields: []
});
const skills = base({
  headerText: 'Skills',
  draggable: true,
  location: { id: 'sidebar', index: 1 },
  type: 'configurable',
  fields: []
});
const goals = base({
  headerText: 'Goals',
  draggable: true,
  location: { id: 'sidebar', index: 2 },
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
  skills,
  goals
];

const loadTemplate = () => {
  header.fields = templateData.header;
  profile.fields = templateData.profile;
  contact.fields = templateData.contact;
  education.saved = templateData.education;
  experience.saved = templateData.experience;
  skills.fields = templateData.skills;
  goals.fields = templateData.goals;
  return [
    config,
    header,
    profile,
    contact,
    education,
    experience,
    skills,
    goals
  ];
};

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

export { getInitialSections, loadTemplate, sortSections, uid, field };
