import { UserModel } from './user.model';
export interface DeliveryModel{
    id?: number,
    user_id?: number,
    calification?: string,
    description?: string,
    placa?: string,
    vehicle?:string,
}