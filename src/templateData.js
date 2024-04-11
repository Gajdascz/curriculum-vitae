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
      'Passionate Full Stack Developer committed to designing and building responsive web applications. Proficient in modern JavaScript frameworks and a strong advocate for clean, maintainable code. Adept at collaborating in team environments and delivering high-quality software solutions that exceed client expectations.'
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
    data: [
      field({
        type: 'text',
        label: 'Degree',
        ref: 'degree',
        value: 'A.S. Information Technology'
      }),
      field({
        type: 'text',
        label: 'Degree Secondary',
        ref: 'degreeSecondary',
        value: 'Mathematics and Engineering Focus'
      }),
      field({
        type: 'text',
        label: 'University',
        ref: 'university',
        value: 'A School'
      }),

      field({
        type: 'month',
        label: 'Start',
        ref: 'start',
        value: '1996'
      }),
      field({ type: 'month', label: 'End', ref: 'end', value: '2020' }),
      field({
        type: 'text',
        label: 'Location',
        ref: 'location',
        value: 'A Place'
      }),
      field({
        type: 'text',
        label: 'GPA',
        value: '4.0'
      }),
      field({
        type: 'text-area',
        label: '',
        value:
          'Learned a lot about learning about learning a lot about learning a lot about learning a lot.'
      }),
      field({
        type: 'list',
        label: 'Achievements',
        value: `Manga Cum Laude\nDean's List Every Attended Semester`
      })
    ]
  },
  {
    id: uid(),
    index: 1,
    data: [
      field({
        type: 'text',
        label: 'Degree',
        ref: 'degree',
        value: 'B.S. Information Technology'
      }),
      field({
        type: 'text',
        label: 'University',
        ref: 'university',
        value: 'A School'
      }),

      field({
        type: 'month',
        label: 'Start',
        ref: 'start',
        value: '1996'
      }),
      field({ type: 'month', label: 'End', ref: 'end', value: '2020' }),
      field({
        type: 'text',
        label: 'Location',
        ref: 'location',
        value: 'A Place'
      })
    ]
  },
  {
    id: uid(),
    index: 2,
    data: [
      field({
        type: 'text',
        label: 'Degree',
        ref: 'degree',
        value: 'M.S. Information Technology'
      }),
      field({
        type: 'text',
        label: 'University',
        ref: 'university',
        value: 'A School'
      }),

      field({
        type: 'month',
        label: 'Start',
        ref: 'start',
        value: '1996'
      }),
      field({ type: 'month', label: 'End', ref: 'end', value: '2020' }),
      field({
        type: 'text',
        label: 'Location',
        ref: 'location',
        value: 'A Place'
      })
    ]
  }
];

const experienceData = [
  {
    id: uid(),
    index: 0,
    data: [
      field({
        type: 'text',
        label: 'Position',
        ref: 'position',
        value: 'Worker'
      }),
      field({
        type: 'month',
        label: 'Start',
        ref: 'start',
        value: '2020-02'
      }),
      field({ type: 'month', label: 'End', ref: 'end', value: '2020-03' })
    ]
  },
  {
    id: uid(),
    index: 0,
    data: [
      field({
        type: 'text',
        label: 'Position',
        ref: 'position',
        value: 'Worker'
      }),
      field({
        type: 'month',
        label: 'Start',
        ref: 'start',
        value: '2020-02'
      }),
      field({ type: 'month', label: 'End', ref: 'end', value: '2020-03' })
    ]
  }
];

const skillsData = [
  field({ type: 'text', value: 'HTML Engineer' }),
  field({ type: 'text', value: 'CSS Aficionado' }),
  field({ type: 'text', value: 'JS Pro' }),
  field({ type: 'text', value: 'Part-time Magician' })
];

const templateData = {
  header: headerData,
  profile: profileData,
  contact: contactData,
  education: educationData,
  experience: experienceData,
  skills: skillsData
};

export { templateData };
