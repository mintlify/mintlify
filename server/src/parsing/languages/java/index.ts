import { PLConnect, TreeNode } from '../../types';
import { extractBaseComments } from '../helpers';

export default class Java implements PLConnect {
  extractComment(tree: TreeNode) {
      return extractBaseComments(tree);
  }
}