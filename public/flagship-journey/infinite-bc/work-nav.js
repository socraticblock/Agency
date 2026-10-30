/* Gate 1b / Screen 01: optional, short cinematic shortcut to the existing Work anchor.
 * The full native-scroll B -> C experience is unchanged. When View Transitions
 * are not available (or motion is reduced), the real link remains a normal anchor.
 * The Gate 1b Work target is a labeled preview; real SelectedWork belongs to Gate 3. */
(() => {
  'use strict';
  const link=document.querySelector('.opening .actions a[href="#work"]');
  const destination=document.getElementById('work');
  const journey=document.getElementById('journey');
  if(!link || !destination || !journey)return;

  const reduce=window.matchMedia('(prefers-reduced-motion: reduce)');
  let navigating=false;

  link.addEventListener('click',(event)=>{
    // Native anchors remain available for modified clicks, keyboard fallback,
    // reduced motion, static/no-JS, and browsers without View Transitions.
    if(event.defaultPrevented || event.button!==0 ||
      event.metaKey || event.ctrlKey || event.shiftKey || event.altKey ||
      reduce.matches || journey.dataset.mode!=='motion' ||
      typeof document.startViewTransition!=='function' || navigating)return;

    event.preventDefault();
    navigating=true;
    try {
      const transition=document.startViewTransition(()=>{
        // A real same-document fragment navigation keeps the URL and back/forward
        // meaningful. Repeating the click after returning to the top also works.
        if(window.location.hash!=='#work')window.location.hash='work';
        destination.scrollIntoView({behavior:'instant',block:'start'});
      });
      transition.updateCallbackDone.catch(()=>{
        // If an implementation cannot capture the destination, do not trap users.
        window.location.hash='work';
        destination.scrollIntoView({behavior:'auto',block:'start'});
      });
      transition.finished.catch(()=>{}).finally(()=>{navigating=false;});
    }catch(_error){
      navigating=false;
      window.location.hash='work';
      destination.scrollIntoView({behavior:'auto',block:'start'});
    }
  });
})();
