import { Droppable } from "react-beautiful-dnd";
import styled from "styled-components";
import { Trash2 } from "lucide-react";
import { useRecoilValue } from "recoil";
import { DragAtom } from "../recoil";

const Wrap = styled.div<{$is_dragging_over_from_this: string, $is_dragging_over: string}>`
    display: flex;
    align-items: center;
    justify-content: center;
    position: fixed;
    top: ${props =>
        props.$is_dragging_over_from_this === "false"
        ? "-3.75rem"
        : "0"
    };
    width:  ${props =>
        props.$is_dragging_over === "false"
        ? "7.5rem"
        : "9.5rem"
    };
    height: ${props =>
        props.$is_dragging_over === "false"
        ? "3.75rem"
        : "4.75rem"
    };
    left: calc(-3.75rem + 50vw);
    border-radius: 0px 0px 100rem 100rem;
    background-color: ${props =>
        props.$is_dragging_over === "false"
        ? "tomato"
        : "red"
    };
    box-shadow: rgba(210, 77, 77, 0.15) -0.1rem 0px 0.4rem;
    font-size: 2.5rem;
    z-index: 5;
    transition: .3s;
    overflow: hidden;

    & > svg {
        margin-bottom: 0.5rem;
        width: 40px;
        height: 40px;
    }
`;

const DeleteEl = () => {

    const isDrag = useRecoilValue(DragAtom);

    return (
        <Droppable droppableId="trash" type="CARD">
            {(dropProps, snapshot) => (
                <Wrap
                    ref={dropProps.innerRef}
                    {...dropProps.droppableProps}
                    $is_dragging_over_from_this={isDrag.toString()}
                    $is_dragging_over={snapshot.isDraggingOver.toString()}
                >
                    {dropProps.placeholder}      
                    <Trash2 />
                </Wrap>
            )}
        </Droppable>
    );
}

export default DeleteEl;