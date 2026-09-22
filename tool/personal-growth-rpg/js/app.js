// 应用主逻辑

// 初始化应用
async function initApp() {
  // 加载游戏数据
  const loaded = await loadGameData();
  if (!loaded) {
    console.error('Failed to load game data');
    return;
  }

  // 检查是否已初始化游戏
  if (isGameInitialized()) {
    showDashboard();
  } else {
    showOnboarding();
  }
}

// 显示页面
function showScreen(screenId) {
  document.querySelectorAll('[id$="-screen"]').forEach(el => {
    el.style.display = 'none';
  });
  document.getElementById(screenId).style.display = 'block';
}

function showOnboarding() {
  showScreen('onboarding-screen');
}

function showDashboard() {
  showScreen('dashboard-screen');
  updateDashboard();
}

function showCharacter() {
  showScreen('character-screen');
  updateCharacterScreen();
}

function showProgress() {
  showScreen('progress-screen');
  updateProgressScreen();
}

function showSettings() {
  showScreen('settings-screen');
  updateSettingsScreen();
}

// 导航函数
function openCharacter() {
  showCharacter();
}

function openProgress() {
  showProgress();
}

function openSettings() {
  showSettings();
}

function backToDashboard() {
  showDashboard();
}

// 开始游戏
function startGame() {
  const name = document.getElementById('onboarding-name').value || 'Player';
  const difficulty = document.getElementById('onboarding-difficulty').value;
  const duration = parseInt(document.getElementById('onboarding-duration').value);

  startNewGame(name, 'balanced', difficulty, duration);
  showDashboard();
}

// 更新仪表板
function updateDashboard() {
  const character = getCharacter();
  const journey = getJourney();
  const profile = getProfile();
  const todayQuests = getTodayCompletedQuests();

  // 更新等级和 XP
  document.getElementById('current-day').textContent = journey.currentDay;
  document.getElementById('current-level').textContent = character.level;
  document.getElementById('xp-text').textContent = `${character.xp} / ${character.xpToNextLevel}`;
  
  const xpPercent = (character.xp / character.xpToNextLevel) * 100;
  document.getElementById('xp-progress').style.width = xpPercent + '%';

  // 更新每日消息
  const messages = [
    'Keep going.',
    'You got this.',
    'One step at a time.',
    'Progress over perfection.',
    'Every quest counts.'
  ];
  const message = messages[Math.floor(Math.random() * messages.length)];
  document.getElementById('daily-message').textContent = message;

  // 更新任务
  updateQuestsDisplay();

  // 更新属性
  updateAttributesDisplay();
}

// 更新任务显示
function updateQuestsDisplay() {
  const character = getCharacter();
  const profile = getProfile();
  const todayQuests = getTodayCompletedQuests();
  
  // 如果还没有今日任务，生成它们
  let dailyQuests = JSON.parse(sessionStorage.getItem('dailyQuests') || '[]');
  if (dailyQuests.length === 0) {
    dailyQuests = selectDailyQuests(profile.difficulty, 4);
    sessionStorage.setItem('dailyQuests', JSON.stringify(dailyQuests));
  }

  const container = document.getElementById('quests-container');
  container.innerHTML = '';

  dailyQuests.forEach(quest => {
    const isCompleted = todayQuests.some(q => q.questId === quest.id);
    const card = document.createElement('div');
    card.className = 'quest-card';
    card.style.opacity = isCompleted ? '0.6' : '1';
    card.style.pointerEvents = isCompleted ? 'none' : 'auto';

    const attrInfo = getAttributeInfo(quest.attribute);
    
    card.innerHTML = `
      <div class="quest-info">
        <div class="quest-name">${isCompleted ? '✓' : '□'} ${quest.name}</div>
        <div class="quest-meta">${quest.duration} min • ${attrInfo.name}</div>
      </div>
      <div class="quest-reward">
        <div class="quest-xp">+${quest.xp}</div>
        <div class="quest-attr">${attrInfo.icon} +${quest.attributeXp}</div>
      </div>
    `;

    if (!isCompleted) {
      card.style.cursor = 'pointer';
      card.onclick = () => completeQuestUI(quest.id);
    }

    container.appendChild(card);
  });

  // 更新进度
  document.getElementById('quest-progress').textContent = `${todayQuests.length} / ${dailyQuests.length}`;
}

// 完成任务 UI
function completeQuestUI(questId) {
  const result = completeQuest(questId);
  if (result) {
    // 显示完成动画
    showCompletionAnimation(result);
    updateDashboard();
  }
}

