import { Publisher, Subjects, TicketCreatedEvent } from "@rmm811tickets/common";

export class TicketCreatedPublisher extends Publisher<TicketCreatedEvent>{

subject: Subjects.TicketCreated = Subjects.TicketCreated;

}