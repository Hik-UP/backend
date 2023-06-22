import create from './create.model';
import retrieve from './retrieve.model';
import update from './update.model';
import { removeParticipant } from './update.model';

const dbEvent = { create, retrieve, update, removeParticipant };

export default dbEvent;
