export interface IQuery {
  _id: { $in: any[]; };
  title?: { $regex: string; $options: string };
}