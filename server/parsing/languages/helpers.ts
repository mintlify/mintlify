import { TreeNode } from 'parsing/types';
import extract from 'extract-comments';

export const checkNodeByKind = (node: TreeNode | null, ...kinds: string[]): boolean => {
  return kinds.includes(node.kind)
}

export const findChildByKind = (node: TreeNode | null, ...kinds: string[]): TreeNode | null => {
  return node?.children?.find((child) => checkNodeByKind(child, ...kinds));
}

export const findAllChildsByKind = (node: TreeNode | null, ...kinds: string[]): TreeNode[] | null => {
  return node?.children?.filter((child) => checkNodeByKind(child, ...kinds));
}

export const getValueOfChildByKind = (node: TreeNode | null, ...kinds: string[]): string => {
  const child = findChildByKind(node, ...kinds);
  return child?.value || '';
}

export const findChildAfterByKind = (node: TreeNode | null, ...kinds: string[]): TreeNode | null => {
  if (node?.children == null) return null;

  for (let i = 0; i < node.children.length; i++) {
    const child = node.children[i];
    if (checkNodeByKind(child, ...kinds) && i < node.children.length - 1) {
      return node.children[i + 1];
    }
  }

  return null;
}

export const getFirstNodeByValue = (node: TreeNode | null, value: string): TreeNode | null => {
  if (node?.value === value.trim()) {
    return node;
  }
  if (node?.children == null) {
    return null;
  }

  let i = 0;
  let result = null;
  for (i = 0; result == null && i < node.children.length; i++){
    result = getFirstNodeByValue(node.children[i], value);
  }
  return result;
}

export const getFirstNodeByKind = (node: TreeNode | null, kind: string): TreeNode | null => {
  if (node?.kind === kind.trim()) {
    return node;
  }
  if (node?.children == null) {
    return null;
  }

  let i = 0;
  let result = null;
  for (i = 0; result == null && i < node.children.length; i++){
    result = getFirstNodeByKind(node.children[i], kind);
  }
  return result;
}

type IfKindExistsInTreeOptions = {
  rootRange: {
    start: number;
    end: number;
  }
  excludesNotRoot: string[]
}

export const stripQuotes = (value: string): string | null => {
  if (!value) return undefined;
  return value.replace(/^["'](.*)["']$/, '$1');
}

export const findIfKindExistsInTree = (node: TreeNode | null, kind: string, options?: IfKindExistsInTreeOptions): boolean => {
  const isExcludedPath = options != null
    && node.start !== options.rootRange.start
    && node.end !== options.rootRange.end
    && checkNodeByKind(node, ...options.excludesNotRoot);
  if (node?.kind === kind) {
    return true;
  }
  if (node?.children == null || isExcludedPath) {
    return null;
  }
  let i = 0;
  let result = null;
  for(i = 0; result == null && i < node.children.length; i++){
    result = findIfKindExistsInTree(node.children[i], kind, options);
  }
  return result;
}

export const findIfKindIsChild = (tree: TreeNode, kind: string): boolean => {
  let isChild = false
  tree.children.forEach(child => {
    if (child.kind === kind) {
      isChild = true;
    }
  });
  return isChild;
}

export const findAllInstancesOfKindInTree = (root: TreeNode, ...kinds: string[]): TreeNode[] => {
  const stack = [];
  let node, ii;
  stack.push(root);
  const allInstances = [];
  while (stack.length > 0) {
      node = stack.pop();
      if (checkNodeByKind(node, ...kinds)) {
        allInstances.push(node);
      }
      if (node.children && node.children.length) {
          for (ii = 0; ii < node.children.length; ii += 1) {
              stack.push(node.children[ii]);
          }
      }
  }
  return allInstances;
};

export const getLineNumberOfSubstring = (content: string, substring: string, returnsEndLine = false): number => {
  const indexOfSubstring = content.indexOf(substring);
  const upToindex = content.substring(0, indexOfSubstring);
  const linesBeforeIndex = upToindex.split('\n').length - 1;
  const linesOfSubstring = substring.split('\n').length;

  if (returnsEndLine) {
    return linesBeforeIndex + linesOfSubstring;  
  }
  
  return linesBeforeIndex;
}

export const removeFrontAndBack = (str: string, num: number) : string => {
  const frontRemoved = str.trim().slice(num);
  const backRemoved = frontRemoved.slice(num);
  return backRemoved.trim();
}

export const removeFront = (str: string, num: number): string => {
  return str.trim().slice(num).trim();
}

/*
  A lot of programming languages share the same comment syntax as JS, this function removes common syntax for those languages
*/
export const extractBaseComments = (tree: TreeNode): string | null => {
  if (!['comment', 'block_comment'].includes(tree.kind)) {
    return null;
  }
  const comments = extract(tree.value);
  if (comments.length === 0) { return null; }
  return comments[0].value.trim();
}