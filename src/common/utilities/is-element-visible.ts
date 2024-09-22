export function isElementInViewport(el: Element) {
  const rect = el.getBoundingClientRect();

  return (
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom <= window.innerHeight &&
    rect.right <= window.innerWidth
  );
}
//top>chatbox -top
//bottom<chatbox-bottom

export function isElementInCertainBox(el: Element, box: Element | null) {
  if (!box) return;
  const elRect = el.getBoundingClientRect();
  const boxRect = box.getBoundingClientRect();

  return elRect.top >= boxRect.top && elRect.bottom <= boxRect.bottom;
}
