export interface ExportSettings {
  betweenTermAndDefinition: string;
  betweenCards: string;
}

/**
 * Default export settings for a Quizlet set.
 */
const defaultExportSettings: ExportSettings = {
  betweenTermAndDefinition: '\t',
  betweenCards: '\n',
};

export function parseCards(
  text: string,
  settings: ExportSettings = defaultExportSettings,
): Card[] {
  const lines = text.split(settings.betweenCards);
  const cards: Card[] = [];
  for (const line of lines) {
    const parts = line.split(settings.betweenTermAndDefinition);
    if (parts.length === 2) {
      cards.push({ front: parts[0], back: parts[1] });
    } else {
      throw new Error(
        'Invalid card format. Expected terms and definitions separated by a tab and rows to be separated by new line.',
      );
    }
  }
  return cards;
}

export interface Card {
  front: string;
  back: string;
}
