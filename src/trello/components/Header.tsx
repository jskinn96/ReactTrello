import styled from "styled-components";
import ThemeToggle from "../../components/common/ThemeToggle";
import { FolderPlus } from "lucide-react";
import { useRecoilState, useRecoilValue } from "recoil";
import { ThemeAtom } from "../../recoil";
import Swal from "sweetalert2";
import { IToDoAtom, ToDoAtom } from "../recoil";

const Wrap = styled.div`
    width: 100vw;
    padding: 20px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: ${props => props.theme.bgHeader};
    box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 6px;
    z-index: 1;
    position: sticky;
    top: 0px;
`;

const TitleWrap = styled.div`
    display: flex;
    align-items: flex-start;
    gap: 20px;
`;

const H1 = styled.h1`
    font-weight: bold;
    font-size: 1.5rem;
    letter-spacing: 0.125rem;
`;

const FuncWrap = styled.div`
    display: flex;
    align-items: center;
    gap: 20px;
`;

const CTGRBtn = styled.button`
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.8rem;
    width: 2rem;
    height: 2rem;
    background: none;
    border: none;
    transition: color 0.3s;
    padding: 0px;
    border-radius: 0.2rem;
    cursor: pointer;
    color: ${({ theme }) => theme.txtColor};

    &:hover {
        color: ${({ theme }) => theme.accentColor};;
    }
`;

const Header = () => {

    const selectTheme = useRecoilValue(ThemeAtom);
    const [toDos, setToDos] = useRecoilState<IToDoAtom>(ToDoAtom);

    const addCategory = async () => {

        const newCatPrompt = await Swal.fire({
            title: "How should we call it?",
            input: "text",
            inputPlaceholder: "Give your new category a name",
            showCancelButton: true,
            confirmButtonText: "save",
            cancelButtonText: "cancel",
            theme: selectTheme,
        });

        const newCat = newCatPrompt.value;

        if (newCat) {

            const catArray = Object.keys(toDos);
            
            if (catArray.includes(newCat)){

                Swal.fire({
                    title: `"${newCat}" already exists.`,
                    text: "Please choose a different name.",
                    confirmButtonText: 'OK',
                    theme: selectTheme,
                });

            } else setToDos((prev) => ({
                ...prev, 
                [newCat]: [],
            }));
        }
    }

    return (
        <Wrap>
            <TitleWrap>
                <H1>Jisu's Kanban</H1>
                <CTGRBtn
                    title="Add Category"
                    onClick={addCategory}
                >
                    <FolderPlus />
                </CTGRBtn>
            </TitleWrap>
            <FuncWrap>
                <ThemeToggle />
            </FuncWrap>
        </Wrap>
    );
}

export default Header;