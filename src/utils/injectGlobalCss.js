import hash from '@amendable/hash';
import stylis from 'stylis';

const existingIds = [];

export default (css, global = true) => {
  const id = `amendable-${hash(css)}`;
  const stylisSelector = global ? '' : `.${id}`;
  const className = global ? null : id;

  if (!existingIds.includes(id) && !document.head.querySelector(`#${id}`)) {
    const node = document.createElement('style')
    node.id = id
    node.textContent = stylis(stylisSelector, css)
    node.type = 'text/css'

    document.head.appendChild(node)
    existingIds.push(id);
  }

  return { className }
}
