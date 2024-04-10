const storeSectionData = (sectionsObjArr) => {
  sectionsObjArr.forEach((sectionObj) =>
    localStorage.setItem(sectionObj.id, JSON.stringify(sectionObj))
  );
};

const getStoredSectionsConfig = () => {
  const sections = [];
  for (let i = 0; i < localStorage.length; i++)
    sections.push(JSON.parse(localStorage.getItem(localStorage.key(i))));
  return sections;
};

export { storeSectionData, getStoredSectionsConfig };
