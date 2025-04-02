import React from "react";
import { Draggable } from "react-beautiful-dnd";
import styled from "styled-components";
import { Pencil, Trash2 } from 'lucide-react';

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
    display: block;
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
    }
`;

const FuncWrap = styled.div`
    display: flex;
    position: absolute;
    top: calc(50% - 1rem);
    right: 0.375rem;
    justify-content: space-between;
    gap: 0.125rem;
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
`;

const Card = ({ toDo, id, idx }: ICard) => {

    return (
        <Draggable draggableId={`${id}`} index={idx}>
            {(dragProps, snapshot) =>
                <CardEl
                    ref={dragProps.innerRef}
                    {...dragProps.draggableProps}
                    {...dragProps.dragHandleProps}
                    $is_dragging={snapshot.isDragging.toString()}
                >
                    <div>{toDo}</div>
                    <FuncWrap>
                        <FuncBtn><Pencil /></FuncBtn>
                        <FuncBtn><Trash2 /></FuncBtn>
                    </FuncWrap>
                </CardEl>
            }
        </Draggable>
    );
}

export default React.memo(Card);