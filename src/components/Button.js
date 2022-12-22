import React from "react";
import styled, { css } from "styled-components";
import { darken, lighten } from "polished";

// 색상 관련 코드 분리
const colorStyles = css`
    ${({ theme, color }) => {
        const selected = theme.palette[color];
        return css`
            background: ${selected};
            &:hover {
                background: ${lighten(0.1, selected)};
            }
            &:active {
                background: ${darken(0.1, selected)};
            }
            /* Button 컴포넌트에 outline props설정 */
            /* 이 값이 true일 때, 테두리만 지닌 버튼 렌더 */
            ${(props) =>
                props.outline &&
                css`
                    color: ${selected};
                    background: none;
                    border: 1px solid ${selected};
                    &:hover {
                        background: ${selected};
                        color: white;
                    }
                `}
        `;
    }}
`;

// 버튼 크기
// const sizeStyles = css`
//     ${(props) =>
//         props.size === "large" &&
//         css`
//             height: 3rem;
//             font-size: 1.25rem;
//         `}

//     ${(props) =>
//         props.size === "medium" &&
//         css`
//             height: 2.25rem;
//             font-size: 1rem;
//         `}

//     ${(props) =>
//         props.size === "small" &&
//         css`
//             height: 1.75rem;
//             font-size: 0.875rem;
//         `}
// `;

// 버튼 크기 리펙터링
const sizes = {
    large: {
        height: "3rem",
        fontSize: "1.25rem",
    },
    medium: {
        height: "2.25rem",
        fontSize: "1rem",
    },
    small: {
        height: "1.75rem",
        fontSize: "0.875rem",
    },
};

const sizeStyles = css`
    ${({ size }) => css`
        height: ${sizes[size].height};
        font-size: ${sizes[size].fontSize};
    `}
`;

// fullWidth 라는 props가 주어졌다면 버튼크기 100% 렌더링
const fullWidthStyle = css`
    ${(props) =>
        props.fullWidth &&
        css`
            width: 100%;
            justify-content: center;
            &:not(:first-child) {
                margin-left: 0;
                margin-top: 1rem;
            }
        `}
`;

const StyledButton = styled.button`
    /* 공통 스타일 */
    /* 가로 중앙 정렬 */
    display: inline-flex;
    justify-content: center;
    align-items: center;
    /* 가로 중앙정렬 끝 */
    outline: none;
    border: none;
    border-radius: 4px;
    color: white;
    font-weight: bold;
    cursor: pointer;
    padding-left: 1rem;
    padding-right: 1rem;

    /* 크기 */
    /* height: 2.25rem;
    font-size: 1rem; */
    /* 크기: const sizeStyle 정의 */
    ${sizeStyles}

    /* 색상: const colorStyles 정의 */
    ${colorStyles}
    /* 색상 */
    /* ThemProvider로 설정한 값은 style-comonents에서 */
    /* props.theme로 조회할 수 있음. */
    /* ${(props) => {
        /* selected 값: Button 컴포넌트가 color props를 통해 */
        /* 받아오게될 색상 사용하도록 수정 */
        /* const selected = props.theme.palette[props.color];
        return css`
            background: ${selected};

            &:hover {
                background: ${lighten(0.1, selected)};
            }
            &:active {
                background: ${darken(0.1, selected)};
            }
        `;*/
    }} 

    /* 기타 */
    &:not(:first-child) {
        margin-left: 1rem;
    }

    /* 버튼크기 100% */
    ${fullWidthStyle}
`;

function Button({ children, color, size, outline, fullWidth, ...rest }) {
    return (
        <StyledButton color={color} size={size} outline={outline} fullWidth={fullWidth} {...rest}>
            {children}
        </StyledButton>
    );
}

Button.defaultProps = {
    color: "blue",
    size: "medium",
};

export default Button;
