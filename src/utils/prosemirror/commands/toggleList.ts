import { wrapInList, liftListItem } from 'prosemirror-schema-list';
import type { Node, NodeType } from 'prosemirror-model';
import type { Transaction, EditorState } from 'prosemirror-state';
import { findParentNode, isList } from '../utils';

interface Attr {
  [key: string]: number | string;
}

interface TextStyleAttr {
  color?: string;
  fontSize?: string;
}

export const toggleList = (listType: NodeType, itemType: NodeType, listStyleType: string, TextStyleAttr: TextStyleAttr = {}) => {
  return (state: EditorState, dispatch: (tr: Transaction) => void) => {
    const { schema, selection } = state;
    const { $from, $to } = selection;
    const range = $from.blockRange($to);

    if (!range) {
      return false;
    }

    const parantList = findParentNode((node: Node) => isList(node, schema))(selection);

    if ((range.depth) >= 1 && parantList && range.depth - parantList.depth <= 1) {
      if (parantList.node.type === listType && !listStyleType) {
        return liftListItem(itemType)(state, dispatch);
      }

      if (isList(parantList.node, schema) && listType.validContent(parantList.node.content)) {
        const { tr } = state;

        const nodeAttrs: Attr = {
          ...parantList.node.attrs,
          ...TextStyleAttr
        };
        if (listStyleType) {
          nodeAttrs.listStyleType = listStyleType;
        }
        tr.setNodeMarkup(parantList.pos, listType, nodeAttrs);

        if (dispatch) {
          dispatch(tr);
        }
        return false;
      }
    }

    const nodeAttrs: Attr = {
      ...TextStyleAttr
    };
    if (listStyleType) {
      nodeAttrs.listStyleType = listStyleType;
    }
    return wrapInList(listType, nodeAttrs)(state, dispatch);
  };
};