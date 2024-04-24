# Curriculum Vitae Builder

This repository hosts my Curriculum Vitae Builder application, [a project assigned by The Odin Project](https://www.theodinproject.com/lessons/node-path-react-new-cv-application). This interactive tool enables users to dynamically create and customize their CVs, showcasing the practical application of my React skills, as developed through The Odin Project’s coursework. This project provided an opportunity to reinforce fundamental concepts and independently explore advanced features.

## Learning Outcomes

The [lessons leading up to this project](https://www.theodinproject.com/paths/full-stack-javascript/courses/react) offered a solid foundation in the JavaScript React library. Throughout this project, I acquired fundamental skills and gained practical experience in several key areas:

- **React Basics and Environment Setup**: Established a development environment using the Vite React config toolchain and structured applications with React components.
- **JavaScript XML (JSX)**: Developed a deeper understanding of JSX syntax and best practices, including dynamic rendering techniques such as utilizing arrays and conditional expressions to create more interactive interfaces.
- **Efficient Data Handling**: Understood the critical role of React Keys in efficient rendering and state management, and how they facilitate reconciliation processes during component updates.
- **Data Flow and State Management**: Achieved a comprehensive understanding of React's unidirectional data flow from parent to child components and state management using React hooks, covering aspects like state updates, immutability concerns, and strategies for managing both controlled and uncontrolled components.

In addition to the curriculum, I self-taught and applied the following:

- **React Contexts and Providers**: Implemented React contexts to manage a centralized state across various components, reducing the need for extensive prop-drilling.
- **Optimization with useRef**: Used the useRef hook to manage interim state changes, effectively reducing unnecessary re-renders by buffering local updates before committing them to the application’s central state.
- **JavaScript Drag Events**: Explored JavaScript's native drag events (dragstart, dragover, drop) and React's synthetic events (onDragStart, onDragOver, onDrop) to enable dynamic re-ordering of CV sections and fields.

## Features

- **Responsive Design**: The application adapts to different screen sizes providing a consistent experience across mobile, tablet, and desktop devices.
- **Data Persistence**: Utilizes JavaScript's Local Storage to retain user inputs across sessions.
- **Highly Customizable**: Users can not only create, remove, and reorder custom fields and sections but also adjust the CV's layout, accent color, and font.
- **Intuitive and Consistent Interface**: User-friendly design with consistent navigation elements and visual cues.
- **Interactive**: The application includes responsive elements such as draggable components and clickable buttons providing an intuitive experience.
- **Highly Accessible Color Scheme**: Offers both light and dark color palettes, each providing a high contrast ratio of over 7.0.
- **Printable**: Provides styling for printing the CV View.

## Guide

### Header Buttons

- **Light Bulb**: Toggle between dark and light themes.
- **Question Mark**: Access help and guidelines, such as this section.

### Utility Buttons

- **Save**: Saves all current input data to local storage.
- **Clear**: Clears all input from the application and deletes data from local storage.
- **Print**: Opens the browser's print interface to print the CV.
- **Template**: Loads example data into the application to demonstrate typical usage.

### CV Editors

- **General**: Editors are organized into sections, each containing multiple subsections for detailed customization of your CV.
- **Opening/Closing Editors**: Click the subsection header (marked with a downward-pointing chevron) to open an editor. Click again or open another editor to close.
- **Reordering**: Use the drag handle (marked by a 2x3 dot grid) to rearrange subsections and fields within the same section. A dashed border appears around potential drop locations during dragging. (The drag handle must be over the target's drag handle to register).
- **Deleting Items**: Remove custom subsections or fields using the delete button (marked with an 'X') on the right-hand side.
- **Adding Custom Subsections**: Enter a name in the 'Subsection Header' input field and click the '+' button to add.
- **Types of Inputs**: Configure your CV using text, text-area, or list inputs. List inputs treat each line as a separate item.
- **Creating Custom Fields**: In the 'Add Field' section, select a field type, provide a label (optional), and input a value.
- **Applying Changes**: Click 'Apply' or 'Add/Update' after configuring to update the CV view.

### CV View

- **Overview**: Displays your input styled according to your settings.
- **Customization**: Customize the view in the editors by rearranging, adding, or removing information as needed.

## Challenges

During the development of the CV Builder, I encountered several challenges related to state management across components, a fundamental aspect of building a robust React application. Here’s how I addressed some of these issues:

- **Centralized State Management with React Context**: As the application's complexity increased, it became clear that most components required access to a shared data pool. My solution was to implement a central app context to streamline interactions between the editors and the view. This approach ensured that changes in one component were consistently and reliably updated across the application.

- **Interim Buffering with useRef**: Individual fields within the editors had their own state, leading to various user interface issues and potential performance loss from frequent re-renders. By using the useRef hook, I directly referenced input fields and maintained their interim state during live updates. This reduced unnecessary re-renders and maintained input focus which improved the user interface responsiveness and overall application performance.

These challenges gave me practice and improved my skills in designing and managing state in React applications. I developed a clearer understanding of how to handle state complexities and ensure smooth interactions across various components.

## Created With

- **JavaScript**: Core language.
- **HTML5**: DOM structuring.
- **CSS3**: Design and styling.
- **React**: Front-end JavaScript library.
- **Vite**: Build tool for faster development and optimized builds (React config).
- **Git**: Version control and source code management.
- **Prettier**: Code formatter to enforce consistency.
- **ESLint Config Prettier**: Turns off conflicting and/or unnecessary ESLint rules for Prettier.
- **GitHub**: Remote repository hosting.

## Potential Improvements

- **Mobile Drag and Drop**: Implement drag and drop functionality for mobile devices.
- **Alternative Re-ordering Methods**: Introduce alternative methods for re-ordering sections, such as arrow buttons or keyboard shortcuts.
- **Improve Custom Text Rendering and Styling in CV-View**: Provide more options for styling and displaying text in the CV-View.
- **Enhanced Accessibility**: Improve input labels, ARIA attributes, and ensure keyboard navigability throughout the application.
- **Code Commenting and Clean-Up**: Conduct a review of the codebase to add comments and remove redundant code.
