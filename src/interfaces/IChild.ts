import { ChildStatus, Gender } from "@/types/child";

export interface Child {
    id: string;
    name: string;
    age: number;
    gender: Gender;
    status: ChildStatus;
    photo?: string;
    enrollmentDate: string;
}