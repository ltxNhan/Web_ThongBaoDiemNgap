import { Request, Response } from 'express';

export class ForecastsController {
  public static async getHourlyRain(req: Request, res: Response) {
    const hourly = [
      { hour: '06:00', mm: 12 },
      { hour: '09:00', mm: 25 },
      { hour: '12:00', mm: 48 },
      { hour: '15:00', mm: 95 },
      { hour: '18:00', mm: 82 },
      { hour: '21:00', mm: 35 },
      { hour: '00:00', mm: 10 }
    ];
    return res.json(hourly);
  }

  public static async getTideWave(req: Request, res: Response) {
    const wave = [
      { time: '00:00', tideM: 0.85 },
      { time: '06:00', tideM: 1.10 },
      { time: '12:00', tideM: 0.95 },
      { time: '17:30', tideM: 1.74 },
      { time: '23:59', tideM: 1.20 }
    ];
    return res.json(wave);
  }
}
