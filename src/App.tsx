import { DragDropContext, DropResult } from "react-beautiful-dnd";
import { useRecoilState, useSetRecoilState } from "recoil";
import styled from "styled-components";
import { DragAtom, IToDoAtom, ToDoAtom } from "./trello/recoil";
import Board from "./trello/components/Board";
import Header from "./trello/components/Header";
import DeleteEl from "./trello/components/Delete";

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
  const setIsDrag = useSetRecoilState<boolean>(DragAtom);
  
  const dragStartFunc = () => {

    setIsDrag(true);
  }

  const dragEndFunc = ({ destination, source }: DropResult) => {

    setIsDrag(false);

    if (!destination) return; 

    if (destination?.droppableId === source.droppableId) {

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

  return (
    <Body>
      <Header />
      <DragDropContext
        onDragStart={dragStartFunc} 
        onDragEnd={dragEndFunc}
      >
        <Wrap>
          {
            Object.keys(toDos).map(type => (
              <Board
                type={type}
                toDos={toDos[type]}
                key={type}
              />
            ))
          }
        </Wrap>
        <DeleteEl />
      </DragDropContext>
    </Body>
  );
}

export default App;