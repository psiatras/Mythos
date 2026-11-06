import OpenAI from 'openai';
import {missions,vocabulary} from './content';
const hits=new Map<string,{count:number;until:number}>();
export function limited(key:string,max=12){const now=Date.now();const h=hits.get(key);if(!h||h.until<now){hits.set(key,{count:1,until:now+60000});return false}h.count++;return h.count>max}
export function client(){const apiKey=process.env.MYTHOS_OPENAI_API_KEY||process.env.OPENAI_API_KEY;return apiKey?new OpenAI({apiKey,timeout:12000,maxRetries:0}):null}
export const dialogueSchema={type:'object',additionalProperties:false,required:['npcReply','englishTranslation','vocabularyReferences','hint','assessmentResult'],properties:{npcReply:{type:'string'},englishTranslation:{type:'string'},vocabularyReferences:{type:'array',items:{type:'string'}},hint:{type:'string'},assessmentResult:{type:'string'}}} as const;
export function scripted(missionId:number){const m=missions[missionId-1]||missions[0];const first=m.challenges[0];return {npcReply:`Hermes: Look for “${first.greek||first.answer}”.`,englishTranslation:first.hint,vocabularyReferences:first.greek?[first.greek]:[],hint:first.hint,assessmentResult:'practice'};}
export function approvedWords(){return vocabulary.map(v=>`${v.greek} (${v.english})`).join(', ')}
