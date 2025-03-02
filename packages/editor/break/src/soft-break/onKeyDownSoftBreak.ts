import {
  getBlockAbove,
  KeyboardHandlerReturnType,
  PlateEditor,
  queryNode,
  Value,
  WithPlatePlugin,
} from '@udecode/plate-core';
import isHotkey from 'is-hotkey';
import { SoftBreakPlugin } from './types';

export const onKeyDownSoftBreak = <
  V extends Value = Value,
  E extends PlateEditor<V> = PlateEditor<V>
>(
  editor: E,
  { options: { rules = [] } }: WithPlatePlugin<SoftBreakPlugin, V, E>
): KeyboardHandlerReturnType => (event) => {
  const entry = getBlockAbove(editor);
  if (!entry) return;

  rules.forEach(({ hotkey, query }) => {
    if (isHotkey(hotkey, event as any) && queryNode(entry, query)) {
      event.preventDefault();
      event.stopPropagation();

      editor.insertText('\n');
    }
  });
};
