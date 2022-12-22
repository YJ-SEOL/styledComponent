import React, { useEffect, useState } from "react";
import styled, { keyframes, css } from "styled-components";
import Button from "./Button";

// 트랜지션 효과 시작
// 트랜지션 효과 적용 시 CSS Keyframe 사용
// styled-components에서 사용 시, keyframes라는 유틸 사용
const fadeIn = keyframes`
    from {
        opacity: 0
    }
    to {
        opacity: 1
    }
`;

const fadeOut = keyframes`
    from {
        opacity: 1
    }
    to {
        opacity: 0
    }
`;

const slideUp = keyframes`
    from {
        transform: translateY(200px);
    }
    to {
        transform: translateY(0px);
    }
`;

const slideDown = keyframes`
    from {
        transform: translateY(0px);
    }
    to {
        transform: translateY(200px);
    }
`;
// 트랜지션 효과 끝

const DarkBackground = styled.div`
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    background: rgba(0, 0, 0, 0.8);

    /* 트랜지션 효과 적용을 위한 추가(서서히 나타남) */
    animation-duration: 0.25s;
    animation-timing-function: ease-out;
    animation-name: ${fadeIn};
    animation-fill-mode: forwards;

    /* 사라지는 효과 추가를 위한 disappear props 추가 */
    ${(props) =>
        props.disappear &&
        css`
            animate-name: ${fadeOut};
        `}
`;

const DialogBlock = styled.div`
    width: 320px;
    padding: 1.5rem;
    background: white;
    border-radius: 2px;
    h3 {
        margin: 0;
        font-size: 1.5rem;
    }
    p {
        font-size: 1.125rem;
    }

    /* 트랜지션 효과 적용을 위한 추가(서서히 나타남) */
    animation-duration: 0.25s;
    animation-timing-function: ease-out;
    animation-name: ${slideUp};
    animation-fill-mode: forwards;

    /* 사라지는 효과 추가를 위한 disappear props 추가 */
    ${(props) =>
        props.disappear &&
        css`
            animation-name: ${slideDown};
        `}
`;

const ButtonGroup = styled.div`
    margin-top: 3rem;
    display: flex;
    justify-content: flex-end;
`;

const ShortMarginButton = styled(Button)`
    ${"" /* &+& 이슈: 여기는 왜 &+& 적용되고 나머지는 */}
    ${"" /* &:not{:first-child}인지 모르겠음. */}
    &+& {
        margin-left: 0.5rem;
    }
`;

function Dialog({ title, children, cancleText, confirmText, onConfirm, onCancel, visible }) {
    // 사라지는 애니메이션 추가
    const [animate, setAnimate] = useState(false);
    const [localVisible, setLocalVisible] = useState(visible);

    useEffect(() => {
        // visible 값이 true -> false가 되는 것을 감지
        if (localVisible && !visible) {
            setAnimate(true);
            setTimeout(() => setAnimate(false), 250);
        }
        setLocalVisible(visible);
    }, [localVisible, visible]);

    if (!animate && !localVisible) return null;
    // 사라지는 애니메이션 끝

    return (
        // 서서히 사라지는 애니메이션 추가를 위한
        // disappear 추가
        <DarkBackground disappear={!visible}>
            <DialogBlock disappear={!visible}>
                <h3>{title}</h3>
                <p>{children}</p>
                <ButtonGroup>
                    <ShortMarginButton color="gray" onClick={onCancel}>
                        {cancleText}
                    </ShortMarginButton>
                    <ShortMarginButton color="pink" onClick={onConfirm}>
                        {confirmText}
                    </ShortMarginButton>
                </ButtonGroup>
            </DialogBlock>
        </DarkBackground>
    );
}

Dialog.defaultProps = {
    confirmText: "확인",
    cancelText: "취소",
};

export default Dialog;
