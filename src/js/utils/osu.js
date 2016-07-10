export function getModsArray(curMods) {
  const modMap = [
    ['NF', 1],
    ['EZ', 2],
    ['HD', 8],
    ['HR', 16],
    ['SD', 32],
    ['DT', 64],
    ['RX', 128],
    ['HT', 256],
    ['NC', 512], // Only set along with DoubleTime. i.e: NC only gives 576
    ['FL', 1024],
    ['AU', 2048],
    ['SO', 4096],
    ['AP', 8192],
    ['PF', 16384],
    // Where is SD?
  ];

  if (curMods & 512) {
    curMods -= 64;
  }
  if (curMods & 16384) {
    curMods -= 32;
  }

  const mods = [];
  for (let i = modMap.length - 1; i >= 0; i--) {
    const arr = modMap[i];
    const mod = arr[0];
    const val = arr[1];
    if (curMods & val) {
      mods.push(mod);
    }
  }

  mods.reverse();
  return mods;
}

export function getGameModeText(gameMode) {
  switch (gameMode) {
  case 0:
    return 'osu! Standard';
  case 1:
    return 'Taiko';
  case 2:
    return 'CatchTheBeat';
  case 3:
    return 'osu!Mania';
  default:
    throw new Error(`Unsupported game mode ${gameMode}`);
  }
}

export function getActionText(action) {
  let modsText = getModsArray(action.action_mods).join(',');
  modsText = modsText ? ` +${modsText}` : '';
  modsText += modsText ? ` (${getGameModeText(action.game_mode)})` : '';
  switch (action.action_id) {
  case 0:
    return 'Active';
  case 1:
    return 'AFK';
  case 2:
    return `Playing ${action.action_text}${modsText}`;
  case 3:
    return `Editing ${action.action_text}`;
  case 4:
    return `Modding ${action.action_text}`;
  case 5:
    return `Multiplayer ${action.action_text}${modsText}`;
  case 6:
    return `Watching ${action.action_text}${modsText}`;
  case 12:
    return `Multiplaying ${action.action_text}${modsText}`;
  case 13:
    return `osu!direct ${action.action_text}`;
  default:
    break;
  }
  return 'unknown';
}
