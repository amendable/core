import hash from '@amendable/hash';

export default (css, global = true) => {
  const id = `amendable-${hash(css)}`;
  const stylisSelector = global ? '' : `.${id}`;
  const className = global ? null : id;

  if (!document.head.querySelector(`#${id}`)) {
    const node = document.createElement('style')
    node.id = id
    node.textContent = stylis(stylisSelector, css)
    node.type = 'text/css'

    document.head.appendChild(node)
  }

  return { className }
}
