import {NextRequest,NextResponse} from 'next/server';
import {z} from 'zod';
import {missions} from '@/lib/content';
import {approvedWords,client,dialogueSchema,limited,scripted} from '@/lib/ai';
const input=z.object({message:z.string().min(1).max(180),missionId:z.number().int().min(1).max(12)});
export async function POST(req:NextRequest){
 const ip=req.headers.get('x-forwarded-for')?.split(',')[0]||'local';if(limited(`dialogue:${ip}`))return NextResponse.json({error:'Please take a short break.'},{status:429});
 let data;try{data=input.parse(await req.json())}catch{return NextResponse.json({error:'Invalid request'},{status:400})}
 const fallback=scripted(data.missionId);const ai=client();if(!ai)return NextResponse.json(fallback);
 try{const moderation=await ai.moderations.create({model:'omni-moderation-latest',input:data.message});if(moderation.results[0]?.flagged)return NextResponse.json({...fallback,npcReply:'Hermes: Let’s keep our conversation on Greek clues.'});const mission=missions[data.missionId-1];const res=await ai.responses.create({model:process.env.OPENAI_TEXT_MODEL||'gpt-4.1-mini',input:[{role:'system',content:`You are Hermes, a witty, warm mentor for a 12–16 year-old beginner learning Modern Greek. Current mission: ${mission.title}, ${mission.focus}. Approved words only: ${approvedWords()}. Reply in one short age-appropriate Greek sentence, plus English translation and a gentle hint. Stay on the mission. Never request personal/contact details, discuss adult topics, or invite outside contact. Redirect off-topic messages to Greek learning. No unapproved grammar or new curriculum. Bounded practice only.`},{role:'user',content:data.message}],text:{format:{type:'json_schema',name:'mentor_reply',strict:true,schema:dialogueSchema}}});const parsed=JSON.parse(res.output_text);const output=z.object({npcReply:z.string().max(200),englishTranslation:z.string().max(250),vocabularyReferences:z.array(z.string()).max(8),hint:z.string().max(200),assessmentResult:z.string().max(100)}).parse(parsed);return NextResponse.json(output)}catch{return NextResponse.json(fallback)}
}
