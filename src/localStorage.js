export const saveActiveEmployees = (key, activeEmployees) => {
  try {
    localStorage.setItem(key, JSON.stringify(activeEmployees));
  } catch (error) {
    console.log("Save local storage error: ", error);
  }
};

export const loadActiveEmployees = (key) => {
  try {
    const serializedState = localStorage.getItem(key);
    return serializedState === null ? [] : JSON.parse(serializedState);
  } catch (error) {
    console.log("Load error: ", error);
  }
};
