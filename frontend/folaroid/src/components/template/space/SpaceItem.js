import React from 'react';
import styled from 'styled-components';

const H1 = styled.h1`
    margin: 0;
    padding: 0;
    position: absolute;
    left: 0px;
    top: 0px;
    font-size: 30px;
    opacity: 0;
    transition: all 0.5s;
`;

const Face = styled.article`
    display: block;
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0px;
    left: 0px;
    transform: ${props => `rotateY(${props.deg}deg) translateZ(-764px)`};
    backface-visibility: hidden;
    &:hover {
        ${H1} {
            top: -60px;
            opacity: 1;
        }
    }
`;

const Inner = styled.div`
    width: 100%;
    height: 100%;
`;

const InnerDiv = styled.div`
    width: 100%;
    height: 100%;
    border: 1px solid rgba(255, 255, 255, 0.5);
    box-sizing: border-box;
    background: rgba(255, 255, 255, 0.06);
    padding: 50px;
    position: relative;
    opacity: 0.7;
    overflow: hidden;
    cursor: pointer;
    transition: all 0.5s;
    &:hover {
        background: rgba(255, 255, 255, 0.15);
        transform: scale(1.03);
        opacity: 1;
    }
`;

const Img = styled.img`
    width: 100%;
    margin-top: 30px;
    margin-bottom: 40px;
`;

const H3 = styled.h3`
    color: #fff;
    margin-bottom: 20px;
`;

const P = styled.p`
    font: 18px / 1.3;
    color: #ccc;
`;

const SpaceItem = ({ onMouseEnter, onMouseLeave, project, deg }) => {
    return (
        <Face deg={deg} onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
            <H1>{project.pjtTitle}</H1>
            <Inner>
                <InnerDiv>
                    <h2>Project</h2>
                    <Img src={project.pjtOneImageLocation} />
                    <H3>{project.pjtTitle}</H3>
                    <P>{project.pjtSubtitle}</P>
                </InnerDiv>
            </Inner>
        </Face>
    );
};

export default SpaceItem;
