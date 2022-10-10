// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';



const { Room, ChatMessage } = initSchema(schema);

export {
  Room,
  ChatMessage
};