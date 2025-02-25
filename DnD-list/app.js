const list = document.querySelector('.list');
const items = [...document.querySelectorAll('.item')];
let currentItem = null;
let targetItem = null;
let cloneItem = null;
let offsetX = null;
let offsetY = null;

function grabItem(e) {
 if (e.target.nodeName === 'LI') {
  targetItem = e.target;
 }
 if (currentItem) {
  cloneItem.setAttribute(
   'style',
   `position: absolute; left: ${e.clientX - offsetX}px; top: ${
    e.clientY - offsetY + window.scrollY
   }px; border-bottom: 1px solid #000; pointer-events: none; opacity: 0.5;`
  );
 }
}

window.addEventListener('mousedown', (e) => {
 const listParam = list.getBoundingClientRect();
 currentItem = e.target.nodeName === 'LI' ? e.target : null;
 if (currentItem) {
  let currentItemParams = currentItem.getBoundingClientRect();
  cloneItem = currentItem.cloneNode(true);
  cloneItem.style.display = 'none';
  list.append(cloneItem);
  offsetY = listParam.top + e.clientY - currentItemParams.top;
  offsetX = listParam.left + e.clientX - currentItemParams.left;
  window.addEventListener('mousemove', grabItem);
 }
});

window.addEventListener('mouseup', (e) => {
 if (targetItem) {
  const dir =
   e.clientY >
   targetItem.getBoundingClientRect().top +
    targetItem.getBoundingClientRect().height / 2;
  dir
   ? list.insertBefore(currentItem, targetItem.nextSibling)
   : list.insertBefore(currentItem, targetItem);
 }
 if (currentItem) {
  currentItem.setAttribute('style', '');
  window.removeEventListener('mousemove', grabItem);
 }
 cloneItem.remove();
 targetItem = null;
 currentItem = null;
});
