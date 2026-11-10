export interface AlertEvaluationResult {
  triggered: boolean;
  level: 1 | 2 | 3 | 0;
  reason: string;
  affectedBasin: string;
}

export class WeatherAlertEngine {
  private static threshold1 = 1.40;
  private static threshold2 = 1.50;
  private static threshold3 = 1.60;
  private static rainExtremeMm = 60.0;

  public static evaluateStationReading(waterLevelM: number, rainfallMm: number, basinName: string): AlertEvaluationResult {
    if (waterLevelM >= this.threshold3 || rainfallMm >= this.rainExtremeMm) {
      return {
        triggered: true,
        level: 3,
        reason: `Mực nước triều (${waterLevelM}m) vượt ngưỡng Báo Động 3 hoặc lượng mưa cực đoan (${rainfallMm}mm/h)`,
        affectedBasin: basinName
      };
    }

    if (waterLevelM >= this.threshold2) {
      return {
        triggered: true,
        level: 2,
        reason: `Mực nước triều (${waterLevelM}m) vượt ngưỡng Báo Động 2`,
        affectedBasin: basinName
      };
    }

    if (waterLevelM >= this.threshold1) {
      return {
        triggered: true,
        level: 1,
        reason: `Mực nước triều (${waterLevelM}m) chạm ngưỡng Báo Động 1`,
        affectedBasin: basinName
      };
    }

    return {
      triggered: false,
      level: 0,
      reason: 'Mực nước ở ngưỡng an toàn bình thường',
      affectedBasin: basinName
    };
  }
}
