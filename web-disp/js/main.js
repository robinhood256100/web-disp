document.addEventListener('DOMContentLoaded', ()=>{
  const grid = document.getElementById('gallery');
  const modal = document.getElementById('modal');
  const modalVideo = document.getElementById('modalVideo');
  const closeBtn = document.getElementById('modal-close');

  grid.addEventListener('click', e=>{
    const card = e.target.closest('.card');
    if(!card) return;
    const high = card.dataset.high;
    openModal(high);
  });

  function openModal(highSrc){
    modal.classList.add('open');
    modal.setAttribute('aria-hidden','false');
    modalVideo.pause();
    modalVideo.removeAttribute('src');
    while(modalVideo.firstChild) modalVideo.removeChild(modalVideo.firstChild);
    const s = document.createElement('source');
    s.src = highSrc;
    s.type = 'video/webm';
    modalVideo.appendChild(s);
    modalVideo.load();
    modalVideo.play().catch(()=>{ /* autoplay blocked */ });
  }

  function closeModal(){
    modal.classList.remove('open');
    modal.setAttribute('aria-hidden','true');
    modalVideo.pause();
    modalVideo.removeAttribute('src');
    modalVideo.innerHTML = '';
  }

  closeBtn.addEventListener('click', closeModal);
  modal.addEventListener('click', (e)=>{ if(e.target===modal) closeModal(); });
});
