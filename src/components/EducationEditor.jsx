import { useState } from 'react';
import EditorSection from './EditorSection';

export default function EducationEditor() {
  const [sections, setSections] = useState([
    {
      id: 'edu-0',
      fields: [
        { id: 'uni-0', type: 'text', label: 'University', value: '' },
        { id: 'loc-0', type: 'text', label: 'Location', value: '' },
        { id: 'deg-0', type: 'text', label: 'Degree', value: '' },
        { id: 'grad-0', type: 'text', label: 'Graduation', value: '' },
        {
          id: 'courses-0',
          type: 'text-area',
          label: 'Relevant Courses',
          value: ''
        },
        { id: 'achvs-0', type: 'text' }
      ]
    }
  ]);

  return <EditorSection className="education-editor" headerText="Education" />;
}
