export interface IEvent{
    id: number
    name: string
    active: boolean
    image: string | null;
    badge: "NONE" | "NEW" | "HOT";
    description:string | null
    startDate: string | null
    endDate: string | null

}