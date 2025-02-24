const list = document.querySelector('.list');
const items = [...document.querySelectorAll('.item')];
const listParam = list.getBoundingClientRect();
let currentItem = null;
let targetItem = null;
let offsetX = null;
let offsetY = null;

function grabItem(e) {
 if (currentItem) {
  currentItem.setAttribute(
   'style',
   `position: absolute; left: ${e.clientX - offsetX}px; top: ${
    e.clientY - offsetY
   }px; border-bottom: 1px solid #000; pointer-events: none; opacity: 0.5;`
  );
 }
}

window.addEventListener('mousedown', (e) => {
 currentItem = items.find((el) => el === e.target);
 if (currentItem) {
  offsetY = listParam.top + e.clientY - currentItem.getBoundingClientRect().top;
  offsetX =
   listParam.left + e.clientX - currentItem.getBoundingClientRect().left;
  window.addEventListener('mousemove', grabItem);
 }
});

window.addEventListener('mouseup', (e) => {
 targetItem = items.find((el) => el === e.target);
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
  currentItem = null;
 }
});
