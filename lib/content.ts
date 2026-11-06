import {missionSchema, type Challenge, type Mission, type VocabularyEntry, type ContentSource} from './types';

const q=(kind:Challenge['kind'],prompt:string,answer:string,options:string[],skill:string,greek?:string,hint='Look closely at the Greek clue.'):Challenge=>({kind,prompt,answer,options,skill,greek,hint,explanation:`${greek||answer} — ${answer}`,vocabId:greek});
const m=(id:number,title:string,location:Mission['location'],focus:string,story:string,npc:string,challenges:Challenge[],reward:string):Mission=>({id,title,location,focus,story,npc,challenges,reward,objective:`Solve ${challenges.length} language clues to continue the search.`});
export const missions:Mission[]=[
 m(1,'The Strange Message','plaka','First Greek letters','A glowing mark appears on a Plaka wall. Nyx hears it whisper.','Nyx',[
  q('choice','Tap the Greek letter that sounds like “a”.','Α',['Α','Β','Γ'],'alphabet','Α'),q('match','The inscription shows Μ. Which sound unlocks it?','m',['n','m','s'],'alphabet','Μ'),q('build','Arrange the letters to reveal the word for “yes”.','ναι',['ι','ν','α'],'reading','ναι')],'Inscription shard'),
 m(2,'The Encrypted Sign','plaka','Letters and sounds','Hermes spots a shop sign that changes when nobody watches.','Hermes',[
  q('match','Which Greek letter makes the “p” sound?','Π',['Π','Ρ','Τ'],'alphabet','Π'),q('choice','What does ΝΑΙ mean?','yes',['no','yes','hello'],'reading','ναι')],'Courier seal'),
 m(3,'The Letter Keeper','plaka','Reading a short word','A tiny guardian guards a painted doorway.','Letter Keeper',[
  q('build','Build the Greek word for “no”.','όχι',['χ','ι','ό'],'reading','όχι'),q('choice','Which word means “no”?','όχι',['ναι','όχι','γεια'],'reading','όχι')],'Doorway glyph'),
 m(4,'The Messenger','plaka','Greetings','A cyclist brakes beside you. His delivery bag glows gold.','Hermes',[
  q('choice','Hermes says “Γεια σου!” Choose a friendly reply.','Γεια σου!',['Αντίο!','Γεια σου!','Όχι.'],'greetings','γεια σου'),q('listen','Listen to the greeting. What does it mean?','hello',['thank you','hello','goodbye'],'listening','Γεια σου!')],'First conversation badge'),
 m(5,"What’s Your Name?",'plaka','Introductions','Hermes needs a name to write on a magical parcel. A nickname will do.','Hermes',[
  q('choice','“Πώς σε λένε;” asks…','What is your name?',['Where are you?','What is your name?','How much?'],'introductions','Πώς σε λένε;'),q('build','Build “My name is...”','Με λένε',['λένε','Με'],'introductions','Με λένε')],'Courier tag'),
 m(6,'The Hidden Passage','plaka','Simple questions','A café owner knows where the last courier vanished.','Eleni',[
  q('choice','Ask “Where is it?”','Πού είναι;',['Τι είναι;','Πού είναι;','Πόσο κάνει;'],'questions','Πού είναι;'),{...q('speak','Say or type “thank you” to Eleni.','ευχαριστώ',[],'speaking','Ευχαριστώ'),acceptedAnswers:['Ευχαριστώ πολύ']}],'Hidden doorway'),
 m(7,'The Missing Coins','monastiraki','Numbers 1–10','Magical coins are rolling through Monastiraki market.','Nikos',[
  q('find','Nikos asks for τρία coins. Choose the matching pile.','3',['2','3','5'],'numbers','τρία'),q('match','What is “five” in Greek?','πέντε',['δύο','πέντε','δέκα'],'numbers','πέντε')],'Bronze coin'),
 m(8,'The Enchanted Market','monastiraki','Colours and objects','Nyx sees a blue charm hidden among ordinary goods.','Nyx',[
  q('find','Find the μπλε object.','Blue vase',['Red scarf','Blue vase','Green olive'],'colours','μπλε'),q('match','What colour is κόκκινο?','red',['blue','green','red'],'colours','κόκκινο')],'Blue charm'),
 m(9,'The Market Trader','monastiraki','Simple transactions','A trader has a map with a suspiciously ancient watermark.','Dimitra',[
  q('choice','Ask “How much does it cost?”','Πόσο κάνει;',['Πού είναι;','Πόσο κάνει;','Γεια σου!'],'questions','Πόσο κάνει;'),q('choice','The trader says “Δύο ευρώ.” What price?','2 euros',['2 euros','5 euros','10 euros'],'numbers','Δύο ευρώ')],'Market map'),
 m(10,'The Temple Message','acropolis','Listening comprehension','A message echoes near the Acropolis. The magical chamber is fictional; the landmark is real.','Athena’s echo',[
  q('listen','Listen: “Πού είναι το κλειδί;” What is being asked?','Where is the key?',['Where is the key?','What is your name?','How much?'],'listening','Πού είναι το κλειδί;'),q('match','What is κλειδί?','key',['coin','key','door'],'objects','κλειδί')],'Owl token'),
 m(11,'The Ancient Gate','acropolis','Cumulative review','The gate opens only for someone who can read, ask, and answer.','Hermes',[
  q('build','Build “Where is the key?”','Πού είναι το κλειδί;',['κλειδί;','είναι','Πού','το'],'sentences','Πού είναι το κλειδί;'),q('choice','Choose the word for “yes”.','ναι',['όχι','ναι','πέντε'],'reading','ναι'),q('match','Which word means blue?','μπλε',['κόκκινο','μπλε','πράσινο'],'colours','μπλε')],'Gate sigil'),
 m(12,"The Guardian’s Challenge",'acropolis','Beginner mastery','The guardian asks for proof that the fragment is in safe hands.','Guardian',[
  q('listen','Listen: “Γεια σου!” What did the guardian say?','hello',['hello','goodbye','thank you'],'listening','Γεια σου!'),q('choice','Reply to “Πώς σε λένε;”','Με λένε…',['Πού είναι;','Με λένε…','Δέκα.'],'introductions','Με λένε…'),q('build','Build the phrase for “thank you”.','ευχαριστώ',['τώ','ευχαρισ'],'speaking','ευχαριστώ'),q('choice','How many is τρία?','3',['1','3','10'],'numbers','τρία')],'Lexicon fragment')
].map(x=>missionSchema.parse(x));

