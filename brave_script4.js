const audioPaths = [
  { src: '', volume: 0.2, id: 'siren' },
  { src: 'flow(original)(night).mp3', volume: 0.3, id: 'bonfire' }
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
  // ページ遷移ボタンの効果音処理 (変更なし)
  const pageNextButton = document.getElementById('nextButton1');
  const pageBackButton = document.getElementById('backButton2');
  const pageClickSound = new Audio('PC-Mouse06-1.mp3');

  if (pageNextButton) {
    pageNextButton.addEventListener('click', function() {
      pageClickSound.play();
      window.location.href = this.getAttribute('href');
    });
  }

  if (pageBackButton) {
    pageBackButton.addEventListener('click', function() {
      pageClickSound.play();
      // 戻るボタンがページ遷移の場合、進行状況の調整は不要（遷移先のページで処理される）
      window.location.href = this.getAttribute('href');
    });
  }

  // pre要素、ボタン、表示領域の取得 (変更なし)
  const preElements = document.querySelectorAll('#preContainer pre');
  const nextButtons = document.querySelectorAll('[id^="nextButton"]');
  const backButtons = document.querySelectorAll('[id^="backButton"]');
  const autoPlayButtons = document.querySelectorAll('.autoPlayButton');
  const div1 = document.querySelector('.div1');
  const div2 = document.querySelector('.div2');
  const div3 = document.querySelector('.div3');
  const div4 = document.querySelector('.div4');
  const div5 = document.querySelector('.div5');
  const div6 = document.querySelector('.div6');
  const div7 = document.querySelector('.div7');
  const div8 = document.querySelector('.div8');
  const div9 = document.querySelector('.div9');


  // 効果音の定義とボリューム設定 (変更なし)
  const clickSound1 = new Audio('meka_ge_keyborad01.mp3');
  const clickSound2 = new Audio('');

  const mainClickVolume1 = 0.2;
  const mainClickVolume2 = 0.0;

  clickSound1.volume = mainClickVolume1;
  clickSound2.volume = mainClickVolume2;




  // 📖 ページをまたぐ際のキーポイント：
// brave_index4.html のスクリプトの冒頭部分
const PREVIOUS_PAGE_LAST_INDEX = 29; // 14から29に修正
const PAGE_START_GLOBAL_INDEX = PREVIOUS_PAGE_LAST_INDEX + 1; // 15から30に修正




  // ローカルストレージから全体の進行状況を読み込む
  let storyProgress = localStorage.getItem('storyProgress');
  storyProgress = storyProgress ? parseInt(storyProgress, 10) : PAGE_START_GLOBAL_INDEX; // 初めて開く場合は15から開始

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

  // 初期表示（ローカルストレージの値がこのページの範囲内にあるかチェック）
  if (storyProgress < PAGE_START_GLOBAL_INDEX || storyProgress >= PAGE_START_GLOBAL_INDEX + preElements.length) {
     // 範囲外であれば、このページの最初の要素を表示
     storyProgress = PAGE_START_GLOBAL_INDEX;
  }
  showPre(storyProgress);

  // 表示切り替え関数
  function showPre(globalIndex) {
    // このページ内のインデックスに変換
    const pageIndex = globalIndex - PAGE_START_GLOBAL_INDEX;

    if (pageIndex < 0 || pageIndex >= preElements.length) return; // 念のためのチェック
    
    clearInterval(animationInterval);
    preElements.forEach((pre, i) => {
      pre.style.display = i === pageIndex ? 'block' : 'none';
      if (i === pageIndex && pre.querySelector('span')) {
        clickSound1.muted = false;
        startTextAnimation(pre);
      }
    });

    // div要素の表示判定 (index2.htmlのスクリプトから引き継いだ条件を適用)
    const index = globalIndex;


      // div1 (旧: >= 15)
    if (div1) div1.style.display = (index >= 30 && index < 115) || (index > 165) ? 'block' : 'none';
    
    // div2 (旧: >= 19)
    if (div2) div2.style.display = (index >= 34 && index < 49 ) || (index > 115) ? 'block' : 'none';
    
    // div3 (旧: >= 19)
    if (div3) div3.style.display = (index >= 34 && index < 115 ) || (index > 125 && index <= 130) || (index > 135) ? 'block' : 'none';
    

    // div4 (旧: >= 34)
    if (div4) div4.style.display = (index >= 49 && index < 60 ) || (index > 65 && index <= 70 ) || (index > 72 && index <= 79 ) || (index > 80 ) ? 'block' : 'none';

    
    // div5 (旧: >= 46)
    if (div5) div5.style.display = (index >= 61 && index < 62) || (index > 125 && index <= 130) || (index > 135) ? 'block' : 'none';
    
    // div6 (旧: >= 47)
    if (div6) div6.style.display = (index >= 62 && index < 63) || (index > 115 && index <= 125) ? 'block' : 'none';
    
    // div7 (旧: >= 48)
    if (div7) div7.style.display = index >= 63 && index < 64 ? 'block' : 'none';
    
    // div8 (旧: >= 56)
    if (div8) div8.style.display = (index >= 71 && index < 73 ) || (index > 79 && index <= 80) || (index > 135) ? 'block' : 'none';

    // div9 (旧: >= 97)
    if (div9) div9.style.display = index >= 112 && index < 115 ? 'block' : 'none';

    localStorage.setItem('storyProgress', globalIndex); // 現在のグローバルインデックスを保存
}




  

  // 次へ
  function nextPre() {
    if (storyProgress < PAGE_START_GLOBAL_INDEX + preElements.length - 1) {
      storyProgress++;
      showPre(storyProgress);
      playClickSound();
    } else {
      stopAutoPlay();
    }
  }

  // 前へ
  function prevPre() {
    if (storyProgress > PAGE_START_GLOBAL_INDEX) { // このページの最初の要素に戻るまで
      storyProgress--;
      showPre(storyProgress);
      playClickSound();
    } else if (storyProgress === PAGE_START_GLOBAL_INDEX) {
       // 最初の要素で「戻る」ボタンを押した場合、前のページに遷移
       const backButtonHref = preElements[0].querySelector('#backButton2').getAttribute('href');
       if (backButtonHref && backButtonHref !== '#') {
           window.location.href = backButtonHref;
       }
    }
  }

  // オート再生開始 (変更なし)
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

  // オート再生停止 (変更なし)
  function stopAutoPlay() {
    if (isAutoPlaying) {
      isAutoPlaying = false;
      autoPlayButtons.forEach(button => (button.textContent = 'オート再生'));
      clearInterval(autoPlayInterval);
      autoPlayInterval = null;
      clearInterval(animationInterval);
    }
  }

  // イベントリスナー設定 (変更なし)
  nextButtons.forEach(button => {
    button.addEventListener('click', () => {
      stopAutoPlay();
      clearInterval(animationInterval);
      nextPre();
      playClickSound();
    });
  });

  backButtons.forEach(button => {
    button.addEventListener('click', (e) => {
      // ページ遷移（aタグ）による戻るは、先にページ遷移ボタンのイベントで処理されるため、
      // ここでは内部的な「前へ」の動作のみを制御
      if (e.currentTarget.getAttribute('href') === '#') {
         stopAutoPlay();
         clearInterval(animationInterval);
         prevPre();
         playClickSound();
      }
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






