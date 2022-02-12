import { useEffect } from "react";
import { useDrag } from "react-dnd";
import { getEmptyImage } from "react-dnd-html5-backend";
import { useAppState } from "../state/AppStateContext";
import { DragItem } from "../DragItem";
import { setDraggedItem } from "../state/actions";

export const useItemDrag = (item: DragItem) => {
  const { dispatch } = useAppState();
  const [, drag, preview] = useDrag({
    // Type is either "COLUMN" or "CARD"
    type: item.type,
    // returns dragged item object and dispatches the SET_DRAGGED_ITEM action
    item: () => {
      dispatch(setDraggedItem(item));
      return item;
    },
    // is called when we release the item
    end: () => dispatch(setDraggedItem(null))
  });
  useEffect(() => {
    preview(getEmptyImage(), { captureDraggingState: true });
  }, [preview]);
  return { drag };
};
