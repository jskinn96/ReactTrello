import { DragStart, DropResult } from "react-beautiful-dnd";
import { useSetRecoilState } from "recoil";
import { DragAtom, ToDoAtom } from "../trello/recoil";

export const useDragHandlers = () => {
    const setIsDrag = useSetRecoilState(DragAtom);
    const setToDos = useSetRecoilState(ToDoAtom);

    const dragStartFunc = ({ source }: DragStart) => {
        if (source.droppableId !== "board") setIsDrag(true);
    };

    const dragEndFunc = ({ destination, source }: DropResult) => {

        setIsDrag(false);

        if (!destination) return;

        if (destination?.droppableId === "board") {

            setToDos(allBoards => {

                const entries = Object.entries(allBoards);
                const [moved] = entries.splice(source.index, 1);
                entries.splice(destination.index, 0, moved);

                return Object.fromEntries(entries);
            });

        } else if (destination?.droppableId === source.droppableId) {

            setToDos(allBoards => {

                const tmp = { ...allBoards };

                const copied = [...allBoards[source.droppableId]];
                const [moved] = copied.splice(source.index, 1);

                copied.splice(destination.index, 0, moved);

                tmp[source.droppableId] = copied;

                return tmp;
            });

        } else if (destination?.droppableId === "trash") {

            setToDos(allBoards => {

                const tmp = { ...allBoards };

                const copied = [...allBoards[source.droppableId]];
                copied.splice(source.index, 1);

                tmp[source.droppableId] = copied;

                return tmp;
            });

        } else {

            setToDos(allBoards => {

                const tmp = { ...allBoards };

                const current = [...allBoards[source.droppableId]];
                const target = [...allBoards[destination.droppableId]];

                const [moved] = current.splice(source.index, 1);
                target.splice(destination.index, 0, moved);

                tmp[source.droppableId] = current;
                tmp[destination.droppableId] = target;

                return tmp;
            });
        }
    };

    return { dragStartFunc, dragEndFunc };
};
