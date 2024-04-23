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
const headerData = [
  field({ type: 'text', label: 'Name', ref: 'name', value: 'Person Cool' }),
  field({
    type: 'text',
    label: 'Title',
    ref: 'title',
    value: 'Full Stack Developer'
  }),
  field({ type: 'text', label: 'Other', ref: 'other' })
];

const profileData = [
  field({
    type: 'text-area',
    label: 'Profile',
    ref: 'profile',
    value:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas volutpat est sagittis, tincidunt quam ut, pretium augue. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Pellentesque vel tristique nisi. Sed vulputate lacus sem, ut sagittis nulla viverra quis. Suspendisse vestibulum ultrices nibh, vel sodales tortor semper eu. Fusce quam orci, suscipit et euismod a, porta molestie turpis. Sed convallis neque suscipit, fringilla leo vel, dapibus ante. '
  })
];

const contactData = [
  field({ type: 'email', label: 'Email', value: 'person_cool@gmahoo.biz' }),
  field({ type: 'tel', label: 'Phone', value: '555-555-5555' }),
  field({ type: 'text', label: 'Area', value: 'Cartesian Corner, [0,0]' }),
  field({ type: 'text', label: 'Website', value: 'example.com' })
];

const educationData = [
  {
    id: uid(),
    index: 0,
    removable: true,
    data: [
      field({
        type: 'text',
        label: 'Degree',
        ref: 'degree',
        value: 'B.S. Information Technology',
        inHeader: 'primary'
      }),
      field({
        type: 'text',
        label: 'Degree Secondary',
        ref: 'degreeSecondary',
        value: 'Engineering/Mathematics Focus',
        inHeader: 'secondary'
      }),
      field({
        type: 'text',
        label: 'Date',
        ref: 'date',
        value: '2020-2022',
        inHeader: 'date'
      }),
      field({
        type: 'text',
        label: 'University',
        ref: 'university',
        value: 'State University - City, XY',
        hideViewLabel: true,
        bold: true
      }),

      field({
        type: 'text',
        label: 'GPA',
        value: '3.8, Magna Cum Laude Honors'
      }),
      field({
        type: 'list',
        value: `achievement/additional important info
achievement/additional important info
achievement/additional important info
`
      })
    ]
  },
  {
    id: uid(),
    index: 1,
    removable: true,
    data: [
      field({
        type: 'text',
        label: 'Degree',
        ref: 'degree',
        value: 'A.S. Engineering Science',
        inHeader: 'primary'
      }),
      field({
        type: 'text',
        label: 'Degree Secondary',
        ref: 'degreeSecondary',
        value: 'Computer/Electrical Focus',
        inHeader: 'secondary'
      }),
      field({
        type: 'text',
        label: 'Date',
        ref: 'date',
        value: '2018-2020',
        inHeader: 'date'
      }),
      field({
        type: 'text',
        label: 'University',
        ref: 'university',
        value: 'Community College - City, ZX',
        hideViewLabel: true,
        bold: true
      }),

      field({
        type: 'text',
        label: 'GPA',
        value: '3.5, Magna Cum Laude Honors'
      }),
      field({
        type: 'list',
        value: `achievement/additional important info
achievement/additional important info
achievement/additional important info
`
      })
    ]
  }
];

const experienceData = [
  {
    id: uid(),
    index: 0,
    removable: true,
    data: [
      field({
        type: 'text',
        label: 'Position',
        ref: 'position',
        value: 'Software Engineer',
        inHeader: 'primary'
      }),
      field({
        type: 'text',
        label: 'Date',
        ref: 'date',
        value: '2020-2022',
        inHeader: 'date'
      }),
      field({
        type: 'text',
        label: 'Employer',
        ref: 'employer',
        value: 'SoftwareEngineerEnterprises',
        inHeader: 'secondary'
      }),
      field({
        type: 'text-area',
        value:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas volutpat est sagittis, tincidunt quam ut, pretium augue.'
      })
    ]
  },
  {
    id: uid(),
    index: 1,
    removable: true,
    data: [
      field({
        type: 'text',
        label: 'Position',
        ref: 'position',
        value: 'Jr. Developer',
        inHeader: 'primary'
      }),
      field({
        type: 'text',
        label: 'Date',
        ref: 'date',
        value: '2020-2022',
        inHeader: 'date'
      }),
      field({
        type: 'text',
        label: 'Employer',
        ref: 'employer',
        value: 'WebDevelopersLLC',
        inHeader: 'secondary'
      }),
      field({
        type: 'text-area',
        value:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas volutpat est sagittis, tincidunt quam ut, pretium augue.'
      })
    ]
  }
];

const skillsData = [
  field({
    type: 'list',
    value: 'HTML Engineer\nCSS Aficionado\nJS Pro\nPart Time Magician'
  })
];

const goals = [
  field({
    type: 'list',
    value: `Improve goals
    Be best
    Learn everything
    `
  })
];

const templateData = {
  header: headerData,
  profile: profileData,
  contact: contactData,
  education: educationData,
  experience: experienceData,
  skills: skillsData,
  goals: goals
};

export { templateData };
