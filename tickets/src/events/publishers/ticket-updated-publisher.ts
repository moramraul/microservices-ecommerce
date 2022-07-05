import { Publisher, Subjects, TicketUpdatedEvent } from "@rmm811tickets/common";

export class TicketUpdatedPublisher extends Publisher<TicketUpdatedEvent>{

subject: Subjects.TickedUpdated = Subjects.TickedUpdated;

}