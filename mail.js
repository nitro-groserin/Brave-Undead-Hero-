const audioPaths = [
  { src: '', volume: 0.2, id: 'siren' },
  { src: '/sound-box/勇者のオルゴール(KR).mp3', volume: 1.0, id: 'bonfire' }
];

const audioElements = {};

audioPaths.forEach(path => {
  audioElements[path.id] = new Audio(path.src);
  audioElements[path.id].volume = path.volume;
  audioElements[path.id].loop = true; // ★ ループ再生を有効にする
});

document.addEventListener('click', () => {
  // クリック時に両方の音を再生する
  audioElements['siren'].play();
  audioElements['bonfire'].play();
});

// ended イベントリスナーは、ループ再生が有効になっている場合は通常必要ありません。
// (必要に応じて、ループの開始時や終了時などに処理を行いたい場合に利用します)
// audioElements['siren'].addEventListener('ended', () => {
//   console.log('サイレンの再生が終了しました');
// });

// audioElements['bonfire'].addEventListener('ended', () => {
//   console.log('焚き火の再生が終了しました');
// });




