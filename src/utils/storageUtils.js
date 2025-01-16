export const saveOption = (changedSetting) => {
  chrome.storage.sync.set({ [changedSetting.name]: changedSetting.value });
};

export const restoreAllOptions = () => {
  chrome.storage.sync.get({ defaultColorType: 'test' }, (items) => {
    return items;
  });
};

export const restoreOption = (optionName) => {
  return new Promise((resolve, reject) => {
    chrome.storage.sync.get([optionName], (res) => {
      if (chrome.runtime.lastError) {
        reject(chrome.runtime.lastError);
      } else {
        let value = res[optionName];
        while (
          typeof value === 'object' &&
          value !== null &&
          value[optionName]
        ) {
          value = value[optionName];
        }

        resolve(value);
      }
    });
  });
};
