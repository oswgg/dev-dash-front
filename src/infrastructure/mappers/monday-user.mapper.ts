import { MondayUser } from "@/domain/entities/monday-user.entity";




export class MondayUserMapper {
    static fromObjectToEntity(entity: any): MondayUser {
        const { id, name, photo } = entity;

        if (!id) throw new Error("Invalid entity");
        if (!name) throw new Error("Invalid entity");
        if (!photo) throw new Error("Invalid entity");

        return {
            id,
            name,
            photo,
        };
    }
}