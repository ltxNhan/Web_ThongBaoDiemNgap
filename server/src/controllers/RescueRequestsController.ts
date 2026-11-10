import { Request, Response } from 'express';

const rescueRequests = [
  {
    id: 'SOS-001',
    citizenName: 'Lê Hoàng Minh',
    phone: '0909112233',
    address: 'Hẻm 48 Bình Quới, Phường 28',
    district: 'Bình Thạnh',
    needType: 'Xuồng cứu sinh',
    peopleCount: 4,
    status: 'pending',
    createdAt: new Date().toISOString()
  }
];

export class RescueRequestsController {
  public static async getAll(req: Request, res: Response) {
    return res.json(rescueRequests);
  }

  public static async submit(req: Request, res: Response) {
    const newRequest = {
      id: `SOS-${Date.now()}`,
      ...req.body,
      status: 'pending',
      createdAt: new Date().toISOString()
    };
    rescueRequests.unshift(newRequest);
    return res.status(201).json({ success: true, id: newRequest.id });
  }

  public static async dispatch(req: Request, res: Response) {
    const { id } = req.params;
    const { unitName } = req.body;
    const reqItem = rescueRequests.find((r) => r.id === id);
    if (reqItem) {
      reqItem.status = 'dispatched';
      (reqItem as any).assignedUnit = unitName;
    }
    return res.json({ success: true, id, assignedUnit: unitName });
  }
}
