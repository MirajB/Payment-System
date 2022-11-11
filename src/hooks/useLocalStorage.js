import { useCallback, useState } from 'react';

const useLocalStorage = (key) => {
  const [value, setValue] = useState(localStorage.getItem(key));
  const setItem = useCallback(
    (newValue) => {
      console.log('here', key);
      try {
        if (newValue) {
          console.log('here as well');
          localStorage.setItem(key, newValue);
        } else {
          localStorage.removeItem(key);
        }
        setValue(newValue);
      } catch (err) {
        console.error(
          `Error setting setting value for local storage key [${key}]`,
          err
        );
      }
    },
    [key]
  );
  return { setItem, value };
};

export default useLocalStorage;
