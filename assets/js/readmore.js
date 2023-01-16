const parentContainer = document.querySelector('.comp-overview');

parentContainer.addEventListener('click', event=>{
   const current = event.target;

   const isOverviewReadMoreBtn = current.className.includes('overview-read-more-btn');

   if(!isOverviewReadMoreBtn) return;

   const currentText = event.target.parentNode.querySelector('.overview-read-more');

   currentText.classList.toggle('overview-read-more--show');

   current.textContent = current.textContent.includes('Read More') ? "Read Less..." : "Read More...";

})