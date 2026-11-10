import { Request, Response } from 'express';

const communityPosts = [
  {
    id: 'P-01',
    authorName: 'Đặng Tuấn Kiệt',
    district: 'Bình Thạnh',
    tag: 'Cảnh báo',
    content: 'Cầu Bình Triệu hướng từ Thủ Đức sang Bình Thạnh xe đông nghẹt do chân cầu ngập 30cm, anh em chuyển hướng qua cầu Bình Lợi mới nhé!',
    upvotes: 42,
    commentsCount: 8,
    createdAt: new Date().toISOString()
  }
];

export class CommunityPostsController {
  public static async getAll(req: Request, res: Response) {
    return res.json(communityPosts);
  }

  public static async create(req: Request, res: Response) {
    const newPost = {
      id: `P-${Date.now()}`,
      ...req.body,
      upvotes: 1,
      commentsCount: 0,
      createdAt: new Date().toISOString()
    };
    communityPosts.unshift(newPost);
    return res.status(201).json(newPost);
  }
}
