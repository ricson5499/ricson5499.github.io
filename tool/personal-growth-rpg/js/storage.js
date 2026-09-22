// LocalStorage 管理工具

const STORAGE_KEYS = {
  PROFILE: 'pgr_profile',
  CHARACTER: 'pgr_character',
  DAILY_LOG: 'pgr_daily_log',
  JOURNEY: 'pgr_journey',
  ACHIEVEMENTS: 'pgr_achievements'
};

// 初始化用户档案
function initializeProfile(name = 'Player', goal = 'balanced', difficulty = 'normal') {
  const profile = {
    name,
    goal,
    difficulty,
    createdAt: new Date().toISOString()
  };
  localStorage.setItem(STORAGE_KEYS.PROFILE, JSON.stringify(profile));
  return profile;
}

// 初始化角色
function initializeCharacter() {
  const character = {
    level: 1,
    xp: 0,
    xpToNextLevel: 100,
    body: 0,
    mind: 0,
    rest: 0,
    fuel: 0,
    connection: 0,
    purpose: 0
  };
  localStorage.setItem(STORAGE_KEYS.CHARACTER, JSON.stringify(character));
  return character;
}

// 初始化旅程
function initializeJourney(journeyDays = 14) {
  const journey = {
    currentDay: 1,
    totalDays: journeyDays,
    startDate: new Date().toISOString(),
    status: 'active'
  };
  localStorage.setItem(STORAGE_KEYS.JOURNEY, JSON.stringify(journey));
  return journey;
}

// 初始化成就
function initializeAchievements() {
  const achievements = {};
  localStorage.setItem(STORAGE_KEYS.ACHIEVEMENTS, JSON.stringify(achievements));
  return achievements;
}

// 初始化日志
function initializeDailyLog() {
  const dailyLog = {};
  localStorage.setItem(STORAGE_KEYS.DAILY_LOG, JSON.stringify(dailyLog));
  return dailyLog;
}

// 获取用户档案
function getProfile() {
  const data = localStorage.getItem(STORAGE_KEYS.PROFILE);
  return data ? JSON.parse(data) : null;
}

// 获取角色
function getCharacter() {
  const data = localStorage.getItem(STORAGE_KEYS.CHARACTER);
  return data ? JSON.parse(data) : null;
}

// 获取旅程
function getJourney() {
  const data = localStorage.getItem(STORAGE_KEYS.JOURNEY);
  return data ? JSON.parse(data) : null;
}

// 获取成就
function getAchievements() {
  const data = localStorage.getItem(STORAGE_KEYS.ACHIEVEMENTS);
  return data ? JSON.parse(data) : null;
}

// 获取日志
function getDailyLog() {
  const data = localStorage.getItem(STORAGE_KEYS.DAILY_LOG);
  return data ? JSON.parse(data) : null;
}

// 更新角色属性
function updateCharacterAttribute(attribute, value) {
  const character = getCharacter();
  if (character) {
    character[attribute] = Math.max(0, character[attribute] + value);
    localStorage.setItem(STORAGE_KEYS.CHARACTER, JSON.stringify(character));
  }
  return character;
}

// 增加 XP
function addXP(amount) {
  const character = getCharacter();
  if (character) {
    character.xp += amount;
    
    // 检查是否升级
    while (character.xp >= character.xpToNextLevel) {
      character.xp -= character.xpToNextLevel;
      character.level += 1;
      character.xpToNextLevel = Math.floor(character.xpToNextLevel * 1.1);
    }
    
    localStorage.setItem(STORAGE_KEYS.CHARACTER, JSON.stringify(character));
  }
  return character;
}

// 记录每日任务完成
function logDailyQuestCompletion(questId, questName, xpEarned, attributeRewards) {
  const today = new Date().toISOString().split('T')[0];
  const dailyLog = getDailyLog();
  
  if (!dailyLog[today]) {
    dailyLog[today] = [];
  }
  
  dailyLog[today].push({
    questId,
    questName,
    xpEarned,
    attributeRewards,
    completedAt: new Date().toISOString()
  });
  
  localStorage.setItem(STORAGE_KEYS.DAILY_LOG, JSON.stringify(dailyLog));
  return dailyLog;
}

// 获取今日完成的任务
function getTodayCompletedQuests() {
  const today = new Date().toISOString().split('T')[0];
  const dailyLog = getDailyLog();
  return dailyLog[today] || [];
}

// 备份所有数据
function backupData() {
  const backup = {
    profile: getProfile(),
    character: getCharacter(),
    journey: getJourney(),
    achievements: getAchievements(),
    dailyLog: getDailyLog(),
    backupDate: new Date().toISOString()
  };
  return JSON.stringify(backup, null, 2);
}

// 恢复备份数据
function restoreBackup(backupJson) {
  try {
    const backup = JSON.parse(backupJson);
    
    if (backup.profile) localStorage.setItem(STORAGE_KEYS.PROFILE, JSON.stringify(backup.profile));
    if (backup.character) localStorage.setItem(STORAGE_KEYS.CHARACTER, JSON.stringify(backup.character));
    if (backup.journey) localStorage.setItem(STORAGE_KEYS.JOURNEY, JSON.stringify(backup.journey));
    if (backup.achievements) localStorage.setItem(STORAGE_KEYS.ACHIEVEMENTS, JSON.stringify(backup.achievements));
    if (backup.dailyLog) localStorage.setItem(STORAGE_KEYS.DAILY_LOG, JSON.stringify(backup.dailyLog));
    
    return true;
  } catch (error) {
    console.error('Failed to restore backup:', error);
    return false;
  }
}

// 重置所有数据
function resetAllData() {
  Object.values(STORAGE_KEYS).forEach(key => {
    localStorage.removeItem(key);
  });
}

// 初始化新游戏
function startNewGame(name = 'Player', goal = 'balanced', difficulty = 'normal', journeyDays = 14) {
  resetAllData();
  initializeProfile(name, goal, difficulty);
  initializeCharacter();
  initializeJourney(journeyDays);
  initializeAchievements();
  initializeDailyLog();
}

// 检查是否已初始化
function isGameInitialized() {
  return getProfile() !== null && getCharacter() !== null;
}
