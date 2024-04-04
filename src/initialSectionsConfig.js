const uid = () =>
  `${Math.round((Math.random() * Date.now()) / Math.PI ** Math.PI)}`;

const header = {
  id: uid(),
  headerText: 'Header',
  index: 0,
  isSelected: false,
  fields: [
    { id: uid(), type: 'text', label: 'Name', value: 'Name' },
    { id: uid(), type: 'text', label: 'Title', value: 'Title' }
  ]
};

const contact = {
  id: uid(),
  headerText: 'Contact',
  index: 1,
  isSelected: false,
  fields: [
    { id: uid(), type: 'email', label: 'Email', value: 'Email' },
    { id: uid(), type: 'tel', label: 'Phone', value: 'Phone' },
    { id: uid(), type: 'text', label: 'Address', value: 'Address' }
  ]
};

const profile = {
  id: uid(),
  headerText: 'Profile',
  index: 2,
  isSelected: false,
  fields: [
    {
      id: uid(),
      type: 'text-area',
      label: 'Profile',
      value: 'Short description of yourself.'
    },
    { id: uid(), type: 'checkbox', label: 'Emphasize First Word' }
  ]
};

const education = {
  id: uid(),
  headerText: 'Education',
  index: 3,
  isSelected: false,
  fields: [
    { id: uid(), type: 'text', label: 'University', value: '' },
    { id: uid(), type: 'number', label: 'GPA', value: '' },
    { id: uid(), type: 'text', label: 'Degree', value: '' },
    { id: uid(), type: 'date', label: 'Start', value: '' },
    { id: uid(), type: 'date', label: 'End', value: '' },
    { id: uid(), type: 'text', label: 'Location', value: '' },
    {
      id: uid(),
      type: 'text-area',
      label: 'Relevant Courses',
      value: ''
    },
    {
      id: uid(),
      type: 'text-area',
      label: 'Achievements',
      value: 'Achievement'
    }
  ]
};
const skills = {
  id: uid(),
  headerText: 'Skills',
  index: 4,
  isSelected: false,
  fields: [{ id: uid(), type: 'text', label: 'Skill', value: '' }]
};
const experience = {
  id: uid(),
  headerText: 'Experience',
  index: 5,
  isSelected: false,
  fields: [
    { id: uid(), type: 'text', label: 'Position', value: '' },
    { id: uid(), type: 'date', label: 'Start', value: '' },
    { id: uid(), type: 'date', label: 'End', value: '' },
    { id: uid(), type: 'text-area', label: 'Description', value: '' }
  ]
};

const getInitialSections = () => [
  header,
  contact,
  profile,
  education,
  skills,
  experience
];

export { getInitialSections, uid };
