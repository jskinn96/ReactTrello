import React from "react";
import { Draggable } from "react-beautiful-dnd";
import styled from "styled-components";
import { Pencil, Trash2 } from 'lucide-react';
import { useRecoilValue, useSetRecoilState } from "recoil";
import { ToDoAtom } from "../recoil";
import Swal from "sweetalert2";
import { ThemeAtom } from "../../recoil";

export interface ICard {
    toDo: string;
    id: number;
    idx: number;
}

const CardEl = styled.li<{ $is_dragging: string }>`
    background-color: ${(props) =>
        props.$is_dragging === "true" ? props.theme.bgDarkColor : props.theme.bgDark};
    box-shadow: ${(props) =>
        props.$is_dragging === "true" ? "0px 2px 5px rgba(0, 0, 0, 0.5)" : "none"};
    padding: 0.8rem;
    border-radius: 0.4rem;
    height: 2.75rem;
    display: flex;
    align-item: center;
    transition: background-color 0.3s, color 0.3s, box-shadow 0.3s, opacity 0.3s;
    position: relative;
    font-size: 1rem;
    & > :first-child {
        width: 100%;
        text-overflow: ellipsis;
        overflow: hidden;
        white-space: nowrap;
        transition: width 0.3s;
        margin-top: 0.1rem;
    }
    &:hover > :nth-of-type(2) {
        opacity: 1;
        position: relative;
    }
`;

const FuncWrap = styled.div`
    display: flex;
    position: absolute;
    top: calc(50% - 1rem);
    right: 0;
    justify-content: space-between;
    opacity: 0;
`;

const FuncBtn = styled.button`
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 0.2rem;
    width: 2rem;
    height: 2rem;
    transition: opacity 0.3s, background-color 0.3s, color 0.3s;
    cursor: pointer;
    color: rgb(173, 173, 173);
    background-color: transparent;
    border: none;
    font-size: 1.2rem;
    transition: .3s;

    &:hover {
        color: ${({ theme }) => theme.accentColor};
    }
`;

const Card = ({ toDo, id, idx }: ICard) => {

    const setToDos = useSetRecoilState(ToDoAtom);
    const selectTheme = useRecoilValue(ThemeAtom);

    const editToDos = async (e: React.MouseEvent<HTMLButtonElement>) => {

        const target = e.currentTarget;
        const ul = target.closest('.BoardEl') as HTMLElement;
        const type = ul.dataset.rbdDroppableId as string;

        const newToDosPrompt = await Swal.fire({
            title: "Edit task",
            input: "text",
            inputPlaceholder: "New task name",
            inputValue: toDo,
            showCancelButton: true,
            confirmButtonText: "edit",
            cancelButtonText: "cancel",
            theme: selectTheme,
        });

        if (newToDosPrompt.isConfirmed && newToDosPrompt.value?.trim()) {

            const newToDo = newToDosPrompt.value.trim();

            if (newToDo !== toDo) {


                const newToDoData = {
                    text: newToDo,
                    id: Date.now(),
                }

                setToDos(prev => {

                    const tmp = { ...prev };
                    const copied = [...tmp[type]];
                    copied.splice(idx, 1, newToDoData);

                    tmp[type] = copied;

                    return tmp;
                });
            }
        }
    }

    const deleteToDos = async (e: React.MouseEvent<HTMLButtonElement>) => {
        
        const target = e.currentTarget;
        const ul = target.closest('.BoardEl') as HTMLElement;
        const type = ul.dataset.rbdDroppableId as string;

        const confirm = await Swal.fire({
            title: `Are you sure you want to delete this "${toDo}"?`,
            showCancelButton: true,
            confirmButtonText: "Yes",
            cancelButtonText: "No",
            theme: selectTheme,
        });

        if (confirm.isConfirmed) {

            setToDos(prev => {

                const tmp = { ...prev };
                const copied = [...tmp[type]];

                copied.splice(idx, 1);

                tmp[type] = copied;

                return tmp;
            });
        }
    }

    return (
        <Draggable draggableId={`${id}`} index={idx}>
            {(dragProps, snapshot) =>
                <CardEl
                    ref={dragProps.innerRef}
                    {...dragProps.draggableProps}
                    {...dragProps.dragHandleProps}
                    $is_dragging={snapshot.isDragging.toString()}
                >
                    <div title={toDo}>{toDo}</div>
                    <FuncWrap>
                        <FuncBtn
                            onClick={editToDos}
                        >
                            <Pencil />
                        </FuncBtn>
                        <FuncBtn
                            onClick={deleteToDos}
                        >
                            <Trash2 />
                        </FuncBtn>
                    </FuncWrap>
                </CardEl>
            }
        </Draggable>
    );
}

export default React.memo(Card);