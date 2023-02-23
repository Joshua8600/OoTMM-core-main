import React from 'react';

const download = (data, name, mime) => {
  const a = document.createElement('a');
  const blob = new Blob([data], { type: mime });
  a.href = window.URL.createObjectURL(blob);
  a.download = name;
  a.click();
};

const appendHash = (str, hash, ext) => {
  if (hash) {
    return `${str}-${hash}.${ext}`;
  }
  return `${str}.${ext}`;
};

export const Result = ({ data }) => {
  const { rom, hash, log, patch } = data;
  return (
    <div>
      <button onClick={() => download(rom, appendHash('OoTMM', hash, 'z64'), 'application/octet-stream')}>Save ROM</button>
      {log && <button onClick={() => download(log, appendHash('OoTMM-Spoiler', hash, 'txt'), 'text/plain')}>Save Spoiler Log</button>}
      {patch && <button onClick={() => download(patch, appendHash('OoTMM-Patch', hash, 'ootmm'), 'application/octet-stream')}>Save Patch File</button>}
    </div>
  );
};