// 显示完成动画
function showCompletionAnimation(result) {
  const message = `+${result.xpEarned} XP\n+${result.attributeReward.value} ${result.attributeReward.name}`;
  alert(`Quest Complete!\n\n${message}`);
}

// 更新属性显示
function updateAttributesDisplay() {
  const character = getCharacter();
  const attributes = getAllAttributes();
  const container = document.getElementById('attributes-container');
  container.innerHTML = '';

  Object.entries(attributes).forEach(([key, attr]) => {
    const value = character[key];
    const div = document.createElement('div');
    div.className = 'attribute';
    div.innerHTML = `
      <span class="attribute-icon">${attr.icon}</span>
      <span class="attribute-name">${attr.name}</span>
      <span class="attribute-value">${value}</span>
    `;
    container.appendChild(div);
  });
}

// 更新角色页面
function updateCharacterScreen() {
  const character = getCharacter();
  const attributes = getAllAttributes();

  document.getElementById('char-level').textContent = character.level;
  document.getElementById('char-xp').textContent = character.xp;
  document.getElementById('char-xp-next').textContent = character.xpToNextLevel;

  const xpPercent = (character.xp / character.xpToNextLevel) * 100;
  document.getElementById('char-xp-progress').style.width = xpPercent + '%';

  const container = document.getElementById('character-attributes-container');
  container.innerHTML = '';

  Object.entries(attributes).forEach(([key, attr]) => {
    const value = character[key];
    const div = document.createElement('div');
    div.style.marginBottom = '12px';
    div.innerHTML = `
      <div style="display: flex; justify-content: space-between; margin-bottom: 4px;">
        <span>${attr.icon} ${attr.name}</span>
        <span style="font-weight: 600;">${value}</span>
      </div>
      <div class="progress-bar">
        <div class="progress-fill" style="width: ${Math.min(value, 100)}%; background-color: ${attr.color};"></div>
      </div>
    `;
    container.appendChild(div);
  });
}

// 更新进度页面
function updateProgressScreen() {
  const journey = getJourney();
  const achievements = getUnlockedAchievements();

  document.getElementById('progress-day').textContent = journey.currentDay;
  document.getElementById('progress-total').textContent = journey.totalDays;

  const journeyPercent = (journey.currentDay / journey.totalDays) * 100;
  document.getElementById('journey-progress').style.width = journeyPercent + '%';

  const container = document.getElementById('achievements-container');
  container.innerHTML = '';

  if (achievements.length === 0) {
    container.innerHTML = '<p class="text-muted">No achievements unlocked yet.</p>';
  } else {
    achievements.forEach(achievement => {
      const div = document.createElement('div');
      div.style.padding = '12px';
      div.style.backgroundColor = 'var(--bg-primary)';
      div.style.borderRadius = '8px';
      div.style.marginBottom = '8px';
      div.innerHTML = `
        <div style="font-weight: 600; margin-bottom: 4px;">${achievement.icon} ${achievement.name}</div>
        <div style="font-size: 12px; color: var(--text-muted);">${achievement.description}</div>
      `;
      container.appendChild(div);
    });
  }
}

// 更新设置页面
function updateSettingsScreen() {
  const profile = getProfile();
  const journey = getJourney();

  document.getElementById('settings-name').textContent = profile.name;
  document.getElementById('settings-difficulty').textContent = profile.difficulty.charAt(0).toUpperCase() + profile.difficulty.slice(1);
  
  const startDate = new Date(profile.createdAt).toLocaleDateString();
  document.getElementById('settings-date').textContent = startDate;
}

// 备份功能
function downloadBackup() {
  const backup = backupData();
  const blob = new Blob([backup], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `pgr-backup-${new Date().toISOString().split('T')[0]}.json`;
  a.click();
  URL.revokeObjectURL(url);
}

function uploadBackup() {
  document.getElementById('backup-file-input').click();
}

document.getElementById('backup-file-input').addEventListener('change', function(e) {
  const file = e.target.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = function(event) {
    const success = restoreBackup(event.target.result);
    if (success) {
      alert('Backup restored successfully!');
      showDashboard();
    } else {
      alert('Failed to restore backup. Invalid file format.');
    }
  };
  reader.readAsText(file);
});

function resetGame() {
  if (confirm('Are you sure? This will delete all your progress.')) {
    resetAllData();
    sessionStorage.clear();
    showOnboarding();
  }
}

// 页面加载时初始化
document.addEventListener('DOMContentLoaded', initApp);
