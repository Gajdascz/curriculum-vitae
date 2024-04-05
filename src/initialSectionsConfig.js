import { getStoredSectionsConfig } from './storage';

const uid = () =>
  `${Math.round((Math.random() * Date.now()) / Math.PI ** Math.PI)}`;

const config = {
  id: uid(),
  headerText: 'General',
  type: 'static',
  index: -1,
  isSelected: false,
  fields: [
    {
      id: uid(),
      type: 'color',
      label: 'Accent Color',
      value: '#add8e6'
    },
    {
      id: uid(),
      type: 'visual',
      label: 'Font',
      value: 'times-new-roman'
    },
    { id: uid(), type: 'visual', label: 'Layout', value: 'top-right' }
  ]
};

const field = ({ label, type = 'text', value = '' } = {}) => ({
  id: uid(),
  type,
  label,
  value
});

const base = ({ headerText, fields = [], type } = {}) => ({
  id: uid(),
  headerText,
  isSelected: false,
  fields,
  type,
  ...(type === 'structured' && { saved: [] })
});

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
    field({ type: 'text', label: 'Address' })
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
    field({ type: 'text-area', label: 'Relevant Courses' }),
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
