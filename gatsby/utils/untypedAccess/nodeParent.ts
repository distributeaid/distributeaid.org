export const nodeParent = (node: Record<string, any>) =>
  'parent' in node ? node['parent'] : undefined
