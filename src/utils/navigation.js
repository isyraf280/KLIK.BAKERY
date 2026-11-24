// Navigation helper — menggantikan pola berulang:
// setActiveTab(tab); window.scrollTo({ top: 0, behavior: 'smooth' });

export const navigateTo = (setActiveTab, tab) => {
  setActiveTab(tab);
  window.scrollTo({ top: 0, behavior: 'smooth' });
};
