import { Droppable } from "react-beautiful-dnd";
import styled from "styled-components";
import Card from "./Card";
import { IBoard, ToDoAtom } from "../recoil";
import { useForm } from "react-hook-form";
import { useSetRecoilState } from "recoil";
import { Pencil, Trash2, Move, PlusCircle } from 'lucide-react';

const BoardFuncWrap = styled.div`
    display: flex;
    position: absolute;
    top: 1.25rem;
    right: 1.25rem;
    align-items: center;
    gap: 0.2rem;
    color: rgb(173, 173, 173);
    transition: opacity 0.3s;
    opacity: 0;
`;

const Wrap = styled.div`
    display: flex;
    width: 16rem;
    height: fit-content;
    max-height: 100%;
    position: relative;
    border-radius: 0.8rem;
    box-shadow: rgba(0, 0, 0, 0.15) 0px 0.3rem 0.6rem;
    transition: background-color 0.3s, box-shadow 0.3s;
    overflow: hidden;
    user-select: none;

    &:hover ${BoardFuncWrap} {
        opacity: 1;
    }
`;

const FuncWrap = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: space-between;
    flex-direction: column;
    position: absolute;
    z-index: 1;
    pointer-events: none;

    & > * {
        pointer-events: all;
    }
`;

interface IBoardEl {
    $is_dragging_over: string;
    $is_dragging_over_from_this: string;
}

const BoardEl = styled.ul<IBoardEl>`
    display: flex;
    flex-direction: column;
    padding: 4.5rem 1rem;
    width: 100%;
    max-height: calc(-20px + 100vh);
    overflow: hidden auto;
    gap: 0.6rem;
    background-color: ${props =>
        props.$is_dragging_over === "true"
            ? props.theme.royalblue
            : props.$is_dragging_over_from_this === "true"
                ? props.theme.indianRed
                : props.theme.cardBg
    };
`;

const TitleWrap = styled.div`
    display: block;
    font-size: 1.6rem;
    font-weight: 600;
    width: 16rem;
    height: 4.5rem;
    padding: 1.25rem;
    border-radius: 0.8rem 0.8rem 0px 0px;
    transition: background-color 0.3s, color 0.3s, box-shadow 0.3s, opacity 0.3s;
`;

const Title = styled.h2`
    width: 13.5rem;
    padding-bottom: 0.2rem;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
    transition: width 0.3s;
`;

const FuncButton = styled.button`
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.5rem;
    width: 2rem;
    height: 2rem;
    background: none;
    border: none;
    padding: 0px;
    border-radius: 0.2rem;
    color: rgb(173, 173, 173);
    transition: background-color 0.3s, color 0.3s, opacity 0.3s;
    cursor: pointer;
`;

interface IForm {
    [key: string]: string;
}

const Form = styled.form`
    width: 100%;
    height: 3.5rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
    transition: background-color 0.3s, color 0.3s, opacity 0.3s;
`;

const TextInput = styled.input`
    width: 100%;
    height: 100%;
    padding: 0px 1.2rem;
    border: none;
    border-radius: 0px 0px 0.8rem 0.8rem;
    background-color: ${({ theme }) => theme.cardShadow};
    box-shadow: rgba(0, 0, 0, 0.15) 0px -0.1rem 0.2rem;
    font-size: 1rem;
    font-weight: 500;
    color: ${({ theme }) => theme.txtColor};
    transition: background-color 0.3s, box-shadow 0.3s;

    &:placeholder-shown + button {
        display: none;
    }
`;

const EmptySpace = styled.li`
    display: flex;
    align-items: center;
    justify-content: center;
    color: rgb(173, 173, 173);
    font-size: 0.9rem;
    padding: .8rem;
    height: 2.75rem;
    cursor: default;
    transition: color 0.3s;
`;

const SubmitBtn = styled.button`
    position: absolute;
    right: 0px;
    width: 3.5rem;
    height: 3.5rem;
    background-color: transparent;
    border: none;
    border-radius: 0px 0px 0.8rem;
    font-size: 1.4rem;
    display: flex;
    align-items: center;
    justify-content: center;
    color: royalblue;
`;

const Board = ({ type, toDos }: IBoard) => {

    const { register, setValue, handleSubmit } = useForm<IForm>();
    const setToDos = useSetRecoilState(ToDoAtom);

    const setValid = (val: IForm) => {

        setToDos(allBoards => {

            const tmp = { ...allBoards };

            const copied = [...tmp[type]];
            const newToDo = {
                id: Date.now(),
                text: val[type]
            }
            copied.push(newToDo);

            tmp[type] = copied;

            return tmp;
        });

        setValue(type, "");
    }

    return (
        <Droppable droppableId={type}>
            {(dropProps, snapshot) => (
                <Wrap>
                    <FuncWrap>
                        <TitleWrap>
                            <Title>{type}</Title>
                            <BoardFuncWrap>
                                <FuncButton>
                                    <Pencil />
                                </FuncButton>
                                <FuncButton>
                                    <Trash2 />
                                </FuncButton>
                                <FuncButton>
                                    <Move />
                                </FuncButton>
                            </BoardFuncWrap>
                        </TitleWrap>
                        <Form onSubmit={handleSubmit(setValid)}>
                            <TextInput
                                {...register(type, { required: true })}
                                type="text"
                                placeholder={`Add task on ${type}`}
                            />
                            <SubmitBtn>
                                <PlusCircle />
                            </SubmitBtn>
                        </Form>
                    </FuncWrap>
                    <BoardEl
                        ref={dropProps.innerRef}
                        {...dropProps.droppableProps}
                        $is_dragging_over={snapshot.isDraggingOver.toString()}
                        $is_dragging_over_from_this={Boolean(snapshot.draggingFromThisWith).toString()}
                    >
                        {
                            toDos.length > 0
                                ? toDos.map((toDo, idx) => (
                                    <Card
                                        key={toDo.id}
                                        toDo={toDo.text}
                                        id={toDo.id}
                                        idx={idx}
                                    />
                                ))
                                : <EmptySpace>This board is empty.</EmptySpace>
                        }
                        {dropProps.placeholder}
                    </BoardEl>
                </Wrap>
            )}
        </Droppable>
    );
}

export default Board;