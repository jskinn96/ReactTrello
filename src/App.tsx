import { DragDropContext, Droppable } from "react-beautiful-dnd";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import { IToDoAtom, ToDoAtom } from "./trello/recoil";
import Board from "./trello/components/Board";
import Header from "./trello/components/Header";
import DeleteEl from "./trello/components/Delete";
import { useEffect } from "react";
import { useDragHandlers } from "./hooks/useDragHandlers";

const Body = styled.div`
  height: 100vh;
  overflow: hidden;
  display: flex;
  flex-direction: column;
`;

const Wrap = styled.main`
  display: flex;
  width: fit-content;
  padding: 20px;
  justify-content: center;
  gap: 20px;
  flex: 1;
  overflow: hidden;
`;

function App() {

  const [toDos, setToDos] = useRecoilState<IToDoAtom>(ToDoAtom);
  const { dragStartFunc, dragEndFunc } = useDragHandlers();

  useEffect(() => {

    const savedToDos = localStorage.getItem("toDos") as string;
    if (savedToDos) setToDos(JSON.parse(savedToDos));
  }, []);

  useEffect(() => {

    localStorage.setItem("toDos", JSON.stringify(toDos));
  }, [toDos]);

  return (
    <Body>
      <Header />
      <DragDropContext
        onDragStart={dragStartFunc}
        onDragEnd={dragEndFunc}
      >
        <Droppable droppableId="board" direction="horizontal" type="BOARD">
          {(dropProps) => (
            <Wrap
              ref={dropProps.innerRef}
              {...dropProps.droppableProps}
            >
              {
                Object.keys(toDos).map((type, idx) => (
                  <Board
                    type={type}
                    toDos={toDos[type]}
                    key={type}
                    index={idx}
                  />
                ))
              }
              {dropProps.placeholder}
            </Wrap>
          )}
        </Droppable>
        <DeleteEl />
      </DragDropContext>
    </Body>
  );
}

export default App;