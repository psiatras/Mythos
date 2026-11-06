import {describe,it,expect,vi} from 'vitest';
import {missions,vocabulary,source} from '../lib/content';
import {missionSchema} from '../lib/types';
import {available,complete,evaluate,fresh,load,nextMission,save,schedule,STORE} from '../lib/progress';
import {scripted} from '../lib/ai';

describe('curriculum and progression',()=>{
 it('validates every mission and keeps a reachable completion path',()=>{expect(missions).toHaveLength(12);let p=fresh();for(let id=1;id<=12;id++){const m=missionSchema.parse(missions[id-1]);expect(available(p,id)).toBe(true);expect(m.challenges.length).toBeGreaterThan(1);for(const c of m.challenges){expect(c.answer).toBeTruthy();if(c.kind==='build'){const joined=c.options.join(c.answer.includes(' ')?' ':'');expect([...joined.replaceAll(' ','')].sort()).toEqual([...c.answer.replaceAll(' ','')].sort())}else if(c.kind!=='speak')expect(c.options).toContain(c.answer)}p=complete(p,id,m.challenges.map(c=>c.skill),m.challenges.map(c=>c.vocabId||''));expect(p.completed).toContain(id);if(id<12)expect(nextMission(p)).toBe(id+1)}expect(p.inventory).toHaveLength(12);expect(p.xp).toBeGreaterThan(600)});
 it('enforces prerequisites and avoids duplicate rewards',()=>{const p=fresh();expect(available(p,2)).toBe(false);expect(complete(p,2,[],[])).toEqual(p);const once=complete(p,1,['alphabet'],['ναι']);expect(complete(once,1,['alphabet'],['ναι'])).toEqual(once)});
 it('evaluates Greek Unicode without losing accents',()=>{expect(evaluate(missions[0].challenges[2],'ΝΑΙ')).toBe(true);expect(evaluate(missions[2].challenges[0],'οχι')).toBe(false);expect(evaluate(missions[2].challenges[0],'όχι')).toBe(true)});
 it('schedules later review after success and sooner after a mistake',()=>{const now=1000;const first=schedule(undefined,true,now);const later=schedule(first,true,now);const missed=schedule(later,false,now);expect(later.due).toBeGreaterThan(first.due);expect(missed.due).toBeLessThan(later.due)});
 it('has complete attribution metadata and review flags',()=>{expect(source.url).toMatch(/^https:/);expect(source.attributionUrl).toContain('history');expect(source.licence).toBe('CC BY-SA 4.0');for(const v of vocabulary){expect(v.greek.normalize('NFC')).toBe(v.greek);expect(v.sourceReference).toBeTruthy();expect(v.reviewStatus).toBe('seed-review')}});
 it('persists and restores anonymous progress',()=>{const data=new Map<string,string>();const storage={getItem:(k:string)=>data.get(k)||null,setItem:(k:string,v:string)=>data.set(k,v)};vi.stubGlobal('window',{localStorage:storage});vi.stubGlobal('localStorage',storage);const p=complete(fresh(),1,['alphabet'],['ναι']);save(p);expect(data.has(STORE)).toBe(true);expect(load().completed).toEqual([1]);expect(load().xp).toBe(p.xp);vi.unstubAllGlobals()});
 it('offers a bounded scripted AI fallback',()=>{const reply=scripted(4);expect(reply.npcReply).toContain('Hermes');expect(reply.hint.length).toBeGreaterThan(0);expect(reply.vocabularyReferences.length).toBeGreaterThan(0)});
});
