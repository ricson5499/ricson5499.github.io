// 游戏逻辑工具

let tasksData = [];
let attributesData = {};
let achievementsData = [];

// 加载数据
async function loadGameData() {
  try {
    const [tasksRes, attributesRes, achievementsRes] = await Promise.all([
      fetch('./data/tasks.json'),
      fetch('./data/attributes.json'),
      fetch('./data/achievements.json')
    ]);
    
    tasksData = await tasksRes.json();
    attributesData = await attributesRes.json();
    achievementsData = await achievementsRes.json();
    
    return true;
  } catch (error) {
    console.error('Failed to load game data:', error);
    return false;
  }
}

// 根据难度选择每日任务
function selectDailyQuests(difficulty = 'normal', count = 4) {
  if (tasksData.length === 0) return [];
  
  const difficultyMap = {
    easy: [1],
    normal: [1, 2],
    hard: [2, 3]
  };
  
  const allowedDifficulties = difficultyMap[difficulty] || [1, 2];
  const filtered = tasksData.filter(task => allowedDifficulties.includes(task.difficulty));
  
  // 随机选择
  const selected = [];
  const shuffled = [...filtered].sort(() => Math.random() - 0.5);
  
  for (let i = 0; i < count && i < shuffled.length; i++) {
    selected.push(shuffled[i]);
  }
  
  return selected;
}

// 完成任务
function completeQuest(questId) {
  const quest = tasksData.find(q => q.id === questId);
  if (!quest) return null;
  
  const character = getCharacter();
  const profile = getProfile();
  
  // 增加 XP
  addXP(quest.xp);
  
  // 增加属性
  updateCharacterAttribute(quest.attribute, quest.attributeXp);
  
  // 记录日志
  logDailyQuestCompletion(quest.id, quest.name, quest.xp, {
    [quest.attribute]: quest.attributeXp
  });
  
  // 检查成就
  checkAchievements();
  
  return {
    questName: quest.name,
    xpEarned: quest.xp,
    attributeReward: {
      name: quest.attribute,
      value: quest.attributeXp
    }
  };
}

// 检查成就
function checkAchievements() {
  const character = getCharacter();
  const journey = getJourney();
  const todayQuests = getTodayCompletedQuests();
  const achievements = getAchievements();
  
  const checks = {
    firstQuestComplete: () => todayQuests.length >= 1,
    streak7: () => {
      // 简化版：检查最近 7 天是否都有完成任务
      const dailyLog = getDailyLog();
      let streak = 0;
      const today = new Date();
      
      for (let i = 0; i < 7; i++) {
        const date = new Date(today);
        date.setDate(date.getDate() - i);
        const dateStr = date.toISOString().split('T')[0];
        if (dailyLog[dateStr] && dailyLog[dateStr].length > 0) {
          streak++;
        } else {
          break;
        }
      }
      return streak >= 7;
    },
    day7: () => journey.currentDay >= 7,
    level5: () => character.level >= 5,
    allAttributes50: () => {
      const attrs = ['body', 'mind', 'rest', 'fuel', 'connection', 'purpose'];
      return attrs.every(attr => character[attr] >= 50);
    },
    day30: () => journey.currentDay >= 30,
    day66: () => journey.currentDay >= 66,
    perfectDay: () => {
      // 假设每天应该有 4 个任务
      return todayQuests.length >= 4;
    }
  };
  
  achievementsData.forEach(achievement => {
    if (!achievements[achievement.id] && checks[achievement.condition]) {
      if (checks[achievement.condition]()) {
        achievements[achievement.id] = {
          unlockedAt: new Date().toISOString()
        };
      }
    }
  });
  
  localStorage.setItem(STORAGE_KEYS.ACHIEVEMENTS, JSON.stringify(achievements));
}

// 获取属性信息
function getAttributeInfo(attributeKey) {
  return attributesData[attributeKey] || null;
}

// 获取所有属性
function getAllAttributes() {
  return attributesData;
}

// 获取成就信息
function getAchievementInfo(achievementId) {
  return achievementsData.find(a => a.id === achievementId) || null;
}

// 获取已解锁的成就
function getUnlockedAchievements() {
  const achievements = getAchievements();
  return Object.keys(achievements).map(id => getAchievementInfo(parseInt(id)));
}

// 计算进度百分比
function getProgressPercentage() {
  const character = getCharacter();
  if (!character) return 0;
  
  const nextLevelXp = character.xpToNextLevel;
  const currentXp = character.xp;
  return Math.floor((currentXp / nextLevelXp) * 100);
}

// 获取角色等级信息
function getLevelInfo() {
  const character = getCharacter();
  return {
    level: character.level,
    xp: character.xp,
    xpToNextLevel: character.xpToNextLevel,
    progressPercentage: getProgressPercentage()
  };
}

// 获取旅程进度
function getJourneyProgress() {
  const journey = getJourney();
  if (!journey) return 0;
  
  return Math.floor((journey.currentDay / journey.totalDays) * 100);
}

// 推进到下一天
function advanceDay() {
  const journey = getJourney();
  if (journey && journey.currentDay < journey.totalDays) {
    journey.currentDay += 1;
    if (journey.currentDay >= journey.totalDays) {
      journey.status = 'completed';
    }
    localStorage.setItem(STORAGE_KEYS.JOURNEY, JSON.stringify(journey));
  }
  return journey;
}
