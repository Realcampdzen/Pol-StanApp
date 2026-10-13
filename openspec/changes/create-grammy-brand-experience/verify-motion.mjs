import assert from 'node:assert/strict';
import { writeFile, rename, readFile, mkdir } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import path from 'node:path';
const { chromium } = await import(process.env.PLAYWRIGHT_MODULE || 'playwright');
const evidence = fileURLToPath(new URL('./evidence/',import.meta.url));
const qaMedia=process.env.POLSTAN_QA_MEDIA_DIR;
if(qaMedia) await mkdir(qaMedia,{recursive:true});
const saveShot=async(page,options)=>{if(qaMedia)await page.screenshot({...options,path:path.join(qaMedia,path.basename(options.path))});};
const base = process.env.POLSTAN_QA_URL || 'http://127.0.0.1:3107';
const report = {date:new Date().toISOString(),base,passed:false,journeys:[],errors:[]};
report.buildId=(await readFile(new URL('../../../.next/BUILD_ID',import.meta.url),'utf8')).trim();
const browser = await chromium.launch({headless:true,executablePath:process.env.CHROME_PATH});
try {
 for(const [device,width,height] of [['desktop',1440,900],['mobile',390,844]]) {
  const context = await browser.newContext({viewport:{width,height},serviceWorkers:'block',...(qaMedia?{recordVideo:{dir:qaMedia,size:{width,height}}}:{})});
  const page = await context.newPage();
  page.on('pageerror',e=>report.errors.push(e.message));
  const samples=[];
  await page.goto(`${base}/ru`,{waitUntil:'domcontentloaded'});
  await page.waitForFunction(()=>document.querySelector('.brand-experience')?.dataset.motion==='active');
  for(const delay of [30,550,1500]) {
   await page.waitForTimeout(delay);
   samples.push(await page.locator('.hero-name-line').first().evaluate(e=>({transform:getComputedStyle(e).transform,opacity:getComputedStyle(e).opacity})));
  }
  assert.ok(new Set(samples.map(s=>s.transform)).size>=2,'Opening must visibly change name position');
  await page.waitForFunction(()=>document.querySelector('.brand-hero')?.dataset.intro==='complete');
  await saveShot(page, {path:path.join(evidence,`rebuild-hero-${device}.png`)});
  const milestones=new Set();
  const phases=[];
  const mediaPhases=[];
  const captionPhases=[];
  let lastY=-1,stall=0;
  for(let i=0;i<260;i++) {
   await page.mouse.wheel(0,125);
   await page.waitForTimeout(230);
   const state=await page.evaluate(()=>{
    const headings=[...document.querySelectorAll('main h2')];
    const visible=headings.filter(h=>{const r=h.getBoundingClientRect();return r.top<innerHeight*.75 && r.bottom>90}).map(h=>h.id);
    const line=document.querySelector('#grammy-title .motion-line');
    const stage=document.querySelector('.press-stage');
    const track=document.querySelector('.press-track');
    const motionState=(selector)=>{const e=document.querySelector(selector),s=getComputedStyle(e),r=e.getBoundingClientRect();return {transform:s.transform,opacity:Number(s.opacity),clip:s.clipPath,top:r.top,bottom:r.bottom};};
    return {y:scrollY,end:scrollY+innerHeight>=document.documentElement.scrollHeight-3,visible,line:line?getComputedStyle(line).transform:null,media:motionState('.album-art'),caption:motionState('.album-meta'),track:getComputedStyle(track).transform,stage:stage.getBoundingClientRect().top,progress:getComputedStyle(document.querySelector('.reading-progress span')).transform};
   });
   if(state.line) phases.push({y:state.y,line:state.line});
   for(const [key,values] of [['media',mediaPhases],['caption',captionPhases]]) {
    const next={y:state.y,...state[key]};
    const previous=values.at(-1);
    if(!previous || ['transform','opacity','clip'].some(property=>next[property]!==previous[property])) values.push(next);
   }
   for(const id of state.visible) if(!milestones.has(id)) {
    milestones.add(id);
    // Stop briefly after the mask has opened, as a reader would.
    if(['grammy-title','press-title','live-title','story-title','contact-title'].includes(id)) {
     await page.waitForTimeout(550);
     await saveShot(page, {path:path.join(evidence,`rebuild-${id}-${device}.png`)});
    }
   }
   if(state.end) break;
   if(state.y===lastY)stall++;else stall=0;
   assert.ok(stall<12,'Scroll must advance');lastY=state.y;
  }
  await page.waitForTimeout(1300);
  await saveShot(page, {path:path.join(evidence,`rebuild-finale-${device}.png`)});
  const final=await page.evaluate(()=>({atEnd:scrollY+innerHeight>=document.documentElement.scrollHeight-3,progress:getComputedStyle(document.querySelector('.reading-progress span')).transform,pinned:document.querySelectorAll('.pin-spacer').length,headings:[...document.querySelectorAll('main h2')].map(h=>({id:h.id,label:h.getAttribute('aria-label')||h.textContent}))}));
  assert.equal(final.atEnd,true);
  assert.ok(milestones.has('grammy-title')&&milestones.has('press-title')&&milestones.has('live-title')&&milestones.has('story-title')&&milestones.has('contact-title'));
  assert.equal(final.pinned>0,device==='desktop');
  assert.ok(phases.length>1 && new Set(phases.map(p=>p.line)).size>1,'Heading must reveal through multiple scroll phases');
  assert.ok(mediaPhases.length>=3 && new Set(mediaPhases.map(p=>p.clip)).size>=3,'Album media must have a distinct covered, opening and settled phase');
  assert.ok(captionPhases.some(p=>p.opacity<.1)&&captionPhases.some(p=>p.opacity>.15&&p.opacity<.95)&&captionPhases.at(-1).opacity>.99,'Captions must visibly arrive and become fully readable');
  assert.ok(final.progress.startsWith('matrix(1,'),'Reading progress must complete');
  const video=page.video();await context.close();if(video)await rename(await video.path(),path.join(qaMedia,`rebuild-scroll-${device}.webm`));
  // Regression probes use a separate context so the recording remains one clean journey.
  const probeContext=await browser.newContext({viewport:{width,height},serviceWorkers:'block'});
  const probe=await probeContext.newPage();
  probe.on('pageerror',e=>report.errors.push(e.message));
  await probe.goto(`${base}/ru`,{waitUntil:'domcontentloaded'});
  await probe.waitForFunction(()=>document.querySelector('.brand-hero')?.dataset.intro==='complete');
  await probe.evaluate(()=>scrollTo({top:document.documentElement.scrollHeight,behavior:'instant'}));await probe.waitForTimeout(1000);
  await probe.locator('.footer-top').click();await probe.waitForTimeout(1500);
  await probe.evaluate(()=>scrollTo({top:document.querySelector('#contact').offsetTop-80,behavior:'instant'}));await probe.waitForTimeout(1200);
  const contact=await probe.locator('#contact-title .motion-line').first().evaluate(e=>({transform:getComputedStyle(e).transform,opacity:Number(getComputedStyle(e).opacity)}));
  assert.ok(contact.opacity>.8);
  let keyboardReel = null;
  if(device==='desktop') {
   const links=probe.locator('.press-track a');
   await links.first().focus();await probe.waitForTimeout(450);
   keyboardReel=[];
   for(let i=0;i<await links.count();i++) {
    if(i){await probe.keyboard.press('Tab');await probe.waitForTimeout(350);}
    const focused=await probe.evaluate(()=>{const e=document.activeElement,r=e.getBoundingClientRect(),stage=document.querySelector('.press-stage').getBoundingClientRect();return {href:e.getAttribute('href'),x:r.left,right:r.right,y:r.top,bottom:r.bottom,stageLeft:stage.left,stageRight:stage.right,scrollLeft:document.querySelector('.press-stage').scrollLeft};});
    assert.ok(focused.x>=focused.stageLeft-2 && focused.right<=focused.stageRight+2,'Keyboard focus must reveal every publication link');
    assert.ok(focused.y>=80 && focused.bottom<=height,'Focused publication link must fit beneath navigation');
    assert.equal(focused.scrollLeft,0);keyboardReel.push(focused);
   }
  }
  // Dynamic preference changes must dismantle pinning and restore original text.
  await probe.emulateMedia({reducedMotion:'reduce'});await probe.waitForTimeout(300);
  assert.equal(await probe.locator('.pin-spacer').count(),0);
  assert.equal(await probe.locator('.motion-line').count(),0);
  assert.equal(await probe.locator('video').evaluate(v=>v.paused),true);
  report.journeys.push({device,width,height,samples,phases,mediaPhases,captionPhases,milestones:[...milestones],final,fastAnchor:contact,keyboardReel,reducedCleanup:true});
  await probeContext.close();
  console.log(`PASS ${device}: continuous scroll, opening/reading/ending, fast anchor and preference cleanup`);
 }
 assert.deepEqual(report.errors,[]);report.passed=true;
} finally {await browser.close();await writeFile(path.join(evidence,'rebuild-motion.json'),JSON.stringify(report,null,2)+'\n');}
