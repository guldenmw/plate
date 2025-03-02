import { TEditor, Value } from '../slate/editor/TEditor';
import { ENode } from '../slate/node/TNode';
import { findNode, FindNodeOptions } from './findNode';

/**
 * Iterate through all of the nodes in the editor and break early for the first truthy match. Otherwise
 * returns false.
 */
export const someNode = <N extends ENode<V>, V extends Value = Value>(
  editor: TEditor<V>,
  options: FindNodeOptions<V>
) => {
  return !!findNode<N, V>(editor, options);
};
