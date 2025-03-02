import {
  getBlockAbove,
  isBlockAboveEmpty,
  KeyboardHandlerReturnType,
  PlateEditor,
  TElement,
  Value,
  WithPlatePlugin,
} from '@udecode/plate-core';
import isHotkey from 'is-hotkey';
import { outdentList } from './transforms/index';
import {
  IndentListPlugin,
  KEY_LIST_STYLE_TYPE,
} from './createIndentListPlugin';

export const onKeyDownIndentList = <
  V extends Value = Value,
  E extends PlateEditor<V> = PlateEditor<V>
>(
  editor: E,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  plugin: WithPlatePlugin<IndentListPlugin, V, E>
): KeyboardHandlerReturnType => (e) => {
  const entry = getBlockAbove(editor);
  if (!entry) return;

  const node = entry[0] as TElement;

  const listStyleType = node[KEY_LIST_STYLE_TYPE] as string | undefined;
  if (!listStyleType) return;

  if (isHotkey('Enter', e)) {
    if (isBlockAboveEmpty(editor) && node.indent) {
      outdentList(editor);
      e.stopPropagation();
      e.preventDefault();
    }
  }
};
