import React from "react";
import Styled from "styled-components";
import { Container } from "@material-ui/core";
export const Spinner = () => {
  return (
    <Styles>
      <Container maxWidth="sm">
        <div className="spinner-container">
          <div className="loadingio-spinner-spinner-rtx76g8jscj">
            <div className="ldio-h8y6ldee7di">
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
            </div>
          </div>
        </div>
      </Container>
    </Styles>
  );
};

const Styles = Styled.div`
@keyframes ldio-h8y6ldee7di {
    0% { opacity: 1 }
    100% { opacity: 0 }
  }
  .ldio-h8y6ldee7di div {
    left: 94px;
    top: 48px;
    position: absolute;
    animation: ldio-h8y6ldee7di linear 1s infinite;
    background: #4aa882;
    width: 12px;
    height: 24px;
    border-radius: 6px / 12px;
    transform-origin: 6px 40px;
  }.ldio-h8y6ldee7di div:nth-child(1) {
    transform: rotate(0deg);
    animation-delay: -0.9166666666666666s;
    background: #4aa882;
  }.ldio-h8y6ldee7di div:nth-child(2) {
    transform: rotate(30deg);
    animation-delay: -0.8333333333333334s;
    background: #4aa882;
  }.ldio-h8y6ldee7di div:nth-child(3) {
    transform: rotate(60deg);
    animation-delay: -0.75s;
    background: #4aa882;
  }.ldio-h8y6ldee7di div:nth-child(4) {
    transform: rotate(90deg);
    animation-delay: -0.6666666666666666s;
    background: #4aa882;
  }.ldio-h8y6ldee7di div:nth-child(5) {
    transform: rotate(120deg);
    animation-delay: -0.5833333333333334s;
    background: #4aa882;
  }.ldio-h8y6ldee7di div:nth-child(6) {
    transform: rotate(150deg);
    animation-delay: -0.5s;
    background: #4aa882;
  }.ldio-h8y6ldee7di div:nth-child(7) {
    transform: rotate(180deg);
    animation-delay: -0.4166666666666667s;
    background: #4aa882;
  }.ldio-h8y6ldee7di div:nth-child(8) {
    transform: rotate(210deg);
    animation-delay: -0.3333333333333333s;
    background: #4aa882;
  }.ldio-h8y6ldee7di div:nth-child(9) {
    transform: rotate(240deg);
    animation-delay: -0.25s;
    background: #4aa882;
  }.ldio-h8y6ldee7di div:nth-child(10) {
    transform: rotate(270deg);
    animation-delay: -0.16666666666666666s;
    background: #4aa882;
  }.ldio-h8y6ldee7di div:nth-child(11) {
    transform: rotate(300deg);
    animation-delay: -0.08333333333333333s;
    background: #4aa882;
  }.ldio-h8y6ldee7di div:nth-child(12) {
    transform: rotate(330deg);
    animation-delay: 0s;
    background: #4aa882;
  }
  .loadingio-spinner-spinner-rtx76g8jscj {
    width: 100px;
    height: 100px;
    position: relative
  }
  .ldio-h8y6ldee7di {
    width: 100%;
    height: 100%;
    position: relative;
    transform: translateZ(0) scale(1);
    backface-visibility: hidden;
    transform-origin: 0 0; /* see note above */
  }
  .ldio-h8y6ldee7di div { box-sizing: content-box; }
  .spinner-container {
    position: fixed;
    left: 50%;
    top: 50%;
    margin-left: -100px;
    margin-top: -100px;
  }
`;