export const locations=[{id:'plaka',name:'Plaka',description:'Lantern-lit lanes, cafés and a wall that remembers letters.',unlockMission:1},{id:'monastiraki',name:'Monastiraki',description:'A vibrant market with coins, colour and curious bargains.',unlockMission:7},{id:'acropolis',name:'Acropolis',description:'A real landmark overlooking Athens, with a fictional magical mystery.',unlockMission:10}] as const;
export const vocabulary:VocabularyEntry[]=[
 ['ναι','yes','yes','reading'],['όχι','no','óchi','reading'],['γεια σου','hello','yá sou','greetings'],['ευχαριστώ','thank you','efcharistó','speaking'],['Πώς σε λένε;','What is your name?','pós se léne','introductions'],['Με λένε','My name is','me léne','introductions'],['Πού είναι;','Where is it?','poú íne','questions'],['Πόσο κάνει;','How much does it cost?','póso káni','questions'],['τρία','three','tría','numbers'],['πέντε','five','pénte','numbers'],['μπλε','blue','ble','colours'],['κόκκινο','red','kókkino','colours'],['κλειδί','key','klidí','objects']
].map(([greek,english,transliteration,skill])=>({id:greek,greek,english,transliteration,partOfSpeech:'phrase or word',skillTags:[skill],sourceReference:'wikibooks-modern-greek',reviewStatus:'seed-review'}));
export const source:ContentSource={title:'Modern Greek — Wikibooks',url:'https://en.wikibooks.org/wiki/Modern_Greek',attributionUrl:'https://en.wikibooks.org/w/index.php?title=Modern_Greek&action=history',licence:'CC BY-SA 4.0',adapted:true,adaptationNotes:'Locally authored beginner challenge prompts and selected vocabulary inspired by the source; educator review required. Imported page revisions, when available, are recorded separately.'};
