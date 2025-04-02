import styled from "styled-components";
import ThemeToggle from "../../components/common/ThemeToggle";

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

const H1 = styled.h1`
    font-weight: bold;
    font-size: 1.5rem;
    letter-spacing: 0.125rem;
`;

const FuncWrap = styled.div`
    display: flex;
    gap: 10px;
`;

const Header = () => {

    return (
        <Wrap>
            <H1>Kanban Board</H1>
            <FuncWrap>
                <ThemeToggle />
            </FuncWrap>
        </Wrap>
    );
}

export default Header;