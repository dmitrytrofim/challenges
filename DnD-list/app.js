const list = document.querySelector('.list');
const items = [...document.querySelectorAll('.item')];
const item = {
 current: null,
 target: null,
 clone: null,
};
const offset = {
 x: null,
 y: null,
};
const scrollParams = {
 start: 0,
 finish: null,
};

function grabItem(e) {
 if (e.target.nodeName === 'LI') {
  item.target = e.target;
 }
 if (item.current) {
  item.clone.setAttribute(
   'style',
   `position: absolute; left: ${e.clientX - offset.x}px; top: ${
    e.clientY - offset.y + scrollParams.finish
   }px; border-bottom: 1px solid #000; pointer-events: none; opacity: 0.5;`
  );
 }
}

function getScrollOffset() {
 scrollParams.finish = window.scrollY - scrollParams.start;
}

window.addEventListener('mousedown', (e) => {
 scrollParams.start = window.scrollY;
 const listParam = list.getBoundingClientRect();
 item.current = e.target.nodeName === 'LI' ? e.target : null;
 if (item.current) {
  let currentItemParams = item.current.getBoundingClientRect();
  item.clone = item.current.cloneNode(true);
  item.clone.style.display = 'none';
  list.append(item.clone);
  offset.y = listParam.top + e.clientY - currentItemParams.top;
  offset.x = listParam.left + e.clientX - currentItemParams.left;
  window.addEventListener('mousemove', grabItem);
  window.addEventListener('scroll', getScrollOffset);
 }
});

window.addEventListener('mouseup', (e) => {
 if (item.target) {
  const dir =
   e.clientY >
   item.target.getBoundingClientRect().top +
    item.target.getBoundingClientRect().height / 2;
  dir
   ? list.insertBefore(item.current, item.target.nextSibling)
   : list.insertBefore(item.current, item.target);
 }
 if (item.current) {
  item.current.setAttribute('style', '');
  window.removeEventListener('mousemove', grabItem);
  window.removeEventListener('scroll', getScrollOffset);
 }
 if (item.clone) item.clone.remove();
 item.target = null;
 item.current = null;
});
