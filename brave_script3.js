const audioPaths = [
  { src: '', volume: 0.2, id: 'siren' },
  { src: '/sound-box/flow(original)(night).mp3', volume: 1.0, id: 'bonfire' }
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








document.addEventListener('DOMContentLoaded', function() {
  const pageNextButton = document.getElementById('nextButton1');
  const pageBackButton = document.getElementById('backButton2');
  const pageClickSound = new Audio('/sound-box/PC-Mouse06-1.mp3');

  if (pageNextButton) {
    pageNextButton.addEventListener('click', function() {
      pageClickSound.play();
      window.location.href = this.getAttribute('href');
    });
  }

  if (pageBackButton) {
    pageBackButton.addEventListener('click', function() {
      pageClickSound.play();
      window.location.href = this.getAttribute('href');
    });
  }

  const preElements = document.querySelectorAll('#preContainer pre');
  const nextButtons = document.querySelectorAll('[id^="nextButton"]');
  const backButtons = document.querySelectorAll('[id^="backButton"]');
  const autoPlayButtons = document.querySelectorAll('.autoPlayButton');
  const div2 = document.querySelector('.div2');
  const div3 = document.querySelector('.div3');
  const div6 = document.querySelector('.div6');

  const clickSound1 = new Audio('/sound-box/meka_ge_keyborad01.mp3');
  const clickSound2 = new Audio('');

  const mainClickVolume1 = 0.2;
  const mainClickVolume2 = 0.0;

  clickSound1.volume = mainClickVolume1;
  clickSound2.volume = mainClickVolume2;

  // ローカルストレージから進行状況を読み込み
  let storyProgress = localStorage.getItem('storyProgress') ? parseInt(localStorage.getItem('storyProgress')) : 0;

  let autoPlayInterval = null;
  let isAutoPlaying = false;
  let animationInterval;

  function playClickSound() {
    clickSound1.currentTime = 0;
    clickSound1.play();
    clickSound2.currentTime = 0;
    clickSound2.play();
  }

  function startTextAnimation(preElement) {
    const textSpan = preElement.querySelector('span');
    if (!textSpan) return;
    const text = textSpan.textContent.trim();
    let index = 0;
    textSpan.textContent = "";
    textSpan.style.display = "inline";
    clearInterval(animationInterval);
    animationInterval = setInterval(() => {
      if (index < text.length) {
        textSpan.textContent += text[index];
        index++;
      } else {
        clearInterval(animationInterval);
        clickSound1.muted = true;
      }
    }, 100);
  }

  // 初期表示
  showPre(storyProgress);

  // 表示切り替え関数
  function showPre(index) {
    if (index < 0 || index >= preElements.length) return;
    clearInterval(animationInterval);
    preElements.forEach((pre, i) => {
      pre.style.display = i === index ? 'block' : 'none';
      if (i === index && pre.querySelector('span')) {
        clickSound1.muted = false;
        startTextAnimation(pre);
      }
    });
    if (div2) div2.style.display = (index >= 1 && index < 38) || (index > 99) ? 'block' : 'none';
    if (div3) div3.style.display = index >= 80 && index <= 98 ? 'block' : 'none';
    if (div6) div6.style.display = index >= 80 && index <= 99 ? 'block' : 'none';
    if (div3) div3.style.display = index >= 80 && index <= 100 ? 'block' : 'none';
  }

  // 次へ
  function nextPre() {
    if (storyProgress < preElements.length - 1) {
      storyProgress++;
      showPre(storyProgress);
      playClickSound();
      localStorage.setItem('storyProgress', storyProgress); // 進行状況を保存
    } else {
      stopAutoPlay();
    }
  }

  // 前へ
  function prevPre() {
    if (storyProgress > 0) {
      storyProgress--;
      showPre(storyProgress);
      playClickSound();
      localStorage.setItem('storyProgress', storyProgress); // 進行状況を保存
    }
  }

  // オート再生開始
  function startAutoPlay() {
    if (!isAutoPlaying) {
      isAutoPlaying = true;
      autoPlayButtons.forEach(button => (button.textContent = '停止'));
      clearInterval(animationInterval);
      autoPlayInterval = setInterval(() => {
        nextPre();
        playClickSound();
      }, 6000);
    }
  }

  // オート再生停止
  function stopAutoPlay() {
    if (isAutoPlaying) {
      isAutoPlaying = false;
      autoPlayButtons.forEach(button => (button.textContent = 'オート再生'));
      clearInterval(autoPlayInterval);
      autoPlayInterval = null;
      clearInterval(animationInterval);
    }
  }

  // イベントリスナー設定
  nextButtons.forEach(button => {
    button.addEventListener('click', () => {
      stopAutoPlay();
      clearInterval(animationInterval);
      nextPre();
      playClickSound();
    });
  });

  backButtons.forEach(button => {
    button.addEventListener('click', () => {
      stopAutoPlay();
      clearInterval(animationInterval);
      prevPre();
      playClickSound();
    });
  });

  autoPlayButtons.forEach(button => {
    button.addEventListener('click', () => {
      clearInterval(animationInterval);
      if (isAutoPlaying) {
        stopAutoPlay();
        playClickSound();
      } else {
        startAutoPlay();
        playClickSound();
      }
    });
  });
});





